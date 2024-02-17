#[starknet::contract]
mod Lens {
    use lens_registry::interface::ILens;
    use starknet::{ContractAddress, EthAddress};
    use core::poseidon::PoseidonTrait;
    use core::hash::{HashStateTrait, HashStateExTrait};
    use core::traits::{Into, TryInto};
    use core::num::traits::{Zero};


    #[storage]
    struct Storage {
        eth_address_to_sn_address: LegacyMap::<EthAddress, ContractAddress>,
        sn_address_to_eth_address: LegacyMap::<ContractAddress, EthAddress>,
    }

    #[constructor]
    fn constructor(ref self: ContractState,) {}

    fn convert_to_eth_address(sn_address: ContractAddress) -> EthAddress {
        // Remove 252 bits to 160 bits

        // TODO: check is it higher than 160 bits.
        // TODO: then remove 160 bits.
        let sn_address_f252: felt252 = sn_address.into();

        let sn_address_u256: u256 = sn_address_f252.into();

        let (_, address) = DivRem::div_rem(
            sn_address_u256, 0x10000000000000000000000000000000000000000_u256.try_into().unwrap()
        );

        address.try_into().unwrap()
    }

    fn regenerate_address(eth_address: EthAddress) -> EthAddress {
        let hash = PoseidonTrait::new().update(eth_address.try_into().unwrap()).finalize();
        convert_to_eth_address(hash.try_into().unwrap())
    }

    #[abi(embed_v0)]
    impl Lens of ILens<ContractState> {
        fn register_address(ref self: ContractState, address: ContractAddress) {
            assert(self.sn_address_to_eth_address.read(address).is_zero(), 'already registered');

            let mut regenerated_address: EthAddress = convert_to_eth_address(address);

            let mut existance = self.eth_address_to_sn_address.read(regenerated_address).is_zero();
            if (existance) {
                // Register address and return
                self.eth_address_to_sn_address.write(regenerated_address, address);
                self.sn_address_to_eth_address.write(address, regenerated_address);
                return;
            }

            loop {
                regenerated_address = regenerate_address(regenerated_address);

                existance = self.eth_address_to_sn_address.read(regenerated_address).is_zero();

                if (existance) {
                    self.eth_address_to_sn_address.write(regenerated_address, address);
                    self.sn_address_to_eth_address.write(address, regenerated_address);
                    break;
                }
            }
        }

        fn get_eth_address_from_sn_address(
            self: @ContractState, sn_address: ContractAddress
        ) -> EthAddress {
            self.sn_address_to_eth_address.read(sn_address)
        }

        fn get_sn_address_from_eth_address(
            self: @ContractState, eth_address: EthAddress
        ) -> ContractAddress {
            self.eth_address_to_sn_address.read(eth_address)
        }
    }
}

#[cfg(test)]
mod LensTests {
    use super::Lens::{convert_to_eth_address, regenerate_address};
    use lens_registry::interface::{ILensDispatcher, ILensDispatcherTrait};
    use starknet::{contract_address_const, EthAddress, ContractAddress};
    use snforge_std::{ContractClass, ContractClassTrait, declare};
    use core::debug::PrintTrait;

    fn setup() -> ILensDispatcher {
        let contract_class = declare('Lens');

        let contract_address = contract_class
            .deploy(@core::array::ArrayTrait::<felt252>::new())
            .unwrap();

        ILensDispatcher { contract_address }
    }

    #[test]
    fn test_convert_to_eth_address() {
        let addr: ContractAddress = 0xABC1476CCB887B29E5Ba6984119Dff71716f4E7b0cf2293cF7F07792BAe0FF
            .try_into()
            .unwrap();
        let converted: EthAddress = convert_to_eth_address(addr.try_into().unwrap());

        assert(converted.into() == 0x84119Dff71716f4E7b0cf2293cF7F07792BAe0FF, 'bit removal wrong');
    }

    #[test]
    fn test_convert_to_eth_address_max() {
        let addr: ContractAddress = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
            .try_into()
            .unwrap();
        let converted: EthAddress = convert_to_eth_address(addr.try_into().unwrap());

        assert(converted.into() == 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF, 'bit removal wrong');
    }

    #[test]
    fn test_convert_to_eth_address_min() {
        let addr: ContractAddress = 0x1.try_into().unwrap();
        let converted: EthAddress = convert_to_eth_address(addr.try_into().unwrap());

        assert(converted.into() == 0x1, 'bit removal wrong');
    }

    #[test]
    fn test_poseidon_hash() {
        let addr: ContractAddress = 0xABC1476CCB887B29E5Ba6984119Dff71716f4E7b0cf2293cF7F07792BAe0FF
            .try_into()
            .unwrap();
        let converted: EthAddress = convert_to_eth_address(addr.try_into().unwrap());

        let new_address = regenerate_address(converted);

        assert(new_address.into() == 0xf0a82d8855d078eba34e198f5e7acee3c0776541, 'wrong hash');
    }

    #[test]
    fn test_register_address() {
        let dispatcher = setup();
        let addr: ContractAddress = 0xABC1476CCB887B29E5Ba6984119Dff71716f4E7b0cf2293cF7F07792BAe0FF
            .try_into()
            .unwrap();

        dispatcher.register_address(addr);

        assert(
            dispatcher
                .get_eth_address_from_sn_address(addr)
                .into() == 0x84119Dff71716f4E7b0cf2293cF7F07792BAe0FF,
            'register wrong'
        );
    }

    #[test]
    #[should_panic(expected: ('already registered',))]
    fn test_register_address_same() {
        let dispatcher = setup();
        let addr: ContractAddress = 0xABC1476CCB887B29E5Ba6984119Dff71716f4E7b0cf2293cF7F07792BAe0FF
            .try_into()
            .unwrap();

        dispatcher.register_address(addr);
        dispatcher.register_address(addr);
    }

    #[test]
    fn test_register_address_regenerate() {
        let dispatcher = setup();
        let addr: ContractAddress = 0xABC1476CCB887B29E5Ba6984119Dff71716f4E7b0cf2293cF7F07792BAe0FF
            .try_into()
            .unwrap();

        dispatcher.register_address(addr);
        let registered_address: felt252 = dispatcher.get_eth_address_from_sn_address(addr).into();

        let collide_sn_address: felt252 = (registered_address.into()
            + 0x10000000000000000000000000000000000000000000000000000000000000_u256)
            .try_into()
            .unwrap();

        let converted_initial: EthAddress = convert_to_eth_address(addr.try_into().unwrap());
        let converted_collide: EthAddress = convert_to_eth_address(
            collide_sn_address.try_into().unwrap()
        );

        assert(converted_initial == converted_collide, 'wrong addresses');

        dispatcher.register_address(collide_sn_address.try_into().unwrap());

        let registered_address_collide: felt252 = dispatcher
            .get_eth_address_from_sn_address(collide_sn_address.try_into().unwrap())
            .into();

        assert(
            registered_address_collide == regenerate_address(registered_address.try_into().unwrap())
                .into(),
            'regenerated address wrong'
        );
        assert(registered_address_collide != registered_address, 'same address registered');
    }
}

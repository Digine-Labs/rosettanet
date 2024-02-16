#[starknet::contract]
mod Lens {
    use lens_registry::interface::ILens;
    use starknet::{ContractAddress, EthAddress};


    #[storage]
    struct Storage {
        eth_address_to_sn_address: LegacyMap::<EthAddress, ContractAddress>,
        sn_address_to_eth_address: LegacyMap::<ContractAddress, EthAddress>,
    }

    #[constructor]
    fn constructor(ref self: ContractState,) {}

    #[abi(embed_v0)]
    impl Lens of ILens<ContractState> {
        fn get_address(self: @ContractState, lensed_address: felt252) -> ContractAddress {
            return '0'.try_into().unwrap();
        }

        fn register_address(ref self: ContractState, address: ContractAddress) {}

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

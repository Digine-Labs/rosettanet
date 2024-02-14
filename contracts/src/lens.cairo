#[starknet::contract]
mod Lens {
    use lens_registry::interface::ILens;
    use starknet::ContractAddress;

    #[storage]
    struct Storage {}

    #[constructor]
    fn constructor(ref self: ContractState,) {}

    #[abi(embed_v0)]
    impl Lens of ILens<ContractState> {
        fn get_address(self: @ContractState, lensed_address: felt252) -> ContractAddress {
            return '0'.try_into().unwrap();
        }

        fn register_address(ref self: ContractState, address: ContractAddress) {}
    }
}

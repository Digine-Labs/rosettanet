use starknet::ContractAddress;

#[starknet::interface]
trait ILens<TState> {
    fn get_address(self: @TState, lensed_address: felt252) -> ContractAddress;
    fn register_address(ref self: TState, address: ContractAddress);
}

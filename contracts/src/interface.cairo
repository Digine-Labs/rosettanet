use starknet::{ContractAddress, EthAddress};

#[starknet::interface]
trait ILens<TState> {
    fn get_address(self: @TState, lensed_address: felt252) -> ContractAddress;
    fn register_address(ref self: TState, address: ContractAddress);
    fn get_eth_address_from_sn_address(self: @TState, sn_address: ContractAddress) -> EthAddress;
    fn get_sn_address_from_eth_address(self: @TState, eth_address: EthAddress) -> ContractAddress;
}

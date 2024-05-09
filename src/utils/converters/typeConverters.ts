export function convertSnToEth(sntype: string): string | Array<string> {
  /*
        Examples:

        u256 => uint256,
        ContractAddress => address

        TODO => module::sub_module::custom_struct => (uint256, uint160 ...)
    */
  switch (sntype) {
    case 'bool':
      return 'bool'
    case 'core::integer::u8':
      return 'uint8'
    case 'core::integer::u16':
      return 'uint16'
    case 'core::integer::u32':
      return 'uint32'
    case 'core::integer::usize':
      return 'uint32'
    case 'core::integer::u64':
      return 'uint64'
    case 'core::integer::u128':
      return 'uint128'
    case 'core::integer::u256':
      return 'uint256'
    case 'core::starknet::contract_address::ContractAddress':
      return 'address'
    case 'core::felt252':
      return 'uint256'
    default:
      return getTypesfromStruct(sntype)
  }
}

function getTypesfromStruct(sntype: string): string | Array<string> {
  // TODO: support custom structs, tuples, arrays
  return sntype
}

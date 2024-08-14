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
    case 'core::starknet::eth_address::EthAddress':
      return 'address'
    case 'core::felt252':
      return 'uint256'
    default:
      return getTypesfromStruct(sntype)
  }
}

export function getSnSlotCount(sntype: string): number {
  switch (sntype) {
    case 'bool':
      return 1
    case 'core::integer::u8':
      return 1
    case 'core::integer::u16':
      return 1
    case 'core::integer::u32':
      return 1
    case 'core::integer::usize':
      return 1
    case 'core::integer::u64':
      return 1
    case 'core::integer::u128':
      return 1
    case 'core::integer::u256':
      return 2 // TODO: !! u256 by default 2 u128 so should fix it with custom struct support. !!
    case 'core::starknet::contract_address::ContractAddress':
      return 1
    case 'core::starknet::eth_address::EthAddress':
      return 1
    case 'core::felt252':
      return 1
    // TODO: support custom types
    default:
      return 1 // TODO: returns 1 as default
  }
}

// Returns relevant sn data type bits
export function getSnValueEthBitsize(type: string): number {
  // TODO: update new types
  switch (type) {
    case 'bool':
      return 1
    case 'core::integer::u8':
      return 8
    case 'core::integer::u16':
      return 16
    case 'core::integer::u32':
      return 32
    case 'core::integer::usize':
      return 256
    case 'core::integer::u64':
      return 64
    case 'core::integer::u128':
      return 128
    case 'core::integer::u256':
      return 256
    case 'core::starknet::contract_address::ContractAddress':
      return 160
    case 'core::felt252':
      return 256
    default:
      return 256
  }
}

function getTypesfromStruct(sntype: string): string | Array<string> {
  // TODO: support custom structs, tuples, arrays
  return sntype
}

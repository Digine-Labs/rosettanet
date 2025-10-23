import { Abi } from 'starknet'
import { ConvertableType } from '../../types/types'


// TODO: Sizeları starknet sizelarına göre updatele. mesela contract addres 252 gibi ve class hash. Onlar solidityde uint256 olarak girilecek ama size limit belli.
const starknetElementaryTypes: Array<Array<string | ConvertableType>> = [
  [
    'core::felt252',
    {
      size: 252,
      isDynamicSize: false,
      solidityType: 'uint256',
      isTuple: false,
    },
  ],
  [
    'core::integer::u8',
    { size: 8, isDynamicSize: false, solidityType: 'uint8', isTuple: false },
  ],
  [
    'core::integer::u16',
    { size: 16, isDynamicSize: false, solidityType: 'uint16', isTuple: false },
  ],
  [
    'core::integer::u32',
    { size: 32, isDynamicSize: false, solidityType: 'uint32', isTuple: false },
  ],
  [
    'core::integer::u64',
    { size: 64, isDynamicSize: false, solidityType: 'uint64', isTuple: false },
  ],
  [
    'core::integer::u128',
    {
      size: 128,
      isDynamicSize: false,
      solidityType: 'uint128',
      isTuple: false,
    },
  ],
  [
    'core::integer::u256',
    {
      size: 256,
      isDynamicSize: false,
      solidityType: 'uint256',
      isTuple: false,
    },
  ],
  [
    'core::integer::usize',
    {
      size: 256,
      isDynamicSize: false,
      solidityType: 'uint256',
      isTuple: false,
    },
  ],
  [
    'core::starknet::contract_address::ContractAddress',
    {
      size: 256,
      isDynamicSize: false,
      solidityType: 'address',
      isTuple: false,
    }, // TODO: Formatter or size diff???
  ],
  [
    'core::starknet::eth_address::EthAddress',
    {
      size: 160,
      isDynamicSize: false,
      solidityType: 'address',
      isTuple: false,
      formatter: formatContractAddress,
    },
  ], //TODO: formatter ekle
  [
    'core::starknet::class_hash::ClassHash',
    {
      size: 256,
      isDynamicSize: false,
      solidityType: 'uint256',
      isTuple: false,
    },
  ],
  [
    'core::bool',
    { size: 1, isDynamicSize: false, solidityType: 'bool', isTuple: false },
  ],
  [
    'core::bytes_31::bytes31',
    {
      size: 252,
      isDynamicSize: false,
      solidityType: 'bytes31',
      isTuple: false,
    },
  ],
  [
    'core::integer::i8',
    { size: 8, isDynamicSize: false, solidityType: 'int8', isTuple: false },
  ],
  [
    'core::integer::i16',
    { size: 16, isDynamicSize: false, solidityType: 'int16', isTuple: false },
  ],
  [
    'core::integer::i32',
    { size: 32, isDynamicSize: false, solidityType: 'int32', isTuple: false },
  ],
  [
    'core::integer::i64',
    { size: 64, isDynamicSize: false, solidityType: 'int64', isTuple: false },
  ],
  [
    'core::integer::i128',
    { size: 128, isDynamicSize: false, solidityType: 'int128', isTuple: false },
  ],
  [
    'core::integer::i256',
    { size: 256, isDynamicSize: false, solidityType: 'int256', isTuple: false },
  ],
  // Arrays
  [
    'core::array::Array::<core::integer::u8>',
    { size: 8, isDynamicSize: true, solidityType: 'uint8[]', isTuple: false },
  ],
  [
    'core::array::Array::<core::integer::u16>',
    { size: 16, isDynamicSize: true, solidityType: 'uint16[]', isTuple: false },
  ],
  [
    'core::array::Array::<core::integer::u32>',
    { size: 32, isDynamicSize: true, solidityType: 'uint32[]', isTuple: false },
  ],
  [
    'core::array::Array::<core::integer::u64>',
    { size: 64, isDynamicSize: true, solidityType: 'uint64[]', isTuple: false },
  ],
  [
    'core::array::Array::<core::integer::u128>',
    {
      size: 128,
      isDynamicSize: true,
      solidityType: 'uint128[]',
      isTuple: false,
    },
  ],
  [
    'core::array::Array::<core::integer::u256>',
    {
      size: 256,
      isDynamicSize: true,
      solidityType: 'uint256[]',
      isTuple: false,
    },
  ],
  [
    'core::array::Array::<core::integer::i8>',
    { size: 8, isDynamicSize: true, solidityType: 'int8[]', isTuple: false },
  ],
  [
    'core::array::Array::<core::integer::i16>',
    { size: 16, isDynamicSize: true, solidityType: 'int16[]', isTuple: false },
  ],
  [
    'core::array::Array::<core::integer::i32>',
    { size: 32, isDynamicSize: true, solidityType: 'int32[]', isTuple: false },
  ],
  [
    'core::array::Array::<core::integer::i64>',
    { size: 64, isDynamicSize: true, solidityType: 'int64[]', isTuple: false },
  ],
  [
    'core::array::Array::<core::integer::i128>',
    {
      size: 128,
      isDynamicSize: true,
      solidityType: 'int128[]',
      isTuple: false,
    },
  ],
  [
    'core::array::Array::<core::integer::i256>',
    {
      size: 256,
      isDynamicSize: true,
      solidityType: 'int256[]',
      isTuple: false,
    },
  ],
  [
    'core::array::Array::<core::felt252>',
    {
      size: 252,
      isDynamicSize: true,
      solidityType: 'uint256[]',
      isTuple: false,
    },
  ],
  [
    'core::array::Array::<core::starknet::contract_address::ContractAddress>',
    {
      size: 256,
      isDynamicSize: true,
      solidityType: 'uint256[]',
      isTuple: false,
    },
  ], // TODO: add formatter
  [
    'core::array::Array::<core::starknet::eth_address::EthAddress>',
    {
      size: 160,
      isDynamicSize: true,
      solidityType: 'address[]',
      isTuple: false,
    },
  ],
  [
    'core::array::Array::<core::starknet::class_hash::ClassHash>',
    {
      size: 256,
      isDynamicSize: true,
      solidityType: 'uint256[]',
      isTuple: false,
    },
  ],
  [
    'core::array::Array::<core::bool>',
    { size: 1, isDynamicSize: true, solidityType: 'bool[]', isTuple: false },
  ],
  [
    'core::array::Array::<core::bytes_31::bytes31>',
    {
      size: 252,
      isDynamicSize: true,
      solidityType: 'bytes31[]',
      isTuple: false,
    },
  ],
  // Options
  [
    'core::option::Option::<core::integer::u8>',
    { size: 8, isDynamicSize: true, solidityType: 'uint8[]', isTuple: false },
  ],
  [
    'core::option::Option::<core::integer::u16>',
    { size: 16, isDynamicSize: true, solidityType: 'uint16[]', isTuple: false },
  ],
  [
    'core::option::Option::<core::integer::u32>',
    { size: 32, isDynamicSize: true, solidityType: 'uint32[]', isTuple: false },
  ],
  [
    'core::option::Option::<core::integer::u64>',
    { size: 64, isDynamicSize: true, solidityType: 'uint64[]', isTuple: false },
  ],
  [
    'core::option::Option::<core::integer::u128>',
    {
      size: 128,
      isDynamicSize: true,
      solidityType: 'uint128[]',
      isTuple: false,
    },
  ],
  [
    'core::option::Option::<core::integer::u256>',
    {
      size: 256,
      isDynamicSize: true,
      solidityType: 'uint256[]',
      isTuple: false,
    },
  ],
  [
    'core::option::Option::<core::integer::i8>',
    { size: 8, isDynamicSize: true, solidityType: 'int8[]', isTuple: false },
  ],
  [
    'core::option::Option::<core::integer::i16>',
    { size: 16, isDynamicSize: true, solidityType: 'int16[]', isTuple: false },
  ],
  [
    'core::option::Option::<core::integer::i32>',
    { size: 32, isDynamicSize: true, solidityType: 'int32[]', isTuple: false },
  ],
  [
    'core::option::Option::<core::integer::i64>',
    { size: 64, isDynamicSize: true, solidityType: 'int64[]', isTuple: false },
  ],
  [
    'core::option::Option::<core::integer::i128>',
    {
      size: 128,
      isDynamicSize: true,
      solidityType: 'int128[]',
      isTuple: false,
    },
  ],
  [
    'core::option::Option::<core::integer::i256>',
    {
      size: 256,
      isDynamicSize: true,
      solidityType: 'int256[]',
      isTuple: false,
    },
  ],
  [
    'core::option::Option::<core::felt252>',
    {
      size: 252,
      isDynamicSize: true,
      solidityType: 'uint256[]',
      isTuple: false,
    },
  ],
  [
    'core::option::Option::<core::starknet::contract_address::ContractAddress>',
    {
      size: 256,
      isDynamicSize: true,
      solidityType: 'uint256[]',
      isTuple: false,
    },
  ], // TODO: add formatter
  [
    'core::option::Option::<core::starknet::eth_address::EthAddress>',
    {
      size: 160,
      isDynamicSize: true,
      solidityType: 'address[]',
      isTuple: false,
    },
  ],
  [
    'core::option::Option::<core::starknet::class_hash::ClassHash>',
    {
      size: 256,
      isDynamicSize: true,
      solidityType: 'uint256[]',
      isTuple: false,
    },
  ],
  [
    'core::option::Option::<core::bool>',
    { size: 1, isDynamicSize: true, solidityType: 'bool[]', isTuple: false },
  ],
  [
    'core::option::Option::<core::bytes_31::bytes31>',
    {
      size: 252,
      isDynamicSize: true,
      solidityType: 'bytes31[]',
      isTuple: false,
    },
  ],
  // Spans
  [
    'core::array::Span::<core::integer::u8>',
    { size: 8, isDynamicSize: true, solidityType: 'uint8[]', isTuple: false },
  ],
  [
    'core::array::Span::<core::integer::u16>',
    { size: 16, isDynamicSize: true, solidityType: 'uint16[]', isTuple: false },
  ],
  [
    'core::array::Span::<core::integer::u32>',
    { size: 32, isDynamicSize: true, solidityType: 'uint32[]', isTuple: false },
  ],
  [
    'core::array::Span::<core::integer::u64>',
    { size: 64, isDynamicSize: true, solidityType: 'uint64[]', isTuple: false },
  ],
  [
    'core::array::Span::<core::integer::u128>',
    {
      size: 128,
      isDynamicSize: true,
      solidityType: 'uint128[]',
      isTuple: false,
    },
  ],
  [
    'core::array::Span::<core::integer::u256>',
    {
      size: 256,
      isDynamicSize: true,
      solidityType: 'uint256[]',
      isTuple: false,
    },
  ],
  [
    'core::array::Span::<core::integer::i8>',
    { size: 8, isDynamicSize: true, solidityType: 'int8[]', isTuple: false },
  ],
  [
    'core::array::Span::<core::integer::i16>',
    { size: 16, isDynamicSize: true, solidityType: 'int16[]', isTuple: false },
  ],
  [
    'core::array::Span::<core::integer::i32>',
    { size: 32, isDynamicSize: true, solidityType: 'int32[]', isTuple: false },
  ],
  [
    'core::array::Span::<core::integer::i64>',
    { size: 64, isDynamicSize: true, solidityType: 'int64[]', isTuple: false },
  ],
  [
    'core::array::Span::<core::integer::i128>',
    {
      size: 128,
      isDynamicSize: true,
      solidityType: 'int128[]',
      isTuple: false,
    },
  ],
  [
    'core::array::Span::<core::integer::i256>',
    {
      size: 256,
      isDynamicSize: true,
      solidityType: 'int256[]',
      isTuple: false,
    },
  ],
  [
    'core::array::Span::<core::felt252>',
    {
      size: 252,
      isDynamicSize: true,
      solidityType: 'uint256[]',
      isTuple: false,
    },
  ],
  [
    'core::array::Span::<core::starknet::contract_address::ContractAddress>',
    {
      size: 256,
      isDynamicSize: true,
      solidityType: 'uint256[]',
      isTuple: false,
    },
  ], // TODO: add formatter
  [
    'core::array::Span::<core::starknet::eth_address::EthAddress>',
    {
      size: 160,
      isDynamicSize: true,
      solidityType: 'address[]',
      isTuple: false,
    },
  ],
  [
    'core::array::Span::<core::starknet::class_hash::ClassHash>',
    {
      size: 256,
      isDynamicSize: true,
      solidityType: 'uint256[]',
      isTuple: false,
    },
  ],
  [
    'core::array::Span::<core::bool>',
    { size: 1, isDynamicSize: true, solidityType: 'bool[]', isTuple: false },
  ],
  [
    'core::array::Span::<core::bytes_31::bytes31>',
    {
      size: 252,
      isDynamicSize: true,
      solidityType: 'bytes31[]',
      isTuple: false,
    },
  ],
]

function initializeStarknetConvertableTypes(): Map<string, ConvertableType> {
  const mapping: Map<string, ConvertableType> = new Map<
    string,
    ConvertableType
  >()
  for (const val of starknetElementaryTypes) {
    if (typeof val[0] === 'string' && typeof val[1] !== 'string') {
      mapping.set(val[0], val[1])
    }
  }

  return mapping
}

function updateMapWithMultipleValues(
  currentMap: Map<string, ConvertableType>,
  values: Array<Array<string | ConvertableType>>,
): Map<string, ConvertableType> {
  for (const val of values) {
    if (typeof val[0] === 'string' && typeof val[1] !== 'string') {
      if (currentMap.has(val[0])) {
        continue
      }
      currentMap.set(val[0], val[1])
    }
  }

  return currentMap
}

// Custom structları mappinge eklerken array hallerinide ekle

export function initializeStarknetAbi(
  classAbi: Abi,
): Map<string, ConvertableType> {
  const initialMap = initializeStarknetConvertableTypes()

  if (classAbi.length == 0) {
    return initialMap
  }

  // List of all custom structs
  const customStructs = classAbi.filter(x => x.type === 'struct')

  // Retry until all structs added
  // Burdaki elemanları tek tek eklememiz lazım.
  let mapping = initialMap

  // eslint-disable-next-line prefer-const
  let { updatedMap, failedStructs } = updateMap(mapping, customStructs)
  mapping = updatedMap

  for (let i = 0; i < 4; i++) {
    // Tries 4 times to not overload node
    if (failedStructs.length == 0) {
      break
    }
    const values = updateMap(mapping, failedStructs)
    mapping = values.updatedMap
    failedStructs = values.failedStructs
  }

  // TODO: return updated map and complete tests
  return updatedMap
}

export async function formatContractAddress(): Promise<string> {
  return ''
}

// Bu fonksiyonu maple birlikte çağır, güncellenmiş mapi ve eklenemeyen typeları döndürmeli
function updateMap(
  currentMap: Map<string, ConvertableType>,
  structs: Array<{
    name: string
    members: Array<{ name: string; type: string }>
  }>,
): {
  updatedMap: Map<string, ConvertableType>
  failedStructs: Array<{
    name: string
    members: Array<{ name: string; type: string }>
  }>
} {
  const failedStructs: Array<{
    name: string
    members: Array<{ name: string; type: string }>
  }> = []
  let mapping = currentMap
  for (const struct of structs) {
    try {
      const structConvertableTypes = getStructConvertableTypes(
        mapping,
        struct.name,
        struct.members,
      )
      mapping = updateMapWithMultipleValues(mapping, structConvertableTypes)
    } catch (ex) {
      if (ex === 'typesnotfound') {
        failedStructs.push(struct)
        continue
      }
    }
  }

  return { updatedMap: mapping, failedStructs }
}

function getStructConvertableTypes(
  map: Map<string, ConvertableType>,
  name: string,
  members: Array<{ name: string; type: string }>,
): Array<Array<string | ConvertableType>> {
  // TODO: remove @ char once

  // All members has to be in list already.
  for (const mem of members) {
    const typeName = mem.type.replace('@', '')
    if (!map.has(typeName)) {
      throw 'typesnotfound'
    }
  }

  const membersSolidityTypes = members.map(
    x => map.get(x.type.replace('@', ''))?.solidityType,
  )
  if (typeof membersSolidityTypes === 'undefined') {
    throw 'typesnotfound'
  }

  const tupledType = `(${membersSolidityTypes.join(',')})`
  let tupleSize = 0
  const tupleSizes = []

  for (const mem of members) {
    const typeName = mem.type.replace('@', '')
    const val = map.get(typeName)
    if (typeof val === 'undefined') {
      throw 'typesnotfound'
    }
    tupleSize += val?.size
    tupleSizes.push(val?.size)
  }

  const basic = [
    name,
    {
      size: tupleSize,
      isDynamicSize: false,
      solidityType: tupledType,
      isTuple: true,
      tupleSizes: tupleSizes,
    },
  ]

  const array = [
    `core::array::Array::<${name}>`,
    {
      size: tupleSize,
      isDynamicSize: true,
      solidityType: `${tupledType}[]`,
      isTuple: true,
      tupleSizes: tupleSizes,
    },
  ]

  const option = [
    `core::option::Option::<${name}>`,
    {
      size: tupleSize,
      isDynamicSize: true,
      solidityType: `${tupledType}[]`,
      isTuple: true,
      tupleSizes: tupleSizes,
    },
  ]

  const span = [
    `core::array::Span::<${name}>`,
    {
      size: tupleSize,
      isDynamicSize: true,
      solidityType: `${tupledType}[]`,
      isTuple: true,
      tupleSizes: tupleSizes,
    },
  ]

  return [basic, array, option, span]
}
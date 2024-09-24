import { getSolidityTypesFromStarknetABI } from "../../../src/utils/converters/abiFormatter"
const abi = [
  {
    "type": "impl",
    "name": "ExampleImpl",
    "interface_name": "cairoabi::IExample"
  },
  {
    "type": "struct",
    "name": "core::starknet::eth_address::EthAddress",
    "members": [{ "name": "address", "type": "core::felt252" }]
  },
  {
    "type": "struct",
    "name": "core::integer::u512",
    "members": [
      { "name": "limb0", "type": "core::integer::u128" },
      { "name": "limb1", "type": "core::integer::u128" },
      { "name": "limb2", "type": "core::integer::u128" },
      { "name": "limb3", "type": "core::integer::u128" }
    ]
  },
  {
    "type": "struct",
    "name": "core::integer::u256",
    "members": [
      { "name": "low", "type": "core::integer::u128" },
      { "name": "high", "type": "core::integer::u128" }
    ]
  },
  {
    "type": "struct",
    "name": "cairoabi::exampleStruct1",
    "members": [
      { "name": "firstVal", "type": "core::integer::u256" },
      {
        "name": "secondVal",
        "type": "core::starknet::eth_address::EthAddress"
      }
    ]
  },
  {
    "type": "enum",
    "name": "core::bool",
    "variants": [
      { "name": "False", "type": "()" },
      { "name": "True", "type": "()" }
    ]
  },
  {
    "type": "enum",
    "name": "core::option::Option::<core::integer::u32>",
    "variants": [
      { "name": "Some", "type": "core::integer::u32" },
      { "name": "None", "type": "()" }
    ]
  },
  {
    "type": "struct",
    "name": "core::array::Span::<core::integer::u32>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<core::integer::u32>"
      }
    ]
  },
  {
    "type": "struct",
    "name": "cairoabi::exampleStruct2",
    "members": [
      { "name": "firstVal", "type": "core::integer::u64" },
      { "name": "secondVal", "type": "core::integer::u128" },
      { "name": "thirdVal", "type": "core::integer::u256" },
      { "name": "fourthVal", "type": "core::felt252" },
      { "name": "fifthVal", "type": "core::bytes_31::bytes31" },
      { "name": "booleanVal", "type": "core::bool" },
      {
        "name": "firstArr",
        "type": "core::array::Array::<core::integer::u128>"
      },
      {
        "name": "secondArr",
        "type": "core::array::Array::<core::integer::u256>"
      },
      {
        "name": "thirdArr",
        "type": "core::array::Array::<core::bytes_31::bytes31>"
      },
      {
        "name": "firstOpt",
        "type": "core::option::Option::<core::integer::u32>"
      },
      {
        "name": "firstSpan",
        "type": "core::array::Span::<core::integer::u32>"
      },
      {
        "name": "arrOfTuple",
        "type": "core::array::Array::<(core::integer::u256, core::integer::u256)>"
      },
      {
        "name": "arrOfArr",
        "type": "core::array::Array::<core::array::Array::<core::integer::u256>>"
      }
    ]
  },
  {
    "type": "enum",
    "name": "core::option::Option::<core::integer::u256>",
    "variants": [
      { "name": "Some", "type": "core::integer::u256" },
      { "name": "None", "type": "()" }
    ]
  },
  {
    "type": "struct",
    "name": "core::array::Span::<core::integer::u256>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<core::integer::u256>"
      }
    ]
  },
  {
    "type": "struct",
    "name": "cairoabi::exampleStruct3",
    "members": [
      {
        "name": "str",
        "type": "core::array::Array::<cairoabi::exampleStruct2>"
      },
      { "name": "firstVal", "type": "core::integer::u64" },
      { "name": "secondVal", "type": "core::integer::u128" },
      { "name": "thirdVal", "type": "core::integer::u256" },
      { "name": "fourthVal", "type": "core::felt252" },
      { "name": "fifthVal", "type": "core::bytes_31::bytes31" },
      { "name": "booleanVal", "type": "core::bool" },
      {
        "name": "firstArr",
        "type": "core::array::Array::<core::integer::u128>"
      },
      {
        "name": "secondArr",
        "type": "core::array::Array::<core::integer::u256>"
      },
      {
        "name": "thirdArr",
        "type": "core::array::Array::<core::bytes_31::bytes31>"
      },
      {
        "name": "firstOpt",
        "type": "core::option::Option::<core::integer::u256>"
      },
      {
        "name": "firstSpan",
        "type": "core::array::Span::<core::integer::u256>"
      },
      {
        "name": "arrOfTuple",
        "type": "core::array::Array::<(core::integer::u256, core::integer::u256)>"
      },
      {
        "name": "arrOfArr",
        "type": "core::array::Array::<core::array::Array::<core::integer::u256>>"
      }
    ]
  },
  {
    "type": "enum",
    "name": "core::option::Option::<core::integer::u128>",
    "variants": [
      { "name": "Some", "type": "core::integer::u128" },
      { "name": "None", "type": "()" }
    ]
  },
  {
    "type": "struct",
    "name": "core::array::Span::<core::integer::u128>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<core::integer::u128>"
      }
    ]
  },
  {
    "type": "struct",
    "name": "cairoabi::exampleStruct4",
    "members": [
      {
        "name": "str",
        "type": "core::array::Array::<cairoabi::exampleStruct3>"
      },
      { "name": "str2", "type": "cairoabi::exampleStruct3" },
      { "name": "firstVal", "type": "core::integer::u64" },
      { "name": "secondVal", "type": "core::integer::u128" },
      { "name": "thirdVal", "type": "core::integer::u256" },
      { "name": "fourthVal", "type": "core::felt252" },
      { "name": "fifthVal", "type": "core::bytes_31::bytes31" },
      { "name": "booleanVal", "type": "core::bool" },
      {
        "name": "firstArr",
        "type": "core::array::Array::<core::integer::u128>"
      },
      {
        "name": "secondArr",
        "type": "core::array::Array::<core::integer::u256>"
      },
      {
        "name": "thirdArr",
        "type": "core::array::Array::<core::bytes_31::bytes31>"
      },
      {
        "name": "firstOpt",
        "type": "core::option::Option::<core::integer::u128>"
      },
      {
        "name": "firstSpan",
        "type": "core::array::Span::<core::integer::u128>"
      },
      {
        "name": "arrOfTuple",
        "type": "core::array::Array::<(core::integer::u256, core::integer::u256)>"
      },
      {
        "name": "arrOfArr",
        "type": "core::array::Array::<core::array::Array::<core::integer::u256>>"
      }
    ]
  },
  {
    "type": "struct",
    "name": "alexandria_math::i257::i257",
    "members": [
      { "name": "abs", "type": "core::integer::u256" },
      { "name": "is_negative", "type": "core::bool" }
    ]
  },
  {
    "type": "interface",
    "name": "cairoabi::IExample",
    "items": [
      {
        "type": "function",
        "name": "twoFelts",
        "inputs": [
          { "name": "a", "type": "core::felt252" },
          { "name": "b", "type": "core::felt252" }
        ],
        "outputs": [{ "type": "(core::felt252, core::felt252)" }],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "addresses",
        "inputs": [
          {
            "name": "cAddress",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "eAddress",
            "type": "core::starknet::eth_address::EthAddress"
          }
        ],
        "outputs": [
          {
            "type": "(core::starknet::contract_address::ContractAddress, core::starknet::eth_address::EthAddress)"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "useUsize",
        "inputs": [{ "name": "usize", "type": "core::integer::u32" }],
        "outputs": [{ "type": "core::integer::u32" }],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "useStorageAddress",
        "inputs": [
          {
            "name": "storageAddress",
            "type": "core::starknet::storage_access::StorageAddress"
          }
        ],
        "outputs": [
          { "type": "core::starknet::storage_access::StorageAddress" }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "useU512",
        "inputs": [{ "name": "u512", "type": "core::integer::u512" }],
        "outputs": [{ "type": "core::integer::u512" }],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "classHash",
        "inputs": [
          { "name": "cHash", "type": "core::starknet::class_hash::ClassHash" }
        ],
        "outputs": [{ "type": "core::starknet::class_hash::ClassHash" }],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "useExampleStruct1",
        "inputs": [{ "name": "str", "type": "cairoabi::exampleStruct1" }],
        "outputs": [{ "type": "cairoabi::exampleStruct1" }],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "useExampleStruct2",
        "inputs": [{ "name": "strTwo", "type": "cairoabi::exampleStruct2" }],
        "outputs": [{ "type": "cairoabi::exampleStruct2" }],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "useExampleStruct3",
        "inputs": [
          { "name": "strTwo", "type": "cairoabi::exampleStruct2" },
          { "name": "strThree", "type": "cairoabi::exampleStruct3" }
        ],
        "outputs": [
          { "type": "(cairoabi::exampleStruct2, cairoabi::exampleStruct3)" }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "useExampleStruct4",
        "inputs": [{ "name": "strFour", "type": "cairoabi::exampleStruct4" }],
        "outputs": [{ "type": "cairoabi::exampleStruct4" }],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "useAlexandriai257",
        "inputs": [{ "name": "alex", "type": "alexandria_math::i257::i257" }],
        "outputs": [{ "type": "alexandria_math::i257::i257" }],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "useBytes31",
        "inputs": [{ "name": "byte31", "type": "core::bytes_31::bytes31" }],
        "outputs": [{ "type": "core::bytes_31::bytes31" }],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "useSignedIntegeri8",
        "inputs": [
          { "name": "signedIntegeri8", "type": "core::integer::i8" }
        ],
        "outputs": [{ "type": "core::integer::i8" }],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "useSignedIntegeri16",
        "inputs": [
          { "name": "signedIntegeri16", "type": "core::integer::i16" }
        ],
        "outputs": [{ "type": "core::integer::i16" }],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "useSignedIntegeri32",
        "inputs": [
          { "name": "signedIntegeri32", "type": "core::integer::i32" }
        ],
        "outputs": [{ "type": "core::integer::i32" }],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "useSignedIntegeri64",
        "inputs": [
          { "name": "signedIntegeri64", "type": "core::integer::i64" }
        ],
        "outputs": [{ "type": "core::integer::i64" }],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "useSignedIntegeri128",
        "inputs": [
          { "name": "signedIntegeri128", "type": "core::integer::i128" }
        ],
        "outputs": [{ "type": "core::integer::i128" }],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "arrayOfArray",
        "inputs": [
          {
            "name": "arr",
            "type": "core::array::Array::<core::array::Array::<core::integer::u256>>"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Array::<core::array::Array::<core::integer::u256>>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "arrayOfTuple",
        "inputs": [
          {
            "name": "arrTuple",
            "type": "core::array::Array::<(core::felt252, core::felt252)>"
          }
        ],
        "outputs": [
          { "type": "core::array::Array::<(core::felt252, core::felt252)>" }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "event",
    "name": "cairoabi::Example::Event",
    "kind": "enum",
    "variants": []
  }
]

describe('Signature generations', () => {
  it('Returns empty array if abi empty', () => {
    // todo
  })
  it('Function signature generates with simple types', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const signature = getSolidityTypesFromStarknetABI(abi)
  })
})

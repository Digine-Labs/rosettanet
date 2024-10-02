/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Abi } from 'starknet'
import { StarknetTypeMember } from '../../types/types'

interface SolidityType {
  type: string
  value: string | Array<string>
  formatted?: string
}

// Enums are uint8 in solidity.
// https://ethereum.stackexchange.com/questions/137436/what-is-a-functions-function-signature-if-it-uses-a-custom-type-stuct-enum

const elementaryTypes = [
  ['core::felt252', { type: 'basic', value: 'uint256' }],
  ['core::integer::u8', { type: 'basic', value: 'uint8' }],
  ['core::integer::u16', { type: 'basic', value: 'uint16' }],
  ['core::integer::u32', { type: 'basic', value: 'uint32' }],
  ['core::integer::u64', { type: 'basic', value: 'uint64' }],
  ['core::integer::u128', { type: 'basic', value: 'uint128' }],
  ['core::integer::u256', { type: 'basic', value: 'uint256' }],
  ['core::integer::usize', { type: 'basic', value: 'uint256' }],
  [
    'core::starknet::contract_address::ContractAddress',
    { type: 'basic', value: 'uint256' },
  ], //TODO: address or u256?
  [
    'core::starknet::eth_address::EthAddress',
    { type: 'basic', value: 'address' },
  ],
  [
    'core::starknet::class_hash::ClassHash',
    { type: 'basic', value: 'uint256' },
  ],
  ['bool', { type: 'basic', value: 'bool' }],
] // These types can be directly renamed to generate ethereum signature

// Inputs starknet abi string returning from getContractClass call
export function generateEthereumFunctionSignatures(
  classABI: Abi,
): Array<string> {
  // early return if abi is empty
  if (classABI.length == 0) {
    return []
  }

  // First make a list of all structs with mapping

  // convertableTypesı kullanarak yeni mapping oluştur. Sonrasında bu mappingi, abi ın içinde bulunan custom structlar ile güncelle

  const typeConversions: Map<string, SolidityType> =
    initializeConvertableTypes()

  importCustomStructs(classABI)
  return []
}

function initializeConvertableTypes(): Map<string, SolidityType> {
  const mapping: Map<string, SolidityType> = new Map<string, SolidityType>()

  for (const val of elementaryTypes) {
    if (typeof val[0] === 'string' && typeof val[1] !== 'string') {
      mapping.set(val[0], val[1])
    }
  }

  return mapping
}

function generateTupleFormat(
  input: SolidityType,
  typeMapping: Map<string, SolidityType>,
): string {
  if (input.type !== 'struct') {
    return ''
  }
  let tupleFormat = '('
  let index = 0
  for (const curr of input.value) {
    if (!typeMapping.has(curr)) {
      // TODO: error handling, type not found
      // Eğer type yoksa hata ver, içerisindeki struct daha yüklenmemiş demek
      index++
      continue
    }
    const solidityEquivalent = typeMapping.get(curr)
    if (index == input.value.length - 1) {
      tupleFormat = `${tupleFormat})`
    } else {
      tupleFormat = `${tupleFormat}${solidityEquivalent},`
    }
  }

  return tupleFormat
}

// Returns true if type is something like array, span or option
function isInheritsType(type: string): boolean {
  if (type.indexOf('<') > -1 || type.indexOf('>') > -1) {
    return true
  }
  return false
}

function importCustomStructs(classABI: Abi): Array<any> {
  if (classABI.length == 0) {
    return [[]]
  }

  const customStructs = classABI.filter(x => x.type === 'struct')
  const structs = []
  for (const elem of customStructs) {
    const structArray = [elem.name]

    if (elem.members.length == 0) {
      continue
    }

    const structMembers = (elem.members as Array<StarknetTypeMember>).map(
      x => x.type,
    )
    structArray.push({ type: 'struct', value: structMembers })

    structs.push(structArray)
    // Burda custom structların memberleri array şeklinde var. Bunları tuple çevireceğiz ama önce ethereum haline mi çevirsek??
  }

  // console.log(structs) // Array of array, her array içinde 2 eleman bulunan başka array var. ilk eleman type tipi, diğeri typein içindeki elemanlar.
  return [[]]
}

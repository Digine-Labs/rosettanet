import { Abi } from 'starknet'
import { StarknetTypeMember } from '../../types/types'

interface SolidityType {
    type: string, // basic are directly name changed, conversion needs to call formatter for actual value
    value: string | Array<string>,
    formatter?: (value: string | Array<string>) => string // param: starknet value returns solidity value
}

const starknetElementaryTypes: Array<Array<string | SolidityType>> = [
    ['core::felt252', {type: 'basic', value: 'uint256'}],
    ['core::integer::u8', {type: 'basic', value: 'uint8'}],
    ['core::integer::u16', {type: 'basic', value: 'uint16'}],
    ['core::integer::u32', {type: 'basic', value: 'uint32'}],
    ['core::integer::u64', {type: 'basic', value: 'uint64'}],
    ['core::integer::u128', {type: 'basic', value: 'uint128'}],
    ['core::integer::u256', {type: 'basic', value: 'uint256'}],
    ['core::integer::usize', {type: 'basic', value: 'uint256'}],
    ['core::starknet::contract_address::ContractAddress', {type: 'conversion', value: 'uint256'}], //TODO: formatter ekle
    ['core::starknet::eth_address::EthAddress', {type: 'basic', value: 'address'}],
    ['core::starknet::class_hash::ClassHash', {type: 'basic', value: 'uint256'}],
    ['bool', {type: 'basic', value: 'bool'}],
]

function initializeStarknetConvertableTypes(): Map<string, SolidityType> {
    const mapping: Map<string, SolidityType> = new Map<string, SolidityType>()
  
    for (const val of starknetElementaryTypes) {
      if(typeof val[0] === 'string' && typeof val[1] !== 'string') {
        mapping.set(val[0], val[1])
      }
    }
  
    return mapping
}

// Returns all possible type conversions from starknet abi to solidity types
// In case abi has no structs, returns elementary types mapping
export function getSolidityTypesFromStarknetABI(classABI: Abi): Map<string, SolidityType> {
    const initialMap = initializeStarknetConvertableTypes();

    if (classABI.length == 0) {
        return initialMap
    }

    const customStructs = readCustomStructs(classABI)


    return initialMap // fix
} 

// Returns what custom structs includes
function readCustomStructs(classABI: Abi) {
    if (classABI.length == 0) {
        return [[]]
    }

    const customStructs = classABI.filter(x => x.type === 'struct')
    const structs = []
    for(const elem of customStructs) {
        const structArray = [elem.name]
        if(isArrayLike(elem.name)) {
            // TODO: support arrays
            continue;
        }

        const structMembers = (elem.members as Array<StarknetTypeMember>).map(
            x => x.type,
        )
        structArray.push({type: 'struct', value: structMembers})
    
        structs.push(structArray)
    }

    // Mevcut mappingi al ve custom structlari elementarylerle matchle
    const formattedCustomStructs = []

    const elementaries = initializeStarknetConvertableTypes();
    if(structs.length == 0) {
        return [[]]
    }

    for(const struct of structs) {
        const nonElementaryTypes = (struct[1].value as Array<string>).filter(val => !elementaries.has(val))
        if(nonElementaryTypes.length > 0) {
            console.log(`Type ${struct[0]} contains non elem type`)
            continue
        }

        console.log(struct)
    }
}

function isArrayLike(type: string): boolean {
    if (type.indexOf('<') > -1 || type.indexOf('>') > -1) {
        return true
      }
    return false
}
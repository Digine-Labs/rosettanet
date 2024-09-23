import { Abi } from 'starknet'
import { StarknetTypeMember } from '../../types/types'

interface SolidityType {
    type: string, // basic are directly name changed, conversion needs to call formatter for actual value
    value: string | SolidityType | Array<string | SolidityType>,
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
    ['core::bool', {type: 'basic', value: 'bool'}],
    ['core::bytes_31::bytes31', {type: 'basic', value: 'bytes31'}],
    ['core::integer::i8', {type: 'basic', value: 'int8'}],
    ['core::integer::i16', {type: 'basic', value: 'int16'}],
    ['core::integer::i32', {type: 'basic', value: 'int32'}],
    ['core::integer::i64', {type: 'basic', value: 'int64'}],
    ['core::integer::i128', {type: 'basic', value: 'int128'}],
    ['core::integer::i256', {type: 'basic', value: 'int256'}],
    // Arrays
    ['core::array::Array::<core::integer::u8>', {type: 'array', value: '[]uint8'}],
    ['core::array::Array::<core::integer::u16>', {type: 'array', value: '[]uint16'}],
    ['core::array::Array::<core::integer::u32>', {type: 'array', value: '[]uint32'}],
    ['core::array::Array::<core::integer::u64>', {type: 'array', value: '[]uint64'}],
    ['core::array::Array::<core::integer::u128>', {type: 'array', value: '[]uint128'}],
    ['core::array::Array::<core::integer::u256>', {type: 'array', value: '[]uint256'}],
    ['core::array::Array::<core::integer::i8>', {type: 'array', value: '[]int8'}],
    ['core::array::Array::<core::integer::i16>', {type: 'array', value: '[]int16'}],
    ['core::array::Array::<core::integer::i32>', {type: 'array', value: '[]int32'}],
    ['core::array::Array::<core::integer::i64>', {type: 'array', value: '[]int64'}],
    ['core::array::Array::<core::integer::i128>', {type: 'array', value: '[]int128'}],
    ['core::array::Array::<core::integer::i256>', {type: 'array', value: '[]int256'}],
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

    const structsIncludedMapping = readCustomStructs(classABI)


    return structsIncludedMapping
} 

// Returns what custom structs includes
function readCustomStructs(classABI: Abi): Map<string, SolidityType> {
    const elementaries = initializeStarknetConvertableTypes();
    if (classABI.length == 0) {
        return elementaries
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
    
    if(structs.length == 0) {
        return elementaries
    }

    while(structs.length != 0) {
        for(let i = 0; i < structs.length; i++) {
            const currentStruct: Array<string | SolidityType> = structs[i];
            if(typeof currentStruct[1] === 'string' || typeof currentStruct[0] !== 'string') {
                continue;
            }
            if(elementaries.has(currentStruct[0])) {
                structs.splice(i, 1) // TODO: filter structs outside of while loop
                continue;
            }

            // Check if array contains non elem type. to achieve this. We add array values inside temp struct value array
            const structElements: Array<string> = Array.from((currentStruct[1].value as Array<string>));

            structElements.map((elem) => {
                if(isArrayLike(elem)) {
                    const deepElements = getDeepArrayTypes(elem)
                    structElements.push(...deepElements)
                }
            })

            const arraysRemovedElements = structElements.filter((elem) => !isArrayLike(elem))
            // Burada arrayler cikip icerisindeki typelarda listeye eklendi

            const nonElementaryTypes = (arraysRemovedElements as Array<string>).filter(val => !elementaries.has(val))
            if(nonElementaryTypes.length > 0) {
                continue;
            }

            elementaries.set(currentStruct[0], {
                type: "struct",
                value: currentStruct[1].value
            })

            structs.splice(i, 1)
            
        }
    }
    // TODO: check all types correct?
    return elementaries
}

// input map ve starknet veri tipi: core::integer::u64
// output uint64
function convertStarknetTypeToSolidity(map: Map<string, SolidityType>, type: string): string | Array<string> {
    const isArray = isArrayLike(type) // true if type has array chars
    const isTupledType = isTuple(type) // true if type has tuple chars

    const mapValue = map.get(type);

    if(!mapValue) {
        return '' // TODO: error handling
    }
    
    if(mapValue.type === 'basic' && typeof mapValue.value === 'string') { // In basic types, value always string.
        return mapValue.value
    }
}

function isArrayLike(type: string): boolean {
    if (type.indexOf('<') > -1 && type.indexOf('>') > -1) {
        return true
    }
    return false
}

function isTuple(type: string): boolean {
    if(type.indexOf('(') > -1 && type.indexOf(')') > -1) {
        return true
    }
    return false
}

function getArrayStruct(type: string): SolidityType {
    const arrayChar = type.indexOf('<')
    const arrayEndChar = type.lastIndexOf('>')
    const typeName = type.slice(arrayChar+1, arrayEndChar)
    // can it be also array ?
    if(isArrayLike(typeName)) {
        const deepArray = getArrayStruct(typeName)
        return {
            type: 'array',
            value: deepArray
        }
    }

    return {
        type: 'array',
        value: typeName
    }
}

function getDeepArrayTypes(type: string): Array<string> {
    const typeNameChar = type.lastIndexOf('<')
    const typeNameLastChar = type.indexOf('>')
    const typeName = type.slice(typeNameChar+1, typeNameLastChar)

    if(isTuple(typeName)) {
        return typeName.replace('(','').replace(')','').replace(' ','').split(',')
    }

    return [typeName]
}
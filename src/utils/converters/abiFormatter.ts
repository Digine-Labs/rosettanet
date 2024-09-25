import { Abi } from 'starknet'
import { StarknetTypeMember } from '../../types/types'

interface SolidityType {
    type: string, // basic are directly name changed, conversion needs to call formatter for actual value
    value?: string | Array<string>,
    properties?: string | Array<string>,
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
    ['core::array::Array::<core::integer::u8>', {type: 'array', value: 'uint8[]'}],
    ['core::array::Array::<core::integer::u16>', {type: 'array', value: 'uint16[]'}],
    ['core::array::Array::<core::integer::u32>', {type: 'array', value: 'uint32[]'}],
    ['core::array::Array::<core::integer::u64>', {type: 'array', value: 'uint64[]'}],
    ['core::array::Array::<core::integer::u128>', {type: 'array', value: 'uint128[]'}],
    ['core::array::Array::<core::integer::u256>', {type: 'array', value: 'uint256[]'}],
    ['core::array::Array::<core::integer::i8>', {type: 'array', value: 'int8[]'}],
    ['core::array::Array::<core::integer::i16>', {type: 'array', value: 'int16[]'}],
    ['core::array::Array::<core::integer::i32>', {type: 'array', value: 'int32[]'}],
    ['core::array::Array::<core::integer::i64>', {type: 'array', value: 'int64[]'}],
    ['core::array::Array::<core::integer::i128>', {type: 'array', value: 'int128[]'}],
    ['core::array::Array::<core::integer::i256>', {type: 'array', value: 'int256[]'}],
    ['core::array::Array::<core::felt252>', {type: 'array', value: 'uint256[]'}],
    ['core::array::Array::<core::starknet::contract_address::ContractAddress>', {type: 'array', value: 'uint256[]'}], // TODO: add formatter
    ['core::array::Array::<core::starknet::eth_address::EthAddress>', {type: 'array', value: 'address[]'}],
    ['core::array::Array::<core::starknet::class_hash::ClassHash>', {type: 'array', value: 'uint256[]'}],
    ['core::array::Array::<core::bool>', {type: 'array', value: 'bool[]'}],
    ['core::array::Array::<core::bytes_31::bytes31>', {type: 'array', value: 'bytes31[]'}],
    // Options
    ['core::option::Option::<core::integer::u8>', {type: 'array', value: 'uint8[]'}],
    ['core::option::Option::<core::integer::u16>', {type: 'array', value: 'uint16[]'}],
    ['core::option::Option::<core::integer::u32>', {type: 'array', value: 'uint32[]'}],
    ['core::option::Option::<core::integer::u64>', {type: 'array', value: 'uint64[]'}],
    ['core::option::Option::<core::integer::u128>', {type: 'array', value: 'uint128[]'}],
    ['core::option::Option::<core::integer::u256>', {type: 'array', value: 'uint256[]'}],
    ['core::option::Option::<core::integer::i8>', {type: 'array', value: 'int8[]'}],
    ['core::option::Option::<core::integer::i16>', {type: 'array', value: 'int16[]'}],
    ['core::option::Option::<core::integer::i32>', {type: 'array', value: 'int32[]'}],
    ['core::option::Option::<core::integer::i64>', {type: 'array', value: 'int64[]'}],
    ['core::option::Option::<core::integer::i128>', {type: 'array', value: 'int128[]'}],
    ['core::option::Option::<core::integer::i256>', {type: 'array', value: 'int256[]'}],
    ['core::option::Option::<core::felt252>', {type: 'array', value: 'uint256[]'}],
    ['core::option::Option::<core::starknet::contract_address::ContractAddress>', {type: 'array', value: 'uint256[]'}], // TODO: add formatter
    ['core::option::Option::<core::starknet::eth_address::EthAddress>', {type: 'array', value: 'address[]'}],
    ['core::option::Option::<core::starknet::class_hash::ClassHash>', {type: 'array', value: 'uint256[]'}],
    ['core::option::Option::<core::bool>', {type: 'array', value: 'bool[]'}],
    ['core::option::Option::<core::bytes_31::bytes31>', {type: 'array', value: 'bytes31[]'}],
    // Spans
    ['core::array::Span::<core::integer::u8>', {type: 'array', value: 'uint8[]'}],
    ['core::array::Span::<core::integer::u16>', {type: 'array', value: 'uint16[]'}],
    ['core::array::Span::<core::integer::u32>', {type: 'array', value: 'uint32[]'}],
    ['core::array::Span::<core::integer::u64>', {type: 'array', value: 'uint64[]'}],
    ['core::array::Span::<core::integer::u128>', {type: 'array', value: 'uint128[]'}],
    ['core::array::Span::<core::integer::u256>', {type: 'array', value: 'uint256[]'}],
    ['core::array::Span::<core::integer::i8>', {type: 'array', value: 'int8[]'}],
    ['core::array::Span::<core::integer::i16>', {type: 'array', value: 'int16[]'}],
    ['core::array::Span::<core::integer::i32>', {type: 'array', value: 'int32[]'}],
    ['core::array::Span::<core::integer::i64>', {type: 'array', value: 'int64[]'}],
    ['core::array::Span::<core::integer::i128>', {type: 'array', value: 'int128[]'}],
    ['core::array::Span::<core::integer::i256>', {type: 'array', value: 'int256[]'}],
    ['core::array::Span::<core::felt252>', {type: 'array', value: 'uint256[]'}],
    ['core::array::Span::<core::starknet::contract_address::ContractAddress>', {type: 'array', value: 'uint256[]'}], // TODO: add formatter
    ['core::array::Span::<core::starknet::eth_address::EthAddress>', {type: 'array', value: 'address[]'}],
    ['core::array::Span::<core::starknet::class_hash::ClassHash>', {type: 'array', value: 'uint256[]'}],
    ['core::array::Span::<core::bool>', {type: 'array', value: 'bool[]'}],
    ['core::array::Span::<core::bytes_31::bytes31>', {type: 'array', value: 'bytes31[]'}],
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
    try {
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
                if(typeof currentStruct[1].value === 'undefined') {
                    continue
                }
                elementaries.set(currentStruct[0], {
                    type: "struct",
                    properties: currentStruct[1].value,
                    value: convertStarknetTypeToSolidity(elementaries, currentStruct[1].value)
                })

                structs.splice(i, 1)
                
            }
        }

        // TODO: check all types correct?
        console.log(elementaries)
        return elementaries    
    } catch (ex) {
        console.error(ex)
        return elementaries
    }

}

// input map ve starknet veri tipi: core::integer::u64
// output uint64
function convertStarknetTypeToSolidity(map: Map<string, SolidityType>, types: string | Array<string>): string | Array<string> {
    if(Array.isArray(types)) {
        const convertedTypes: Array<string> = []
        for(const type of types) {
            const converted = map.get(type)
            if(typeof converted === 'undefined') {
                // check if is array of custom struct or non basic type
                const isArray = isArrayLike(type)
                if(!isArray) {
                    // TODO handle error type is not array and not found
                    throw(`type ${type} not found`)
                }

                const arrayType = getArrayType(type)
                console.log(arrayType) // This can be tuple or can be found in mapping. In case found in mapping we use it.

                // NOTE: Currently only support 2 levels of arrays
                const isArrayTypeTuple = isTuple(arrayType)
                if(isArrayTypeTuple) {
                    let tuple = `(`
                    const tupleTypes = arrayType.split(',')
                    for(const tupleType of tupleTypes) {
                        const convertedTupleType = map.get(tupleType)
                        if(typeof convertedTupleType === 'undefined') {
                            // TODO: type inside tuple not found. Handle error
                            // We can use default value like u256 if type not found or felt as fallback
                            continue
                        }
                        tuple = `${tuple}${convertedTupleType},`
                    }
                    tuple = `${tuple})`.replace(',)',')')
                    // Tuple string is prepared array of tuple must be like (elems...)[]
                    const arrayOfTupleString = `${tuple}[]`
                    convertedTypes.push(arrayOfTupleString)
                    continue
                }
                const convertedArrayType = map.get(arrayType) // Try if the type is custom struct or array
                if(typeof convertedArrayType === 'undefined') {
                    throw(`Array inside type not found ${arrayType}`)
                }

                if(isArrayLike(arrayType)) {
                    // TODO: array of arrays not supported atm
                    throw('Array of arrays are not supported')
                }

                continue
            }

            if((converted.type === 'basic' || converted.type === 'array') && typeof converted.value === 'string') {
                // Basic types values always string because hard coded
                convertedTypes.push(converted.value)
            }

            // Convert structs
            if(converted.type === 'struct' && Array.isArray(converted.properties)) {
                let tuple = `(`
                for(const structType of converted.properties) {
                    const convertedStructType = map.get(structType)
                    tuple = `${tuple}${convertedStructType?.value},`
                }
                tuple = `${tuple})`.replace(',)',')')
                convertedTypes.push(tuple)
            }

            // Convert arrays
        }
        return convertedTypes
    }

    const convertedType = map.get(types)
    if(typeof convertedType === 'undefined' || Array.isArray(convertedType.value) || typeof convertedType.value === 'undefined') {
        // TODO: handle error
        throw('converted type not found')
    }

    
    return convertedType.value
}

// Inputs tuple type as starknet e.g. (core::integer::u256, core::integer::u256)
// outputs eth value (uint256,uint256)
function convertTupleToSolidity(map: Map<string, SolidityType>, elements:string) : string {
    const snTypes = elements.replace('(','').replace(')','').split(',')
    let solidityType = `(`
    for(const type of snTypes) {
        const solType = map.get(type)
        solidityType = `${solidityType}${solType},`
    }
    solidityType = `${solidityType})`.replace(',)',')')

    return solidityType
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

function getArrayType(array: string): string {
    const firstArrayChar = array.indexOf('<')
    const lastArrayChar = array.lastIndexOf('>')

    const typeName = array.slice(firstArrayChar+1, lastArrayChar)

    return typeName
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
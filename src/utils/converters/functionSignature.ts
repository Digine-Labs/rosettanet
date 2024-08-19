/* eslint-disable @typescript-eslint/no-explicit-any */

import { Abi } from "starknet";
import { StarknetTypeMember } from "../../types/types";

const convertableTypes = [
    ["core::felt252", "uint256"],
    ["core::integer::u8", "uint8"],
    ["core::integer::u16", "uint16"],
    ["core::integer::u32", "uint32"],
    ["core::integer::u64", "uint64"],
    ["core::integer::u128", "uint128"],
    ["core::integer::u256", "uint256"],
    ["core::integer::usize", "uint256"],
    ["core::starknet::contract_address::ContractAddress", "uint256"],
    ["core::starknet::eth_address::EthAddress", "address"],
    ["core::starknet::class_hash::ClassHash", "uint256"],
    ["bool", "bool"]
]; // These types can be directly renamed to generate ethereum signature

// Inputs starknet abi string returning from getContractClass call
export function generateEthereumFunctionSignatures(classABI: Abi) : Array<string> {
    // early return if abi is empty
    if(classABI.length == 0) {
        return []
    }

    // First make a list of all structs with mapping

    // convertableTypesı kullanarak yeni mapping oluştur. Sonrasında bu mappingi, abi ın içinde bulunan custom structlar ile güncelle

    const typeConversions: Map<string,string> = initializeConvertableTypes();

    console.log(typeConversions.keys())

    importCustomStructs(classABI)
    return []
}

function initializeConvertableTypes() : Map<string,string> {
    const mapping: Map<string,string> = new Map<string,string>();

    for(const val of convertableTypes) {
        mapping.set(val[0], val[1])
    }

    return mapping
}

// Returns true if type is something like array, span or option
function isInheritsType(type: string): boolean {
    if(type.indexOf('<') > -1 || type.indexOf('>') > -1) {
        return true
    }
    return false
}

function importCustomStructs(classABI: Abi): Array<any> {
    if(classABI.length == 0) {
        return [[]]
    }

    const customStructs = classABI.filter(x => x.type === 'struct');
    const structs = []
    for(const elem of customStructs) {
        const structArray = [elem.name]

        if(elem.members.length == 0) {
            continue;
        }

        const structMembers = (elem.members as Array<StarknetTypeMember>).map(x => x.type)
        structArray.push(structMembers)
        structs.push(structArray)
        // Burda custom structların memberleri array şeklinde var. Bunları tuple çevireceğiz ama önce ethereum haline mi çevirsek??
    }

    console.log(structs) // Array of array, her array içinde 2 eleman bulunan başka array var. ilk eleman type tipi, diğeri typein içindeki elemanlar.
    return [[]]
}
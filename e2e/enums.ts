import { CairoCustomEnum } from "starknet";

const EVMTypesEnum = new CairoCustomEnum({
    Tuple: undefined,
    Array: undefined,
    FunctionSignature: undefined, // RM bytes4 can be used
    Address: undefined, // TODO
    Bool: undefined,
    Uint8: undefined,
    Uint16: undefined,
    Uint24: undefined,
    Uint32: undefined,
    Uint40: undefined,
    Uint48: undefined,
    Uint56: undefined,
    Uint64: undefined,
    Uint72: undefined,
    Uint80: undefined,
    Uint88: undefined,
    Uint96: undefined,
    Uint104: undefined,
    Uint112: undefined,
    Uint120: undefined,
    Uint128: undefined,
    Uint136: undefined,
    Uint144: undefined,
    Uint152: undefined,
    Uint160: undefined,
    Uint168: undefined,
    Uint176: undefined,
    Uint184: undefined,
    Uint192: undefined,
    Uint200: undefined,
    Uint208: undefined,
    Uint216: undefined,
    Uint224: undefined,
    Uint232: undefined,
    Uint240: undefined,
    Uint248: undefined,
    Uint256: undefined,
    Int8: undefined,
    Int16: undefined,
    Int24: undefined,
    Int32: undefined,
    Int40: undefined,
    Int48: undefined,
    Int56: undefined,
    Int64: undefined,
    Int72: undefined,
    Int80: undefined,
    Int88: undefined,
    Int96: undefined,
    Int104: undefined,
    Int112: undefined,
    Int120: undefined,
    Int128: undefined,
    Int136: undefined,
    Int144: undefined,
    Int152: undefined,
    Int160: undefined,
    Int168: undefined,
    Int176: undefined,
    Int184: undefined,
    Int192: undefined,
    Int200: undefined,
    Int208: undefined,
    Int216: undefined,
    Int224: undefined,
    Int232: undefined,
    Int240: undefined,
    Int248: undefined,
    Int256: undefined, // Decoded as i257 Because there is no i256 type in cairo. Closest is i257
    Bytes1: undefined,
    Bytes2: undefined,
    Bytes3: undefined,
    Bytes4: undefined,
    Bytes5: undefined,
    Bytes6: undefined,
    Bytes7: undefined,
    Bytes8: undefined,
    Bytes9: undefined,
    Bytes10: undefined,
    Bytes11: undefined,
    Bytes12: undefined,
    Bytes13: undefined,
    Bytes14: undefined,
    Bytes15: undefined,
    Bytes16: undefined,
    Bytes17: undefined,
    Bytes18: undefined,
    Bytes19: undefined,
    Bytes20: undefined,
    Bytes21: undefined,
    Bytes22: undefined,
    Bytes23: undefined,
    Bytes24: undefined,
    Bytes25: undefined,
    Bytes26: undefined,
    Bytes27: undefined,
    Bytes28: undefined,
    Bytes29: undefined,
    Bytes30: undefined,
    Bytes31: undefined,
    Bytes32: undefined, // Decoded as serialized ByteArray
    Bytes: undefined,
    String: undefined, // Same as bytes
    Felt252: undefined // It has to be encoded as uint256 on EVM
}) 

/**
 * Creates calldata for Cairo enums to be used with Starknet
 * @param enumType The type of enum (e.g., 'Uint256', 'Address', etc.)
 * @param value The value to be passed with the enum (if applicable)
 * @returns An array representing the calldata for the enum
 */
export function createCairoEnumCalldata(enumType: string, value?: any): any[] {
    const enumVariants: Record<string, any> = {};
    enumVariants[enumType] = value;
    
    const enumInstance = new CairoCustomEnum(enumVariants);
    
    const activeVariant = enumInstance.activeVariant();
    
    const variantNames = Object.keys(EVMTypesEnum)
        .filter(key => typeof EVMTypesEnum[key as keyof typeof EVMTypesEnum] !== 'function');
    
    const variantIndex = variantNames.indexOf(activeVariant);
    
    if (variantIndex === -1) {
        throw new Error(`Invalid enum variant: ${activeVariant}`);
    }
    
    if (value === undefined) {
        return [variantIndex];
    }
    
    return [variantIndex, value];
}

/**
 * Test function for createCairoEnumCalldata
 * @returns Test results
 */
export function testCreateCairoEnumCalldata(): { type: string, value: any, calldata: any[] }[] {
    const testCases = [
        { type: 'Uint256', value: '0x123' },
        { type: 'Address', value: '0x1234567890123456789012345678901234567890' },
        { type: 'Bool', value: true },
        { type: 'String', value: 'test string' }
    ];
    
    return testCases.map(test => ({
        type: test.type,
        value: test.value,
        calldata: createCairoEnumCalldata(test.type, test.value)
    }));
}

export default EVMTypesEnum;

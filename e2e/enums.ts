export const EVMTypesEnum = {
    Tuple: 0,
    Array: 1,
    FunctionSignature: 2, // RM bytes4 can be used
    Address: 3, // TODO
    Bool: 4,
    Uint8: 5,
    Uint16: 6,
    Uint24: 7,
    Uint32: 8,
    Uint40: 9,
    Uint48: 10,
    Uint56: 11,
    Uint64: 12,
    Uint72: 13,
    Uint80: 14,
    Uint88: 15,
    Uint96: 16,
    Uint104: 17,
    Uint112: 18,
    Uint120: 19,
    Uint128: 20,
    Uint136: 21,
    Uint144: 22,
    Uint152: 23,
    Uint160: 24,
    Uint168: 25,
    Uint176: 26,
    Uint184: 27,
    Uint192: 28,
    Uint200: 29,
    Uint208: 30,
    Uint216: 31,
    Uint224: 32,
    Uint232: 33,
    Uint240: 34,
    Uint248: 35,
    Uint256: 36,
    Int8: 37,
    Int16: 38,
    Int24: 39,
    Int32: 40,
    Int40: 41,
    Int48: 42,
    Int56: 43,
    Int64: 44,
    Int72: 45,
    Int80: 46,
    Int88: 47,
    Int96: 48,
    Int104: 49,
    Int112: 50,
    Int120: 51,
    Int128: 52,
    Int136: 53,
    Int144: 54,
    Int152: 55,
    Int160: 56,
    Int168: 57,
    Int176: 58,
    Int184: 59,
    Int192: 60,
    Int200: 61,
    Int208: 62,
    Int216: 63,
    Int224: 64,
    Int232: 65,
    Int240: 66,
    Int248: 67,
    Int256: 68, // Decoded as i257 Because there is no i256 type in cairo. Closest is i257
    Bytes1: 69,
    Bytes2: 70,
    Bytes3: 71,
    Bytes4: 72,
    Bytes5: 73,
    Bytes6: 74,
    Bytes7: 75,
    Bytes8: 76,
    Bytes9: 77,
    Bytes10: 78,
    Bytes11: 79,
    Bytes12: 80,
    Bytes13: 81,
    Bytes14: 82,
    Bytes15: 83,
    Bytes16: 84,
    Bytes17: 85,
    Bytes18: 86,
    Bytes19: 87,
    Bytes20: 88,
    Bytes21: 89,
    Bytes22: 90,
    Bytes23: 91,
    Bytes24: 92,
    Bytes25: 93,
    Bytes26: 94,
    Bytes27: 95,
    Bytes28: 96,
    Bytes29: 97,
    Bytes30: 98,
    Bytes31: 99,
    Bytes32: 100, // Decoded as serialized ByteArray
    Bytes: 101,
    String: 102, // Same as bytes
    Felt252: 103 // It has to be encoded as uint256 on EVM
} as const;

/**
 * Creates calldata for Cairo enums to be used with Starknet
 * @param enumType The type of enum (e.g., 'Uint256', 'Address', etc.)
 * @param value The value to be passed with the enum (if applicable)
 * @returns An array representing the calldata for the enum
 */
export function createCairoEnumCalldata(enumType: string, value?: unknown): (number | string | boolean)[] {
    if (!(enumType in EVMTypesEnum)) {
        throw new Error(`Invalid enum type: ${enumType}`);
    }
    
    const variantIndex = EVMTypesEnum[enumType as keyof typeof EVMTypesEnum];
    
    if (value === undefined) {
        return [variantIndex];
    }
    
    return [variantIndex, value as string | number | boolean];
}

/**
 * Test function for createCairoEnumCalldata
 * @returns Test results
 */
export function testCreateCairoEnumCalldata(): { type: string, value: string | boolean, calldata: (number | string | boolean)[] }[] {
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

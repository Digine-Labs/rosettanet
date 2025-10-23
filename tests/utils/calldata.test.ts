import {
  getFunctionSelectorFromCalldata,
  convertUint256s,
  decodeCalldataWithTypes,
  encodeStarknetData,
  mergeSlots,
  decodeMulticallFeatureCalldata,
  to128Bits,
} from '../../src/utils/calldata'
import {
  EVMDecodeError,
  EVMDecodeResult,
  EVMEncodeError,
  EVMEncodeResult,
  CairoNamedConvertableType
} from '../../src/types/types'
import {
  isEVMDecodeResult,
  isEVMEncodeResult,
} from '../../src/types/typeGuards'


describe('Test calldata u128 conversion', () => {
  it('Decodes calldata', () => {
    const data =
      '0x76971d7f000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000012000a551825f2e7d5313ee03b1dfe40e2a7b78b27a7fed40fa17aec27e010bfa960083afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000055566600000000000000000000000000000000000000000000000000000000000005dc000000000000000000000000000000000000000000000000000000000000000000a551825f2e7d5313ee03b1dfe40e2a7b78b27a7fed40fa17aec27e010bfa960083afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000001112220000000000000000000000000000000000000000000000000000000000000bb80000000000000000000000000000000000000000000000000000000000000000'

    const result = to128Bits(data)

    expect(result).toStrictEqual([
      '0x76971d7f',
      '0x00000000000000000000000000000000',
      '0x00000000000000000000000000000020',
      '0x00000000000000000000000000000000',
      '0x00000000000000000000000000000002',
      '0x00000000000000000000000000000000',
      '0x00000000000000000000000000000040',
      '0x00000000000000000000000000000000',
      '0x00000000000000000000000000000120',
      '0x00a551825f2e7d5313ee03b1dfe40e2a',
      '0x7b78b27a7fed40fa17aec27e010bfa96',
      '0x0083afd3f4caedc6eebf44246fe54e38',
      '0xc95e3179a5ec9ea81740eca5b482d12e',
      '0x00000000000000000000000000000000',
      '0x00000000000000000000000000000060',
      '0x00000000000000000000000000000000',
      '0x00000000000000000000000000000003',
      '0x00000000000000000000000000000000',
      '0x00000000000000000000000000555666',
      '0x00000000000000000000000000000000',
      '0x000000000000000000000000000005dc',
      '0x00000000000000000000000000000000',
      '0x00000000000000000000000000000000',
      '0x00a551825f2e7d5313ee03b1dfe40e2a',
      '0x7b78b27a7fed40fa17aec27e010bfa96',
      '0x0083afd3f4caedc6eebf44246fe54e38',
      '0xc95e3179a5ec9ea81740eca5b482d12e',
      '0x00000000000000000000000000000000',
      '0x00000000000000000000000000000060',
      '0x00000000000000000000000000000000',
      '0x00000000000000000000000000000003',
      '0x00000000000000000000000000000000',
      '0x00000000000000000000000000111222',
      '0x00000000000000000000000000000000',
      '0x00000000000000000000000000000bb8',
      '0x00000000000000000000000000000000',
      '0x00000000000000000000000000000000',
    ])
  })
})

describe('Test feature calldata parse', () => {
  it('Parses multicall calldata', () => {
    /*
        uint256[] memory arr1 = new uint256[](3);
        arr1[0] = 123;
        arr1[1] = 456;
        arr1[2] = 789;

        uint256[] memory arr2 = new uint256[](1);
        arr2[0] = 987;
        cd[0] = RosettanetMulticall(123,6666,arr1);
        cd[1] = RosettanetMulticall(777,8888,arr2);
    */
    const data =
      '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000007b0000000000000000000000000000000000000000000000000000000000001a0a00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000007b00000000000000000000000000000000000000000000000000000000000001c80000000000000000000000000000000000000000000000000000000000000315000000000000000000000000000000000000000000000000000000000000030900000000000000000000000000000000000000000000000000000000000022b80000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000003db'

    const decoded: EVMDecodeResult | EVMDecodeError =
      decodeMulticallFeatureCalldata(data, '0x76971d7f')

    if (isEVMDecodeResult(decoded)) {
      expect(decoded.calldata).toStrictEqual([
        '0x76971d7f',
        '0x2',
        '0x7b',
        '0x1a0a',
        '0x3',
        '0x7b',
        '0x1c8',
        '0x315',
        '0x309',
        '0x22b8',
        '0x1',
        '0x3db',
      ])
    } else {
      fail('Error')
    }
  })
})

describe('Tests calldata function selector', () => {
  it('Returns eth function selector', async () => {
    const sample = '0xa9059cbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

    const selector = getFunctionSelectorFromCalldata(sample)

    expect(selector).toBe('0xa9059cbb')
  })

  it('Returns 0x0 if calldata wrong', async () => {
    const sample = '0xa90'

    const selector = getFunctionSelectorFromCalldata(sample)

    expect(selector).toBe(null)
  })
})

describe('Test merging uint256s from data', () => {
  it('Merges uint256 only low', () => {
    const type1: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 128,
      solidityType: 'uint256',
      cairoType: 'core::integer::u256',
    }

    const data = ['0x123123', '0x0']

    const result = mergeSlots([type1], data)

    expect(result.length).toBe(1)
    expect(result[0]).toBe('0x123123')
  })

  it('Merges uint256 only high', () => {
    const type1: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 128,
      solidityType: 'uint256',
      cairoType: 'core::integer::u256',
    }

    const data = ['0x0', '0xFFF']

    const result = mergeSlots([type1], data)

    expect(result.length).toBe(1)
    expect(result[0]).toBe('0xfff00000000000000000000000000000000')
  })

  it('Merges uint256 max', () => {
    const type1: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 256,
      solidityType: 'uint256',
      cairoType: 'core::integer::u256',
    }

    const data = [
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
    ]

    const result = mergeSlots([type1], data)

    expect(result.length).toBe(1)
    expect(result[0]).toBe(
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    )
  })

  it('Merges uint256 array', () => {
    const type: CairoNamedConvertableType = {
      isDynamicSize: true,
      isTuple: false,
      size: 256,
      solidityType: 'uint256[]',
      cairoType: 'core::array::Array::<core::integer::u256>',
    }

    const data = [
      '0x1',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
    ]

    const result = mergeSlots([type], data)

    expect(result.length).toBe(1)
    expect(result[0]).toStrictEqual([
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    ])
  })

  it('Merges uint256 array multi elements', () => {
    const type: CairoNamedConvertableType = {
      isDynamicSize: true,
      isTuple: false,
      size: 256,
      solidityType: 'uint256[]',
      cairoType: 'core::array::Array::<core::integer::u256>',
    }

    const data = [
      '0x2',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      '0x0',
      '0x0',
    ]

    const result = mergeSlots([type], data)

    expect(result.length).toBe(1)
    expect(result[0]).toStrictEqual([
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      '0x0',
    ])
  })

  it('Merges uint256 array at mid some other element', () => {
    const type1: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 128,
      solidityType: 'uint128',
      cairoType: 'core::integer::u128',
    }
    const type: CairoNamedConvertableType = {
      isDynamicSize: true,
      isTuple: false,
      size: 256,
      solidityType: 'uint256[]',
      cairoType: 'core::array::Array::<core::integer::u256>',
    }

    const data = [
      '0x1234',
      '0x2',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      '0x0',
      '0x0',
      '0xfff',
    ]

    const result = mergeSlots([type1, type, type1], data)

    expect(result.length).toBe(3)
    expect(result[0]).toBe('0x1234')
    expect(result[1]).toStrictEqual([
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      '0x0',
    ])
    expect(result[2]).toBe('0xfff')
  })

  it('Merges uint256 at mid some other element', () => {
    const type1: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 128,
      solidityType: 'uint128',
      cairoType: 'core::integer::u128',
    }
    const type: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 256,
      solidityType: 'uint256',
      cairoType: 'core::integer::u256',
    }

    const data = [
      '0x1234',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      '0xfff',
    ]

    const result = mergeSlots([type1, type, type1], data)

    expect(result.length).toBe(3)
    expect(result[0]).toBe('0x1234')
    expect(result[1]).toBe(
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    )
    expect(result[2]).toBe('0xfff')
  })

  it('No merge multi', () => {
    const type1: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 128,
      solidityType: 'uint128',
      cairoType: 'core::integer::u128',
    }

    const data = [
      '0x1234',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
    ]

    const result = mergeSlots([type1, type1, type1], data)

    expect(result.length).toBe(3)
    expect(result[0]).toBe('0x1234')
    expect(result[1]).toBe('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
    expect(result[2]).toBe('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
  })

  it('No merge multi array', () => {
    const type1: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 128,
      solidityType: 'uint128',
      cairoType: 'core::integer::u128',
    }
    const type: CairoNamedConvertableType = {
      isDynamicSize: true,
      isTuple: false,
      size: 128,
      solidityType: 'uint128[]',
      cairoType: 'core::array::Array::<core::integer::uu128>',
    }

    const data = [
      '0x1234',
      '0x2',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
    ]

    const result = mergeSlots([type1, type], data)

    expect(result.length).toBe(2)
    expect(result[0]).toBe('0x1234')
    expect(result[1]).toStrictEqual([
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
    ])
  })
})

describe('Tests encoding starknet data to evm data', () => {
  it('Encodes simple calldata', () => {
    const type: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 128,
      solidityType: 'uint128',
      cairoType: 'core::integer::u128',
    }

    const data = ['0x12431234']

    const encoded: EVMEncodeResult | EVMEncodeError = encodeStarknetData(
      [type],
      data,
    )

    if (!isEVMEncodeResult(encoded)) {
      throw encoded.message
    }

    expect(encoded.data).toBe(
      '0x0000000000000000000000000000000000000000000000000000000012431234',
    )
  })

  it('Encodes simple calldata', () => {
    const type1: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 128,
      solidityType: 'uint256',
      cairoType: 'core::integer::u256',
    }

    const type2: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 128,
      solidityType: 'uint128',
      cairoType: 'core::integer::u128',
    }

    const data = ['0x12431234', '0xfff', '0x0']

    const encoded: EVMEncodeResult | EVMEncodeError = encodeStarknetData(
      [type1, type2],
      data,
    )

    if (!isEVMEncodeResult(encoded)) {
      throw encoded.message
    }

    expect(encoded.data).toBe(
      '0x00000000000000000000000000000fff000000000000000000000000124312340000000000000000000000000000000000000000000000000000000000000000',
    )
  })

  it('Encodes uint128 array calldata', () => {
    const type1: CairoNamedConvertableType = {
      isDynamicSize: true,
      isTuple: false,
      size: 128,
      solidityType: 'uint128[]',
      cairoType: 'core::array::Array::<core::integer::u128>',
    }

    const type2: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 128,
      solidityType: 'uint128',
      cairoType: 'core::integer::u128',
    }

    const data = ['0x2', '0x12431234', '0xfff', '0x5']

    const encoded: EVMEncodeResult | EVMEncodeError = encodeStarknetData(
      [type1, type2],
      data,
    )

    if (!isEVMEncodeResult(encoded)) {
      throw encoded.message
    }

    expect(encoded.data).toBe(
      '0x00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000005000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000124312340000000000000000000000000000000000000000000000000000000000000fff',
    )
  })
  it('Encodes uint128 array at middle calldata', () => {
    const type1: CairoNamedConvertableType = {
      isDynamicSize: true,
      isTuple: false,
      size: 128,
      solidityType: 'uint128[]',
      cairoType: 'core::array::Array::<core::integer::u128>',
    }

    const type2: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 128,
      solidityType: 'uint128',
      cairoType: 'core::integer::u128',
    }

    const data = ['0xfffffffff', '0x2', '0x12431234', '0xfff', '0x5']

    const encoded: EVMEncodeResult | EVMEncodeError = encodeStarknetData(
      [type2, type1, type2],
      data,
    )

    if (!isEVMEncodeResult(encoded)) {
      throw encoded.message
    }

    expect(encoded.data).toBe(
      '0x0000000000000000000000000000000000000000000000000000000fffffffff00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000005000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000124312340000000000000000000000000000000000000000000000000000000000000fff',
    )
  })
  it('Encodes uint256 array', () => {
    const type1: CairoNamedConvertableType = {
      isDynamicSize: true,
      isTuple: false,
      size: 256,
      solidityType: 'uint256[]',
      cairoType: 'core::array::Array::<core::integer::u256>',
    }

    const data = ['0x2', '0x12431234', '0xfff', '0x5', '0x0']

    const encoded: EVMEncodeResult | EVMEncodeError = encodeStarknetData(
      [type1],
      data,
    )

    if (!isEVMEncodeResult(encoded)) {
      throw encoded.message
    }

    expect(encoded.data).toBe(
      '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000fff000000000000000000000000124312340000000000000000000000000000000000000000000000000000000000000005',
    )
  })
})

describe('Test uint256 converts', () => {
  it('Converts uint256 to u256 array', () => {
    const data: Array<string> = [
      '900010000000000000000000d3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    ]

    const u256strings: Array<string> = convertUint256s(data)

    expect(u256strings.length).toBe(2)
    expect(u256strings[0]).toBe('44ddd6b96f7c741b1562b82f9e004dc7')
    expect(u256strings[1]).toBe('900010000000000000000000d3fcc846')
  })

  it('Converts uint256 to u256 array with zeros', () => {
    const data: Array<string> = [
      '000010000000000000000000d3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    ]

    const u256strings: Array<string> = convertUint256s(data)

    expect(u256strings.length).toBe(2)
    expect(u256strings[0]).toBe('44ddd6b96f7c741b1562b82f9e004dc7')
    expect(u256strings[1]).toBe('10000000000000000000d3fcc846') // zeroes removed
  })
})

describe('Test calldata decoding', () => {
  it('Decodes simple calldata', () => {
    const types = ['uint128', 'uint128']
    const calldata =
      '0x00000000000000000000000000000000000000000000000000000000000001590000000000000000000000000000000000000000000000000000000000000315'

    const decodedData = decodeCalldataWithTypes(types, calldata)
    expect(decodedData).toStrictEqual(['345', '789'])
  })
  it('Decodes packed simple calldata', () => {
    const types = ['uint128', 'address']
    const calldata =
      '0x00000000000000000000000000000000000000000000000000000000000a539f00000000000000000000000011655f4ee2a5b66f9dcbe758e9fcdcd3ebf95ee5'

    const decodedData = decodeCalldataWithTypes(types, calldata)
    expect(decodedData).toStrictEqual([
      '676767',
      '0x11655f4Ee2A5B66F9DCbe758e9FcdCd3eBF95eE5',
    ])
  })
  it('Decodes uint256 array', () => {
    const types = ['uint256[]']
    const calldata =
      '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000e900000000000000000000000000000000000000000000000000000000000001c80000000000000000000000000000000000000000000000000000000000000315'

    const expectedValues = ['233', '456', '789']

    const decodedData = decodeCalldataWithTypes(types, calldata)
    expect(decodedData).toStrictEqual([expectedValues])
  })
  it('Decodes custom struct', () => {
    const types = ['tuple(uint256, uint256)']
    const calldata =
      '0x000000000000000000000000000000000000000000000000000000000000006f00000000000000000000000000000000000000000000000000000000000000de'

    const expectedValues = ['111', '222']
    const decodedData = decodeCalldataWithTypes(types, calldata)
    expect(decodedData).toStrictEqual([expectedValues])
  })
})
/*
describe('Test calldata decoding with cairo type names', () => {
  it('Decodes uint256 array', () => {
    const type: CairoNamedConvertableType = {
      isDynamicSize: true,
      isTuple: false,
      size: 256,
      solidityType: 'uint256[]',
      cairoType: 'core::array::Array::<core::integer::u256>',
    }

    const types: Array<CairoNamedConvertableType> = [type]

    const calldata =
      '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000e900000000000000000000000000000000000000000000000000000000000001c80000000000000000000000000000000000000000000000000000000000000315'

    const expectedValues = ['233', '0', '456', '0', '789', '0']
    const decodedData = decodeCalldataWithFelt252Limit(types, calldata)
    expect(decodedData).toStrictEqual(expectedValues)
  })

  it('Decodes uint256', () => {
    const type: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 256,
      solidityType: 'uint256',
      cairoType: 'core::integer::u256',
    }
    const types: Array<CairoNamedConvertableType> = [type]

    const calldata =
      '0x0000000000000000000000000000000000000000000000000000000000000315'
    const expectedValues = ['789', '0']
    const decodedData = decodeCalldataWithFelt252Limit(types, calldata)
    expect(decodedData).toStrictEqual(expectedValues)
  })
  it('Decodes packed simple calldata', () => {
    const type1: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 64,
      solidityType: 'uint64',
      cairoType: 'core::integer::u64',
    }
    const type2: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 128,
      solidityType: 'uint128',
      cairoType: 'core::integer::u128',
    }

    const types = [type1, type2]
    const calldata =
      '0x00000000000000000000000000000000000000000000000000000000000a539f000000000000000000000000000000000005b66f9dcbe758e9fcdcd3ebf95ee5'

    const decodedData = decodeCalldataWithFelt252Limit(types, calldata)
    const expectedValues = ['676767', '29661726002228815665844559223021285']
    expect(decodedData).toStrictEqual(expectedValues)
  })
  it('Decodes custom struct', () => {
    const type: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: true,
      size: 512,
      solidityType: 'tuple(uint256, uint256)',
      tupleSizes: [256, 256],
      cairoType: 'customstruct',
    }
    const types = [type]
    const calldata =
      '0x000000000000000000000000000000000000000000000000000000000000006f00000000000000000000000000000000000000000000000000000000000000de'

    const expectedValues = ['111', '0', '222', '0']
    const decodedData = decodeCalldataWithFelt252Limit(types, calldata)
    expect(decodedData).toStrictEqual(expectedValues)
  })
  it('Decodes custom struct lower than u256', () => {
    const type: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: true,
      size: 512,
      solidityType: 'tuple(uint128, uint128)',
      tupleSizes: [128, 128],
      cairoType: 'customstruct',
    }
    const types = [type]
    const calldata =
      '0x000000000000000000000000000000000000000000000000000000000005026f00000000000000000000000000000000000000000000000000000000000569de'

    const expectedValues = ['328303', '354782']
    const decodedData = decodeCalldataWithFelt252Limit(types, calldata)

    expect(decodedData).toStrictEqual(expectedValues)
  })

  it('Decodes elementary type with array', () => {
    const type1: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 128,
      solidityType: 'uint128',
      cairoType: 'core::integer::u128',
    }

    const type2: CairoNamedConvertableType = {
      isDynamicSize: true,
      isTuple: false,
      size: 256,
      solidityType: 'uint256[]',
      cairoType: 'core::array::Array::<core::integer::u256>',
    }
    const types = [type1, type2]
    const calldata =
      '0x00000000000000000000000000000000000000000000000000000000000b611300000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000071a000000000000000000000000000000000000000000000000000000000000014d00000000000000000000000000000000000000000000000000000000008c3592'
    const expectedValues = ['745747', '1818', '0', '333', '0', '9188754', '0']
    const decodedData = decodeCalldataWithFelt252Limit(types, calldata)

    expect(decodedData).toStrictEqual(expectedValues)
  })
  it('Decodes elementary u256 type with array', () => {
    const type1: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 256,
      solidityType: 'uint256',
      cairoType: 'core::integer::u256',
    }

    const type2: CairoNamedConvertableType = {
      isDynamicSize: true,
      isTuple: false,
      size: 256,
      solidityType: 'uint256[]',
      cairoType: 'core::array::Array::<core::integer::u256>',
    }
    const types = [type1, type2]
    const calldata =
      '0x00000000000000000000000000000000000000000000000000000000000b611300000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000071a000000000000000000000000000000000000000000000000000000000000014d00000000000000000000000000000000000000000000000000000000008c3592'
    const expectedValues = [
      '745747',
      '0',
      '1818',
      '0',
      '333',
      '0',
      '9188754',
      '0',
    ]
    const decodedData = decodeCalldataWithFelt252Limit(types, calldata)

    expect(decodedData).toStrictEqual(expectedValues)
  })

  it('Decodes elementary u256 type with tuple', () => {
    const type1: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 256,
      solidityType: 'uint256',
      cairoType: 'core::integer::u256',
    }

    const type2: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: true,
      size: 256 + 128,
      solidityType: 'tuple(uint128, uint256)',
      tupleSizes: [128, 256],
      cairoType: 'customstruct',
    }
    const types = [type1, type2]
    const calldata =
      '0x0000000000000000000000000000000000000000000000000000000000520372000000000000000000000000000000000000000000000000000000000012831e0000000000000000000000000000000000000000000000000000000002958cc7'
    const expectedValues = ['5374834', '0', '1213214', '43355335', '0']
    const decodedData = decodeCalldataWithFelt252Limit(types, calldata)
    expect(decodedData).toStrictEqual(expectedValues)
  })

  it('Decodes tuples with array and elementary', () => {
    const type1: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 256,
      solidityType: 'uint256',
      cairoType: 'core::integer::u256',
    }

    const type2: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: true,
      size: 256 + 128,
      solidityType: 'tuple(uint256, uint256)',
      tupleSizes: [256, 256],
      cairoType: 'customstruct',
    }
    const type3: CairoNamedConvertableType = {
      isDynamicSize: true,
      isTuple: false,
      size: 256,
      solidityType: 'uint256[]',
      cairoType: 'core::array::Array::<core::integer::u256>',
    }
    const types = [type2, type3, type1]
    const calldata =
      '0x0000000000000000000000000000000000000000000000000000000000004706000000000000000000000000000000000000000000000000000000000001869f000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000001cf97787100000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000004fe74270000000000000000000000000000000000000000000000000000000000004a2500000000000000000000000000000000000000000000000000000000016c91ae000000000000000000000000000000000000000000000000000000000002c3de00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    const expectedValues = [
      '18182',
      '0',
      '99999',
      '0',
      '83784743',
      '0',
      '18981',
      '0',
      '23892398',
      '0',
      '181214',
      '0',
      '0',
      '0',
      '0',
      '0',
      '7777777777',
      '0',
    ]
    const decodedData = decodeCalldataWithFelt252Limit(types, calldata)
    expect(decodedData).toStrictEqual(expectedValues)
  })
  it('Decodes tuples with array and elementary', () => {
    const type1: CairoNamedConvertableType = {
      isDynamicSize: false,
      isTuple: false,
      size: 2,
      solidityType: 'bool',
      cairoType: 'core::integer::bool',
    }
    const types = [type1]
    const calldata =
      '0x0000000000000000000000000000000000000000000000000000000000000001'
    const expectedValues = ['1']
    const decodedData = decodeCalldataWithFelt252Limit(types, calldata)
    expect(decodedData).toStrictEqual(expectedValues)
  })
})
*/

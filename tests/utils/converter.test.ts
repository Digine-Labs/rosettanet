import { toStarknetType } from '../../src/utils/converters'

describe('Starknet conversions', () => {
  it('Converts uint256 max to sn string', () => {
    const UINT256_MAX =
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

    expect(toStarknetType(UINT256_MAX, 'u256')).toStrictEqual([
      'ffffffffffffffffffffffffffffffff',
      'ffffffffffffffffffffffffffffffff',
    ])
  })

  it('Converts uint256 zero to sn string', () => {
    const UINT256_LOW =
      '0000000000000000000000000000000000000000000000000000000000000000'

    expect(toStarknetType(UINT256_LOW, 'u256')).toStrictEqual(['0', '0'])
  })

  it('Should results undefined, because non exist type', () => {
    const UINT256_LOW =
      '0000000000000000000000000000000000000000000000000000000000000000'

    expect(toStarknetType(UINT256_LOW, 'u512')).toBe(undefined)
  })
})

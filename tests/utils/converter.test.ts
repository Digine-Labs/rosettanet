import { toStarknetType } from '../../src/utils/converters'

describe('Starknet conversions', () => {
  it('Converts uint256 max to sn string', () => {
    const UINT256_MAX =
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

    expect(toStarknetType(UINT256_MAX, 'u256')).toStrictEqual([
      '340282366920938463463374607431768211455',
      '340282366920938463463374607431768211455',
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

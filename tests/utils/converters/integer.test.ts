import { Uint256ToU256 } from '../../../src/utils/converters/integer'

describe('Integer conversions', () => {
  it('Converts uint256 max to sn string', () => {
    const UINT256_MAX =
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

    expect(Uint256ToU256(UINT256_MAX)).toStrictEqual([
      'ffffffffffffffffffffffffffffffff',
      'ffffffffffffffffffffffffffffffff',
    ])
  })

  it('Converts uint256 zero to sn string', () => {
    const UINT256_LOW =
      '0000000000000000000000000000000000000000000000000000000000000000'

    expect(Uint256ToU256(UINT256_LOW)).toStrictEqual(['0', '0'])
  })

  it('Converts uint256 high max low zero to sn string', () => {
    const UINT256 =
      'ffffffffffffffffffffffffffffffff00000000000000000000000000000000'

    expect(Uint256ToU256(UINT256)).toStrictEqual([
      '0',
      'ffffffffffffffffffffffffffffffff',
    ])
  })

  it('Converts uint256 low max high zero', () => {
    const UINT256_LOW =
      '00000000000000000000000000000000ffffffffffffffffffffffffffffffff'

    expect(Uint256ToU256(UINT256_LOW)).toStrictEqual([
      'ffffffffffffffffffffffffffffffff',
      '0',
    ])
  })

  it('Converts uint256 low 1 high 1', () => {
    const UINT256_LOW =
      '0000000000000000000000000000000100000000000000000000000000000001'

    expect(Uint256ToU256(UINT256_LOW)).toStrictEqual(['1', '1'])
  })
})

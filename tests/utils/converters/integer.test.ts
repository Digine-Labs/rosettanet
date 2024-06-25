import { Uint256ToU256, U256toUint256 } from '../../../src/utils/converters/integer'

describe('Integer conversions', () => {
  describe('Uint256ToU256', () => {
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

    it('Handles invalid input length', () => {
      const INVALID_UINT256 = '1234'
      expect(Uint256ToU256(INVALID_UINT256)).toStrictEqual(['0', '0'])
    })

    it('Handles random valid uint256 value', () => {
      const UINT256 =
        '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'

      expect(Uint256ToU256(UINT256)).toStrictEqual([
        '1234567890abcdef1234567890abcdef',
        '1234567890abcdef1234567890abcdef',
      ])
    })
  })

  describe('U256toUint256', () => {
    it('Converts sn string max values to uint256', () => {
      const SN_MAX = [
        'ffffffffffffffffffffffffffffffff',
        'ffffffffffffffffffffffffffffffff',
      ]

      expect(U256toUint256(SN_MAX)).toStrictEqual(
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      )
    })

    it('Converts sn string zero to uint256', () => {
      const SN_ZERO = ['0', '0']

      expect(U256toUint256(SN_ZERO)).toStrictEqual(
        '0x0000000000000000000000000000000000000000000000000000000000000000'
      )
    })

    it('Converts sn string high max low zero to uint256', () => {
      const SN_STRINGS = [
        'ffffffffffffffffffffffffffffffff',
        '0',
      ]

      expect(U256toUint256(SN_STRINGS)).toStrictEqual(
        '0x00000000000000000000000000000000ffffffffffffffffffffffffffffffff'
      )
    })

    it('Converts sn string low max high zero to uint256', () => {
      const SN_STRINGS = [
        '0',
        'ffffffffffffffffffffffffffffffff',
      ]

      expect(U256toUint256(SN_STRINGS)).toStrictEqual(
        '0xffffffffffffffffffffffffffffffff00000000000000000000000000000000'
      )
    })

    it('Converts sn string low 1 high 1 to uint256', () => {
      const SN_STRINGS = ['1', '1']

      expect(U256toUint256(SN_STRINGS)).toStrictEqual(
        '0x0000000000000000000000000000000100000000000000000000000000000001'
      )
    })
  })
})

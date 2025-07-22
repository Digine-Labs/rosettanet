import { sumTotalGasConsumption } from '../../src/utils/gas'

describe('sumTotalGasConsumption', () => {
  test('should return the total gas consumption as hex string', () => {
    const l1Gas = '0x1a'
    const l1DataGas = '0x2b'
    const l2Gas = '0x3c'

    const result = sumTotalGasConsumption(l1Gas, l1DataGas, l2Gas)
    expect(result).toBe('0x8d')
  })
  test('should handle zero values correctly', () => {
    const l1Gas = '0x0'
    const l1DataGas = '0x0'
    const l2Gas = '0x0'

    const result = sumTotalGasConsumption(l1Gas, l1DataGas, l2Gas)
    expect(result).toBe('0x0')
  })
  test('should handle large values correctly', () => {
    const l1Gas = '0x10000000000000000'
    const l1DataGas = '0x20000000000000000'
    const l2Gas = '0x30000000000000000'

    const result = sumTotalGasConsumption(l1Gas, l1DataGas, l2Gas)
    expect(result).toBe('0x69999999999999999')
  })
  test("should return a hex string with '0x' prefix", () => {
    const l1Gas = '0x1'
    const l1DataGas = '0x2'
    const l2Gas = '0x3'

    const result = sumTotalGasConsumption(l1Gas, l1DataGas, l2Gas)
    expect(result.startsWith('0x')).toBe(true)
  })
  test('should throw negative values', () => {
    const l1Gas = '-0x1'
    const l1DataGas = '-0x2'
    const l2Gas = '-0x3'

    expect(() => sumTotalGasConsumption(l1Gas, l1DataGas, l2Gas)).toThrow(
      'Invalid hex string input',
    )
  })
  test('should throw mixed positive and negative values', () => {
    const l1Gas = '0x1'
    const l1DataGas = '-0x2'
    const l2Gas = '0x3'

    expect(() => sumTotalGasConsumption(l1Gas, l1DataGas, l2Gas)).toThrow(
      'Invalid hex string input',
    )
  })
  test('should throw non-hexadecimal strings', () => {
    const l1Gas = '0x1g' // Invalid hex
    const l1DataGas = '0x2'
    const l2Gas = '0x3'

    expect(() => sumTotalGasConsumption(l1Gas, l1DataGas, l2Gas)).toThrow(
      'Invalid hex string input',
    )
  })
  test('should throw empty strings', () => {
    const l1Gas = ''
    const l1DataGas = '0x2'
    const l2Gas = '0x3'

    expect(() => sumTotalGasConsumption(l1Gas, l1DataGas, l2Gas)).toThrow(
      'Invalid hex string input',
    )
  })
  test('should handle large hex strings correctly', () => {
    const l1Gas = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
    const l1DataGas = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
    const l2Gas = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'

    const result = sumTotalGasConsumption(l1Gas, l1DataGas, l2Gas)
    expect(result).toBe('0x34cccccccccccccccccccccccccccccc9')
  })
  test('should handle gas values with leading zeros', () => {
    const l1Gas = '0x0000001a'
    const l1DataGas = '0x0000002b'
    const l2Gas = '0x0000003c'

    const result = sumTotalGasConsumption(l1Gas, l1DataGas, l2Gas)
    expect(result).toBe('0x8d')
  })
  test('should handle gas values with mixed case hex characters', () => {
    const l1Gas = '0x1A'
    const l1DataGas = '0x2B'
    const l2Gas = '0x3C'

    const result = sumTotalGasConsumption(l1Gas, l1DataGas, l2Gas)
    expect(result).toBe('0x8d')
  })
  test('should throw gas values with whitespace', () => {
    const l1Gas = ' 0x1a '
    const l1DataGas = ' 0x2b '
    const l2Gas = ' 0x3c '

    expect(() => sumTotalGasConsumption(l1Gas, l1DataGas, l2Gas)).toThrow(
      'Invalid hex string input',
    )
  })
  test('should throw gas values with mixed types', () => {
    const l1Gas = '0x1a'
    const l1DataGas = 42 // Number
    const l2Gas = '0x3c'

    // @ts-expect-error - Deliberately testing runtime behavior with wrong types
    expect(() => sumTotalGasConsumption(l1Gas, l1DataGas, l2Gas)).toThrow(
      'Invalid hex string input',
    )
  })
  test('should throw gas values with null', () => {
    const l1Gas = '0x1a'
    const l1DataGas = null
    const l2Gas = '0x3c'

    // @ts-expect-error - Deliberately testing runtime behavior with wrong types
    expect(() => sumTotalGasConsumption(l1Gas, l1DataGas, l2Gas)).toThrow(
      'Invalid hex string input',
    )
  })
  test('should handle gas values with different lengths', () => {
    const l1Gas = '0x1'
    const l1DataGas = '0x2b'
    const l2Gas = '0x3c000'

    const result = sumTotalGasConsumption(l1Gas, l1DataGas, l2Gas)
    expect(result).toBe('0x42030')
  })
  test("should throw gas values with leading '0x' in the middle", () => {
    const l1Gas = '0x1a'
    const l1DataGas = '0x0x2b' // Invalid hex
    const l2Gas = '0x3c'

    expect(() => sumTotalGasConsumption(l1Gas, l1DataGas, l2Gas)).toThrow(
      'Invalid hex string input',
    )
  })
})

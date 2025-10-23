import {
  validateEthAddress,
  validateSnAddress,
  validateBlockNumber,
} from '../../src/utils/validations'

describe('Test Address validations', () => {
  //
  //Testcases for ethereum address validations
  //
  it('return true if the ethereum address is valid', async () => {
    const result = validateEthAddress(
      '0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    )
    expect(result).toBe(true)
  })
  it('return false if length is either greater or less of ethereum address', async () => {
    const result = validateEthAddress(
      '0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc77',
    )
    expect(result).toBe(false)
  })
  it('Returns true if the zero address', async () => {
    const result = validateEthAddress(
      '0x0000000000000000000000000000000000000000',
    )
    expect(result).toBe(true)
  })
  it('returns false if ethereum address with characters outside the hexadecimal set', async () => {
    const result = validateEthAddress(
      '0x123g567890abcdef1234567890abcdef12345678',
    )
    expect(result).toBe(false)
  })
  it('retuns false if the empty string is passed instead of ethereum address', async () => {
    const result = validateEthAddress(' ')
    expect(result).toBe(false)
  })
  it('returns true if the address entered in capital letters', async () => {
    const result = validateEthAddress(
      '0XD3FCC84644DDD6B96F7C741B1562B82F9E004DC7',
    )
    expect(result).toBe(true)
  })
  //
  //Testcases fot the starknet address validations
  //
  it('return true if the starknet address is valid', async () => {
    const result = validateSnAddress(
      '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    )
    expect(result).toBe(true)
  })
  it('return false if length is  greater than starknet address', async () => {
    const result = validateSnAddress(
      '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e0004e4e4e4e',
    )
    expect(result).toBe(false)
  })
  it('Returns true if the zero address', async () => {
    const result = validateSnAddress(
      '0x0000000000000000000000000000000000000000000000000000000000',
    )
    expect(result).toBe(true)
  })
  it('returns false if starknet address with characters outside the hexadecimal set', async () => {
    const result = validateSnAddress(
      '0x123g567890abcdef1234567890abcdef1234567812312312312eddcdff',
    )
    expect(result).toBe(false)
  })
  it('retuns false if the empty string is passed instead of starknet address', async () => {
    const result = validateSnAddress('')
    expect(result).toBe(false)
  })
  it('return false if block number is a number but string', async () => {
    const result = validateBlockNumber('123')
    expect(result).toBe(false)
  })
  it('return true if block number is a hex number as string', async () => {
    const result = validateBlockNumber('0x123')
    expect(result).toBe(true)
  })
  it('return false if block number is a number not string', async () => {
    const result = validateBlockNumber(123)
    expect(result).toBe(false)
  })
  it('return false if block number is a negative number', async () => {
    const result = validateBlockNumber(-123)
    expect(result).toBe(false)
  })
  it('return false if block number is a decimal number', async () => {
    const result = validateBlockNumber(123.123)
    expect(result).toBe(false)
  })
})

describe('Validate block number', () => {
  it('should return false if block number is a valid number', () => {
    const result = validateBlockNumber(999)

    expect(result).toBe(false)
  })

  it("should return true if block number is the string 'latest'", () => {
    const result = validateBlockNumber('latest')

    expect(result).toBe(true)
  })

  it("should return true if block number is the string 'pending'", () => {
    const result = validateBlockNumber('pending')

    expect(result).toBe(true)
  })

  it('should return false if block number is less than 0', () => {
    const result = validateBlockNumber(-1)

    expect(result).toBe(false)
  })

  it("should return false if block number is a string other than 'latest' and 'pending'", () => {
    const result = validateBlockNumber('finalized')

    expect(result).toBe(false)
  })
})

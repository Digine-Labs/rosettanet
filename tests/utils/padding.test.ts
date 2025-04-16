import { addHexPadding, hexPadding } from '../../src/utils/padding'
describe('test hex padding', () => {
  it('do nothing if length greater than target length ', async () => {
    const result = hexPadding('0x1234567890', 5)
    expect(result).toBe('0x1234567890')
  })

  it('add padding if length less than target length ', async () => {
    const result = hexPadding('0x1234', 10)
    expect(result).toBe('0x0000001234')
  })

  it('add padding if string is empty', async () => {
    const result = hexPadding('', 10)
    expect(result).toBe('0x0000000000')
  })
})

describe('test addHexPadding', () => {
  it('length check', async () => {
    const result = addHexPadding('0x1234567890', 24, true)
    expect(result.length).toBe(24 + 2)
  })

  it('compare two functions', async () => {
    const result = addHexPadding('0x1234', 6, true)

    const result2 = hexPadding('0x1234', 6)
    expect(result).toBe(result2)
  })
})
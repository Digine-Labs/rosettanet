import {
  convertHexChunkIntoFeltArray,
  convertHexIntoBytesArray,
} from '../../src/utils/felt'
describe('Test split of signed raw transaction', () => {
  it('Splits data can fit one felt', async () => {
    const data = '0xabcabcabc'

    const chunks: Array<string> = convertHexChunkIntoFeltArray(data)
    expect(chunks.length).toBe(1)
    expect(chunks[0]).toBe(data)
  })
  it('Splits data without 0x prefix', async () => {
    const data = 'abcabcabc'

    const chunks: Array<string> = convertHexChunkIntoFeltArray(data)
    expect(chunks.length).toBe(1)
    expect(chunks[0]).toBe('0xabcabcabc')
  })
  it('Splits data more than felt limit', async () => {
    const data =
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'

    const chunks: Array<string> = convertHexChunkIntoFeltArray(data)
    expect(chunks.length).toBe(2)
    expect(chunks[0]).toBe(
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
    )
    expect(chunks[1]).toBe('0xFF')
  })
  it('Splits data to bytes', async () => {
    const data = '0xABCABDABEABFFFF'

    const chunks: Array<string> = convertHexIntoBytesArray(data)
    expect(chunks.length).toBe(8)
    expect(chunks[0]).toBe('0xAB')
    expect(chunks[1]).toBe('0xCA')
  })
})

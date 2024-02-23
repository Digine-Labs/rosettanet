import { hexPadding } from "../../src/utils/padding"
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

  
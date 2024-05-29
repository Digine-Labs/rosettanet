import { snKeccak } from '../../src/utils/sn_keccak'

describe('Test starknet keccak', () => {
  it('should return 64 bytes keccak256 hash', async () => {
    const result = snKeccak('getAmountsOut')
    expect(result).toBe(
      '0x362a97af04f242c64063cc2f83bc56cb39cb5f3bb440baff3350d756d4c1caf',
    )
  })

  it('should return 64 bytes keccak256 hash', async () => {
    const result = snKeccak('balanceOf')
    expect(result).toBe(
      '0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e',
    )
  })
})

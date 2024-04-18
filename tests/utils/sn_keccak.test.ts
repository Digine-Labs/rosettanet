import { snKeccak } from '../../src/utils/sn_keccak'

describe('Test starknet keccak', () => {
  it('should return 64 bytes keccak256 hash', async () => {
    const result = snKeccak('getAmountsOut')
    expect(result).toBe(
      '0x362a97af04f242c64063cc2f83bc56cb39cb5f3bb440baff3350d756d4c1caf',
    )
  })
})

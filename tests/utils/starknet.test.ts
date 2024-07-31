import {
  getContractsMethods,
  getContractsCustomStructs,
} from '../../src/utils/starknet'
import { getRpc } from '../../src/utils/getRpc'
describe('test get contract methods from starknet contract abi', () => {
  it('should return contract methods', async () => {
    const contractAddress =
      '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'
    await getContractsMethods(contractAddress)
  })
})

describe('test getContractsCustomStructs', () => {
  it('should return custom structs', async () => {
    const customStructs = await getContractsCustomStructs(
      '0x05f2aff796caf3f09dda2cb66400d2f27f6e503ba09570f3a2cf23ecaefe1e00',
      getRpc(),
    )
    expect(customStructs).toEqual([
      {
        type: 'struct',
        name: 'core::integer::u256',
        members: [
          {
            name: 'low',
            type: 'core::integer::u128',
          },
          {
            name: 'high',
            type: 'core::integer::u128',
          },
        ],
      },
    ])
  })

  it('should return empty array for invalid contract address', async () => {
    const customStructs = await getContractsCustomStructs(
      '0xZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
      getRpc(),
    )
    expect(customStructs).toEqual('Invalid Starknet addreess')
  })
})

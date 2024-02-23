import {
  getEthAddressFromSnAddress,
  getSnAddressFromEthAddress,
} from '../../src/utils/wrapper'

describe('Tests registry contract', () => {
  const ETH_ADDRESS = '0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'
  const SN_ADDRESS =
    '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'

  it('Returns Ethereum address from starknet address', async () => {
    const ethAddress = await getEthAddressFromSnAddress(SN_ADDRESS)

    expect(ethAddress).toBe(ETH_ADDRESS)
  })

  it('Returns Starknet address from ethereum address', async () => {
    const snAddress = await getSnAddressFromEthAddress(ETH_ADDRESS)

    expect(snAddress).toBe(SN_ADDRESS)
  })
})

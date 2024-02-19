import { getChainIdHandler } from '../../src/rpc/calls/chainId'
describe('Test Chain ID request', () => {
  it('Returns chain ID', () => {
    const result = getChainIdHandler()

    expect(result.result).toBe('0x534e5f4d41494e')
  })
})

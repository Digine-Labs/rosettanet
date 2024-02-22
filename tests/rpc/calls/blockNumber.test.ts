import { blockNumberHandler } from '../../../src/rpc/calls/blockNumber'
import { RPCResponse } from '../../../src/types/types'

describe('Test block number request testnet', () => {
  it('Returns block number', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
      id: 1,
    }
    const response: RPCResponse = <RPCResponse>await blockNumberHandler(request)

    expect(typeof response.result).toBe('string')
    expect(response.result).toMatch(/^0x[0-9a-f]+$/)
    expect(parseInt(<string>response.result, 16)).toBeGreaterThan(0)
  })
})

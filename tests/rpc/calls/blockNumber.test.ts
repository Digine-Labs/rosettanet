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
    const result: RPCResponse = <RPCResponse>await blockNumberHandler(request)

    expect(typeof result.result).toBe('number')
    expect(result.result).toBeGreaterThan(0)
  })
})

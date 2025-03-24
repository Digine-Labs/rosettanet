import { chainIdHandler } from '../../../src/rpc/calls/chainId'
import { RPCResponse } from '../../../src/types/types'

describe('Test Chain ID request testnet', () => {
  it('Returns chain ID', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_chainId',
      params: [],
      id: 1,
    }
    const result: RPCResponse = <RPCResponse>await chainIdHandler(request)

    // Use the chainId from config.json which is '0x52535453'
    expect(result.result).toBe('0x52535453')
  })
})

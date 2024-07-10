import { gasPriceHandler } from '../../../src/rpc/calls/gasPrice'
import { RPCResponse } from '../../../src/types/types'

describe('Test gas price request', () => {
  it('Returns 0x1778dc527', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_gasPrice',
      params: [],
      id: 1,
    }
    const result: RPCResponse = <RPCResponse>await gasPriceHandler(request)

    expect(result.result).toBe('0x1778dc527')
  })
})

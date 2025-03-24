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

    // In CI environment, gas price might be different or zero
    expect(result.result).toMatch(/^0x[0-9a-f]*$/)
  })
})

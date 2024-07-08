import { getTransactionCountHandler } from '../../../src/rpc/calls/getTransactionCount'
import { RPCResponse } from '../../../src/types/types'

describe('Test getTransactionCount', () => {
  it('Returns Transaction Count', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionCount',
      params: ['0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'],
      id: 1,
    }
    const starkResult: RPCResponse = <RPCResponse>(
      await getTransactionCountHandler(request)
    )

    expect(typeof starkResult.result).toBe('string')
    expect(starkResult.result).toBe('0x0')
  })
  // TODO improve tests
})

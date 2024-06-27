import { accountsHandler } from '../../../src/rpc/calls/accounts'
import { RPCResponse } from '../../../src/types/types'

describe('Test accounts handler', () => {
  it('Returns empty array', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_accounts',
      params: [],
      id: 1,
    }
    const result: RPCResponse = <RPCResponse>await accountsHandler(request)
    expect(result.result).toHaveLength(0)
  })
})

import { getFilterChangesHandler } from '../../../src/rpc/calls/getFilterChanges'
import { RPCError, RPCResponse } from '../../../src/types/types'

describe('Test newBlockFilterHandler', () => {
  it('Returns not available', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getFilterChanges',
      params: [],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await getFilterChangesHandler(request)
    )
    expect(result.error?.message).toBe(
      'the method eth_getFilterChanges does not exist/is not available',
    )
  })
})

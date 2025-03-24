import { getFilterChangesHandler } from '../../../src/rpc/calls/getFilterChanges'
import { RPCError, RPCResponse } from '../../../src/types/types'
import { assertError } from '../../utils/assertResponse'

describe('Test newBlockFilterHandler', () => {
  it('Returns not available', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getFilterChanges',
      params: [],
      id: 1,
    }
    const result: RPCResponse | RPCError =
      await getFilterChangesHandler(request)

    // Use the new assertion helper
    assertError(
      result,
      'the method eth_getFilterChanges does not exist/is not available',
    )
  })
})

import { unsubscribeHandler } from '../../../src/rpc/calls/unsubscribe'
import { RPCError, RPCResponse } from '../../../src/types/types'
import { assertError } from '../../utils/assertResponse'

describe('Test getWork handler', () => {
  it('Returns not available', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_unsubscribe',
      params: ['0x0'],
      id: 1,
    }
    const result: RPCResponse | RPCError = await unsubscribeHandler(request)

    // Use the new assertion helper
    assertError(
      result,
      'the method eth_unsubscribe does not exist/is not available',
    )
  })

  it('Gives error when parameter length != 1', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_unsubscribe',
      params: [],
      id: 1,
    }
    const result: RPCResponse | RPCError = await unsubscribeHandler(request)

    // Use the new assertion helper
    assertError(result, 'Invalid argument, Parameter lenght should be 1.')
  })
})

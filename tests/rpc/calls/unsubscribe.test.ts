import { unsubscribeHandler } from '../../../src/rpc/calls/unsubscribe'
import { RPCError, RPCResponse } from '../../../src/types/types'

describe('Test getWork handler', () => {
  it('Returns not available', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_unsubscribe',
      params: ['0x0'],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await unsubscribeHandler(request)
    )
    expect(result.error?.message).toBe(
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
    const result: RPCResponse | RPCError = <RPCResponse>(
      await unsubscribeHandler(request)
    )
    expect(result.error?.message).toBe(
      'Invalid argument, Parameter lenght should be 1.',
    )
  })
})

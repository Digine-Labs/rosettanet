import { traceBlockHandler } from '../../../src/rpc/calls/traceBlock'
import { RPCError, RPCResponse } from '../../../src/types/types'

describe('Test getWork handler', () => {
  it('Returns not available', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'trace_block',
      params: ['0x0'],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await traceBlockHandler(request)
    )
    expect(result.error?.message).toBe(
      'the method trace_block does not exist/is not available',
    )
  })

  it('Gives error when parameter length != 1', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'trace_block',
      params: [],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await traceBlockHandler(request)
    )
    expect(result.error?.message).toBe(
      'Invalid argument, Parameter lenght should be 1.',
    )
  })
})

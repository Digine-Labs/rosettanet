import { netListeningHandler } from '../../../src/rpc/calls/netListening'
import { RPCError, RPCResponse } from '../../../src/types/types'

describe('Test net_listening handler', () => {
  it('Returns true', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'net_listening',
      params: [],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await netListeningHandler(request)
    )
    expect(result.result).toBe(true)
  })

  it('Gives error when parameter length > 0', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'net_listening',
      params: ['0x0'],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await netListeningHandler(request)
    )
    expect(result.error?.message).toBe(
      'Invalid argument, Parameter should length 0.',
    )
  })
})

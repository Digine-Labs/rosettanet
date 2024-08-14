import { netPeerCountHandler } from '../../../src/rpc/calls/netPeerCount'
import { RPCError, RPCResponse } from '../../../src/types/types'

describe('Test netPeerCount handler', () => {
  it('Returns 0x0', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'net_peerCount',
      params: [],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await netPeerCountHandler(request)
    )
    expect(result.result).toBe('0x0')
  })

  it('Gives error when parameter length > 0', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'net_peerCount',
      params: ['0x0'],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await netPeerCountHandler(request)
    )
    expect(result.error?.message).toBe(
      'Invalid argument, Parameter should length 0.',
    )
  })
})

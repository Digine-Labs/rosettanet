import { protocolVersionHandler } from '../../../src/rpc/calls/protocolVersion'
import { RPCError, RPCResponse } from '../../../src/types/types'

describe('Test protocol version handler', () => {
  it('Returns protocol version', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_procotolVersion',
      params: [],
      id: 1,
    }
    const response: RPCResponse | RPCError = <RPCResponse>(
      await protocolVersionHandler(request)
    )

    expect(typeof response.result).toBe('string')
    expect(response.result).toMatch(/^0x[0-9a-fA-F]+$/)
  })

  it('Returns error when parameter length > 0', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_protocolVersion',
      params: ['0x0'],
      id: 1,
    }
    const response: RPCResponse | RPCError = <RPCResponse>(
      await protocolVersionHandler(request)
    )

    expect(response.error?.message).toBe(
      'Invalid argument, Parameter field should be empty.',
    )
  })
})

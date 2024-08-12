import { web3clientVersionHandler } from '../../../src/rpc/calls/web3clientVersion'
import { RPCError, RPCResponse } from '../../../src/types/types'

describe('Test client version handler', () => {
  it('Returns client version', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'web3_clientVersion',
      params: [],
      id: 1,
    }
    const response: RPCResponse | RPCError = <RPCResponse>(
      await web3clientVersionHandler(request)
    )

    expect(typeof response.result).toBe('string')
    expect(response.result).toMatch(/^starknet\/rosettanet\/\d+\.\d+\.\d+$/)
  })

  it('Returns error when parameter length > 0', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'web3_clientVersion',
      params: ['0x0'],
      id: 1,
    }
    const response: RPCResponse | RPCError = <RPCResponse>(
      await web3clientVersionHandler(request)
    )

    expect(response.error?.message).toBe(
      'Invalid argument, Parameter field should be empty.',
    )
  })
})

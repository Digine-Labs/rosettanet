import { miningHandler } from '../../../src/rpc/calls/mining'
import { RPCError, RPCResponse } from '../../../src/types/types'

describe('Test getWork handler', () => {
  it('Returns not available', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_mining',
      params: [],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await miningHandler(request)
    )
    expect(result.result).toBe(false)
  })

  it('Gives error when parameter length > 0', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_mining',
      params: ['0x0'],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await miningHandler(request)
    )
    expect(result.error?.message).toBe(
      'Invalid argument, Parameter should length 0.',
    )
  })
})

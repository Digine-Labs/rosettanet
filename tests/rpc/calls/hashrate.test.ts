import { hashrateHandler } from '../../../src/rpc/calls/hashrate'
import { RPCError, RPCResponse } from '../../../src/types/types'
import { assertError } from '../../utils/assertResponse'

describe('Test getWork handler', () => {
  it('Returns not available', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_hashrate',
      params: [],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await hashrateHandler(request)
    )
    expect(result.result).toBe('0x0')
  })

  it('Gives error when parameter length > 0', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_hashrate',
      params: ['0x0'],
      id: 1,
    }
    const result: RPCResponse | RPCError = await hashrateHandler(request)

    // Use the new assertion helper
    assertError(result, 'Invalid argument, Parameter should length 0.')
  })
})

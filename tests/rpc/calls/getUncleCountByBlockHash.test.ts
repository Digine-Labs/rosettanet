import { getUncleCountByBlockHashHandler } from '../../../src/rpc/calls/getUncleCountByBlockHash'
import { RPCError, RPCResponse } from '../../../src/types/types'

describe('Test getWork handler', () => {
  it('Returns not available', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getUncleByBlockHashAndIndexHandler',
      params: [
        '0x07410ed96ff95e62c484444431302b7531d2bf9633758e682aab567407484f9a',
      ],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await getUncleCountByBlockHashHandler(request)
    )
    expect(result.error?.message).toBe(
      'the method eth_getUncleCountByBlockHash does not exist/is not available',
    )
  })

  it('Gives error with wrong block hash', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getUncleByBlockHashAndIndexHandler',
      params: [
        '0xzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
      ],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await getUncleCountByBlockHashHandler(request)
    )
    expect(result.error?.message).toBe('Invalid argument, Invalid blockHash.')
  })

  it('Gives error when parameter length != 1', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getUncleByBlockHashAndIndexHandler',
      params: ['0x0', '0x0'],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await getUncleCountByBlockHashHandler(request)
    )
    expect(result.error?.message).toBe(
      'Invalid argument, Parameter lenght should be 1.',
    )
  })
})

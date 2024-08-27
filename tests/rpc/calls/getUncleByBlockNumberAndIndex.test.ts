import { getUncleByBlockNumberAndIndexHandler } from '../../../src/rpc/calls/getUncleByBlockNumberAndIndex'
import { RPCError, RPCResponse } from '../../../src/types/types'

describe('Test getUncleByBlockNumberAndIndexHandler', () => {
  it('Returns not available', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getUncleByBlockHashAndIndex',
      params: [
        '0x07410ed96ff95e62c484444431302b7531d2bf9633758e682aab567407484f9a',
        '0x02',
      ],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await getUncleByBlockNumberAndIndexHandler(request)
    )
    expect(result.error?.message).toBe(
      'the method eth_getUncleByBlockNumberAndIndex does not exist/is not available',
    )
  })

  it('Gives error with wrong block hash', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getUncleByBlockHashAndIndex',
      params: [
        '0xzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
        '0x02',
      ],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await getUncleByBlockNumberAndIndexHandler(request)
    )
    expect(result.error?.message).toBe('Invalid argument, Invalid blockNumber.')
  })

  it('Gives error when parameter length != 2', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getUncleByBlockHashAndIndex',
      params: ['0x0'],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await getUncleByBlockNumberAndIndexHandler(request)
    )
    expect(result.error?.message).toBe(
      'Invalid argument, Parameter lenght should be 2.',
    )
  })
})

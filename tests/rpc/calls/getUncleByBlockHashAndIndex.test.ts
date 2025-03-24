import { getUncleByBlockHashAndIndexHandler } from '../../../src/rpc/calls/getUncleByBlockHashAndIndex'
import { RPCError, RPCResponse } from '../../../src/types/types'
import { assertError } from '../../utils/assertResponse'

describe('Test getWork handler', () => {
  it('Returns not available', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getUncleByBlockHashAndIndexHandler',
      params: [
        '0x07410ed96ff95e62c484444431302b7531d2bf9633758e682aab567407484f9a',
        '0x02',
      ],
      id: 1,
    }
    const result: RPCResponse | RPCError =
      await getUncleByBlockHashAndIndexHandler(request)

    // Use the new assertion helper
    assertError(
      result,
      'the method eth_getUncleByBlockHashAndIndex does not exist/is not available',
    )
  })

  it('Gives error with wrong block hash', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getUncleByBlockHashAndIndexHandler',
      params: [
        '0xzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
        '0x02',
      ],
      id: 1,
    }
    const result: RPCResponse | RPCError =
      await getUncleByBlockHashAndIndexHandler(request)

    // Use the new assertion helper
    assertError(result, 'Invalid argument, Invalid block hash.')
  })

  it('Gives error when parameter length != 2', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getUncleByBlockHashAndIndexHandler',
      params: ['0x0'],
      id: 1,
    }
    const result: RPCResponse | RPCError =
      await getUncleByBlockHashAndIndexHandler(request)

    // Use the new assertion helper
    assertError(result, 'Invalid argument, Parameter lenght should be 2.')
  })
})

import { getUncleCountByBlockNumberHandler } from '../../../src/rpc/calls/getUncleCountByBlockNumber'
import { RPCError, RPCResponse } from '../../../src/types/types'
import { assertError } from '../../utils/assertResponse'

describe('Test getUncleCountByBlockNumberHandler', () => {
  it('Returns not available', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getUncleCountByBlockNumber',
      params: [
        '0x07410ed96ff95e62c484444431302b7531d2bf9633758e682aab567407484f9a',
      ],
      id: 1,
    }
    const result: RPCResponse | RPCError =
      await getUncleCountByBlockNumberHandler(request)

    // Use the new assertion helper
    assertError(
      result,
      'the method eth_getUncleCountByBlockNumber does not exist/is not available',
    )
  })

  it('Gives error with wrong block hash', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getUncleCountByBlockNumber',
      params: [
        '0xzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
      ],
      id: 1,
    }
    const result: RPCResponse | RPCError =
      await getUncleCountByBlockNumberHandler(request)

    // Use the new assertion helper
    assertError(result, 'Invalid argument, Invalid blockNumber.')
  })

  it('Gives error when parameter length != 1', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getUncleCountByBlockNumber',
      params: ['0x0', '0x0'],
      id: 1,
    }
    const result: RPCResponse | RPCError =
      await getUncleCountByBlockNumberHandler(request)

    // Use the new assertion helper
    assertError(result, 'Invalid argument, Parameter lenght should be 1.')
  })
})

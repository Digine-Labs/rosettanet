import { getWorkHandler } from '../../../src/rpc/calls/getWork'
import { RPCError, RPCResponse } from '../../../src/types/types'
import { assertError } from '../../utils/assertResponse'

describe('Test getWork handler', () => {
  it('Returns not available', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getWork',
      params: [],
      id: 1,
    }
    const result: RPCResponse | RPCError = await getWorkHandler(request)

    // Use the new assertion helper
    assertError(
      result,
      'the method eth_getWork does not exist/is not available',
    )
  })

  it('Gives error when parameter length > 0', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getWork',
      params: ['0x0'],
      id: 1,
    }
    const result: RPCResponse | RPCError = await getWorkHandler(request)

    // Use the new assertion helper
    assertError(result, 'Invalid argument, Parameter should length 0.')
  })
})

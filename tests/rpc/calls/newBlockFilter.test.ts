import { newBlockFilterHandler } from '../../../src/rpc/calls/newBlockFilter'
import { RPCError, RPCResponse } from '../../../src/types/types'

describe('Test newBlockFilterHandler', () => {
  it('Returns not available', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_newBlockFilter',
      params: [],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await newBlockFilterHandler(request)
    )
    expect(result.error?.message).toBe(
      'the method eth_newBlockFilter does not exist/is not available',
    )
  })
})

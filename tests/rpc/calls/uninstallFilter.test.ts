import { uninstallFilterHandler } from '../../../src/rpc/calls/uninstallFilter'
import { RPCError, RPCResponse } from '../../../src/types/types'

describe('Test newBlockFilterHandler', () => {
  it('Returns not available', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_uninstallFilter',
      params: [],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await uninstallFilterHandler(request)
    )
    expect(result.error?.message).toBe(
      'the method eth_uninstallFilter does not exist/is not available',
    )
  })
})

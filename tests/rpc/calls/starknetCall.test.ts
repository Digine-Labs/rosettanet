import { starknetCallHandler } from '../../../src/rpc/calls/starknetCall'
import { RPCResponse } from '../../../src/types/types'

describe('Test Chain ID request with starknet method name', () => {
  it('Returns chain ID', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'starknet_chainId',
      params: [],
      id: 1,
    }
    const result: RPCResponse = <RPCResponse>await starknetCallHandler(request)

    expect(result.result).toBe('0x534e5f5345504f4c4941')
  })
})

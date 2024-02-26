import { getBalanceHandler } from '../../../src/rpc/calls/getBalance'
import { RPCResponse } from '../../../src/types/types'

describe('Test get Balance request testnet', () => {
  it('Returns Balance for address', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: ['0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'],
      id: 1,
    }
    const starkResult: RPCResponse = <RPCResponse>(
      await getBalanceHandler(request)
    )

    expect(typeof starkResult.result).toBe('string')
    expect(starkResult.result).toBe('4000000000000000')
  })
})

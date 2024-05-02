import { getBalanceHandler } from '../../../src/rpc/calls/getBalance'
import { RPCResponse } from '../../../src/types/types'

describe('Test get Balance request testnet', () => {
  it('Returns Balance for address', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: ['0x6cda29cfd06bfb143fd5cd04cc2d28b7ab8550c8'],
      id: 1,
    }
    const starkResult: RPCResponse = <RPCResponse>(
      await getBalanceHandler(request)
    )

    expect(typeof starkResult.result).toBe('string')
    expect(starkResult.result).toBe('0x8a948e3174b159c')
  })

  it('Returns invalid eth address', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: ['0x0002'],
      id: 1,
    }
    const starkResult: RPCResponse = <RPCResponse>(
      await getBalanceHandler(request)
    )

    expect(starkResult).toEqual(
      expect.objectContaining({
        data: 'invalid eth address',
      }),
    )
  })

  it('Returns 0x0 if the address does not exist in the registry', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: ['0x5F04693482cfC121FF244cB3c3733aF712F9df02'],
      id: 1,
    }
    const starkResult: RPCResponse = <RPCResponse>(
      await getBalanceHandler(request)
    )

    expect(starkResult.result).toBe('0x0')
  })
})

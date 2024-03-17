import {
  getBalanceHandler,
  getBalanceHandlerSnResponse,
} from '../../../src/rpc/calls/getBalance'
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
    expect(starkResult.result).toBe('0xe35fa931a0000')
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

describe('Test snGetBalance request testnet', () => {
  it('Returns Balance for address', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: ['0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'],
      id: 1,
    }
    const starkResult: RPCResponse = <RPCResponse>(
      await getBalanceHandlerSnResponse(request)
    )
    expect(typeof starkResult.result).toBe('object')
    expect(starkResult.result).toStrictEqual(['0x1550f7dca70000', '0x0'])
  })
})

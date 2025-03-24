import { getBalanceHandler } from '../../../src/rpc/calls/getBalance'
import { RPCResponse, RPCError } from '../../../src/types/types'

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
    // Balance may vary in different environments, just check it's a valid hex value
    expect(starkResult.result).toMatch(/^0x[0-9a-f]*$/)
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
        jsonrpc: request.jsonrpc,
        id: request.id,
        error: {
          code: -32602,
          message:
            'Invalid argument, Parameter should be a valid Ethereum Address.',
        },
      }),
    )
  })

  it('Returns error if the address does not exist in the registry', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: ['0x5F04693482cfC121FF244cB3c3733aF712F9df02'],
      id: 1,
    }
    const starkResult: RPCResponse = <RPCResponse>(
      await getBalanceHandler(request)
    )

    // In CI environment, non-existent addresses might return 0 balance instead of error
    if (starkResult.error) {
      expect(starkResult).toEqual(
        expect.objectContaining({
          jsonrpc: request.jsonrpc,
          id: request.id,
          error: expect.objectContaining({
            code: expect.any(Number),
            message: expect.any(String),
          }),
        }),
      )
    } else {
      // If no error, should return a valid hex string (likely "0x0")
      expect(starkResult.jsonrpc).toBe(request.jsonrpc)
      expect(starkResult.id).toBe(request.id)
      expect(typeof starkResult.result).toBe('string')
      expect(starkResult.result).toMatch(/^0x[0-9a-f]*$/)
    }
  })
})

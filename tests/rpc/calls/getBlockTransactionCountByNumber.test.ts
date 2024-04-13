import { getBlockTransactionCountByNumberHandler } from '../../../src/rpc/calls/getBlockTransactionCountByNumber'
import { RPCError, RPCResponse } from '../../../src/types/types'

describe('Test getBlockTransactionCountByNumber request testnet', () => {
  it('Returns block transaction count', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBlockTransactionCountByNumber',
      params: [0],
      id: 1,
    }
    const response: RPCResponse = <RPCResponse>(
      await getBlockTransactionCountByNumberHandler(request)
    )
    expect(typeof response.result).toBe('string')
    expect(response.result).toBe('0x1a')
  }),
    it('Returns block transaction count', async () => {
      const request = {
        jsonrpc: '2.0',
        method: 'eth_getBlockTransactionCountByNumber',
        params: [1],
        id: 1,
      }
      const response: RPCResponse = <RPCResponse>(
        await getBlockTransactionCountByNumberHandler(request)
      )
      expect(typeof response.result).toBe('string')
      expect(response.result).toBe('0x4')
    })
  it('Error if invalid block number', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBlockTransactionCountByNumber',
      params: ['0x1'],
      id: 1,
    }
    const response: RPCError = <RPCError>(
      await getBlockTransactionCountByNumberHandler(request)
    )
    expect(response).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid block number',
    })
  })
  it('Error if no params', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBlockTransactionCountByNumber',
      params: [],
      id: 1,
    }
    const response: RPCError = <RPCError>(
      await getBlockTransactionCountByNumberHandler(request)
    )
    expect(response).toMatchObject({
      code: 7979,
      message: 'Starknet RPC Error',
      data: 'Params should not be empty',
    })
  })
  it('Error if block number is empty string', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBlockTransactionCountByNumber',
      params: [''],
      id: 1,
    }
    const response: RPCError = <RPCError>(
      await getBlockTransactionCountByNumberHandler(request)
    )
    expect(response).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid block number',
    })
  })
  it('Error if block number is non-existent', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBlockTransactionCountByNumber',
      params: [1000000000],
      id: 1,
    }
    const response: RPCError = <RPCError>(
      await getBlockTransactionCountByNumberHandler(request)
    )
    expect(response).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',

      // RPC response when block not found is like this:
      //   {
      //     jsonrpc: '2.0',
      //     error: { code: 24, message: 'Block not found' },
      //     id: 1
      //   }
      data: Object.create({
        code: 24,
        message: 'Block not found',
      }) as string,
    })
  })
})

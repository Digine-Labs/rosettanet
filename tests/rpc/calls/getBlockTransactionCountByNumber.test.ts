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
    expect(response.result).toBe('0x7')
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
      expect(response.result).toBe('0x1')
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
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter should be valid block number.',
      },
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
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter should be valid block number.',
      },
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
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter should be valid block number.',
      },
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
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message:
          'Invalid argument, Parameter "block_number" can not be higher than current live block number of network.',
      },
    })
  })
})

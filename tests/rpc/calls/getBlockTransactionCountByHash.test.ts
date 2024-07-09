import { getBlockTransactionCountByHashHandler } from '../../../src/rpc/calls/getBlockTransactionCountByHash'
import { RPCError, RPCResponse } from '../../../src/types/types'

describe('Test get Block Count By Hash request testnet ', () => {
  it('Returns block transactions count by hash', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBlockTransactionCountByHash',
      params: [
        '0x07410ed96ff95e62c484444431302b7531d2bf9633758e682aab567407484f9a',
      ],
      id: 0,
    }

    const response: RPCResponse = <RPCResponse>(
      await getBlockTransactionCountByHashHandler(request)
    )

    expect(typeof response.result).toBe('string')
    expect(response.result).toBe('0x2d') // Verify here: https://testnet.starkscan.co/block/0x0627dadf33aecc02abe2530f1f2b091a24e7a119cc03851be4d559af47f22e93#transactions
  })

  it('Returns error message if block hash is invalid', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBlockTransactionCountByHash',
      params: [
        '0xZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ', // Invalid block hash
      ],
      id: 0,
    }

    const response: RPCError = <RPCError>(
      await getBlockTransactionCountByHashHandler(request)
    )

    expect(response).toMatchObject({
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter should be valid block hash.',
      },
    })
  })

  it('Returns error message if parameter length is invalid', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBlockTransactionCountByHash',
      params: [
        '0xZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
        '0x0',
        '0x0',
      ],
      id: 0,
    }

    const response: RPCError = <RPCError>(
      await getBlockTransactionCountByHashHandler(request)
    )

    expect(response).toMatchObject({
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter should be valid block hash.',
      },
    })
  })
})

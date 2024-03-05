import { getBlockTransactionCountByHashHandler } from '../../../src/rpc/calls/getBlockTransactionCountByHash'
import { RPCError, RPCResponse } from '../../../src/types/types'

describe('Test get Block Count By Hash request testnet ', () => {
  it('Returns block transactions count by hash', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBlockTransactionCountByHash',
      params: [
        '0x0627dadf33aecc02abe2530f1f2b091a24e7a119cc03851be4d559af47f22e93',
      ],
      id: 0,
    }

    const response: RPCResponse = <RPCResponse>(
      await getBlockTransactionCountByHashHandler(request)
    )

    expect(typeof response.result).toBe('string')
    expect(response.result).toBe('0x29') // Verify here: https://testnet.starkscan.co/block/0x0627dadf33aecc02abe2530f1f2b091a24e7a119cc03851be4d559af47f22e93#transactions
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
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid block hash',
    })
  })
})

import { getTransactionCountHandler } from '../../../src/rpc/calls/getTransactionCount'
import { RPCResponse, RPCError } from '../../../src/types/types'

describe('Test getTransactionCountHandler', () => {
  it('Returns transaction count if the request is valid', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionCount',
      params: [
        '0x03fdb18709414d4bc11803c96fea5bc761e944209df9a8bca8db06bfdcc2c8ea',
      ],
      id: 1,
    }

    const starkResult: RPCResponse = <RPCResponse>(
      await getTransactionCountHandler(request)
    )
    expect(starkResult).toMatchObject({
      id: request.id,
      jsonrpc: request.jsonrpc,
      result: '0x22',
    })
  })

  it('Return error message for invalid block hash', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionCount',
      params: [
        '0xZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
      ],
      id: 0,
    }

    const starkResult: RPCError = <RPCError>(
      await getTransactionCountHandler(request)
    )
    expect(starkResult).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid block hash',
    })
  })
})

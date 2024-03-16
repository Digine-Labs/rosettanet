import { getTransactionCountHandler } from '../../../src/rpc/calls/getTransactionCount'
import {RPCResponse, RPCError } from '../../../src/types/types'

describe('Test getTransactionCountHandler', () => {
  it('Returns transaction details for a valid request', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionCount',
      params: [
        '0x0643066f85b42ff5f2859f0048c60beea2fd8c12e696c3b5a159069f2f8ebada'
      ],
      id: 1,
    }

    const starkResult: RPCResponse = <RPCResponse>(await getTransactionCountHandler(request));
    // Verify the structure and content of the response
    expect(typeof starkResult.result)
    expect(starkResult).toMatchObject({
      id: request.id,
      jsonrpc: '2.0',
      result: '0x4f'
    })
  })

  it('Returns transaction details for invalid block hash', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionCount',
      params: [
        '0xZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ'
      ],
      id: 0,
    }

    const starkResult: RPCError = <RPCError>(await getTransactionCountHandler(request));
    expect(starkResult).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid block hash',
    })
  })

});

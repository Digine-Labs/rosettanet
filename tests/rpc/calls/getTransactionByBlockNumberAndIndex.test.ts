import { getTransactionsByBlockNumberAndIndexHandler } from '../../../src/rpc/calls/getTransactionByBlockNumberAndIndex'
import { RPCError, RPCResponse } from '../../../src/types/types'

describe('Test getTransactionByBlockNumberAndIndex', () => {
  it('Returns transaction details for a valid request', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionByBlockNumberAndIndex',
      params: [470207, '0x03'],
      id: 0,
    }

    const starknetResult: RPCResponse = <RPCResponse>(
      await getTransactionsByBlockNumberAndIndexHandler(request)
    )

    expect(typeof starknetResult.result).toBe('object')
    expect(starknetResult).toMatchObject({
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: {
        blockHash:
          '0x67825017bb8055f7301eb2423bf7fc18f2381fdc4b32041d60267d976368121',
        blockNumber: '0x72cbf',
        from: '0x303aa89e04e377a0a97f699bbffd123cf2b63ccf5208ab42fbaf90adf0684fd',
        gas: '0x2ddeede0',
        gasPrice: '0x0x1869e',
        hash: '0x7eb80027b84d4971191d691e9f8cd137dc665ac3e7a26edb7079ec91e76261a',
        input:
          '0x0x10x68c6b0cab1423338dd3ee6affb14a8e53ec0c64c27075d6137f6b8d2b4ccc730x2f0b3c5710379609eb5495f1ecd348cb28167711b73609fe565a727345503540x00x00x0',
        nonce: '0x1',
        to: '0x',
        transactionIndex: '0x3',
        value: '0x0',
        v: '0x1b',
        r: '0x6e1e1c31d2f404fdcd0e731e0d9745627fca9174068100b3cb0ac3306add79f',
        s: '0x38a95ff436b00ca359a6e7f487ccded84283d38db99250a287819de031aa5dd',
      },
    })
  })

  it('Returns RPC error message when invalid block number', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionByBlockNumberAndIndex',
      params: [-1, '0x03'],
      id: 0,
    }

    const starknetResult: RPCResponse = <RPCResponse>(
      await getTransactionsByBlockNumberAndIndexHandler(request)
    )

    expect(starknetResult).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid block number',
    })
  })

  it('Returns RPC error when invalid transaction index is used', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionByBlockNumberAndIndex',
      params: [
        470207,
        '0xZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
      ],
      id: 0,
    }

    const starknetResult: RPCResponse = <RPCResponse>(
      await getTransactionsByBlockNumberAndIndexHandler(request)
    )
    expect(starknetResult).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Transaction not found or index out of bounds',
    })
  })

  it('Returns error if parameter list is empty', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionsByBlockNumberAndIndex',
      params: [],
      id: 0,
    }
    const response: RPCError = <RPCError>(
      await getTransactionsByBlockNumberAndIndexHandler(request)
    )
    expect(response).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Two parameters expected',
    })
  })

  it('Returns error if block number is non-existent', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionsByBlockNumberAndIndex',
      params: [1000000000000, '0x03'],
      id: 1,
    }
    const response: RPCError = <RPCError>(
      await getTransactionsByBlockNumberAndIndexHandler(request)
    )
    expect(response).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: Object.create({
        code: 24,
        message: 'Block not found',
      }) as string,
    })
  })
})
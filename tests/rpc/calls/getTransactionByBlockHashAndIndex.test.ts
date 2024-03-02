import { getTransactionsByBlockHashAndIndexHandler } from '../../../src/rpc/calls/getTransactionByBlockHashAndIndex'
import { RPCRequest, RPCResponse, RPCError } from '../../../src/types/types'

// Mock the entire module for callHelper
jest.mock('../../../src/utils/callHelper', () => ({
    callStarknet: jest.fn(),
  }));

describe('Test getTransactionsByBlockHashAndIndexHandler', () => {
  it('Returns transaction details for a valid request', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionByBlockHashAndIndex',
      params: [
        '0x7bcf1629508b7460d8adc4510ea8bbae12c87db555cff899fc17cf3688e8d4c',
        '0x02'
      ],
      id: 0,
    }

    const starkResult: RPCResponse = <RPCResponse>(await getTransactionsByBlockHashAndIndexHandler(request));
    
    // Verify the structure and content of the response
    expect(typeof starkResult.result).toBe('object')
    expect(starkResult.result).toMatchObject({
      jsonrpc: '2.0',
      id: request.id,
      result: {
        blockHash: '0x1fc77fe9b65882b855e70b86e73da81a27690b39f30f2eb8dc01e8b5abd3679',
        blockNumber: '0xe9f8f',
        from: '0x1fc77fe9b65882b855e70b86e73da81a27690b39f30f2eb8dc01e8b5abd3679',
        gas: '0x1643',
        gasPrice: '0xee6b280',
        hash: '0x13f9323288edb8bc93ef2fab2a9301351e1ef98af496710244bc9850555dc58',
        input: '0x',
        nonce: '0x47',
        to: '0x', // StarkNet transactions may not always have a direct 'to' field.
        transactionIndex: '0x00',
        value: '0x0', // StarkNet transactions don't directly map to ETH value transfers.
        v: '0x1b',
        r: '0x6ce403ad8e4c5b2d6352c50eeff02904ad96fc5cc55a5686b48c7bec5cf89d0',
        s: '0x2aa305967febd05a0d0a9ab32c7e84a52b082b3784e89eb535ac9ca43c68b82',
      },
    })
  })

  it('Returns transaction details for invalid block hash', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionByBlockHashAndIndex',
      params: [
        '0xZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
        '0x0'
      ],
      id: 0,
    }

    const starkResult: RPCError = <RPCError>(await getTransactionsByBlockHashAndIndexHandler(request));
    expect(starkResult).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid block hash',
    })
  })

  it ('Returns transaction details for invalid index', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionByBlockHashAndIndex',
      params: [
        '0x1fc77fe9b65882b855e70b86e73da81a27690b39f30f2eb8dc01e8b5abd3679',
        '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
      ],
      id: 0,
    }

    const starkResult: RPCError = <RPCError>(await getTransactionsByBlockHashAndIndexHandler(request));
    expect(starkResult).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Transaction index out of bounds',
    })
  })
});

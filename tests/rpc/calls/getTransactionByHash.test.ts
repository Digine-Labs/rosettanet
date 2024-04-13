import { getTransactionsByHashHandler } from '../../../src/rpc/calls/getTransactionByHash'
import { RPCResponse, RPCError } from '../../../src/types/types'

describe('Test getTransactionByHash', () => {
  it('Returns transaction details for a valid request', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionByHash',
      params: [
        '0x121aaba2894a63cce81acabb559eb2c114f4859dc5803e0b91349ec398d2eb0',
      ],
      id: 1,
    }

    const starkResult: RPCResponse = <RPCResponse>(
      await getTransactionsByHashHandler(request)
    )

    // Verify the structure and content of the response
    expect(typeof starkResult.result).toBe('object')
    expect(starkResult).toMatchObject({
      id: request.id,
      jsonrpc: '2.0',
      result: {
        hash: '0x121aaba2894a63cce81acabb559eb2c114f4859dc5803e0b91349ec398d2eb0',
        gas: '0x8a6d7568a30c',
        gasPrice: '0xEE6B280',
        blockHash:
          '0x0x18ec1a3931bb5a286f801a950e1153bd427d6d3811591cc01e6f074615a1f76',
        blockNumber: 4503,
        from: '0x206cd6b8b25de0ca44b944d13c2608b355e9a9224a887e2e9447cf5ae3cb2a8',
        input:
          '0x0x10x173f81c529191726c6e7287e24626fe24760ac44dae2a1f7e02080230f8458b0x68bcbdba7cc8cac2832d23e2c32e9eec39a9f1d03521eff5dff800a62725fa0x00x50x50x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc70x7c57808b9cea7130c44aab2f8ca6147b04408943b48c6d8c3c83eb8cfdd8c0b0xd6f06df0e9632b0x00x6873917301545706d657c47a11d83ad9840fbeb30x9',
        nonce: '0x0',
        r: '0x71847081cae237a92ddcfbc8ff4144df8237ed251027563e709aeb69af35099',
        s: '0x36da171a5c558c8a1b233a163a399ac5c54d82a7bd0bbfdbc360cd7c3e2700d',
        to: '0x0',
        transactionIndex: '0x0',
        v: '0x1b',
        value: '0x0',
      },
    })
  })

  it('Returns transaction details for invalid tx hash', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionByHash',
      params: [
        '0xZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
      ],
      id: 0,
    }

    const starkResult: RPCError = <RPCError>(
      await getTransactionsByHashHandler(request)
    )
    expect(starkResult).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid tx hash',
    })
  })
})

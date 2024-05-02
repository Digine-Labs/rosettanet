import { getTransactionsByBlockHashAndIndexHandler } from '../../../src/rpc/calls/getTransactionByBlockHashAndIndex'
import { RPCResponse, RPCError } from '../../../src/types/types'

describe('Test getTransactionsByBlockHashAndIndexHandler', () => {
  it('Returns transaction details for a valid request', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionByBlockHashAndIndex',
      params: [
        '0x07410ed96ff95e62c484444431302b7531d2bf9633758e682aab567407484f9a',
        '0x02',
      ],
      id: 0,
    }

    const starkResult: RPCResponse = <RPCResponse>(
      await getTransactionsByBlockHashAndIndexHandler(request)
    )

    // Verify the structure and content of the response
    expect(typeof starkResult.result).toBe('object')
    expect(starkResult).toMatchObject({
      jsonrpc: '2.0',
      id: 0,
      result: {
        blockHash:
          '0x07410ed96ff95e62c484444431302b7531d2bf9633758e682aab567407484f9a',
        blockNumber: '0xf5dd',
        from: '0x37a10f2808c05f4a328bdac9a9344358547ae4676ebddc005e24ff887b188fd',
        gas: '0x1e95cb93af16',
        gasPrice: '0x0xb67a2431',
        hash: '0x7ad3e1c6ac233cfbf039c7996aa23d911c2f7506966b228ed0123f755534bb4',
        input:
          '0x0x10x36031daa264c24520b11d93af622c848b2499b66b41d611bac95e13cfca131a0x3d0bcca55c118f88a08e0fcc06f43906c0c174feb52ebc83f0fa28a1f59ed670x5c0xd0x00x663076db0x464f55524c4541460x464f55524c4541460x5c7794999060x4254432f5553440x00x00x663076db0x464f55524c4541460x464f55524c4541460x49f06318fa0x4554482f5553440x00x00x663076db0x464f55524c4541460x464f55524c4541460x5c4f7c3a88d0x574254432f5553440x00x00x663076db0x464f55524c4541460x464f55524c4541460x5f56dcf0x574254432f4254430x00x00x663076db0x464f55524c4541460x464f55524c4541460x565dc089b1c0x4254432f4555520x00x00x663076db0x464f55524c4541460x464f55524c4541460x562e4b600a0x5753544554482f5553440x00x00x663076db0x464f55524c4541460x464f55524c4541460x5f401d00x4c5553442f5553440x00x00x663076dc0x464f55524c4541460x464f55524c4541460xf42080x555344432f5553440x00x00x663076dc0x464f55524c4541460x464f55524c4541460x2dd91bf70x554e492f5553440x00x00x663076dc0x464f55524c4541460x464f55524c4541460x5f5095d0x4441492f5553440x00x00x663076dc0x464f55524c4541460x464f55524c4541460xf413d0x555344542f5553440x00x00x663076dc0x464f55524c4541460x464f55524c4541460x74350b50x5354524b2f5553440x00x00x663076dc0x464f55524c4541460x464f55524c4541460x42f824e0x5a454e442f5553440x0',
        nonce: '0x139ee',
        to: '0x',
        transactionIndex: '0x2',
        value: '0x0',
        v: '0x1b',
        r: '0x78d955415576b62722313dc8e95dbc1bd244d7ce9faf204eae58160791ab4e4',
        s: '0xd3dc0551bdbb3df18a452cce9f1bfedb6a6f4b8f70e5eca417a643dbc720f6',
      },
    })
  })

  it('Returns transaction details for invalid block hash', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionByBlockHashAndIndex',
      params: [
        '0xZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
        '0x0',
      ],
      id: 0,
    }

    const starkResult: RPCError = <RPCError>(
      await getTransactionsByBlockHashAndIndexHandler(request)
    )
    expect(starkResult).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid block hash',
    })
  })

  it('Returns transaction details for invalid index', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionByBlockHashAndIndex',
      params: [
        '0x07410ed96ff95e62c484444431302b7531d2bf9633758e682aab567407484f9a',
        '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      ],
      id: 0,
    }

    const starkResult: RPCError = <RPCError>(
      await getTransactionsByBlockHashAndIndexHandler(request)
    )
    expect(starkResult).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Transaction index out of bounds',
    })
  })
})

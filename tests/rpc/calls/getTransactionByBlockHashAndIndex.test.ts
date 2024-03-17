import {
  getTransactionsByBlockHashAndIndexHandler,
  getTransactionsByBlockHashAndIndexSnResponseHandler,
} from '../../../src/rpc/calls/getTransactionByBlockHashAndIndex'
import { RPCResponse, RPCError } from '../../../src/types/types'

describe('Test getTransactionsByBlockHashAndIndexHandler', () => {
  it('Returns transaction details for a valid request', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionByBlockHashAndIndex',
      params: [
        '0x01806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
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
      id: request.id,
      jsonrpc: '2.0',
      result: {
        blockHash:
          '0x01806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
        blockNumber: '0xe9fc9',
        from: '0x7497c28ff075311aee91ccbeca905698a0931077dc0556fafa7577910b4362f',
        gas: '0x34453e2b238',
        gasPrice: '0x0x3b9aca07',
        hash: '0x5da9d4d4ea7aee2c95cebbe5bc99be05ef7ffeec28a979b896ad78fdc90c471',
        input:
          '0x0x10x4c1337d55351eac9a0b74f3b8f0d3928e2bb781e5084686a892e66d49d510d0x34c4c150632e67baf44fc50e9a685184d72a822510a26a66f72058b5e7b28920x0',
        nonce: '0x11d',
        to: '0x', // StarkNet transactions may not always have a direct 'to' field.
        transactionIndex: '0x2',
        value: '0x0', // StarkNet transactions don't directly map to ETH value transfers.
        v: '0x1b',
        r: '0x33c21de8050c98f869c30fcf725cb78891c95c2b825d6b776c91d0415ad17ce',
        s: '0x27fde752541931c319833a359c63d25abcc5b28b7ec54b8d99ec6107c581bc4',
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
        '0x1fc77fe9b65882b855e70b86e73da81a27690b39f30f2eb8dc01e8b5abd3679',
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

describe('Test getTransactionsByBlockHashAndIndexSnHandler', () => {
  it('Returns transaction details for a valid request', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'starknet_getTransactionByBlockHashAndIndex',
      params: [
        '0x01806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
        '0x02',
      ],
      id: 0,
    }

    const starkResult: RPCResponse = <RPCResponse>(
      await getTransactionsByBlockHashAndIndexSnResponseHandler(request)
    )

    expect(typeof starkResult.result).toBe('object')
    expect(starkResult).toMatchObject({
      id: request.id,
      jsonrpc: '2.0',
      result: {
        block_hash:
          '0x1806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
        block_number: 958409,
        events: [
          {
            from_address:
              '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
          },
        ],
        actual_fee: {
          amount: '0x34453e2b238',
        },
      },
    })
  })
})

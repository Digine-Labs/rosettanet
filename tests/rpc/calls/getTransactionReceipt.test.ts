import { getTransactionReceiptHandler } from '../../../src//rpc/calls/getTransactionReceipt'
import { RPCResponse, RPCError } from '../../../src/types/types'

describe('Test getTransactionReceipt', () => {
  it('Returns transaction details for a valid request', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionReceipt',
      params: [
        '0x121aaba2894a63cce81acabb559eb2c114f4859dc5803e0b91349ec398d2eb0',
      ],
      id: 1,
    }

    const starkResult: RPCResponse = <RPCResponse>(
        await getTransactionReceiptHandler(request)
        )
    

    // Here we get some results fam. lets see if they're same.
    expect(typeof starkResult.result).toBe('object')
    expect(starkResult).toMatchObject({
        id: 1,
        jsonrpc: "2.0",
        result: {
            transactionHash: '0x121aaba2894a63cce81acabb559eb2c114f4859dc5803e0b91349ec398d2eb0',
            transactionIndex:  '0x1', // 1
            blockNumber: 4503, 
            blockHash: '0x18ec1a3931bb5a286f801a950e1153bd427d6d3811591cc01e6f074615a1f76',
            cumulativeGasUsed: '0x33bc', // 13244
            gasUsed: '0x8a6d7568a30c', // 1244
            contractAddress: null, // no contract address returned for type 'INVOKE'. in that situation, return null..
            logs: [
                {
                  address: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                  blockHash:"0x18ec1a3931bb5a286f801a950e1153bd427d6d3811591cc01e6f074615a1f76",
                  topics: ["0x0"],
                  data:{
                        keys: ['0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9'],
                        data: [
                          '0x206cd6b8b25de0ca44b944d13c2608b355e9a9224a887e2e9447cf5ae3cb2a8',
                          '0x7c57808b9cea7130c44aab2f8ca6147b04408943b48c6d8c3c83eb8cfdd8c0b',
                          '0xd6f06df0e9632b',
                          '0x0'
                        ]
                      },
                  blockNumber: 4503,
                  transactionHash: "0x121aaba2894a63cce81acabb559eb2c114f4859dc5803e0b91349ec398d2eb0",
                  transactionIndex: "0x1", //Not returned from starknet.
                  logIndex: "0x1", // Not returned from starknet.
                  removed: false
                },
                {
                  address: "0x206cd6b8b25de0ca44b944d13c2608b355e9a9224a887e2e9447cf5ae3cb2a8",
                  blockHash:"0x18ec1a3931bb5a286f801a950e1153bd427d6d3811591cc01e6f074615a1f76",
                  topics: ["0x0"], // mock, of course
                  data:{
                        keys: ['0x5ad857f66a5b55f1301ff1ed7e098ac6d4433148f0b72ebc4a2945ab85ad53'],
                        data: [
                          '0x121aaba2894a63cce81acabb559eb2c114f4859dc5803e0b91349ec398d2eb0',
                          '0x0'
                        ]
                    },
                  blockNumber: 4503,
                  transactionHash: "0x121aaba2894a63cce81acabb559eb2c114f4859dc5803e0b91349ec398d2eb0",
                  transactionIndex: "0x1", //Not returned from starknet.
                  logIndex: "0x1", // Not returned from starknet.
                  removed: false
                  }
                  ],
            logsBloom: "0x00000000000000000000000000000000000100004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000",
            status: "0x1",
        }
      },
    )
  })

  it('Returns transaction details for invalid tx hash', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionReceipt',
      params: [
        '0xZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
      ],
      id: 0,
    }

    const starkResult: RPCError = <RPCError>(
      await getTransactionReceiptHandler(request)
    )
    expect(starkResult).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid tx hash',
    })
  })
})


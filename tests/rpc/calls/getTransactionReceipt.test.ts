import { getTransactionReceiptHandler } from '../../../src/rpc/calls/getTransactionReceipt'
import { RPCErrorNew, RPCResponse } from '../../../src/types/types'

describe('Test get transaction receipt request testnet', () => {
  it('Returns transaction receipt', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionReceipt',
      params: [
        '0x070423420b62999ead8d2be3c220f89e9c9d4816419c153a50108c26ebc94660',
      ],
      id: 1,
    }
    const starkResult: RPCResponse = <RPCResponse>(
      await getTransactionReceiptHandler(request)
    )

    expect(typeof starkResult.result).toBe('object')
    expect(starkResult.result).toMatchObject({
      transactionHash:
        '0x070423420b62999ead8d2be3c220f89e9c9d4816419c153a50108c26ebc94660',
      blockHash:
        '0x46eb1670bf90c96da4ad0a905d66408c29d56dcdaeb939da5755adc0e2c5956',
      blockNumber: '0xf700',
      logs: [
        {
          transactionHash:
            '0x070423420b62999ead8d2be3c220f89e9c9d4816419c153a50108c26ebc94660',
          address: '0x0',
          blockHash:
            '0x46eb1670bf90c96da4ad0a905d66408c29d56dcdaeb939da5755adc0e2c5956',
          blockNumber: '0xf700',
          data: '0x0',
          logIndex: '0x0',
          removed: false,
          topics: [],
          transactionIndex: '0x31',
        },
        {
          transactionHash:
            '0x070423420b62999ead8d2be3c220f89e9c9d4816419c153a50108c26ebc94660',
          address: '0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
          blockHash:
            '0x46eb1670bf90c96da4ad0a905d66408c29d56dcdaeb939da5755adc0e2c5956',
          blockNumber: '0xf700',
          data: '0x0',
          logIndex: '0x1',
          removed: false,
          topics: [],
          transactionIndex: '0x31',
        },
      ],
      contractAddress: null,
      effectiveGasPrice: '0x1',
      cumulativeGasUsed: '0x117c80fa301e',
      from: '0x6deeaf66dcd2568addabe32084ab6b5298f85c01f3685c68c29b71631fdc5ba',
      gasUsed: '0x117c80fa301e',
      logsBloom: '0x0',
      status: '0x1',
      to: '0x000000000000000000000000000000000000000000000000000000000000000',
      transactionIndex: '0x31',
      type: '0x2',
    })
  }, 10000)

  // it('Returns an error for non-existent transactions', async () => {
  //   const request = {
  //     jsonrpc: '2.0',
  //     method: 'eth_getTransactionReceipt',
  //     params: ['0x000000000000000000000000000000000000000000000000000000'],
  //     id: 1,
  //   }
  //   const starkResult: RPCErrorNew = <RPCErrorNew>(
  //     await getTransactionReceiptHandler(request)
  //   )

  //   expect(typeof starkResult.error).toBe('object')
  //   expect(starkResult.error.message).toBe('Starknet RPC error')
  // })

  it('Returns an error for missing params', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionReceipt',
      params: [],
      id: 1,
    }
    const starkResult: RPCErrorNew = <RPCErrorNew>(
      await getTransactionReceiptHandler(request)
    )

    expect(typeof starkResult.error).toBe('object')
    expect(starkResult.error.message).toBe(
      'Invalid argument, Parameter should be valid transaction hash.',
    )
  })
})

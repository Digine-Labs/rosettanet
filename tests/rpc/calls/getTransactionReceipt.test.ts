import { getTransactionReceiptHandler } from '../../../src/rpc/calls/getTransactionReceipt'
import { RPCResponse } from '../../../src/types/types'

describe('Test get transaction receipt request testnet', () => {
  it('Returns transaction receipt', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionReceipt',
      params: [
        '0x054b60a3d157a9b9a7d1734aaaf06db939ff5ae6b9c75e221cf8504f464ec0ef',
      ],
      id: 1,
    }
    const starkResult: RPCResponse = <RPCResponse>(
      await getTransactionReceiptHandler(request)
    )

    expect(typeof starkResult.result).toBe('object')
    expect(starkResult.result).toMatchObject({
      transactionHash:
        '0x054b60a3d157a9b9a7d1734aaaf06db939ff5ae6b9c75e221cf8504f464ec0ef',
      blockHash:
        '0x583a703ef5de667b9d19f87d5cc46ac140cc3ac5b3a2991555bd7c45fd58863',
      blockNumber: '0xe95c8',
      logs: [
        {
          address: '0x56fd10dc1a95cdac6f7e8cf800a216606ffee4c7',
          blockHash:
            '0x583a703ef5de667b9d19f87d5cc46ac140cc3ac5b3a2991555bd7c45fd58863',
          blockNumber: '0xe95c8',
          data: '0x0',
          logIndex: '0x0',
          removed: false,
          topics: [],
          transactionHash:
            '0x054b60a3d157a9b9a7d1734aaaf06db939ff5ae6b9c75e221cf8504f464ec0ef',
          transactionIndex: '0x1d',
        },
        {
          address: '0x56fd10dc1a95cdac6f7e8cf800a216606ffee4c7',
          blockHash:
            '0x583a703ef5de667b9d19f87d5cc46ac140cc3ac5b3a2991555bd7c45fd58863',
          blockNumber: '0xe95c8',
          data: '0x0',
          logIndex: '0x1',
          removed: false,
          topics: [],
          transactionHash:
            '0x054b60a3d157a9b9a7d1734aaaf06db939ff5ae6b9c75e221cf8504f464ec0ef',
          transactionIndex: '0x1d',
        },
        {
          address: '0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
          blockHash:
            '0x583a703ef5de667b9d19f87d5cc46ac140cc3ac5b3a2991555bd7c45fd58863',
          blockNumber: '0xe95c8',
          data: '0x0',
          logIndex: '0x2',
          removed: false,
          topics: [],
          transactionHash:
            '0x054b60a3d157a9b9a7d1734aaaf06db939ff5ae6b9c75e221cf8504f464ec0ef',
          transactionIndex: '0x1d',
        },
      ],
      contractAddress: '0x56fd10dc1a95cdac6f7e8cf800a216606ffee4c7',
      effectiveGasPrice: '0x1',
      cumulativeGasUsed: '0x30841e33136',
      from: '0x000000000000000000000000000000000000000000000000000000000000000',
      gasUsed: '0x30841e33136',
      logsBloom: '0x0',
      status: '0x1',
      to: null,
      transactionIndex: '0x1d',
      type: '0x2',
    })
  })
})

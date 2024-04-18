import { feeHistoryHandler } from '../../../src/rpc/calls/feeHistory'
import { RPCResponse } from '../../../src/types/types'

describe('Test feeHistory', () => {
  it('Returns mock value for a valid request', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_feeHistory',
      params: [4, 'latest', [25, 75]],
      id: 1,
    }

    const response = <RPCResponse>await feeHistoryHandler(request)
    expect(response.result).toMatchObject({
      oldestBlock: 10762137,
      reward: [
        ['0x4a817c7ee', '0x4a817c7ee'],
        ['0x773593f0', '0x773593f5'],
        ['0x0', '0x0'],
        ['0x773593f5', '0x773bae75'],
      ],
      baseFeePerGas: ['0x12', '0x10', '0x10', '0xe', '0xd'],
      gasUsedRatio: [0.026089875, 0.406803, 0, 0.0866665],
    })
  })

  it('Returns error when invalid block count is entered', async () => {
    const request1 = {
      jsonrpc: '2.0',
      method: 'eth_feeHistory',
      params: [-99, 'latest'],
      id: 1,
    }

    const request2 = {
      jsonrpc: '2.0',
      method: 'eth_feeHistory',
      params: [1025, 'latest'],
      id: 1,
    }

    const response1 = <RPCResponse>await feeHistoryHandler(request1)
    expect(response1).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'blockCount out of range. Expected range is between 1 and 1024',
    })

    const response2 = <RPCResponse>await feeHistoryHandler(request2)
    expect(response2).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'blockCount out of range. Expected range is between 1 and 1024',
    })
  })

  it('Returns error when invalid block number is entered ', async () => {
    const request1 = {
      jsonrpc: '2.0',
      method: 'eth_feeHistory',
      params: [23, 'earliest'],
      id: 1,
    }

    const response1 = <RPCResponse>await feeHistoryHandler(request1)
    expect(response1).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid block number',
    })

    const request2 = {
      jsonrpc: '2.0',
      method: 'eth_feeHistory',
      params: [1024, 'earliest'],
      id: 1,
    }

    const response2 = <RPCResponse>await feeHistoryHandler(request2)
    expect(response2).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid block number',
    })
  })
})

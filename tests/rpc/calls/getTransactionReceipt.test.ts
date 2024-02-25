import { getTransactionReceiptHandler } from '../../../src/rpc/calls/getTransactionReceipt'
import { RPCResponse } from '../../../src/types/types'

describe('Test get transaction receipt request testnet', () => {
  it('Returns transaction receipt', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionReceipt',
      params: [
        '0xbb3a336e3f823ec18197f1e13ee875700f08f03e2cab75f0d0b118dabb44cba0',
      ],
      id: 1,
    }
    const starkResult: RPCResponse = <RPCResponse>(
      await getTransactionReceiptHandler(request)
    )

    expect(typeof starkResult.result).toBe('object')
    expect(starkResult.result).toMatchObject({
      transactionHash: '0xtodo',
      blockHash: '0xtodo',
      blockNumber: '0xtodo',
      logs: [],
      contractAddress: null,
      effectiveGasPrice: '0xtodo',
      cumulativeGasUsed: '0xtodo',
      from: '0xtodo',
      gasUsed: '0xtodo',
      logsBloom: '0x0',
      status: '0xtodo',
      to: '0xtodo',
      transactionIndex: '0xtodo',
      type: '0xtodo',
    })
  })
})

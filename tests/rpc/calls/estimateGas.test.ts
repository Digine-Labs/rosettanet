import { estimateGasHandler } from '../../../src/rpc/calls/estimateGas'
import { RPCResponse } from '../../../src/types/types'

describe('test estimated gas', () => {
  it('Returns estimated gas', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [
        {
          from: '0x4af0da20bece16d2af2bc9f1690b1efc2db7c5b2',
          to: '0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
          data: '0xa9059cbb0000000000000000000000004af0da20bece16d2af2bc9f1690b1efc2db7c5b200000000000000000000000000000000000000000000000000005af3107a4000',
        },
      ],
      id: 1,
    }
    const result: RPCResponse = <RPCResponse>await estimateGasHandler(request)

    expect(typeof result).toBe('object')
    expect(result).toMatchObject({
      id: 1,
      jsonrpc: '2.0',
      result: [
        {
          gas_consumed: '0x686',
          gas_price: '0x1778dc527',
          overall_fee: '0x991e6d41c6a',
        },
      ],
    })
  }, 20000)
})

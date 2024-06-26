import { estimateGasHandler } from '../../../src/rpc/calls/estimateGas'
import { RPCResponse } from '../../../src/types/types'

describe('test ethereum transfer function estimated gas', () => {
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
    expect(typeof result.result).toBe('object')
    // expect(result).toMatchObject({
    //   id: 1,
    //   jsonrpc: '2.0',
    //   result: [
    //     {
    //       gas_consumed: '0x686',
    //       gas_price: '0x1778dc527',
    //       overall_fee: '0x991e6d41c6a',
    //     },
    //   ],
    // })
  }, 20000)
})

describe('test failure ethereum transferFrom function estimated gas ', () => {
  it('Returns Failure', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [
        {
          from: '0x4af0da20bece16d2af2bc9f1690b1efc2db7c5b2',
          to: '0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
          data: '0x23b872dd0000000000000000000000004af0da20bece16d2af2bc9f1690b1efc2db7c5b2000000000000000000000000f6ce7a652df7793b666a16ce46b1bf5850cc739d0000000000000000000000000000000000000000000000000000000000002710',
        },
      ],
      id: 1,
    }
    const result: RPCResponse = <RPCResponse>await estimateGasHandler(request)

    expect(typeof result).toBe('object')
    expect(result).toMatchObject({
      jsonrpc: '2.0',
      id: 1,
      data: 'Transaction Execution Error',
      result: '0x28ed6103d0000',
    })
  }, 20000)
})

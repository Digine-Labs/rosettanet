import { estimateGasHandler } from '../../../src/rpc/calls/estimateGas'
import { RPCResponse } from '../../../src/types/types'

describe('test estimated gas', () => {
  it('Returns estimated gas', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [
        {
          from: '0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
          to: '0xd3CdA913deB6f67967B99D67aCDFa1712C293601',
          value: '0x186a0',
        },
      ],
      id: 1,
    }
    const result: RPCResponse = <RPCResponse>await estimateGasHandler(request)

    expect(typeof result).toBe('object')
    expect(result).toMatchObject({
      id: 1,
      jsonrpc: '2.0',
      result: '0x5cec',
    })
  })
})

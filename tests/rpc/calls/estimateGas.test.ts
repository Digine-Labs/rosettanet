import { estimateGasHandler } from '../../../src/rpc/calls/estimateGas'
import { RPCResponse } from '../../../src/types/types'

describe('test estimated gas', () => {
  it('Returns estimated gas', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [
        {
          from: '0x9cE564c7d09f88E7d8233Cdd3A4d7AC42aBFf3aC',
          to: '0xd46e8dd67c5d32be8058bb8eb970870f07244567',
          value: '0x9184e72a',
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

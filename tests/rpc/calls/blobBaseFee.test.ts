import { blobBaseFeeHandler } from '../../../src/rpc/calls/blobBaseFee'
import { RPCError, RPCResponse } from '../../../src/types/types'

describe('Test BlobBaseFee handler', () => {
  it('Returns 0x42', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_blobBaseFee',
      params: [],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await blobBaseFeeHandler(request)
    )
    expect(result.result).toBe('0x42')
  })

  it('Gives error when parameter length > 0', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_blobBaseFee',
      params: ['0x0'],
      id: 1,
    }
    const result: RPCResponse | RPCError = <RPCResponse>(
      await blobBaseFeeHandler(request)
    )
    expect(result.error?.message).toBe(
      'Invalid argument, Parameter should length 0.',
    )
  })
})

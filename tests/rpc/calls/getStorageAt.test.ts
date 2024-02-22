import { getStorageAtHandler } from '../../../src/rpc/calls/getStorageAt'
import { RPCResponse } from '../../../src/types/types'


describe('Test get Storage At request testnet', () => {
  it('Returns storage address', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getStorageAt',
      params: [
        "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        "0x0000000000000000000000000000000000000000000000000000000000000001",
        "latest"
      ],
      id: 1,
    } 
    const starkResult: RPCResponse = <RPCResponse>await getStorageAtHandler(request)
    expect(typeof starkResult.result).toBe('string')
    expect(starkResult.result).toBe("0x0000000000000000000000000000000000000000000000000000000000000000")
  })
})

import { getStorageAtHandler } from '../../../src/rpc/calls/getStorageAt'
import { RPCResponse } from '../../../src/types/types'
describe('Test get Storage At request testnet', () => {
  it('Returns storage address', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getStorageAt',
      params: [
        "0x07cab99e7a284f2486bd49a3e0453f51e904f7a928830f62e22294e77fc45351",
        "0x0000000000000000000000000000000000000000000000000000000000000001",
        "latest"
      ],
      id: 1,
    }
    const result: RPCResponse = <RPCResponse>await getStorageAtHandler(request)
    expect(typeof result.result).toBe('string')
    expect(result.result).toHaveLength(66); // (0x prefix + 64 characters)
  })
})

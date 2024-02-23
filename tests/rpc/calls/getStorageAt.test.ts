import { getStorageAtHandler } from '../../../src/rpc/calls/getStorageAt'
import { RPCResponse } from '../../../src/types/types'
import { getSnAddressFromEthAddress } from '../../../src/utils/wrapper'

describe('Test get Storage At request testnet', () => {
  it('Returns storage address', async () => {

    const request = {
      jsonrpc: '2.0',
      method: 'eth_getStorageAt',
      params: [
        "0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        "0x341c1bdfd89f69748aa00b5742b03adbffd79b8e80cab5c50d91cd8c2a79be1", // sn_keccak("ERC20_name") = last 250 bytes of keccak256("ERC20_name")
        "latest"
      ],
      id: 1,
    } 
    const starkResult: RPCResponse = <RPCResponse>await getStorageAtHandler(request)
    expect(typeof starkResult.result).toBe('string')
    expect(starkResult.result).toBe("0x0000000000000000000000000000000000000000000000000000004574686572")
  })
})

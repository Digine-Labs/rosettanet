import { getBlockTransactionCountByHashHandler } from "../../../src/rpc/calls/getBlockTransactionCountByHash"
import { RPCResponse } from "../../../src/types/types"

describe('Test get Block Count By Hash request testnet ', () => {
  it('Returns block transactions count by hash', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBlockTransactionCountByHash',
      params: [
        '0x0627dadf33aecc02abe2530f1f2b091a24e7a119cc03851be4d559af47f22e93',
      ],
      id: 0,
    }

    const result: RPCResponse = <RPCResponse>(await getBlockTransactionCountByHashHandler(request))

    expect(result.result).toBe(41) // Verify here: https://testnet.starkscan.co/block/0x0627dadf33aecc02abe2530f1f2b091a24e7a119cc03851be4d559af47f22e93#transactions
  })
})

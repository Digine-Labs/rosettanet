import { ethSyncingHandler } from '../../../src/rpc/calls/syncing'
import { RPCResponse } from '../../../src/types/types'

describe('Test starknet syncing', () => {
  it('Returns 0x0', async () => {
    const request = {
        jsonrpc: '2.0',
        method: 'starknet_syncing',
        params: [],
        id: 0,
      }
    const result: RPCResponse = <RPCResponse>await ethSyncingHandler(request)

    expect(result.result.toString()).toBe("0x0")
  })
})

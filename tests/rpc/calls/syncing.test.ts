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
    const starkResult: RPCResponse = <RPCResponse>(
      await ethSyncingHandler(request)
    )

    expect(typeof starkResult.result).toBe('object')
    expect(starkResult).toMatchObject({
      jsonrpc: '2.0',
      id: 1,
      result: {
        healedBytecodeBytes: '0x0',
        healedBytecodes: '0x0',
        healedTrienodes: '0x0',
        healingBytecode: '0x0',
        healingTrienodes: '0x0',
        syncedAccountBytes: '0x0',
        syncedAccounts: '0x0',
        syncedBytecodeBytes: '0x0',
        syncedBytecodes: '0x0',
        syncedStorage: '0x0',
        syncedStorageBytes: '0x0',
      },
    })
  })

  it('Returns error for invalid params', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'starknet_syncing',
      params: [
        '0xZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
      ],
      id: 0,
    }
    const starkResult: RPCResponse = <RPCResponse>(
      await ethSyncingHandler(request)
    )

    expect(starkResult).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'params are not expected',
    })
  })
})

import { writeLog } from '../logger'
import { isStarknetRPCError } from '../types/typeGuards'
import { RPCResponse, StarknetRPCError } from '../types/types'
import { callStarknet } from '../utils/callHelper'

let syncedBlockNumber: string = ''

export function getCachedBlockNumber(): string {
  if (syncedBlockNumber === '') {
    return '0x0'
  }
  return syncedBlockNumber
}

async function updateBlockNumber() {
  const response: RPCResponse | StarknetRPCError = await callStarknet({
    jsonrpc: '2.0',
    method: 'starknet_blockNumber',
    params: [],
    id: 1,
  })

  if (isStarknetRPCError(response)) {
    writeLog(2, 'Error at syncing starknet block number.' + response.message)
    return
  }

  syncedBlockNumber = '0x' + response.result.toString(16)
  return
}

export async function initialSyncBlockNumber() {
  await updateBlockNumber()
  return
}

export async function syncBlockNumber() {
  while (true) {
    await new Promise<void>(resolve => setTimeout(resolve, 10000)) // Sync new blocks in every 10 seconds
    await updateBlockNumber()
  }
}

import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'

export async function ethSyncingHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  const network = 'testnet'
  const method = 'starknet_syncing'

  if (request.params.length != 0) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter should length 0.',
      },
    }
  }

  const response: RPCResponse | string = await callStarknet(network, {
    jsonrpc: request.jsonrpc,
    method,
    params: [],
    id: request.id,
  })

  if (
    typeof response == 'string' ||
    response == null ||
    response == undefined
  ) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: response,
      },
    }
  }

  const result = response.result as {
    starting_block_hash: string
    starting_block_num: string
    current_block_hash: string
    current_block_num: string
    highest_block_hash: string
    highest_block_num: string
  }

  return {
    jsonrpc: '2.0',
    id: 1,
    result: {
      currentBlock: result.current_block_num,
      healedBytecodeBytes: '0x0',
      healedBytecodes: '0x0',
      healedTrienodes: '0x0',
      healingBytecode: '0x0',
      healingTrienodes: '0x0',
      highestBlock: result.highest_block_num,
      startingBlock: result.starting_block_num,
      syncedAccountBytes: '0x0',
      syncedAccounts: '0x0',
      syncedBytecodeBytes: '0x0',
      syncedBytecodes: '0x0',
      syncedStorage: '0x0',
      syncedStorageBytes: '0x0',
    },
  }
}

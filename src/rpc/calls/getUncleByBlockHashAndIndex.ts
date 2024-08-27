import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { validateBlockHash } from '../../utils/validations'

export async function getUncleByBlockHashAndIndexHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  if (request.params.length != 2) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter lenght should be 2.',
      },
    }
  }

  // Extract the blockHash
  const blockHash = request.params[0] as string

  // Validate the block hash
  if (!validateBlockHash(blockHash)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Invalid block hash.',
      },
    }
  }

  return {
    jsonrpc: request.jsonrpc,
    id: request.id,
    error: {
      code: -32000,
      message:
        'the method eth_getUncleByBlockHashAndIndex does not exist/is not available', // Infura's answer to eth_getWork
    },
  }
}

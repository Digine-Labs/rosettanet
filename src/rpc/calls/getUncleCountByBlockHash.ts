import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { validateBlockHash } from '../../utils/validations'

export async function getUncleCountByBlockHashHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  if (request.params.length != 1) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter lenght should be 1.',
      },
    }
  }

  // Extract the blockHash
  const blockHash = request.params[0] as string

  // Validate the blockNumber
  if (!validateBlockHash(blockHash)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Invalid blockHash.',
      },
    }
  }

  return {
    jsonrpc: request.jsonrpc,
    id: request.id,
    error: {
      code: -32000,
      message:
        'the method eth_getUncleCountByBlockHash does not exist/is not available', // Infura's answer
    },
  }
}

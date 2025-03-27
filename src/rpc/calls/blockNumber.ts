import { getCachedBlockNumber } from '../../cache/blockNumber'
import { RPCError, RPCRequest, RPCResponse } from '../../types/types'

export async function blockNumberHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  if (!Array.isArray(request.params)) {
    return {
      jsonrpc: '2.0',
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid params',
      },
    }
  }

  if (request.params.length !== 0) {
    return {
      jsonrpc: '2.0',
      id: request.id,
      error: {
        code: -32602,
        message: 'Too many arguments. Expected 0',
      },
    }
  }
  const cachedBlockNumber = getCachedBlockNumber()

  return {
    jsonrpc: '2.0',
    id: request.id,
    result: cachedBlockNumber,
  }
}

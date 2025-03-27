import { getCachedGasPrice, SyncedL1Gas } from '../../cache/gasPrice'
import { RPCError, RPCRequest, RPCResponse } from '../../types/types'

export async function gasPriceHandler(
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
  const gasPrices: SyncedL1Gas = getCachedGasPrice()

  // TODO: fri cok yuksek gidiyor. wei cok dusuk
  return {
    jsonrpc: '2.0',
    id: request.id,
    result: gasPrices.fri,
  }
}

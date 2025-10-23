import { getCachedGasPrice } from '../../cache/gasPrice'
import { RPCError, RPCRequest, RPCResponse, SyncedGas } from '../../types/types'

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
  const gasPrices: SyncedGas = getCachedGasPrice()

  // TODO: Bence burada en yuksek gas price dondurebiliriz?
  return {
    jsonrpc: '2.0',
    id: request.id,
    result: gasPrices.l2.fri, // Temporary
  }
}

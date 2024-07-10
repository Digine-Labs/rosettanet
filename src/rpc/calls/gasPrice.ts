import { RPCError, RPCRequest, RPCResponse } from '../../types/types'

export async function gasPriceHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  return {
    jsonrpc: '2.0',
    id: request.id,
    result: '0x1778dc527',
  }
}

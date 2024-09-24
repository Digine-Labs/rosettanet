import { RPCError, RPCRequest, RPCResponse } from '../../types/types'

export async function uninstallFilterHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  return {
    jsonrpc: request.jsonrpc,
    id: request.id,
    error: {
      code: -32000,
      message: 'the method eth_uninstallFilter does not exist/is not available', // Infura's answer
    },
  }
}

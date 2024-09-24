import { RPCError, RPCRequest, RPCResponse } from '../../types/types'

export async function newBlockFilterHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  return {
    jsonrpc: request.jsonrpc,
    id: request.id,
    error: {
      code: -32000,
      message: 'the method eth_newBlockFilter does not exist/is not available', // Infura's answer
    },
  }
}

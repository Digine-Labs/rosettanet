import { RPCError, RPCRequest, RPCResponse } from '../../types/types'

export async function accountsHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  if (request.params.length != 0) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'params are not expected',
    }
  }
  return {
    jsonrpc: '2.0',
    id: 1,
    result: [],
  }
}

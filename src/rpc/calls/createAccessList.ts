import { RPCError, RPCRequest, RPCResponse } from '../../types/types'

export async function createAccessListHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  return {
    jsonrpc: '2.0',
    id: request.id,
    result: {
      accessList: [],
    },
  }
}

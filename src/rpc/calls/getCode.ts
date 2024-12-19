import { RPCError, RPCRequest, RPCResponse } from '../../types/types'

export async function getCodeHandler(
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

  return {
    jsonrpc: '2.0',
    id: request.id,
    result: '0x',
  }
}

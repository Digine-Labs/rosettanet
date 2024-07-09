import { RPCErrorNew, RPCRequest, RPCResponse } from '../../types/types'

export async function accountsHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCErrorNew> {
  if (request.params.length != 0) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter field should be empty.',
      },
    }
  }

  return {
    jsonrpc: '2.0',
    id: 1,
    result: [],
  }
}

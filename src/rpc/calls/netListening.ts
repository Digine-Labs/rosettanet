import { RPCError, RPCRequest, RPCResponse } from '../../types/types'

export async function netListeningHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  if (request.params.length != 0) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter should length 0.',
      },
    }
  }

  return {
    jsonrpc: request.jsonrpc,
    id: request.id,
    result: true, //Indicating whether the client is actively listening for network connections. Probably returns true if connected to other nodes.
  }
}

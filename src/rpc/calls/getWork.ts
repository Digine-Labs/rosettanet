import { RPCError, RPCRequest, RPCResponse } from '../../types/types'

export async function getWorkHandler(
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
    error: {
      code: -32000,
      message: 'the method eth_getWork does not exist/is not available', // Infura's answer to eth_getWork
    },
  }
}

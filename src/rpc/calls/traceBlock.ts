import { RPCError, RPCRequest, RPCResponse } from '../../types/types'

export async function traceBlockHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  if (request.params.length != 1) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter lenght should be 1.',
      },
    }
  }

  return {
    jsonrpc: request.jsonrpc,
    id: request.id,
    error: {
      code: -32000,
      message: 'the method trace_block does not exist/is not available', // Infura's answer
    },
  }
}

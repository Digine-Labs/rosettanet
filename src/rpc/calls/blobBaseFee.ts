import { RPCError, RPCRequest, RPCResponse } from '../../types/types'

export async function blobBaseFeeHandler(
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
    jsonrpc: '2.0',
    id: request.id,
    result: '0x42', // TODO: eth answer as 31.07.2024 check if different in sn
  }
}

import { isRPCError } from '../../types/typeGuards'
import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'

export async function starknetCallHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  const response: RPCResponse | RPCError = await callStarknet({
    jsonrpc: request.jsonrpc,
    method: request.method,
    params: [],
    id: request.id,
  })

  if(isRPCError(response)) {
    return response
  }

  return {
    jsonrpc: '2.0',
    id: request.id,
    result: response.result,
  }
}

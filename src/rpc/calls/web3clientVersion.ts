import { isRPCError } from '../../types/typeGuards'
import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'

export async function web3clientVersionHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
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

  const response: RPCResponse | RPCError = await callStarknet({
    jsonrpc: request.jsonrpc,
    method: 'starknet_specVersion',
    params: [],
    id: request.id,
  })

  if(isRPCError(response)) {
    return response
  }

  const result = response.result as string

  const answer = `starknet/rosettanet/${result}`

  return {
    jsonrpc: request.jsonrpc,
    id: request.id,
    result: answer,
  }
}

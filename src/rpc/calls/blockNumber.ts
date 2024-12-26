import { isStarknetRPCError } from '../../types/typeGuards'
import { RPCError, RPCRequest, RPCResponse, StarknetRPCError } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'

export async function blockNumberHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  const response: RPCResponse | StarknetRPCError = await callStarknet({
    jsonrpc: request.jsonrpc,
    method: 'starknet_blockNumber',
    params: [],
    id: request.id,
  })

  if (
    isStarknetRPCError(response)
  ) {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: response
    }
  }

  const hexBlockNumber = '0x' + response.result.toString(16)

  return {
    jsonrpc: request.jsonrpc,
    id: request.id,
    result: hexBlockNumber,
  }
}

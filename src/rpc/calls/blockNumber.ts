import { isRPCError } from '../../types/typeGuards'
import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'

export async function blockNumberHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  const response: RPCResponse | RPCError = await callStarknet({
    jsonrpc: request.jsonrpc,
    method: 'starknet_blockNumber',
    params: [],
    id: request.id,
  })

  if (
    isRPCError(response)
  ) {
    return response
  }

  const hexBlockNumber = '0x' + response.result.toString(16)

  return {
    jsonrpc: request.jsonrpc,
    id: request.id,
    result: hexBlockNumber,
  }
}

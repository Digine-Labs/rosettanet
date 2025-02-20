import { isStarknetRPCError } from '../../types/typeGuards'
import { RPCError, RPCRequest, RPCResponse, StarknetRPCError } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { validateBlockHash } from '../../utils/validations'

export async function getBlockTransactionCountByHashHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  const method = 'starknet_getBlockTransactionCount'

  // Validate request parameters
  if (request.params.length == 0) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter should be valid block hash.',
      },
    }
  }

  const blockHash = request.params[0] as string

  // Validate block hash
  if (!validateBlockHash(blockHash)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter should be valid block hash.',
      },
    }
  }

  const response: RPCResponse | StarknetRPCError = await callStarknet({
    jsonrpc: request.jsonrpc,
    method,
    params: [
      {
        block_hash: blockHash,
      },
    ],
    id: request.id,
  })

  if(isStarknetRPCError(response)) {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: response
    }
  }

  response.result = '0x' + response.result.toString(16)

  return {
    jsonrpc: '2.0',
    id: request.id,
    result: response.result,
  }
}

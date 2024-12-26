import { isHexString } from 'ethers'
import { RPCError, RPCRequest, RPCResponse, StarknetRPCError } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { validateBlockNumber } from '../../utils/validations'
import { isStarknetRPCError } from '../../types/typeGuards'

export async function getBlockTransactionCountByNumberHandler(
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
        message: 'Invalid argument, Parameter should be valid block number.',
      },
    }
  }

  const blockNumber = request.params[0] as string

  if (!validateBlockNumber(blockNumber)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter should be valid block number.',
      },
    }
  }

  const currentLiveBlockNumber: RPCResponse | StarknetRPCError = await callStarknet({
    jsonrpc: request.jsonrpc,
    method: 'starknet_blockNumber',
    params: [],
    id: request.id,
  })

  if(isStarknetRPCError(currentLiveBlockNumber)) {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: currentLiveBlockNumber
    }
  }

  const params = isHexString(blockNumber)
    ? [{ block_number: parseInt(blockNumber, 16) }]
    : [{ block_number: blockNumber }]
  const response: RPCResponse | StarknetRPCError = await callStarknet({
    jsonrpc: request.jsonrpc,
    method,
    params,
    id: request.id,
  })

  if(isStarknetRPCError(response)) {
    return <RPCError> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: response
    }
  }

  // Convert the result to hex
  response.result = '0x' + response.result.toString(16)

  return {
    jsonrpc: '2.0',
    id: 1,
    result: response.result,
  }
}

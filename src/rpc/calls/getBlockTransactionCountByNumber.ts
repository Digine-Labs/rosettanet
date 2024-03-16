import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { validateBlockNumber } from '../../utils/validations'

export async function getBlockTransactionCountByNumberHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  // TODO: Dynamic network from env?
  const network = 'testnet'
  const method = 'starknet_getBlockTransactionCount'

  // Validate request parameters
  if (request.params.length == 0) {
    return {
      code: 7979,
      message: 'Starknet RPC Error',
      data: 'Params should not be empty',
    }
  }

  const blockNumber = request.params[0]

  if (!validateBlockNumber(blockNumber)) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid block number',
    }
  }

  const response: RPCResponse | string = await callStarknet(network, {
    jsonrpc: request.jsonrpc,
    method,
    params: [
      {
        block_number: blockNumber as number,
      },
    ],
    id: request.id,
  })

  if (!response || typeof response === 'string') {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: response,
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

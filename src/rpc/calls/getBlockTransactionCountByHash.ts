
import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'

export async function getBlockTransactionCountByHashHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  // TODO: Dynamic network from env?
  const network = 'testnet'
  const method = 'starknet_getBlockTransactionCount'

  if (request.params.length == 0) {
    return {
      code: 7979,
      message: 'Starknet RPC Error',
      data: 'params should not be empty',
    }
  }

  const blockHash = request.params[0] as string

  const response: RPCResponse | string = await callStarknet(network, {
    jsonrpc: request.jsonrpc,
    method,
    params: [
      {
        block_hash: blockHash,
      },
    ],
    id: request.id,
  })

  if (typeof response === 'string') {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: response,
    }
  }

  return {
    jsonrpc: '2.0',
    id: 1,
    result: response.result,
  }
}

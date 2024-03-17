import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { validateBlockHash } from '../../utils/validations'

export async function getBlockTransactionCountByHashHandler(
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

  const blockHash = request.params[0] as string

  // Validate block hash
  if (!validateBlockHash(blockHash)) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid block hash',
    }
  }

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

  if (
    typeof response === 'string' ||
    response === null ||
    response === undefined
  ) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: response,
    }
  }

  response.result = '0x' + response.result.toString(16)

  return {
    jsonrpc: '2.0',
    id: 1,
    result: response.result,
  }
}

export async function getBlockTransactionCountByHashSnResponse(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
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

  const blockHash = request.params[0] as string

  // Validate block hash
  if (!validateBlockHash(blockHash)) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid block hash',
    }
  }

  // do not need to handle the response, just return what callStarknet returns
  return callStarknet(network, {
    jsonrpc: request.jsonrpc,
    method,
    params: [
      {
        block_hash: blockHash,
      },
    ],
    id: request.id,
  }) as Promise<RPCResponse | RPCError>
}

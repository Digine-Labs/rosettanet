import { RPCErrorNew, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { validateBlockNumber } from '../../utils/validations'

export async function getBlockTransactionCountByNumberHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCErrorNew> {
  // TODO: Dynamic network from env?
  const network = 'testnet'
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

  const blockNumber = request.params[0] as number

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

  const currentLiveBlockNumber = await callStarknet(network, {
    jsonrpc: request.jsonrpc,
    method: 'starknet_blockNumber',
    params: [],
    id: request.id,
  })

  if (
    typeof currentLiveBlockNumber !== 'string' &&
    typeof currentLiveBlockNumber.result === 'number'
  ) {
    if (blockNumber > currentLiveBlockNumber.result) {
      return {
        jsonrpc: request.jsonrpc,
        id: request.id,
        error: {
          code: -32602,
          message:
            'Invalid argument, Parameter "block_number" can not be higher than current live block number of network.',
        },
      }
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

  if (
    typeof response === 'string' ||
    response === null ||
    response === undefined
  ) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: response,
      },
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

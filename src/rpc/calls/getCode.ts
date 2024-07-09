import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import {
  validateEthAddress,
  validateBlockNumber,
} from '../../utils/validations'
import { getSnAddressFromEthAddress } from '../../utils/wrapper'

export async function getCodeHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  if (request.params.length != 2) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter lenght should be 2.',
      },
    }
  }

  const ethAddress = request.params[0] as string
  const blockNumber = request.params[1] as string

  if (!validateEthAddress(ethAddress)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message:
          'Invalid argument, Parameter[0] should be a valid Ethereum Address.',
      },
    }
  }

  if (!validateBlockNumber(blockNumber)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Invalid block number.',
      },
    }
  }

  const snAddress = await getSnAddressFromEthAddress(ethAddress)

  if (snAddress === '0x0') {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Ethereum address is not in Lens contract.',
      },
    }
  }

  const response: RPCResponse | string = await callStarknet('testnet', {
    jsonrpc: request.jsonrpc,
    method: 'starknet_getClassHashAt',
    params: [{ block_number: blockNumber }, snAddress],
    id: request.id,
  })

  if (
    typeof response == 'string' ||
    response == null ||
    response == undefined
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
  // TODO: Return 0x if rosetta account. otherwise transfer STRK on wallet will be problematic.
  return {
    jsonrpc: '2.0',
    id: request.id,
    result: response.result,
  }
}

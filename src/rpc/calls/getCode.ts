import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { validateEthAddress } from '../../utils/validations'
import { getSnAddressFromEthAddress } from '../../utils/wrapper'

export async function getCodeHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  if (request.params.length != 2) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'params should not be empty',
    }
  }

  const ethAddress = request.params[0] as string
  const blockNumber = request.params[1] as string

  if (!validateEthAddress(ethAddress)) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'invalid eth address',
    }
  }

  const snAddress = await getSnAddressFromEthAddress(ethAddress)

  const response: RPCResponse | string = await callStarknet('testnet', {
    jsonrpc: request.jsonrpc,
    method: 'starknet_getClassHashAt',
    params: [{ block_number: blockNumber }, snAddress],
    id: request.id,
  })

  if (typeof response === 'string' || !response) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: response,
    }
  }

  return {
    jsonrpc: '2.0',
    id: request.id,
    result: response.result,
  }
}

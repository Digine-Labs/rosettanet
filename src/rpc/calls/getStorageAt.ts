import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { hexPadding } from '../../utils/padding'
import { validateEthAddress } from '../../utils/validations'
import { getSnAddressFromEthAddress } from '../../utils/wrapper'

const ETH_GET_STORAGE_AT_RESULT_LENGTH = 64

export async function getStorageAtHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  // TODO: dynamic network from env?
  const network = 'testnet'
  const method = 'starknet_getStorageAt'

  if (request.params.length == 0) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'params should not be empty',
    }
  }

  const ethAddress = request.params[0] as string
  if (!validateEthAddress(ethAddress)) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'invalid eth address',
    }
  }

  const snAddress = await getSnAddressFromEthAddress(ethAddress)
  const starknet_params = {
    jsonrpc: request.jsonrpc,
    method: method,
    params: [snAddress, ...request.params.slice(1)],
    id: request.id,
  }
  const response: RPCResponse | string = await callStarknet(
    network,
    starknet_params,
  )

  if (typeof response === 'string') {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: response,
    }
  }
  response.result = hexPadding(
    response.result as string,
    ETH_GET_STORAGE_AT_RESULT_LENGTH,
  )

  return {
    jsonrpc: '2.0',
    id: 1,
    result: response.result,
  }
}

export async function getStorageAtHandlerSnResponse(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  if (request.params.length == 0) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'params should not be empty',
    }
  }
  const ethAddress = request.params[0] as string
  if (!validateEthAddress(ethAddress)) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'invalid eth address',
    }
  }
  const snAddress = await getSnAddressFromEthAddress(ethAddress)
  const starknet_params = {
    jsonrpc: request.jsonrpc,
    method: 'starknet_getStorageAt',
    params: [snAddress, ...request.params.slice(1)],
    id: request.id,
  }
  // return callStarknet directly as it is a promise without manipulation to the response
  const response = await callStarknet('testnet', starknet_params)
  return response as RPCResponse
}

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
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter lenght should be 3.',
      },
    }
  }

  const ethAddress = request.params[0] as string
  if (!validateEthAddress(ethAddress)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Invalid Ethereum Address.',
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

  response.result = hexPadding(
    response.result as string,
    ETH_GET_STORAGE_AT_RESULT_LENGTH,
  )

  return {
    jsonrpc: '2.0',
    id: request.id,
    result: response.result,
  }
}

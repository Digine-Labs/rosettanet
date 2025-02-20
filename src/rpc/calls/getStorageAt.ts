import { isStarknetRPCError } from '../../types/typeGuards'
import {
  RPCError,
  RPCRequest,
  RPCResponse,
  StarknetRPCError,
} from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { hexPadding } from '../../utils/padding'
import { validateEthAddress } from '../../utils/validations'
import { getSnAddressFromEthAddress } from '../../utils/wrapper'

export async function getStorageAtHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
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

  const snAddress: string | StarknetRPCError =
    await getSnAddressFromEthAddress(ethAddress)

  if (isStarknetRPCError(snAddress)) {
    return <RPCError>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: snAddress,
    }
  }

  const starknet_params = {
    jsonrpc: request.jsonrpc,
    method: method,
    params: [snAddress, ...request.params.slice(1)],
    id: request.id,
  }
  const response: RPCResponse | StarknetRPCError =
    await callStarknet(starknet_params)

  if (isStarknetRPCError(response)) {
    return <RPCError>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: response,
    }
  }

  response.result = hexPadding(response.result as string, 64)

  return {
    jsonrpc: '2.0',
    id: request.id,
    result: response.result,
  }
}

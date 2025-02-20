import { isStarknetRPCError } from '../../types/typeGuards'
import {
  RPCError,
  RPCRequest,
  RPCResponse,
  StarknetRPCError,
} from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { validateEthAddress } from '../../utils/validations'
import { getSnAddressWithFallback } from '../../utils/wrapper'

export async function getTransactionCountHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  if (request.params.length == 0) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message:
          'Invalid argument, Parameter should be valid Ethereum Address.',
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
        message:
          'Invalid argument, Parameter should be valid Ethereum Address.',
      },
    }
  }

  const snAddress: string | StarknetRPCError =
    await getSnAddressWithFallback(ethAddress)
  if (isStarknetRPCError(snAddress)) {
    return <RPCError>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: snAddress,
    }
  }

  const response: RPCResponse | StarknetRPCError = await callStarknet({
    jsonrpc: request.jsonrpc,
    method: 'starknet_getNonce',
    params: ['latest', snAddress],
    id: request.id,
  })

  if (isStarknetRPCError(response)) {
    if (response.code == 20) {
      return <RPCResponse>{
        jsonrpc: request.jsonrpc,
        id: request.id,
        result: '0x0',
      }
    }
    return <RPCError>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: response,
    }
  }

  return {
    jsonrpc: '2.0',
    id: request.id,
    result: response.result,
  }
}

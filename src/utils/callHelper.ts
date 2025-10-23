import { getRpc } from './getRpc'
import {
  NativeBalance,
  RPCError,
  RPCRequest,
  RPCResponse,
  StarknetRPCError,
} from '../types/types'
import { getConfigurationProperty } from './configReader'
import { safeU256ToUint256 } from './converters/integer'
import axios from 'axios'
import { isRPCError, isStarknetRPCError } from '../types/typeGuards'
import { addHexPrefix } from './padding'

export async function callStarknet(
  request: RPCRequest,
): Promise<RPCResponse | StarknetRPCError> {
  try {
    const rpcUrl: string = getRpc()
    const { data } = await axios.post<RPCResponse | RPCError>(
      rpcUrl,
      JSON.stringify(request),
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )

    if (isRPCError(data)) {
      // We have to make a error code matching here
      return <StarknetRPCError>{
        code: data.error.code,
        message: data.error.message,
      }
    }
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return <StarknetRPCError>{
        code: -32500,
        message: error.message,
      }
    } else {
      return <StarknetRPCError>{
        code: -32501,
        message: 'Unexpected error occured',
      }
    }
  }
}

export async function getSTRKBalance(
  snAddress: string,
): Promise<NativeBalance | StarknetRPCError> {
  const ethAddress = getConfigurationProperty('strkAddress')
  const starknet_params = {
    jsonrpc: '2.0',
    method: 'starknet_call',
    params: [
      {
        contract_address: ethAddress,
        entry_point_selector:
          '0x035a73cd311a05d46deda634c5ee045db92f811b4e74bca4437fcb5302b7af33', // balance_of entrypoint
        calldata: [snAddress],
      },
      'latest',
    ],
    id: 1,
  }

  const response: RPCResponse | StarknetRPCError =
    await callStarknet(starknet_params)
  if (isStarknetRPCError(response)) {
    return response
  }

  if (!Array.isArray(response.result)) {
    return <StarknetRPCError>{
      code: -32700,
      message: 'Balance request from starknet fails. Result is not an array',
    }
  }

  const balance = safeU256ToUint256(response.result)
  return <NativeBalance>{
    starknetFormat: response.result,
    ethereumFormat: addHexPrefix(balance),
  }
}

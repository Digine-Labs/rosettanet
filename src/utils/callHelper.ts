import { getRpc } from './getRpc'
import { NativeBalance, RPCError, RPCRequest, RPCResponse } from '../types/types'
import { getConfigurationProperty } from './configReader'
import { U256toUint256 } from './converters/integer'
import axios from 'axios'
import { isRPCError } from '../types/typeGuards'

export async function callStarknet(
  request: RPCRequest
): Promise<RPCResponse | RPCError> {
  try {
    const rpcUrl: string = getRpc()
    const { data } = await axios.post<RPCResponse>(
      rpcUrl,
      JSON.stringify(request),
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return <RPCError> {
        id: request.id,
        jsonrpc: request.jsonrpc,
        error: {
          code: -32500,
          message: error.message
        }
      }
    } else {
      return <RPCError> {
        id: request.id,
        jsonrpc: request.jsonrpc,
        error: {
          code: -32501,
          message: 'Unexpected error occured'
        }
      }
    }
  }
}


export async function getSTRKBalance(snAddress: string): Promise<NativeBalance | RPCError> {
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

  const response: RPCResponse | RPCError = await callStarknet(starknet_params)
  if (isRPCError(response)) {
    return response
  }

  if(!Array.isArray(response.result)) {
    return <RPCError> {
      id: 1,
      jsonrpc: '2.0',
      error: {
        code: -32700,
        message: 'Balance request from starknet fails. Result is not an array'
      }
    }
  }
  
  const balance = U256toUint256(response.result)
  return <NativeBalance> {
    starknetFormat: response.result,
    ethereumFormat: balance
  } 
}

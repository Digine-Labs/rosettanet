import { getRpc } from './getRpc'
import { EstimateFeeTransaction, NativeBalance, RPCRequest, RPCResponse, StarknetRPCError } from '../types/types'
import { getConfigurationProperty } from './configReader'
import { U256toUint256 } from './converters/integer'
import axios from 'axios'
import { isStarknetRPCError } from '../types/typeGuards'

export async function callStarknet(
  request: RPCRequest
): Promise<RPCResponse | StarknetRPCError> {
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
      return <StarknetRPCError> {
          code: -32500,
          message: error.message
      }
    } else {
      return <StarknetRPCError> {
        code: -32501,
        message: 'Unexpected error occured'
      }
    }
  }
}

export async function getStarknetAccountNonce(snAddress: string): Promise<string | StarknetRPCError> {
  const nonce: RPCResponse | StarknetRPCError = await callStarknet({
    jsonrpc: '2.0',
    method: 'starknet_getNonce',
    params: ['latest', snAddress],
    id: 1,
  });

  if(isStarknetRPCError(nonce)) {
    return nonce
  }

  return nonce.result
}

export async function getSTRKBalance(snAddress: string): Promise<NativeBalance | StarknetRPCError> {
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

  const response: RPCResponse | StarknetRPCError = await callStarknet(starknet_params)
  if (isStarknetRPCError(response)) {
    return response
  }

  if(!Array.isArray(response.result)) {
    return <StarknetRPCError> {
        code: -32700,
        message: 'Balance request from starknet fails. Result is not an array'
    }
  }
  
  const balance = U256toUint256(response.result)
  return <NativeBalance> {
    starknetFormat: response.result,
    ethereumFormat: balance
  } 
}

export async function callStarknetEstimateFee(sender:string, txn: EstimateFeeTransaction, calldata: string[]): Promise<RPCResponse | StarknetRPCError> {
  const response: RPCResponse | StarknetRPCError = await callStarknet({
    jsonrpc: '2.0',
    method: 'starknet_estimateFee',
    params: {
      request: [{
        type: "INVOKE",
        version: "0x3",
        signature: txn.signature,
        sender_address: sender,
        calldata: calldata,
        nonce: txn.nonce,
        resource_bounds: {
          l1_gas: {
            max_amount: txn.maxAmountGas,
            max_price_per_unit: txn.maxGasPricePerUnit
          },
          l2_gas: {
            max_amount: "0x0",
            max_price_per_unit: "0x0"
          }
        },
        tip: "0x0",
        paymaster_data: [],
        fee_data_availability_mode: "L1",
        nonce_data_availability_mode: "L1",
        account_deployment_data: []
      }],
      block_id: 'latest',
      simulation_flags: ['SKIP_VALIDATE']
    },
    id: 1
  });
  return response
}

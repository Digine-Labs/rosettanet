/* eslint-disable no-console */
import { callStarknet } from './callHelper'
import {
  RPCResponse,
  SignedRawTransaction,
  StarknetRPCError,
} from '../types/types'
import { getConfigurationProperty } from './configReader'
import { isRPCResponse, isStarknetRPCError } from '../types/typeGuards'
import { addHexPrefix } from './padding'

// Calls starknet factory contract to precalculate starknet account address
// TODO: add custom types like in deploy function
export interface RosettanetAccountResult {
  contractAddress: string
  ethAddress: string
  isDeployed: boolean
}

export async function getRosettaAccountAddress(
  ethAddress: string,
): Promise<RosettanetAccountResult> {
  const rosettanet = getConfigurationProperty('rosettanet')
  const callParams = [
    {
      calldata: [ethAddress],
      contract_address: rosettanet,
      entry_point_selector:
        '0x025356d5707a314336daf6636019fcd414e2403787a6dfb3eacc0c8450b341c8',
    },
    'pending',
  ]

  const response: RPCResponse | StarknetRPCError = await callStarknet({
    // todo handle error if string
    jsonrpc: '2.0',
    method: 'starknet_call',
    params: callParams,
    id: 1,
  })

  if (isStarknetRPCError(response)) {
    return <RosettanetAccountResult>{
      contractAddress: '',
      ethAddress: ethAddress,
      isDeployed: false,
    }
  }

  const precalculatedAddress = response.result[0].toString()

  const classHashCall: RPCResponse | StarknetRPCError = await callStarknet({
    jsonrpc: '2.0',
    method: 'starknet_getClassHashAt',
    params: {
      block_id: 'latest',
      contract_address: precalculatedAddress,
    },
    id: 2,
  })

  if (
    isStarknetRPCError(classHashCall) ||
    typeof classHashCall.result === 'undefined'
  ) {
    return <RosettanetAccountResult>{
      contractAddress: '',
      ethAddress: ethAddress,
      isDeployed: false,
    }
  }

  return <RosettanetAccountResult>{
    contractAddress: precalculatedAddress,
    ethAddress: ethAddress,
    isDeployed: true,
  }
}

export async function isRosettaAccountDeployed(
  snAddress: string,
  expectedClass: string,
): Promise<boolean> {
  const response: RPCResponse | StarknetRPCError = await callStarknet({
    jsonrpc: '2.0',
    id: 1,
    method: 'starknet_getClassHashAt',
    params: {
      block_id: 'latest',
      contract_address: snAddress,
    },
  })

  if (isStarknetRPCError(response)) {
    return false
  }

  return response.result === expectedClass
}

export interface AccountDeployResult {
  transactionHash: string
  contractAddress: string
}

export interface AccountDeployError {
  code: number
  message: string
}

export async function deployRosettanetAccount(
  txn: SignedRawTransaction,
): Promise<AccountDeployResult | AccountDeployError> {
  const rosettanet = getConfigurationProperty('rosettanet')
  const accountClass = getConfigurationProperty('accountClass')
  const gasPrice = txn.maxFeePerGas == null ? txn.gasPrice : txn.maxFeePerGas
  const actualGasPrice = gasPrice == null ? '0x0' : gasPrice

  const deployRequest = {
    // todo handle error if string
    jsonrpc: '2.0',
    method: 'starknet_addDeployAccountTransaction',
    params: {
      deploy_account_transaction: {
        type: 'DEPLOY_ACCOUNT',
        version: '0x3',
        signature: ['0'],
        nonce: '0x0',
        contract_address_salt: txn.from,
        class_hash: accountClass,
        constructor_calldata: [txn.from, rosettanet],
        resource_bounds: {
          l1_gas: {
            max_amount: addHexPrefix(txn.gasLimit.toString(16)),
            max_price_per_unit: addHexPrefix(actualGasPrice.toString(16)),
          },
          l2_gas: {
            max_amount: '0',
            max_price_per_unit: '0',
          },
        },
        tip: '0x0',
        paymaster_data: [],
        nonce_data_availability_mode: 'L1',
        fee_data_availability_mode: 'L1',
      },
    },
    id: 1,
  }
  const response: RPCResponse | StarknetRPCError = await callStarknet(deployRequest)

  console.log(JSON.stringify(deployRequest))
  /*
 {
    "jsonrpc": "2.0",
    "result": {
        "transaction_hash": "0xf1e9633377819a8941be313a4b54b5a0d7db66f42820ceb1af4b672d536854",
        "contract_address": "0x2292d3b1a3d6472fc63669d4a71a142dad5400100792c4b065358578e5d430"
    },
    "id": 1
}
 */
  console.log(response)
  if (!isRPCResponse(response)) {
    return response
  }

  if (
    typeof response.result['contract_address'] === 'string' &&
    typeof response.result['transaction_hash'] === 'string'
  ) {
    return <AccountDeployResult>{
      transactionHash: response.result.transaction_hash,
      contractAddress: response.result.contract_address,
    }
  }

  return <AccountDeployError>{
    code: -32700,
    message: 'Starknet RPC respond unexpected data format.',
  }
}

export async function registerDeployedAccount() {
  // Accounts need to get registered after deployed by itself
  // We register accounts on their first transaction execution
}

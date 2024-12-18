/* eslint-disable no-console */
import { callStarknet } from './callHelper'
import { RPCResponse } from '../types/types'
import { getConfigurationProperty } from './configReader'

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

  const response: RPCResponse | string = await callStarknet({
    // todo handle error if string
    jsonrpc: '2.0',
    method: 'starknet_call',
    params: callParams,
    id: 1,
  })

  if (typeof response === 'string') {
    return <RosettanetAccountResult> {
      contractAddress: '',
      ethAddress: ethAddress,
      isDeployed: false
    }
  }

  const precalculatedAddress = response.result[0].toString();

  const classHashCall: RPCResponse | string = await callStarknet({
    jsonrpc: '2.0',
    method: 'starknet_getClassHashAt',
    params: {
      block_id: 'latest',
      contract_address: precalculatedAddress
    },
    id: 2,
  })

  if(typeof classHashCall === 'string') {
    return <RosettanetAccountResult> {
      contractAddress: '',
      ethAddress: ethAddress,
      isDeployed: false
    }
  }

  if(typeof classHashCall.result === 'undefined') {
    return <RosettanetAccountResult> {
      contractAddress: '',
      ethAddress: ethAddress,
      isDeployed: false
    }
  }


  return <RosettanetAccountResult> {
    contractAddress: precalculatedAddress,
    ethAddress: ethAddress,
    isDeployed: true
  }

}

export async function isRosettaAccountDeployed(
  snAddress: string,
  expectedClass: string,
): Promise<boolean> {
  const response: RPCResponse | string = await callStarknet({
    jsonrpc: '2.0',
    id: 1,
    method: 'starknet_getClassHashAt',
    params: {
      block_id: 'latest',
      contract_address: snAddress,
    },
  })

  if (typeof response === 'string') {
    return false
  }

  return response.result === expectedClass
}

export interface AccountDeployResult {
  transactionHash : string,
  contractAddress: string
}

export interface AccountDeployError {
  code: number,
  message: string
}

export async function deployRosettanetAccount(
  ethAddress: string,
): Promise<AccountDeployResult | AccountDeployError> {
  const rosettanet = getConfigurationProperty('rosettanet')
  const accountClass = getConfigurationProperty('accountClass')
  const response: RPCResponse | string = await callStarknet({
    // todo handle error if string
    jsonrpc: '2.0',
    method: 'starknet_addDeployAccountTransaction',
    params: {
      deploy_account_transaction: {
        type: 'DEPLOY_ACCOUNT',
        version: '0x3',
        signature: ['0'],
        nonce: '0x0',
        contract_address_salt: ethAddress,
        class_hash: accountClass,
        constructor_calldata: [ethAddress, rosettanet],
        resource_bounds: {
          l1_gas: {
            max_amount: '100',
            max_price_per_unit: '1674663993390', // TODO: We need to find a way to get actual values for these
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
  })
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

  if(typeof response === 'string'){
    return <AccountDeployError> {
      code: -1,
      message: 'Unknown return type from Starknet RPC'
    }
  }

  if(typeof response.error !== 'undefined') {
    return <AccountDeployError> {
      code: response.error.code,
      message: response.error.message
    }
  }

  if (typeof response.result['contract_address'] === 'string') {
    return <AccountDeployResult> {
      transactionHash: response.result.transaction_hash,
      contractAddress: response.result.contract_address
    }
  }

  return <AccountDeployError> {
    code: -2,
    message: 'Unhandled rpc response'
  }
}

export function isAccountDeployError(value: unknown): value is AccountDeployError {
  if (typeof value === "object" && value !== null) {
    const obj = value as AccountDeployError;
    // Here we use `typeof` to check property types
    return typeof obj.code === "number" && typeof obj.message === "string";
  }
  return false;
}

export function isAccountDeployResult(value: unknown): value is AccountDeployResult {
  if (typeof value === "object" && value !== null) {
    const obj = value as AccountDeployResult;
    // Here we use `typeof` to check property types
    return typeof obj.transactionHash === "string" && typeof obj.contractAddress === "string";
  }
  return false;
}

export async function registerDeployedAccount() {
  // Accounts need to get registered after deployed by itself
}

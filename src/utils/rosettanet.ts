/* eslint-disable no-console */
import { callStarknet } from './callHelper'
import { RPCResponse } from '../types/types'
import { getConfigurationProperty } from './configReader'
import BigNumber from 'bignumber.js'
// Calls starknet factory contract to precalculate starknet account address
export async function getRosettaAccountAddress(
  ethAddress: string,
): Promise<string> {
  const rosettanet = getConfigurationProperty('rosettanet')
  const callParams = [
    {
      calldata: [ethAddress], // Todo check is correct
      contract_address: rosettanet,
      entry_point_selector: '0x3e5d65a345b3857ca9d72edca702b8e56c1923c118867752345f710d595b3cf',
    },
    'pending', // update to latest
  ]

  const response: RPCResponse | string = await callStarknet({
    // todo handle error if string
    jsonrpc: '2.0',
    method: 'starknet_call',
    params: callParams,
    id: 1,
  })

  if (typeof response === 'string') {
    return '0x0'
  }

  return response.result.toString() // Todo format output to string
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

export async function deployRosettanetAccount(ethAddress: string) : Promise<string> {
  const rosettanet = getConfigurationProperty('rosettanet');
  const accountClass = getConfigurationProperty('accountClass');
  const response: RPCResponse | string = await callStarknet({
    // todo handle error if string
    jsonrpc: '2.0',
    method: 'starknet_addDeployAccountTransaction',
    params: {
      deploy_account_transaction: {
        "type": "DEPLOY_ACCOUNT",
        "version": "0x3",
        "signature": [
          "0",
        ],
        nonce: '0x0',
        contract_address_salt : ethAddress,
        class_hash: accountClass,
        constructor_calldata: [ethAddress, rosettanet],
        resource_bounds: {
          l1_gas: {
            max_amount: "1000",
            max_price_per_unit: "63376703040606", // TODO: We need to find a way to get actual values for these
          },
          l2_gas: {
            max_amount: "0",
            max_price_per_unit: "0",
          }
        },
        tip: "0x0",
        paymaster_data: [],
        nonce_data_availability_mode: "L1",
        fee_data_availability_mode: "L1"
      }
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
  if(typeof response === 'string') {
    return '0'
  }

  if(typeof response.result.contract_address === 'string') {
    return response.result.contract_address;
  }
  
  return '0'
}

export async function registerDeployedAccount() {
  // Accounts need to get registered after deployed by itself
}
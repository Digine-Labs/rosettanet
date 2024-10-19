/* eslint-disable no-console */
import { callStarknet } from './callHelper'
import { RPCResponse } from '../types/types'
import { getConfigurationProperty } from './configReader'
// Calls starknet factory contract to precalculate starknet account address
export async function getRosettaAccountAddress(
  ethAddress: string,
): Promise<string> {
  const factoryAddress = getConfigurationProperty('factoryAddress')
  const callParams = [
    {
      calldata: [ethAddress], // Todo check is correct
      contract_address: factoryAddress,
      entry_point_selector: 'TODO',
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

  console.log(response)

  return response.toString() // Todo format output to string
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

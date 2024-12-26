import { callStarknet } from './callHelper'
import { RPCRequest, RPCResponse, StarknetRPCError } from '../types/types'
import { getConfigurationProperty } from './configReader'
import { isStarknetRPCError } from '../types/typeGuards'

const SELECTORS = {
  get_sn_address_from_eth_address:
    '0x3e5d65a345b3857ca9d72edca702b8e56c1923c118867752345f710d595b3cf',
  get_eth_address_from_sn_address:
    '0x1d5cede02897d15d9053653ef3e41f52394e444218efdfdec3dfaf529dcf5dd',
}

// Returns registered address in starknet address format
// ethAddress: Valid ethereum address
// Returns starknet address, if error returns 0
export async function getEthAddressFromSnAddress(
  snAddress: string,
): Promise<string | StarknetRPCError> {
  const rosettanetContract = getConfigurationProperty('rosettanet');
  const request: RPCRequest = {
    jsonrpc: '2.0',
    method: 'starknet_call',
    params: [
      {
        contract_address: rosettanetContract,
        entry_point_selector: SELECTORS.get_eth_address_from_sn_address,
        calldata: [snAddress],
      },
      'latest',
    ],
    id: 1,
  }
  const response: RPCResponse | StarknetRPCError = await callStarknet(request)

  if (isStarknetRPCError(response)) {
    return response
  }

  if (Array.isArray(response.result) && response.result.length == 1) {
    return response.result[0]
  } else {
    return <StarknetRPCError> {
        code: -32700,
        message: 'Reading ethereum address from Rosettanet contract fails. Starknet rpc resulted with different type then expected.'
    }
  }
}

export async function getSnAddressFromEthAddress(
  ethAddress: string,
): Promise<string | StarknetRPCError> {
  const rosettanetContract = getConfigurationProperty('rosettanet');
  const request: RPCRequest = {
    jsonrpc: '2.0',
    method: 'starknet_call',
    params: [
      {
        contract_address: rosettanetContract,
        entry_point_selector: SELECTORS.get_sn_address_from_eth_address,
        calldata: [ethAddress],
      },
      'latest',
    ],
    id: 1,
  }
  const response: RPCResponse | StarknetRPCError = await callStarknet(request)

  if (isStarknetRPCError(response)) {
    return response
  }

  if (Array.isArray(response.result) && response.result.length == 1) {
    const address = response.result[0];

    if(address === '0x0') {
      return <StarknetRPCError> {
          code: -32700,
          message: 'Target not registered on registry.'
      }
    }
    return response.result[0]
  } else {
    return <StarknetRPCError> {
        code: -32700,
        message: 'Reading starknet address from Rosettanet contract fails. Starknet rpc resulted with different type then expected.'
    }
  }
}

import { callStarknet } from './callHelper'
import { RPCRequest, RPCResponse } from '../types/types'

const CONTRACT_ADDRESS = {
  sepolia: '0x07a1af0575e1291bd19b2e342241ceb2a1eac5c10543d82146216d56412337f7',
  mainnet: '',
}
// 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
// 0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc7 is ETH address on sn

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
): Promise<string> {
  const request: RPCRequest = {
    jsonrpc: '2.0',
    method: 'starknet_call',
    // TODO: read network from env
    params: [
      {
        contract_address: CONTRACT_ADDRESS.sepolia,
        entry_point_selector: SELECTORS.get_eth_address_from_sn_address,
        calldata: [snAddress],
      },
      'latest',
    ],
    id: 1,
  }
  const response: RPCResponse | string = await callStarknet(request)

  if (typeof response === 'string') {
    return '0'
  }

  if (Array.isArray(response.result) && response.result.length > 0) {
    return response.result[0].toString()
  } else {
    return '0'
  }
}

export async function getSnAddressFromEthAddress(
  ethAddress: string,
): Promise<string> {
  const request: RPCRequest = {
    jsonrpc: '2.0',
    method: 'starknet_call',
    params: [
      {
        // TODO: read network from env
        contract_address: CONTRACT_ADDRESS.sepolia,
        entry_point_selector: SELECTORS.get_sn_address_from_eth_address,
        calldata: [ethAddress],
      },
      'latest',
    ],
    id: 1,
  }
  const response: RPCResponse | string = await callStarknet(request)

  if (typeof response === 'string') {
    return '0'
  }

  if (Array.isArray(response.result) && response.result.length > 0) {
    return response.result[0].toString()
  } else {
    return '0'
  }
}

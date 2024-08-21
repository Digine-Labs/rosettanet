import { callStarknet } from './callHelper'
import { RPCRequest, RPCResponse } from '../types/types'

const CONTRACT_ADDRESS = {
  sepolia: '0x055f17a002c440e850c7005180ae803c7d2752f554add2ef7f3a740a24fadfa6',
  mainnet: '',
}
// 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
// 0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc7 is ETH address on sn

const SELECTORS = {
  get_sn_address_from_eth_address:
    '0x00cdb247d63cc9ddeb10d27644bf643e86af5b486d387bf5c3eb2dcba1d0d1fb',
  get_eth_address_from_sn_address:
    '0x00efa444af091f058c8529653de0c739370c8a5c251cc0c8288c9eea71eeafcc',
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

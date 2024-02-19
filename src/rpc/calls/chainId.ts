import { RPCResponse } from '../../types/types'

// TODO: This is just for handler impl. We should return chain id from starknet rpc.
export function getChainIdHandler(): RPCResponse {
  return {
    jsonrpc: '2.0',
    id: 1,
    result: '0x534e5f4d41494e',
  }
}

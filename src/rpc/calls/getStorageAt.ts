import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { hexPadding } from '../../utils/padding'

const ETH_GET_STORAGE_AT_RESULT_LENGTH = 64;

export async function getStorageAtHandler(
    request: RPCRequest,
  ): Promise<RPCResponse | RPCError> {
    // TODO: dynamic network from env?
  const network = 'testnet'
  const method = 'starknet_getStorageAt'
  const response: RPCResponse | string = await callStarknet(network, {
    jsonrpc: request.jsonrpc,
    method: method,
    params: request.params,
    id: request.id,
  })

  if (typeof response === 'string') {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: response,
    }
  }
  response.result = hexPadding(response.result as string, ETH_GET_STORAGE_AT_RESULT_LENGTH);

  return {
    jsonrpc: '2.0',
    id: 1,
    result: response.result,
  }
}
import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'

export async function blockNumberHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  const response: RPCResponse | string = await callStarknet('testnet', {
    jsonrpc: request.jsonrpc,
    method: 'starknet_blockNumber',
    params: [],
    id: request.id,
  })

  if (typeof response === 'string') {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: response,
    }
  }

  const hexBlockNumber = '0x' + response.result.toString(16)

  return {
    jsonrpc: '2.0',
    id: 1,
    result: hexBlockNumber,
  }
}

export async function blockNumberHandlerSnResponse(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  // no need to handle the data, callStarknet will handle it.
  return (await callStarknet('testnet', {
    jsonrpc: request.jsonrpc,
    method: 'starknet_blockNumber',
    params: [],
    id: request.id,
  })) as RPCResponse
}

import {
  RPCError,
  RPCErrorNew,
  RPCRequest,
  RPCResponse,
} from '../../types/types'
import { callStarknet } from '../../utils/callHelper'

export async function blockNumberHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCErrorNew> {
  const response: RPCResponse | string = await callStarknet('testnet', {
    jsonrpc: request.jsonrpc,
    method: 'starknet_blockNumber',
    params: [],
    id: request.id,
  })

  if (typeof response === 'string') {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32600,
        message: 'Invalid request, The JSON request is possibly malformed.',
      },
    }
  }

  const hexBlockNumber = '0x' + response.result.toString(16)

  return {
    jsonrpc: '2.0',
    id: 1,
    result: hexBlockNumber,
  }
}

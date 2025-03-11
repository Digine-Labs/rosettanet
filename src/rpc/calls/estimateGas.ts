/* eslint-disable no-console */
import { RPCResponse, RPCRequest, RPCError } from '../../types/types'

export async function estimateGasHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  try {
    return <RPCResponse>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: '0x5208',
    }
  } catch (ex) {
    return <RPCResponse>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: '0x5208',
    }
  }
}

import { RPCError, RPCResponse } from '../../types/types'

export async function ethCallHandler(): Promise<RPCResponse | RPCError> {
    // TODO response
  return {
    jsonrpc: '2.0',
    id: 1,
    result: '0x0',
  }
}

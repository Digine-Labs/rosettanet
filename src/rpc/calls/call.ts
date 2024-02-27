import { RPCError, RPCResponse } from '../../types/types'

export async function callHandler(): Promise<RPCResponse | RPCError> {
  // TODO
  return {
    jsonrpc: '2.0',
    id: 1,
    result: 'not implemented',
  }
}

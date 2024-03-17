import { RPCError, RPCResponse } from '../../types/types'

export async function maxPriorityFeePerGasHandler(): Promise<
  RPCResponse | RPCError
> {
  return {
    jsonrpc: '2.0',
    id: 1,
    result: '0x0',
  }
}

export async function maxPriorityFeePerGasHandlerSnResponse(): Promise<
  RPCResponse | RPCError
> {
  return {
    jsonrpc: '2.0',
    id: 1,
    result: '0x0',
  }
}

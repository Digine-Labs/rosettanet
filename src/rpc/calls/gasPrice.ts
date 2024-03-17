import { RPCError, RPCResponse } from '../../types/types'

export async function gasPriceHandler(): Promise<RPCResponse | RPCError> {
  return {
    jsonrpc: '2.0',
    id: 1,
    result: '0xEE6B280',
  }
}

export async function gasPriceHandlerSnResponse(): Promise<
  RPCResponse | RPCError
> {
  return {
    jsonrpc: '2.0',
    id: 1,
    result: '0xEE6B280',
  }
}

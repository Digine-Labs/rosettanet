import { Request } from 'express'

export interface ParsedRequest extends Request {
  rpcRequest?: RPCRequest
}

export interface RPCRequest {
  jsonrpc: string
  method: string
  params: Array<string | number | boolean | object>
  id: number
}

export interface RPCError {
  code: number
  message: string
  data: string
}

export interface RPCResponse {
  jsonrpc: string
  id: number
  result:
    | string
    | number
    | boolean
    | object
    | Array<string | number | boolean | object>
}

export interface ResponseHandler {
  method: string
  handler(request?: RPCRequest | undefined): Promise<RPCResponse | RPCError>
}

export interface StarknetType {
  name: string
  converter(value: string): string | Array<string> | undefined
}

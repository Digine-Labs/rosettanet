import { Request } from 'express'

export interface ParsedRequest extends Request {
  rpcRequest?: RPCRequest
}

export interface RPCRequest {
  jsonrpc: string
  method: string
  params: Array<string | number | boolean>
}

export interface RPCError {
  code: number
  message: string
  data: string
}

export interface RPCResponse {
  jsonrpc: string
  id: number
  result: string | number | boolean | Array<string | number | boolean>
}

export interface ResponseHandler {
  method: string
  handler(params?: Array<string | number | boolean> | undefined): RPCResponse
}

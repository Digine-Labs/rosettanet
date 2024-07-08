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
  data?: string
}

export interface RPCErrorNew {
  id: number
  jsonrpc: string
  error: {
    code: number
    message: string
  }
}

export interface RPCResponse {
  error?: {
    code?: number
    message?: string
    data?: object
  }
  jsonrpc: string
  id: number
  result:
    | string
    | number
    | boolean
    | object
    | Array<string | number | boolean | object>
}

// TODO: Change RPCError to RPCErrorNew before push or after fixed all rpc calls
export interface ResponseHandler {
  method: string
  handler(request?: RPCRequest | undefined): Promise<RPCResponse | RPCError>
}

export interface StarknetType {
  name: string
  converter(value: string): string | Array<string> | undefined
}

export interface StarknetFunctionInput {
  name: string
  type: string
}

export interface StarknetFunctionOutput {
  type: string
}

export interface StarknetFunction {
  name: string
  inputs?: Array<StarknetFunctionInput>
  outputs?: Array<StarknetFunctionOutput>
  type: string
  state_mutability: string
}

export interface EthereumSlot {
  order: number
  bits: number
}

export interface EthereumBitSize {
  slotSize: number
  bitSize: number
}

export interface StarknetValue {
  value: string
  bitSize: number
}

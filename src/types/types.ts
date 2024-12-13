import { Request } from 'express'

export interface ParsedRequest extends Request {
  rpcRequest?: RPCRequest
}

export interface RPCRequest {
  jsonrpc: string
  method: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Array<string | number | boolean | object> | any
  id: number
}

export interface RPCError {
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
  result: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | any
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

export interface StarknetFunctionInput {
  name: string
  type: string
}

export interface StarknetFunctionOutput {
  type: string
}

export interface StarknetTypeMember {
  name: string
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express'
import { Abi } from 'starknet'

export interface ParsedRequest extends Request {
  rpcRequest?: RPCRequest
}

export interface RPCRequest {
  jsonrpc: string
  method: string
  params: any
  id: number
}

export interface RPCError {
  id: number
  jsonrpc: string
  error: {
    code: number
    message: string
    data?: any
  }
}

export interface RPCResponse {
  jsonrpc: string
  id: number
  result: any
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
// After refactor types

export interface EVMDecodeResult {
  calldata: Array<string>
  directives: Array<number>
}

export interface EVMDecodeError {
  code: number
  message: string
}

export type EVMEncodeError = EVMDecodeError;

export interface EVMEncodeResult {
  data: string
}

export interface RosettanetSignature {
  r: string
  s: string
  v: number
  value: bigint
  arrayified: Array<string>
}

export interface NativeBalance {
  starknetFormat: Array<string>
  ethereumFormat: string
}

export interface SignedRawTransaction {
  from: string
  to: string
  data: string
  value: bigint
  nonce: number
  chainId: bigint
  type: number
  signature: RosettanetSignature
  gasLimit: bigint
  maxFeePerGas: bigint
  maxPriorityFeePerGas: bigint
}

export interface ValidationError {
  message: string
}

export interface StarknetContract {
  abi: Abi,
  methods: Array<StarknetFunction>
}

export interface StarknetContractReadError {
  code: number
  message: string
}
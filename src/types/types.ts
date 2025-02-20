/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express'
import { Abi } from 'starknet'
import { StarknetCallableMethod } from '../utils/match'

export interface ParsedRequest extends Request {
  rpcRequest?: RPCRequest
}

export interface RPCRequest {
  jsonrpc: string
  method: string
  params: any
  id: any
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
  id: any
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

export interface RawTransaction {
  from: string
  to: string
  gas: string
  gasPrice: string
  value: string | null
  data: string | null
}

export interface SimulateTransaction {
  from: string | null
  to: string // We use to address as sender_address in case from is null
  gas: string | null
  gasPrice: string | null
  maxPriorityFeePerGas: string | null
  maxFeePerGas: string | null
  value: string | null
  data: string | null
  gasLimit: string | null
}

export interface EstimateFeeTransaction {
  from: string
  to: string
  maxAmountGas: string
  maxGasPricePerUnit: string
  nonce: string
  value: bigint
  signature : string[]
  calldata: string[]
  directives: number[]
  targetFunction: StarknetCallableMethod | undefined
}

export interface SignedRawTransaction {
  from: string
  to: string
  data: string
  value: bigint
  nonce: number
  chainId: bigint
  type: number | null
  signature: RosettanetSignature
  gasLimit: bigint
  maxFeePerGas: bigint | null
  maxPriorityFeePerGas: bigint | null
  gasPrice: bigint | null
}

export interface ValidationError {
  message: string
}

export interface PrepareCalldataError {
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

export interface StarknetRPCError {
  code: number
  message: string
}
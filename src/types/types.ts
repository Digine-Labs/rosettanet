/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Request } from 'express'
import { Abi } from 'starknet'

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

export interface EVMDecodeResult {
  calldata: Array<string>
  directives: Array<number>
}

export interface EVMDecodeError {
  code: number
  message: string
}

export type EVMEncodeError = EVMDecodeError

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
  signature: string[]
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
  abi: Abi
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

export interface RosettanetRawCalldata {
  txType: string
  to: string
  nonce: string
  maxPriorityFeePerGas: string
  maxFeePerGas: string
  gasPrice: string
  gasLimit: string
  value: string
  selector: string
  rawInput: string
}

export interface RosettanetCompatibleAddress {
  starknet: string;
  ethereum: string;
}

export interface SyncedGas {
  l1: {
    fri: string
    wei: string
  },
  l1_data: {
    fri: string
    wei: string
  },
  l2: {
    fri: string
    wei: string
  }
}

export interface GasData {
  price_in_fri: string
  price_in_wei: string
}

export interface EthCallParameters {
  from?: string
  to: string
  gas?: string | number | bigint
  gasPrice?: string | number | bigint
  value?: string | number | bigint
  data?: string
  input?: string
}

export interface ActualFeeObject {
  amount: string
  unit: string
}

export interface EstimateGasParameters {
  from?: string;
  to?: string;
  value?: bigint;
  data?: string;
  gas?: string;
  gasLimit?: bigint;
  gasPrice?: bigint;
  nonce?: string | number;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
}

export interface GasCost {
  l1: number,
  l1_data: number,
  l2: number
} // TODO: Maybe making BigInt can be better.

export interface StarknetCallableMethod {
  ethereumSignature: string
  snFunction: StarknetFunction
  name: string
  ethereumTypedName: string
}

export interface ResourceBounds {
  l1_gas: {
    max_amount: string
    max_price_per_unit: string
  }
  l1_data_gas: {
    max_amount: string
    max_price_per_unit: string
  }
  l2_gas: {
    max_amount: string
    max_price_per_unit: string
  }
}

// TODO: add custom types like in deploy function
export interface RosettanetAccountResult {
  contractAddress: string
  ethAddress: string
  isDeployed: boolean
}

export interface AccountDeployResult {
  transactionHash: string
  contractAddress: string
}

export interface AccountDeployError {
  code: number
  message: string
}

// We will use this interface for both function selector calc and calldata slot calcs
export interface ConvertableType {
  size: number // bitsize
  isDynamicSize: boolean // true if array
  solidityType: string // uint256, etc. name used on function selector calc
  isTuple: boolean // true if struct or tuple
  tupleSizes?: Array<number>
  formatter?: (value: string) => string | Promise<string>
}

export interface CairoNamedConvertableType extends ConvertableType {
  cairoType: string
}
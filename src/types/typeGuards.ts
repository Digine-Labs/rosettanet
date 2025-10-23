/* eslint-disable  @typescript-eslint/no-explicit-any */
import {
  EVMDecodeError,
  EVMDecodeResult,
  EVMEncodeResult,
  PrepareCalldataError,
  RosettanetSignature,
  RPCError,
  RPCResponse,
  SignedRawTransaction,
  StarknetContract,
  StarknetRPCError,
  AccountDeployResult
} from './types'

export function isRPCError(value: unknown): value is RPCError {
  if (typeof value === 'object' && value !== null) {
    const obj = value as RPCError
    return (
      (typeof obj.id === 'number' || typeof obj.id === 'string') &&
      typeof obj.jsonrpc === 'string' &&
      typeof obj.error === 'object' &&
      obj.error !== null &&
      typeof obj.error.code === 'number' &&
      typeof obj.error.message === 'string'
    )
  }
  return false
}

export function isRPCResponse(value: unknown): value is RPCResponse {
  if (typeof value === 'object' && value !== null) {
    const obj = value as RPCResponse
    return (
      typeof obj.id === 'number' &&
      typeof obj.jsonrpc === 'string' &&
      obj.result != null
    )
  }
  return false
}

export function isAccountDeployResult(
  value: unknown,
): value is AccountDeployResult {
  if (typeof value === 'object' && value !== null) {
    const obj = value as AccountDeployResult
    return (
      typeof obj.transactionHash === 'string' &&
      typeof obj.contractAddress === 'string'
    )
  }
  return false
}

export function isEVMDecodeError(value: unknown): value is EVMDecodeError {
  if (typeof value === 'object' && value !== null) {
    const obj = value as EVMDecodeError
    return typeof obj.message === 'string' && typeof obj.code === 'number'
  }
  return false
}

export function isEVMDecodeResult(value: unknown): value is EVMDecodeResult {
  if (typeof value === 'object' && value !== null) {
    const obj = value as EVMDecodeResult
    return Array.isArray(obj.calldata) && Array.isArray(obj.directives)
  }
  return false
}

export function isEVMEncodeResult(value: unknown): value is EVMEncodeResult {
  if (typeof value === 'object' && value !== null) {
    const obj = value as EVMEncodeResult
    return typeof obj.data === 'string'
  }
  return false
}

export function isRosettanetSignature(
  value: unknown,
): value is RosettanetSignature {
  if (typeof value === 'object' && value !== null) {
    const obj = value as RosettanetSignature
    return (
      typeof obj.r === 'string' &&
      typeof obj.s === 'string' &&
      typeof obj.v === 'number' &&
      typeof obj.value === 'bigint' &&
      Array.isArray(obj.arrayified) &&
      obj.arrayified.length == 7
    )
  }
  return false
}

export function isSignedRawTransaction(
  value: unknown,
): value is SignedRawTransaction {
  // TODO: doesnt works
  if (typeof value === 'object' && value !== null) {
    const obj = value as SignedRawTransaction
    return (
      typeof obj.from === 'string' &&
      typeof obj.to === 'string' &&
      typeof obj.chainId === 'bigint' &&
      typeof obj.nonce === 'number' &&
      typeof obj.data === 'string' &&
      typeof obj.value === 'bigint' &&
      isRosettanetSignature(obj.signature) &&
      typeof obj.gasLimit === 'bigint' &&
      (typeof obj.maxFeePerGas === 'bigint' || obj.gasPrice != null) &&
      (typeof obj.maxPriorityFeePerGas === 'bigint' || obj.gasPrice != null)
    )
  }
  return false
}

export function isPrepareCalldataError(
  value: unknown,
): value is PrepareCalldataError {
  if (typeof value === 'object' && value !== null) {
    const obj = value as PrepareCalldataError
    return typeof obj.message === 'string'
  }
  return false
}

export function isStarknetContract(value: unknown): value is StarknetContract {
  if (typeof value === 'object' && value !== null) {
    const obj = value as StarknetContract
    return Array.isArray(obj.abi) && Array.isArray(obj.methods)
  }
  return false
}

// Function for checking Starknet RPC error responses
export function isStarknetRPCError(value: unknown): value is StarknetRPCError {
  if (typeof value === 'object' && value !== null) {
    const obj = value as any
    // Check both direct error structure and nested error structure
    return (
      (typeof obj.code === 'number' && typeof obj.message === 'string') ||
      (obj.error &&
        typeof obj.error.code === 'number' &&
        typeof obj.error.message === 'string')
    )
  }
  return false
}
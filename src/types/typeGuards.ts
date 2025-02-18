import { AccountDeployError, AccountDeployResult } from '../utils/rosettanet'
import {
  EVMDecodeError,
  EVMDecodeResult,
  EVMEncodeResult,
  PrepareCalldataError,
  RawTransaction,
  RosettanetSignature,
  RPCError,
  RPCResponse,
  SignedRawTransaction,
  SimulateTransaction,
  StarknetContract,
  StarknetRPCError,
  ValidationError,
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

export function isAccountDeployError(
  value: unknown,
): value is AccountDeployError {
  if (typeof value === 'object' && value !== null) {
    const obj = value as AccountDeployError
    return typeof obj.code === 'number' && typeof obj.message === 'string'
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

export function isValidationError(value: unknown): value is ValidationError {
  if (typeof value === 'object' && value !== null) {
    const obj = value as ValidationError
    return typeof obj.message === 'string'
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

// TODO: Important, this function is not working. Fix it. error object is inside error property not in default
// Bu check sadece bizim kendi starknet rpc error return ettiklerimizde calisiyor. Starknetten return gelende calismaz
export function isStarknetRPCError(value: unknown): value is StarknetRPCError {
  if (typeof value === 'object' && value !== null) {
    const obj = value as StarknetRPCError
    return typeof obj.code === 'number' && typeof obj.message === 'string'
  }
  return false
}

export function isEstimateGasTransaction(
  value: unknown,
): value is RawTransaction {
  if (typeof value === 'object' && value !== null) {
    const obj = value as RawTransaction
    return (
      typeof obj.from === 'string' &&
      typeof obj.to === 'string' &&
      typeof obj.gas === 'string' &&
      typeof obj.gasPrice === 'string'
    )
  }
  return false
}

export function isSimulateTransaction(
  value: unknown,
): value is SimulateTransaction {
  if (typeof value === 'object' && value !== null) {
    const obj = value as SimulateTransaction
    return (
      (typeof obj.from === 'string' || obj.from == null) &&
      typeof obj.to === 'string' &&
      (typeof obj.gas === 'string' || obj.gas == null) &&
      (typeof obj.gasPrice === 'string' || obj.gasPrice == null) &&
      (typeof obj.maxPriorityFeePerGas === 'string' ||
        obj.maxPriorityFeePerGas == null) &&
      (typeof obj.maxFeePerGas === 'string' || obj.maxFeePerGas == null) &&
      (typeof obj.value === 'string' || obj.value == null) &&
      (typeof obj.data === 'string' || obj.data == null) &&
      (typeof obj.gasLimit === 'string' || obj.gasLimit == null)
    )
  }
  return false
}

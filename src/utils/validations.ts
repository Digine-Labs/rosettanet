import { isHexString, Transaction } from 'ethers'
import { addHexPrefix, removeHexPrefix } from './padding'
import {
  SignedRawTransaction,
  ValidationError,
  SimulateTransaction,
} from '../types/types'
import { createRosettanetSignature } from './signature'

export function validateEthAddress(ethAddress: string): boolean {
  if (!ethAddress) {
    return false
  }
  const address: string = ethAddress?.toLowerCase()?.startsWith('0x')
    ? ethAddress
    : `0x${ethAddress}`
  if (!address.match(/^(0x|0X)?[0-9a-fA-F]{40}$/)) {
    return false
  }
  return true
}

export function validateSnAddress(snAddress: string): boolean {
  if (!snAddress) {
    return false
  }
  const address: string = addHexPrefix(
    removeHexPrefix(snAddress).padStart(64, '0'),
  )
  if (!address.match(/^(0x)?[0-9a-fA-F]{64}$/)) {
    return false
  }
  return true
}

export function validateBlockHash(blockHash: string): boolean {
  if (!blockHash) {
    return false
  }

  // Ensure the block hash starts with '0x' and remove leading zeros
  const normalizedBlockHash: string = addHexPrefix(
    removeHexPrefix(blockHash).toLowerCase(),
  )

  // StarkNet block hashes should be hex strings of variable length, typically 1 to 64 characters after '0x'
  if (!normalizedBlockHash.match(/^(0x)?[0-9a-fA-F]{1,64}$/)) {
    return false
  }

  return true
}

export function validateBlockNumber(value: string | number): boolean {
  if (typeof value === 'number') {
    return false // Only string hex supported on ethereum
  }
  switch (value) {
    case 'latest':
      return true
    case 'pending':
      return true
    default:
      if (isHexString(value)) {
        return true
      }
      return false
  }
}

export function validateRawTransaction(
  tx: Transaction,
): SignedRawTransaction | ValidationError {
  const {
    from,
    to,
    data,
    value,
    nonce,
    chainId,
    signature,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasPrice,
    type,
  } = tx

  if (to === null) {
    return <ValidationError>{
      message: 'To address can not be null',
    }
  }

  if (from === null) {
    return <ValidationError>{
      message: 'From address can not be null',
    }
  }

  if (typeof signature === 'undefined' || signature === null) {
    return <ValidationError>{
      message: 'Transaction is not signed',
    }
  }

  if (
    (maxFeePerGas == null && gasPrice == null) ||
    (maxPriorityFeePerGas == null && gasPrice == null)
  ) {
    return <ValidationError>{
      message:
        'maxFeePerGas and gas price or maxPriorityFeePerGas and gasPrice null at the same time',
    }
  }

  const rosettanetSignature = createRosettanetSignature(signature, value)

  return <SignedRawTransaction>{
    from,
    to,
    data,
    value,
    nonce,
    chainId,
    signature: rosettanetSignature,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasPrice,
    type,
  }
}

export function validateValue(value: unknown): boolean {
  if (value === undefined || value === null) return false
  try {
    const big = BigInt(value as string | number | bigint)
    return (
      big >
      BigInt(
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      )
    )
  } catch {
    // If value is not a valid number, treat as not too big (let other validation handle it)
    return false
  }
}

export function validateEthCallParameters(
  value: unknown,
): value is SimulateTransaction {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const obj = value as Record<string, unknown>

  // Check required 'to' field
  if (typeof obj.to !== 'string') {
    return false
  }

  // Check optional 'from' field
  if (obj.from !== undefined && typeof obj.from !== 'string') {
    return false
  }

  // Check optional 'data' field
  if (obj.data !== undefined && typeof obj.data !== 'string') {
    return false
  }

  // Check optional 'value' field
  if (
    obj.value !== undefined &&
    typeof obj.value !== 'string' &&
    typeof obj.value !== 'number' &&
    typeof obj.value !== 'bigint'
  ) {
    return false
  }

  // Check optional 'type' field
  if (obj.type !== undefined && typeof obj.type !== 'string') {
    return false
  }

  return true
}

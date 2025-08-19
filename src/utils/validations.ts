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

export function validateValue(value: string): boolean {
  if (value === undefined || value === null) return false
  if (!validateHexString(value)) {
    throw new Error('Invalid hex string input')
  }
  try {
    const big = BigInt(value)
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

export function validateEthEstimateGasParameters(
  value: unknown,
): value is SimulateTransaction {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false
  }

  const obj = value as Record<string, unknown>

  if (
    obj.type !== undefined &&
    obj.type !== null &&
    (typeof obj.type !== 'string' || !obj.type.match(/^0x[0-9a-fA-F]{1,2}$/))
  ) {
    return false
  }

  if (
    obj.nonce !== undefined &&
    obj.nonce !== null &&
    (typeof obj.nonce !== 'string' || !obj.nonce.match(/^0x[0-9a-fA-F]+|0$/))
  ) {
    return false
  }

  if (
    obj.to !== undefined &&
    obj.to !== null &&
    (typeof obj.to !== 'string' || !obj.to.match(/^0x[0-9a-fA-F]{40}$/))
  ) {
    return false
  }

  if (
    obj.from !== undefined &&
    obj.from !== null &&
    (typeof obj.from !== 'string' || !obj.from.match(/^0x[0-9a-fA-F]{40}$/))
  ) {
    return false
  }

  if (
    obj.value !== undefined &&
    obj.value !== null &&
    (typeof obj.value !== 'string' ||
      !obj.value.match(/^0x([1-9a-fA-F]+[0-9a-fA-F]*|0)$/))
  ) {
    return false
  }

  if (
    obj.data !== undefined &&
    obj.data !== null &&
    (typeof obj.data !== 'string' || !obj.data.match(/^(0x[0-9a-fA-F]*|0)$/))
  ) {
    return false
  }

  if (
    obj.gasPrice !== undefined &&
    obj.gasPrice !== null &&
    (typeof obj.gasPrice !== 'string' ||
      !obj.gasPrice.match(/^0x([1-9a-f]+[0-9a-f]*|0)$/))
  ) {
    return false
  }

  if (
    obj.maxFeePerGas !== undefined &&
    obj.maxFeePerGas !== null &&
    (typeof obj.maxFeePerGas !== 'string' ||
      !obj.maxFeePerGas.match(/^0x([1-9a-f]+[0-9a-f]*|0)$/))
  ) {
    return false
  }

  if (
    obj.maxPriorityFeePerGas !== undefined &&
    obj.maxPriorityFeePerGas !== null &&
    (typeof obj.maxPriorityFeePerGas !== 'string' ||
      !obj.maxPriorityFeePerGas.match(/^0x([1-9a-f]+[0-9a-f]*|0)$/))
  ) {
    return false
  }

  return true
}

/**
 * Checks if a value is a valid hex string (with '0x' prefix)
 *
 * @param value The value to check
 * @returns True if the value is a valid hex string
 */
export function validateHexString(value: unknown): boolean {
  if (typeof value !== 'string') return false
  // Match strings with '0x' prefix followed by one or more hex chars
  return /^(0x)[0-9a-fA-F]+$/.test(value)
}

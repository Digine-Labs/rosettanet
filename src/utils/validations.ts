import { addHexPrefix, removeHexPrefix } from './padding'
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

export function validateBlockNumber(value: string | number | boolean): boolean {
  if (typeof value === 'number') {
    return Number.isInteger(value as number) && value >= 0
  } else if (typeof value === 'string') {
    return value === 'latest' || value === 'pending'
  }
  return false
}

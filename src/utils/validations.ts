import { addHexPrefix, removeHexPrefix } from './padding'
export function validateEthAddress(ethAddress: string): boolean {
  if (!ethAddress) {
    return false
  }
  let address: string = ethAddress?.toLowerCase()?.startsWith('0x')
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
  let address: string = addHexPrefix(
    removeHexPrefix(snAddress).padStart(64, '0'),
  )
  if (!address.match(/^(0x)?[0-9a-fA-F]{64}$/)) {
    return false
  }
  return true
}

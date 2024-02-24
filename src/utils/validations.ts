import { hexPadding } from './padding'

/* eslint-disable @typescript-eslint/no-unused-vars */
export function validateEthAddress(ethAddress: string): boolean {
  if (!ethAddress) {
    return false
  }
  let address: string = hexPadding(ethAddress, 40)
  if (!address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    return false
  }
  return true
}

export function validateSnAddress(snAddress: string): boolean {
  if (!snAddress) {
    return false
  }
  let address: string = hexPadding(snAddress, 64)
  if (!address.match(/^(0x)?[0-9a-fA-F]{64}$/)) {
    return false
  }
  return true
}

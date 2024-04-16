import { keccak256 } from 'js-sha3'
import { BigNumber } from 'bignumber.js'

export function snKeccack(str: string): string {
  let hash = keccak256(str)

  // Convert hexadecimal hash to binary
  hash = new BigNumber(hash, 16).toString(2)

  // get the last 250 bits
  hash = hash.slice(-250).padStart(256, '0')

  // convert binary hash to hexadecimal
  hash = new BigNumber(hash, 2).toString(16)
  return '0x' + hash
}

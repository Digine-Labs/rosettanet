import BigNumber from 'bignumber.js'
import { addHexPadding } from '../padding'

// Eth uint256 to u256
// value has to be string of length 64 representation in hex. Remove 0x prefix
// Inputs hex decimal without 0x prefix
// Outputs Array of decimals in string
export function Uint256ToU256(value: string): Array<string> {
  if (value.length != 64) {
    return ['0', '0']
  }

  const high: string = new BigNumber(value.substring(0, 32), 16).toString(16)
  const low: string = new BigNumber(value.substring(32, 64), 16).toString(16)
  return [low, high]
}

export function U256toUint256(value: Array<string>): string {
  const low = BigInt(value[0])
  const high = BigInt(value[1])

  const result = (high << BigInt(64)) + low

  return '0x' + result.toString(16)
}

export function BnToU256(value: bigint): Array<string> {
  return Uint256ToU256(addHexPadding(value.toString(16), 64, false)).map(val => '0x' + val)
}

// TODO: support signed integers

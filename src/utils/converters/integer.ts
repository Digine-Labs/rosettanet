import BigNumber from 'bignumber.js'
import { addHexPadding } from '../padding'
import { cairo, CairoUint256 } from 'starknet'

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

// Returns hex strings without hex prefix
export function safeUint256ToU256(value: bigint): Array<string> {
  const spl = cairo.uint256(value)

  return [BigInt(spl.low).toString(16), BigInt(spl.high).toString(16)]
}

export function safeU256ToUint256(value: Array<string>): string {
  if (value.length == 0) {
    return new CairoUint256({ low: 0, high: 0 }).toBigInt().toString(16)
  }

  if (value.length == 1) {
    return new CairoUint256({ low: value[0], high: 0 }).toBigInt().toString(16)
  }
  const result = new CairoUint256({ low: value[0], high: value[1] })
    .toBigInt()
    .toString(16)
  return result
}

export function U256ToUint256HexString(value: Array<string>): string {
  if(value.length == 0) {
    return '0x0000000000000000000000000000000000000000000000000000000000000000'
  }
  if(value.length == 1) {
    return addHexPadding(value[0], 64, true)
  }

  const low = addHexPadding(value[0], 32, false)
  const high = addHexPadding(value[1], 32, true)

  return `${high}${low}`
}

export function U256toUint256(value: Array<string>): string {
  const low = BigInt(value[0])
  const high = BigInt(value[1])

  const result = (high << BigInt(64)) + low

  return '0x' + result.toString(16)
}

export function BnToU256(value: bigint): Array<string> {
  return Uint256ToU256(addHexPadding(value.toString(16), 64, false)).map(
    val => '0x' + val,
  )
}

export function numberToHex(val: number) {
  // Sayıyı hexadecimal stringe çevir
  const hex = val.toString(16);

  // İstersen başına '0x' ekleyelim
  return '0x' + hex;
}

export function hexToDecimal(hexString: string) {
  // parseInt ile 16 tabanında çeviriyoruz
  return parseInt(hexString, 16);
}


// TODO: support signed integers
/**
 * Adds two hexadecimal strings and returns the result as a hex string
 * @param hex1 First hex string (with or without '0x' prefix)
 * @param hex2 Second hex string (with or without '0x' prefix)
 * @returns Sum as a hex string with '0x' prefix
 */
export function sumHexStrings(hex1: string, hex2: string): string {
  // Remove '0x' prefix if present
  const cleanHex1 = hex1.startsWith('0x') ? hex1.slice(2) : hex1;
  const cleanHex2 = hex2.startsWith('0x') ? hex2.slice(2) : hex2;
  
  // Convert hex strings to BigInt (for handling large numbers)
  const num1 = BigInt('0x' + cleanHex1);
  const num2 = BigInt('0x' + cleanHex2);
  
  // Add the numbers
  const sum = num1 + num2;
  
  // Convert back to hex string with '0x' prefix
  return '0x' + sum.toString(16);
}
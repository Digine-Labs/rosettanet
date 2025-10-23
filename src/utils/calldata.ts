/* eslint-disable  @typescript-eslint/no-explicit-any */
import { AbiCoder, dataSlice, getBytes, hexlify } from 'ethers'
import {
  EVMDecodeError,
  EVMDecodeResult,
  EVMEncodeError,
  EVMEncodeResult,
  StarknetRPCError,
  CairoNamedConvertableType
} from '../types/types'
import {
  BnToU256,
  safeU256ToUint256,
  Uint256ToU256,
} from './converters/integer'
import { getSnAddressWithFallback } from './wrapper'
import { addHexPrefix, removeHexPrefix } from './padding'
import { isStarknetRPCError } from '../types/typeGuards'

export function getFunctionSelectorFromCalldata(calldata: string | null): string | null {
  if (typeof calldata !== 'string') {
    return null
  }
  // 0xa9059cbb
  if (calldata.length < 10) {
    return null
  }

  return calldata.substring(0, 10)
}

/**
 * Checks if the function selector is one that requires special exception handling
 * 0x06fdde03 - name() function
 * 0x95d89b41 - symbol() function
 * @param selector The function selector to check
 * @returns true if the selector requires exception handling
 */
export function requiresTokenMetadataException(selector: string | null): boolean {
  if (selector === null) {
    return false
  }

  const NAME_SELECTOR = '0x06fdde03'
  const SYMBOL_SELECTOR = '0x95d89b41'

  return selector === NAME_SELECTOR || selector === SYMBOL_SELECTOR
}

/**
 * Converts hex string to ASCII string
 * @param hex Hex string to convert (with or without 0x prefix)
 * @returns ASCII string
 */
function hexToAscii(hex: string): string {
  const cleanHex = removeHexPrefix(hex)
  let str = ''
  for (let i = 0; i < cleanHex.length; i += 2) {
    str += String.fromCharCode(parseInt(cleanHex.substr(i, 2), 16))
  }
  return str
}

/**
 * Handles special exception for token metadata functions (name and symbol)
 * Converts Starknet result format to Ethereum-compatible string format
 *
 * Supports two formats:
 * 1. Single element array: ["0x4574686572"] - Direct hex encoded string
 * 2. Three element array: ["0x0", "0x537461726b6e65742074425443", "0xd"] - Felt252 encoded string with length
 *
 * @param snResult Incoming result from starknet RPC for name or symbol request.
 * @returns Ethereum-compatible ABI encoded string
 */
export function handleTokenMetadataException(snResult: string[]): string {
  if (snResult.length === 1) {
    // Format 1: Single hex string
    // Remove 0x and convert hex to ASCII
    const asciiValue = hexToAscii(snResult[0])

    // Encode as Ethereum string format using AbiCoder
    const encoder = new AbiCoder()
    return encoder.encode(['string'], [asciiValue])
  } else if (snResult.length === 3) {
    // Format 2: Three element array [padding, hex_data, length]
    // The second element contains the hex data
    // The third element is the expected string length
    const hexData = snResult[1]
    const expectedLength = parseInt(removeHexPrefix(snResult[2]), 16)

    // Convert hex to ASCII
    const asciiValue = hexToAscii(hexData)

    // Verify length matches expected length
    if (asciiValue.length !== expectedLength) {
      throw new Error(
        `String length mismatch: expected ${expectedLength}, got ${asciiValue.length}`
      )
    }

    // Encode as Ethereum string format using AbiCoder
    const encoder = new AbiCoder()
    return encoder.encode(['string'], [asciiValue])
  } else {
    throw new Error(
      `Invalid snResult format for token metadata. Expected 1 or 3 elements, got ${snResult.length}`
    )
  }
}

export function to128Bits(calldata: string): string[] {
  if (!calldata.startsWith('0x')) {
    throw new Error('Calldata must be a hex sting starting with 0x')
  }
  const data = getBytes(calldata)

  if (data.length < 4) {
    throw new Error('Calldata length is too short')
  }

  const functionSelector = hexlify(data.slice(0, 4))
  const slots: string[] = []
  slots.push(functionSelector)
  for (let i = 4; i < data.length; i += 32) {
    if (i + 32 > data.length) {
      throw new Error(
        'Invalid calldata length, must be a multiple of 32 bytes after selector',
      )
    }

    // Extract two u128 values from the 32-byte slot (in hex format)
    const firstU128 = hexlify(data.slice(i, i + 16))
    const secondU128 = hexlify(data.slice(i + 16, i + 32))

    slots.push(...[firstU128, secondU128])
  }

  return slots
}

export function convertUint256s(data: Array<string>): Array<string> {
  const split256Bits: Array<string> = []

  for (let i = 0; i < data.length; i++) {
    if (data[i].length == 64) {
      split256Bits.push(...Uint256ToU256(data[i]))
      continue
    }
    split256Bits.push(data[i])
  }

  return split256Bits
}

// Tuples also returned like array
export function decodeCalldataWithTypes(
  types: Array<string>,
  data: string,
): Array<string> {
  if (types.length == 0 || data.length == 0) {
    throw 'Calldata empty or wrong'
  }

  const decoder = new AbiCoder()

  const result = decoder.decode(types, dataSlice(data, 0)).toArray()
  const stringifiedResult = result.map(elem => {
    if (typeof elem === 'string') {
      return elem
    }
    if (Array.isArray(elem)) {
      // Todo: Add support of tuple in tuples
      return elem.map(x => (typeof x === 'string' ? x : x.toString()))
    }
    return elem.toString()
  })
  return stringifiedResult
}

export function mergeSlots(
  types: Array<CairoNamedConvertableType>,
  data: Array<string>,
): Array<any> {
  const encodedValues: Array<any> = []
  let typeIndex = 0
  for (let i = 0; i < data.length; i++) {
    const currentType = types[typeIndex]

    if (currentType.solidityType === 'uint256' && currentType.cairoType === 'core::felt252') {
      encodedValues.push(data[i])
      typeIndex++
      continue
    }

    if (currentType.solidityType === 'uint256') {
      const mergedUint256 = safeU256ToUint256([data[i], data[i + 1]])
      encodedValues.push(addHexPrefix(mergedUint256))
      i++
      typeIndex++
      continue
    }

    if (currentType.solidityType === 'uint256[]') {
      const elementCount = Number(data[i])
      const insideArray = []
      //encodedValues.push(addHexPrefix(elementCount.toString(16)));
      for (let j = 0; j < elementCount; j++) {
        const currentUint256 = safeU256ToUint256([data[i + 1], data[i + 2]])
        insideArray.push(addHexPrefix(currentUint256))
        i += 2
      }
      encodedValues.push(insideArray)
      typeIndex++
      continue
    }

    if (currentType.isDynamicSize) {
      const insideArray = []
      const elementCount = Number(data[i])
      for (let j = 0; j < elementCount; j++) {
        insideArray.push(addHexPrefix(data[i + 1]))
        i++
      }
      encodedValues.push(insideArray)
      typeIndex++
      continue
    }

    encodedValues.push(data[i])
    typeIndex++
  }

  return encodedValues
}

export function encodeStarknetData(
  types: Array<CairoNamedConvertableType>,
  data: Array<string>,
): EVMEncodeResult | EVMEncodeError {
  try {
    if (data.length == 0) {
      return <EVMEncodeResult>{
        data: '0x', // 0x or empty??
      }
    }
    const encoder = new AbiCoder()
    const solidityTypes = types.map(x => x.solidityType)
    const mergedCalldata = mergeSlots(types, data)
    const encodedResult = encoder.encode(solidityTypes, mergedCalldata)

    return <EVMEncodeResult>{
      data: encodedResult,
    }
  } catch (ex) {
    return <EVMEncodeError>{
      code: -1,
      message: (ex as Error).message,
    }
  }
}

// This one used in ethCall, we need address conversion here. Also we dont need directives
// Maybe we can change interface of this function returns.
export async function decodeEVMCalldataWithAddressConversion(
  types: Array<CairoNamedConvertableType>,
  data: string,
  selector: string,
): Promise<EVMDecodeResult | EVMDecodeError> {
  try {
    if (types.length == 0 && data.length == 0) {
      return <EVMDecodeResult>{
        directives: [],
        calldata: [selector],
      }
    }

    if (selector.length != 10) {
      return <EVMDecodeError>{
        code: -32700,
        message: 'Selector length must be 10 on EVM calldata decoding',
      }
    }

    const decoder = new AbiCoder()
    const solidityTypes = types.map(x => x.solidityType)
    const result = decoder
      .decode(solidityTypes, dataSlice('0x' + data, 0))
      .toArray()

    const decodedValues: Array<string> = []
    const directives: Array<number> = []
    decodedValues.push(selector)

    if (result.length != types.length) {
      return <EVMDecodeError>{
        code: -32700,
        message: 'Decode result and length mismatch on EVM calldata decoding.',
      }
    }

    for (let i = 0; i < result.length; i++) {
      const currentType = types[i]
      const currentData = result[i]

      if (currentType.solidityType === 'uint256') {
        decodedValues.push(...BnToU256(currentData))
        directives.push(1, 0)
        continue
      }
      if (currentType.solidityType === 'address') {
        const snAddress: string | StarknetRPCError =
          await getSnAddressWithFallback(currentData)
        if (isStarknetRPCError(snAddress)) {
          return snAddress
        }
        decodedValues.push(snAddress)
        directives.push(2)
        continue
      }
      decodedValues.push(addHexPrefix(currentData))
    }

    return <EVMDecodeResult>{
      directives,
      calldata: decodedValues,
    }
  } catch (ex) {
    return <EVMDecodeError>{
      code: -1,
      message: (ex as Error).message,
    }
  }
}

// data: Selector removed calldata
export function decodeMulticallFeatureCalldata(
  data: string,
  selector: string,
): EVMDecodeResult | EVMDecodeError {
  // TODO: add tests
  try {
    if (data.length == 0) {
      return <EVMDecodeError>{
        code: -32700,
        message:
          'Types or data length is wrong on EVM calldata decoding for multicall',
      }
    }
    if (selector.length != 10) {
      return <EVMDecodeError>{
        code: -32700,
        message:
          'Selector length must be 10 on EVM calldata decoding for multicall',
      }
    }
    const decoder = new AbiCoder()
    const type = '(uint256,uint256,uint256[])[]'

    const calls = decoder.decode([type], data)[0]

    const decodedValues: Array<string> = []
    const directives: Array<number> = []
    decodedValues.push(selector)

    decodedValues.push(addHexPrefix(BigInt(calls.length).toString(16)))

    for (let i = 0; i < calls.length; i++) {
      const currentCall = calls[i]

      if (currentCall.length != 3) {
        return <EVMDecodeError>{
          code: -2,
          message: 'Inner calldata length wrong',
        }
      }
      const to = addHexPrefix(BigInt(currentCall[0]).toString(16))
      const entrypoint = addHexPrefix(BigInt(currentCall[1]).toString(16))
      const innerCalldata = currentCall[2].map(
        (ic: string | number | bigint | boolean) =>
          addHexPrefix(BigInt(ic).toString(16)),
      )

      decodedValues.push(to)
      decodedValues.push(entrypoint)
      decodedValues.push(
        addHexPrefix(BigInt(innerCalldata.length).toString(16)),
      )
      decodedValues.push(...innerCalldata)
    }

    return <EVMDecodeResult>{
      directives,
      calldata: decodedValues,
    }
  } catch (ex) {
    return <EVMDecodeError>{
      code: -1,
      message: (ex as Error).message,
    }
  }
}
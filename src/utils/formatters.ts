import { StarknetFunction, StarknetValue } from '../types/types'
import { U256toUint256 } from './converters/integer'
import {
  getSnSlotCount,
  getSnValueEthBitsize,
} from './converters/typeConverters'

// Formats starknet rpc response into eth response
export async function formatStarknetResponse(
  fn: StarknetFunction,
  result:
    | string
    | number
    | boolean
    | object
    | Array<string | number | boolean | object>,
): Promise<string> {
  if (typeof fn.outputs === 'undefined') {
    return '0x0'
  }

  if (!Array.isArray(result)) {
    return '0x0'
  }

  // 1) Merge calldata parameters into one array of string
  let readIndex = 0

  const mergedValues: Array<StarknetValue> = []

  for (const output of fn.outputs) {
    // Get how many elements we gonna need for this output
    const elementCount = getSnSlotCount(output.type)
    if (elementCount == 1) {
      // TODO: Convert Starknet contract address to ethereum address
      mergedValues.push({
        value: result[readIndex],
        bitSize: getSnValueEthBitsize(output.type),
      })
      readIndex++
      continue
    }

    const tempValues = []
    for (let i = 0; i < elementCount; i++) {
      const value = result[readIndex + i]
      tempValues.push(value)
    }
    // TODO: We only support U256 for multi slots atm.
    mergedValues.push({
      value: U256toUint256(tempValues),
      bitSize: getSnValueEthBitsize(output.type),
    })

    readIndex += elementCount
  }

  const paddedValues: Array<string> = mergedValues.map(val => padValues(val))

  const packedValues: Array<string> = ['']
  for (const val of paddedValues) {
    const currentElementLength = packedValues[packedValues.length - 1].length
    if (val.length + currentElementLength > 64) {
      packedValues.push(val)
      continue
    }

    // We do packing here
    const currentElement = packedValues[packedValues.length - 1]
    const packedElement = `${val}${currentElement}`
    packedValues[packedValues.length - 1] = packedElement
  }

  // Pad last element
  packedValues[packedValues.length - 1] =
    packedValues[packedValues.length - 1].length == 64
      ? packedValues[packedValues.length - 1]
      : padValues({
          bitSize: 256,
          value: packedValues[packedValues.length - 1],
        })
  
  const paddedSlots = packedValues.map(val => `${'0'.repeat(64 - val.length)}${val}`)
  // Convert into one string

  const ethereumResponse = paddedSlots.join('')
  return `0x${ethereumResponse}`
}

// Returns padded values according to target bitsize. No hex prefix
function padValues(value: StarknetValue): string {
  const charCount = value.bitSize / 4
  const valueWithoutPrefix = value.value.replace('0x', '')
  return `${'0'.repeat(charCount - valueWithoutPrefix.length)}${valueWithoutPrefix}`
}

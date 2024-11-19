import { AbiCoder, dataSlice } from 'ethers'
import { EthereumSlot } from '../types/types'
import { BnToU256, Uint256ToU256 } from './converters/integer'
import { getSnAddressFromEthAddress } from './wrapper'
import { CairoNamedConvertableType } from './starknet'

export function getFunctionSelectorFromCalldata(calldata: string): string {
  // 0xa9059cbb
  if (calldata.length < 10) {
    return '0x0' // empty calldata
  }

  return calldata.substring(0, 10)
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

export async function convertEthereumCalldataToParameters(
  fn: string,
  slots: Array<EthereumSlot>,
  data: string | undefined,
): Promise<Array<string>> {
  if (slots.length == 0) {
    return []
  }

  if (typeof data === 'undefined' || data.length < 11) {
    return []
  }

  const parameters = fn.split('(')[1].replace(')', '').split(',')
  if (parameters.length == 0 || parameters[0].length == 0) {
    return []
  }

  const slotData: Array<string> = []

  const selectorRemovedCalldata = data.slice(10)

  if (selectorRemovedCalldata.length % 64 != 0) {
    // wrong calldata
    return []
  }

  const slotCount = selectorRemovedCalldata.length / 64

  for (let i = 0; i < slotCount; i++) {
    slotData.push(selectorRemovedCalldata.substring(i * 64, 64 * (i + 1)))
  }

  // slotdata is okay

  // slotData includes each eth calldata slots. now pad these according to slotsizes
  const paddedSlotData: Array<string> = []
  let i = 0
  for (const slot of slots) {
    const bytesToRemoval = (256 - slot.bits) / 4

    paddedSlotData.push(slotData[i].slice(bytesToRemoval))
    i++
  }

  // now we have calldata without zeros. So split according to variable bit sizes
  const splittedCallData: Array<string> = []
  let slotIndex = 0
  let currentReadBits = 0
  if (parameters.length == 1) {
    if (parameters[0] === 'address') {
      const snAddress = await getSnAddressFromEthAddress(paddedSlotData[0])
      splittedCallData.push(snAddress.replace('0x', ''))
      return splittedCallData
    } else {
      splittedCallData.push(paddedSlotData[0])
      return splittedCallData
    }
  }
  for (const parameter of parameters) {
    if (parameter.length === 0) {
      break
    }

    const bitSize = ethTypeBitLength(parameter)

    if (bitSize + currentReadBits > 256) {
      slotIndex++
      currentReadBits = 0
    }

    // We can assume padded datas already ordered by getCalldataByteSize function
    const byteLength = bitSize / 4
    const parameterValue = paddedSlotData[slotIndex].substring(
      currentReadBits / 4,
      currentReadBits / 4 + byteLength,
    )
    // 0, 32
    // 32, 64

    // const splittedData = paddedSlotData[slotIndex].slice(byteLength);
    if (parameter === 'address') {
      const snAddress = await getSnAddressFromEthAddress(parameterValue)
      splittedCallData.push(snAddress.replace('0x', ''))
    } else {
      splittedCallData.push(parameterValue)
    }
    currentReadBits += bitSize
  }

  return splittedCallData
}

// parameter is array of string or string of eth type
export function getCalldataByteSize(fn: string): Array<EthereumSlot> {
  const parameters = fn.split('(')[1].replace(')', '').split(',')

  const slots: Array<EthereumSlot> = []
  if (parameters.length == 0) {
    return slots
  }
  let slotSize = 0
  for (const parameter of parameters) {
    if (parameter.length == 0) {
      break
    }
    if (parameter && slotSize == 0) {
      slots.push({
        order: 0,
        bits: 0,
      })
      slotSize = 1
    }
    const bitSize = ethTypeBitLength(parameter)

    if (bitSize + slots[slotSize - 1].bits > 256) {
      slots.push({
        order: slotSize,
        bits: bitSize,
      })
      slotSize += 1
      continue
    }
    slots[slotSize - 1].bits += bitSize
  }
  return slots
}

function ethTypeBitLength(type: string): number {
  if (type.substring(0, 5) === 'bytes') {
    return Number(type.replace('bytes', '')) * 8
  }

  switch (type) {
    case 'uint':
      return 256
    case 'uint8':
      return 8
    case 'uint16':
      return 16
    case 'uint32':
      return 32
    case 'uint64':
      return 64
    case 'uint128':
      return 128
    case 'uint256':
      return 256
    case 'address':
      return 160
    case 'bool':
      return 1
    default:
      return 0
  }
}

// Do not pass packed calldata, abi.encodepacked result wont work here idk why??
// TODO: CALLDATALARDA PACKED HALINDEMI GONDERILIYOR YOKSA ABI.ENCODE GIBI PACKSIZ MI??
/* 
Example 

Input: 0x08c6c91000000000000000000000000000000000000000000000000000000000000001bd0000000000000000000000000000000000000000000000000000000000000381
Output: 0x000000000000000000000000000001bd00000000000000000000000000000381
*/
// Tuples also returned like array
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export function decodeCalldataWithFelt252Limit(
  types: Array<CairoNamedConvertableType>,
  data: string,
): Array<string> {
  if (types.length == 0 || data.length == 0) {
    throw 'Calldata empty or wrong'
  }

  const decoder = new AbiCoder()
  const solidityTypes = types.map(x => x.solidityType)
  const result = decoder.decode(solidityTypes, dataSlice(data, 0)).toArray()

  const decodedValues: Array<string> = []

  if (result.length != types.length) {
    throw 'Result & type length mismatch'
  }

  for (let i = 0; i < result.length; i++) {
    const currentType = types[i]
    const currentData = result[i]

    if (currentType.isDynamicSize) {
      // array ise
      if (!Array.isArray(currentData)) {
        throw 'Cairo type is array but decoded type is not array'
      }
    }

    if (currentType.isTuple) {
      // tuple ise size bakma total size veriyor
      // TODO
      if (typeof currentType.tupleSizes === 'undefined') {
        throw 'Tuple size property undefined'
      }
      if (currentType.tupleSizes.length != currentData.length) {
        throw 'Tuple size and decoded data length mismatch'
      }

      for (let j = 0; j < currentType.tupleSizes.length; j++) {
        if (currentType.tupleSizes[j] > 252) {
          decodedValues.push(
            ...(typeof currentData[j] === 'string'
              ? BnToU256(BigInt(currentData[j]))
              : BnToU256(currentData[j].toString())),
          )
        } else {
          decodedValues.push(
            typeof currentData[j] === 'string'
              ? currentData[j]
              : currentData[j].toString(),
          )
        }
      }
      continue
    }
    if (currentType.size > 252) {
      // u256 ise
      if (currentType.isDynamicSize && Array.isArray(currentData)) {
        // u256 array ise
        currentData.map(elem => {
          const u256Converted =
            typeof elem === 'string'
              ? BnToU256(BigInt(elem))
              : BnToU256(elem.toString())
          decodedValues.push(...u256Converted)
        })
      } else {
        decodedValues.push(
          ...(typeof currentData === 'string'
            ? BnToU256(BigInt(currentData))
            : BnToU256(currentData.toString())),
        )
      }
      continue
    }

    decodedValues.push(formatBoolean(currentData.toString()))

    // Todo Contract address formatter
  }

  return decodedValues
}

function formatBoolean(val: string): string {
  if (val === 'true') {
    return '1'
  }
  if (val === 'false') {
    return '0'
  }
  return val
}

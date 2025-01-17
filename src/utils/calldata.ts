/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbiCoder, dataSlice } from 'ethers'
import { EVMDecodeError, EVMDecodeResult, EVMEncodeError, EVMEncodeResult, RPCError, StarknetRPCError } from '../types/types'
import { BnToU256, safeU256ToUint256, Uint256ToU256 } from './converters/integer'
import { getSnAddressFromEthAddress } from './wrapper'
import { CairoNamedConvertableType } from './starknet'
import { addHexPrefix } from './padding'
import { isRPCError, isStarknetRPCError } from '../types/typeGuards'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getFunctionSelectorFromCalldata(calldata: any): string | null {
  if(typeof calldata !== 'string') {
    return null
  }
  // 0xa9059cbb
  if (calldata.length < 10) {
    return null
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
/*
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

export function mergeSlots(  
  types: Array<CairoNamedConvertableType>,
  data: Array<string>
): Array<any> {

  const encodedValues: Array<any> = [];
  let typeIndex = 0;
  for (let i = 0; i < data.length; i++) {
    const currentType = types[typeIndex];

    if(currentType.solidityType === 'uint256') {
      const mergedUint256 = safeU256ToUint256([data[i], data[i+1]]);
      encodedValues.push(addHexPrefix(mergedUint256))
      i++;
      typeIndex++;
      continue;
    }

    if(currentType.solidityType === 'uint256[]') {
      const elementCount = Number(data[i]);
      const insideArray = [];
      //encodedValues.push(addHexPrefix(elementCount.toString(16)));
      for(let j = 0; j < elementCount; j++) {
        const currentUint256 = safeU256ToUint256([data[i+1], data[i+2]]);
        insideArray.push(addHexPrefix(currentUint256))
        i +=2
      }
      encodedValues.push(insideArray)
      typeIndex++;
      continue;
    }

    if(currentType.isDynamicSize) {
      const insideArray = [];
      const elementCount = Number(data[i]);
      for(let j = 0; j < elementCount; j++) {
        insideArray.push(addHexPrefix(data[i + 1]))
        i++
      }
      encodedValues.push(insideArray)
      typeIndex++;
      continue;
    }

    encodedValues.push(data[i]);
    typeIndex++;
  }

  return encodedValues
}

export function encodeStarknetData(
  types: Array<CairoNamedConvertableType>,
  data: Array<string>
): EVMEncodeResult | EVMEncodeError {
  try {
    if(data.length == 0) {
      return <EVMEncodeResult> {
        data: '0x' // 0x or empty??
      }
    }

    const encoder = new AbiCoder();
    const solidityTypes = types.map(x => x.solidityType)

    const mergedCalldata = mergeSlots(types, data);

    const encodedResult = encoder.encode(solidityTypes, mergedCalldata)

    return <EVMEncodeResult> {
      data : encodedResult
    }
  } catch (ex) {
    return <EVMEncodeError> {
      code: -1,
      message: (ex as Error).message
    }
  }
}

// This one used in ethCall, we need address conversion here. Also we dont need directives
// Maybe we can change interface of this function returns.
export async function decodeEVMCalldataWithAddressConversion(  
  types: Array<CairoNamedConvertableType>,
  data: string,
  selector: string): Promise<EVMDecodeResult | EVMDecodeError> {
    try {
      if (types.length == 0 && data.length == 0) {
        return <EVMDecodeResult> {
          directives: [], calldata: [selector]
        }
      }

      if(selector.length != 10) {
        return <EVMDecodeError> {
          code: -32700,
          message: 'Selector length must be 10 on EVM calldata decoding'
        }
      }

      const decoder = new AbiCoder()
      const solidityTypes = types.map(x => x.solidityType)
      const result = decoder.decode(solidityTypes, dataSlice('0x' + data, 0)).toArray()
    
      const decodedValues: Array<string> = [];
      const directives: Array<number> = [];
      decodedValues.push(selector)

      if (result.length != types.length) {
        return <EVMDecodeError> {
          code: -32700,
          message: 'Decode result and length mismatch on EVM calldata decoding.'
        }
      }
    
      for (let i = 0; i < result.length; i++) {
        const currentType = types[i]
        const currentData = result[i]
    
        if(currentType.solidityType === 'uint256') {
          decodedValues.push(...BnToU256(currentData));
          directives.push(1,0);
          continue;
        }
        if(currentType.solidityType === 'address') {
          const snAddress: string | StarknetRPCError = await getSnAddressFromEthAddress(currentData)
          if(isStarknetRPCError(snAddress)) {
            return snAddress
          }
          decodedValues.push(snAddress);
          directives.push(2);
          continue
        }
        decodedValues.push(addHexPrefix(currentData));

      }
    
      return <EVMDecodeResult> {
        directives, calldata: decodedValues
      }
    } catch (ex) {
      return <EVMDecodeError> {
        code: -1,
        message: (ex as Error).message
      }
    }
  }

// data: Selector removed calldata
export function decodeMulticallFeatureCalldata(
  data: string,
  selector: string
): EVMDecodeResult | EVMDecodeError {
  // TODO: add tests
  try {
    if (data.length == 0) {
      return <EVMDecodeError> {
        code: -32700,
        message: 'Types or data length is wrong on EVM calldata decoding for multicall'
      }
    }
    if(selector.length != 10) {
      return <EVMDecodeError> {
        code: -32700,
        message: 'Selector length must be 10 on EVM calldata decoding for multicall'
      }
    }
    const decoder = new AbiCoder()
    const type = "(uint256,uint256,uint256[])[]"

    const calls = decoder.decode([type], data)[0];

    const decodedValues: Array<string> = [];
    const directives: Array<number> = [];
    decodedValues.push(selector)

    decodedValues.push(addHexPrefix(BigInt(calls.length).toString(16)))

    for (let i = 0; i < calls.length; i++) {
      const currentCall = calls[i]

      if(currentCall.length != 3) {
        return <EVMDecodeError> {
          code: -2,
          message: 'Inner calldata length wrong'
        }
      }
      const to = addHexPrefix(BigInt(currentCall[0]).toString(16));
      const entrypoint = addHexPrefix(BigInt(currentCall[1]).toString(16));
      const innerCalldata = currentCall[2].map((ic: string | number | bigint | boolean) => addHexPrefix(BigInt(ic).toString(16)));

      decodedValues.push(to)
      decodedValues.push(entrypoint)
      decodedValues.push(addHexPrefix(BigInt(innerCalldata.length).toString(16)))
      decodedValues.push(...innerCalldata);
    }

    return <EVMDecodeResult> {
      directives, calldata: decodedValues
    }
  } catch (ex) {
    return <EVMDecodeError> {
      code: -1,
      message: (ex as Error).message
    }
  }
}

export function decodeEVMCalldata(  
  types: Array<CairoNamedConvertableType>,
  data: string,
  selector: string) : EVMDecodeResult | EVMDecodeError {
    try {
      if (types.length == 0 || data.length == 0) {
        return <EVMDecodeError> {
          code: -32700,
          message: 'Types or data length is wrong on EVM calldata decoding'
        }
      }

      if(selector.length != 10) {
        return <EVMDecodeError> {
          code: -32700,
          message: 'Selector length must be 10 on EVM calldata decoding'
        }
      }

      const decoder = new AbiCoder()
      const solidityTypes = types.map(x => x.solidityType)
      const result = decoder.decode(solidityTypes, dataSlice('0x' + data, 0)).toArray()
    
      const decodedValues: Array<string> = [];
      const directives: Array<number> = [];
      decodedValues.push(selector)

      if (result.length != types.length) {
        return <EVMDecodeError> {
          code: -32700,
          message: 'Decode result and length mismatch on EVM calldata decoding.'
        }
      }
    
      for (let i = 0; i < result.length; i++) {
        const currentType = types[i]
        const currentData = result[i]
    
        if(currentType.solidityType === 'uint256') {
          decodedValues.push(...BnToU256(currentData));
          directives.push(1,0);
          continue;
        }
        decodedValues.push(addHexPrefix(currentData));
        directives.push(currentType.solidityType === 'address' ? 2 : 0);
      }
    
      return <EVMDecodeResult> {
        directives, calldata: decodedValues
      }
    } catch (ex) {
      return <EVMDecodeError> {
        code: -1,
        message: (ex as Error).message
      }
    }
}

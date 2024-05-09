import { EthereumSlot } from '../types/types'

export function getFunctionSelectorFromCalldata(calldata: string): string {
  // 0xa9059cbb
  if (calldata.length < 10) {
    return '0x0' // empty calldata
  }

  return calldata.substring(0, 10)
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

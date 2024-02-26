import BigNumber from 'bignumber.js'

// Eth uint256 to u256
// value has to be string of length 64 representation in hex. Remove 0x prefix
export function Uint256ToU256(
  value: string,
): string | Array<string> | undefined {
  if (value.length != 64) {
    return
  }

  const high: string = new BigNumber(value.substring(0, 32), 16).toFixed()
  const low: string = new BigNumber(value.substring(32, 64), 16).toFixed()
  return [low, high]
}

export function U256toUint256(value: Array<string>): string {
  // Convert hex strings to BigInt
  const low = BigInt(value[0])
  const high = BigInt(value[1])

  // Shift the high part by 64 bits to the left and add the low part
  const result = (high << BigInt(64)) + low

  return result.toString()
}

// TODO: support signed integers

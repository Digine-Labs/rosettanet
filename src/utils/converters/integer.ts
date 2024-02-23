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

// TODO: support signed integers

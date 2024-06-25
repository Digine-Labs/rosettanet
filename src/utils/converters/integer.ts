import BigNumber from 'bignumber.js'

// Eth uint256 to u256
// value has to be string of length 64 representation in hex. Remove 0x prefix
export function Uint256ToU256(value: string): string | Array<string> {
  if (value.length != 64) {
    return ['0', '0'];
  }

  const high: string = new BigNumber(value.substring(0, 32), 16).toString(16)
  const low: string = new BigNumber(value.substring(32, 64), 16).toString(16)
  return [low, high];
}

export function U256toUint256(value: Array<string>): string {
  const low = new BigNumber(value[0], 16).toString(16).padStart(32, '0')
  const high = new BigNumber(value[1], 16).toString(16).padStart(32, '0')

  return '0x' + high + low;
}

// TODO: support signed integers

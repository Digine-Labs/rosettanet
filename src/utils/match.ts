import { keccak256 } from 'js-sha3'
import BigNumber from 'bignumber.js'
export function matchStarknetFunctionWithEthereumSelector(
  snFunctions: Array<string>,
  ethSelector: string,
): string | undefined {
  for (const func of snFunctions) {
    let hash = keccak256(func)

    hash = new BigNumber(hash, 16).toString(16)

    const selector = `0x${hash.substring(0, 8)}`
    if (selector === ethSelector) {
      return func
    }
  }

  return
}

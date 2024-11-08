import { keccak256 } from 'js-sha3'
import BigNumber from 'bignumber.js'
import { StarknetFunction } from '../types/types'
import { generateEthereumFunctionSignatureFromTypeMapping } from './starknet'
import { ConvertableType } from './converters/abiFormatter'
export function matchStarknetFunctionWithEthereumSelector(
  snFunctions: Array<string>,
  ethSelector: string
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

export function findStarknetFunctionWithEthereumSelector(  
  snFunctions: Array<StarknetFunction>,
  ethSelector: string,
  map: Map<string, ConvertableType>): StarknetFunction | undefined
{
  for(const func of snFunctions) {
    const snFunctionSignature = generateEthereumFunctionSignatureFromTypeMapping(func, map);

    let hash = keccak256(snFunctionSignature)
    hash = new BigNumber(hash, 16).toString(16)
    const selector = `0x${hash.substring(0, 8)}`
    if (selector === ethSelector) {
      return func
    }
  }
  return
}

import { keccak256 } from 'js-sha3'
import BigNumber from 'bignumber.js'
import { StarknetFunction, StarknetCallableMethod, ConvertableType } from '../types/types'
import { generateEthereumFunctionSignatureFromTypeMapping } from './starknet'
import { addHexPadding } from './padding'

export function findStarknetCallableMethod(
  ethSelector: string,
  snFunctions: Array<StarknetFunction>,
  map: Map<string, ConvertableType>,
): StarknetCallableMethod | undefined {
  for (const func of snFunctions) {
    const ethereumName: string | undefined =
      generateEthereumFunctionSignatureFromTypeMapping(func, map)
    if (typeof ethereumName === 'undefined') {
      return ethereumName
    }
    let hash = keccak256(ethereumName)
    hash = addHexPadding(new BigNumber(hash, 16).toString(16), 64, false)

    const ethFunctionSignature = `0x${hash.substring(0, 8)}`
    if (ethFunctionSignature === ethSelector) {
      return <StarknetCallableMethod>{
        ethereumSignature: ethSelector,
        snFunction: func,
        name: func.name,
        ethereumTypedName: ethereumName,
      }
    }
  }

  return
}

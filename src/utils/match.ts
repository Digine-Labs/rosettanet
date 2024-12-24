import { keccak256 } from 'js-sha3'
import BigNumber from 'bignumber.js'
import { StarknetFunction } from '../types/types'
import { generateEthereumFunctionSignatureFromTypeMapping } from './starknet'
import { ConvertableType } from './converters/abiFormatter'
import { addHexPadding } from './padding'

export interface StarknetCallableMethod {
  ethereumSignature: string
  snFunction: StarknetFunction
  name: string
  ethereumTypedName: string
}

export function findStarknetCallableMethod(
  ethSelector: string,
  snFunctions: Array<StarknetFunction>,
  map: Map<string, ConvertableType>,
): StarknetCallableMethod | undefined {
  for(const func of snFunctions) {
    const ethereumName =
    generateEthereumFunctionSignatureFromTypeMapping(func, map)

    let hash = keccak256(ethereumName)
    hash = addHexPadding(new BigNumber(hash, 16).toString(16),64,false)

    const ethFunctionSignature = `0x${hash.substring(0, 8)}`
    if(ethFunctionSignature === ethSelector) {
      return <StarknetCallableMethod> {
        ethereumSignature: ethSelector,
        snFunction: func,
        name: func.name,
        ethereumTypedName: ethereumName
      }
    }
  }

  return
}


export function matchStarknetFunctionWithEthereumSelector(
  snFunctions: Array<string>,
  ethSelector: string,
): string | undefined {
  for (const func of snFunctions) {
    let hash = keccak256(func)

    hash = addHexPadding(new BigNumber(hash, 16).toString(16),64,false) // Padding needed some function signatures has to start with zero

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
  map: Map<string, ConvertableType>,
): StarknetFunction | undefined {
  for (const func of snFunctions) {
    const snFunctionSignature =
      generateEthereumFunctionSignatureFromTypeMapping(func, map)

    let hash = keccak256(snFunctionSignature)
    hash = addHexPadding(new BigNumber(hash, 16).toString(16),64,false)

    const selector = `0x${hash.substring(0, 8)}`
    if (selector === ethSelector) {
      return func
    }
  }
  return
}

import { RpcProvider, Abi } from 'starknet'
import { validateSnAddress } from './validations'
import { getRpc } from './getRpc'
import {
  StarknetFunctionInput,
  StarknetFunction,
  StarknetContract,
  StarknetContractReadError,
} from '../types/types'
import { writeLog } from '../logger'
import { CairoNamedConvertableType, ConvertableType } from '../types/types'


export async function getContractAbiAndMethods(
  snAddress: string,
): Promise<StarknetContract | StarknetContractReadError> {
  if (!validateSnAddress(snAddress)) {
    return <StarknetContractReadError>{
      code: -32700,
      message: 'Contract address can not be validated.',
    }
  }
  const rpcUrl: string = getRpc()
  const provider = new RpcProvider({ nodeUrl: rpcUrl })

  let contractAbi: Abi = []
  try {
    const compressedContract = await provider.getClassAt(snAddress)
    contractAbi = compressedContract.abi
  } catch {
    return <StarknetContractReadError>{
      code: -32701,
      message: 'Error at starknet RPC getClassAt method call',
    }
  }

  const directFunctions = contractAbi.filter(
    item =>
      item.type === 'function' &&
      (item.state_mutability === 'external' ||
        item.state_mutability === 'view'),
  )
  const interfaces = contractAbi.filter(item => item.type === 'interface')
  const callableFunctionsInterface = interfaces.map(item => item.items)
  const flattenedCallableFunctionsInterface = callableFunctionsInterface.flat(1)

  const allEntrypoints = [
    ...flattenedCallableFunctionsInterface,
    ...directFunctions,
  ]

  return <StarknetContract>{
    abi: contractAbi,
    methods: allEntrypoints,
  }
}

export function getEthereumOutputsCairoNamed(
  snFunction: StarknetFunction,
  map: Map<string, ConvertableType>,
): Array<CairoNamedConvertableType> {
  if (!snFunction.outputs || snFunction.outputs.length == 0) {
    return []
  }
  const inputs = snFunction.outputs.map(output => {
    if (map.has(output.type)) {
      const type = map.get(output.type)
      if (typeof type === 'undefined') {
        throw 'Type undefined'
      }
      return {
        ...type,
        cairoType: output.type,
      }
    } else {
      throw 'Type not found'
    }
  })

  return inputs
}

export function getEthereumInputsCairoNamed(
  snFunction: StarknetFunction,
  map: Map<string, ConvertableType>,
): Array<CairoNamedConvertableType> {
  if (!snFunction.inputs || snFunction.inputs.length == 0) {
    return []
  }
  const inputs = snFunction.inputs.map(input => {
    if (map.has(input.type)) {
      const type = map.get(input.type)
      if (typeof type === 'undefined') {
        throw 'Type undefined'
      }
      return {
        ...type,
        cairoType: input.type,
      }
    } else {
      throw 'Type not found'
    }
  })

  return inputs
}

export function generateEthereumFunctionSignatureFromTypeMapping(
  snFunction: StarknetFunction,
  map: Map<string, ConvertableType>,
): string | undefined {
  if (!snFunction.inputs || snFunction.inputs.length == 0) {
    return `${snFunction.name}()`
  }
  const inputTypes: string | undefined = getFunctionInputTypesFromMap(
    map,
    snFunction.inputs,
  )
  if (typeof inputTypes === 'undefined') {
    return
  }
  return `${snFunction.name}(${inputTypes})`
}

function getFunctionInputTypesFromMap(
  map: Map<string, ConvertableType>,
  inputs: Array<StarknetFunctionInput>,
): string | undefined {
  const inputTypes = inputs.map(input => {
    if (map.has(input.type)) {
      return map.get(input.type)?.solidityType
    } else {
      return
    }
  })
  return inputTypes.toString()
}

export async function getAccountNonce(snAddress: string): Promise<string> {
  const rpcUrl: string = getRpc()
  const provider = new RpcProvider({ nodeUrl: rpcUrl })
  try {
    const nonce = await provider.getNonceForAddress(snAddress)
    return nonce
  } catch (ex) {
    writeLog(0, `Error at getAccountNonce: ${ex}. Falling back nonce as zero.`)
    return '0x0'
  }
}

// Same but returns higher nonce if error or zero nonce
export async function getAccountNonceForEstimateFee(snAddress: string): Promise<string> {
  const rpcUrl: string = getRpc()
  const provider = new RpcProvider({ nodeUrl: rpcUrl })
  const fallbackNonce: string = '0x10240';
  try {
    const nonce = await provider.getNonceForAddress(snAddress)
    if (BigInt(nonce) == BigInt(0)) {
      writeLog(0, `Returning fallback nonce. nonce received = 0`);
      return fallbackNonce
    }
    return nonce
  } catch (ex) {
    writeLog(0, `Error at getAccountNonce: ${ex}. Falling back nonce as zero.`)
    return fallbackNonce
  }
}
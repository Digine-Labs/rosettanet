/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RpcProvider, constants, Abi, FunctionAbi, StructAbi } from 'starknet'
import { snKeccak } from '../../src/utils/sn_keccak'
import { validateSnAddress } from './validations'
import { getRpc } from './getRpc'
import { StarknetFunctionInput, StarknetFunction } from '../types/types'
import { convertSnToEth } from './converters/typeConverters'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getContractsMethods(
  snAddress: string,
): Promise<Array<StarknetFunction>> {
  if (!validateSnAddress(snAddress)) {
    return []
  }
  const rpcUrl: string = getRpc('testnet')
  const provider = new RpcProvider({ nodeUrl: rpcUrl })

  let contractAbi: Abi = []
  try {
    const compressedContract = await provider.getClassAt(snAddress)
    contractAbi = compressedContract.abi
  } catch (e) {
    return []
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const directFunctions = contractAbi.filter(
    item =>
      item.type === 'function' &&
      (item.state_mutability === 'external' ||
        item.state_mutability === 'view'),
  )
  const interfaces = contractAbi.filter(item => item.type === 'interface')
  const callableFunctionsInterface = interfaces.map(item => item.items)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const flattenedCallableFunctionsInterface = callableFunctionsInterface.flat(1)

  const allEntrypoints = [
    ...flattenedCallableFunctionsInterface,
    ...directFunctions,
  ]

  return allEntrypoints
}

// pass function name and input object. Types will be converted to eth types in this function
export function generateEthereumFunctionSignature(
  name: string,
  inputs?: Array<StarknetFunctionInput>,
): string {
  if (!inputs || inputs.length == 0) {
    return `${name}()`
  }
  const inputTypes = getFunctionInputTypes(inputs)
  // const functionInputTypes = inputs.map(i => convertSnToEth(i.type))

  //const functionSignatureString = `${name}(${functionInputTypes})`
  return `${name}(${inputTypes})`
}

function getFunctionInputTypes(inputs: Array<StarknetFunctionInput>): string {
  const inputTypes = inputs.map(input => convertSnToEth(input.type))
  return inputTypes.toString()
}

export async function generateEntrypointsSelector(
  functionItems: FunctionAbi[],
) {
  // get last 250 bit of keccak256 of function name
  const entrypoints = functionItems.map(item => snKeccak(item.name))

  return entrypoints
}

export async function getContractsCustomStructs(
  snAddress: string,
  nodeUrl: constants.NetworkName | string,
) {
  if (!validateSnAddress(snAddress)) {
    return 'Invalid Starknet addreess'
  }

  const provider = new RpcProvider({ nodeUrl })

  let contractAbi: Abi = []
  try {
    const compressedContract = await provider.getClassAt(snAddress)
    contractAbi = compressedContract.abi
  } catch (e) {
    // console.error(e)
    return []
  }
  const customStructs = contractAbi
    .filter(
      item =>
        typeof item.type !== 'undefined' &&
        item.type === 'struct' &&
        'name' in item &&
        'members' in item,
    )
    .map(item => item as StructAbi)

  return customStructs
}

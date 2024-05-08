import { RpcProvider, constants, Abi, FunctionAbi, StructAbi } from 'starknet'
import { snKeccak } from '../../src/utils/sn_keccak'
import { validateSnAddress } from './validations'
import { getRpc } from './getRpc'

export async function getContractsMethods(snAddress: string) {
  if (!validateSnAddress(snAddress)) {
    return 'Invalid Starknet addreess'
  }
  const rpcUrl: string = getRpc('testnet')
  const provider = new RpcProvider({ nodeUrl: rpcUrl })

  let contractAbi: Abi = []
  try {
    const compressedContract = await provider.getClassAt(snAddress)
    contractAbi = compressedContract.abi
  } catch (e) {
    // console.error(e)
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const callableFunctionsInterface = interfaces.map(item => item.items)
  // console.log(callableFunctionsInterface);
  // console.log(directFunctions)

  // TODO: merge callableFunctionsInterface array with array directFunctions
  // final array must look like directFunctions
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

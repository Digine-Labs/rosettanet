import { RpcProvider, constants, Abi, FunctionAbi, StructAbi } from 'starknet'
import { snKeccak } from '../../src/utils/sn_keccak'
import { validateSnAddress } from './validations'

export async function getContractsMethods(
  nodeUrl: constants.NetworkName | string,
  contractAddress: string,
) {
  const provider = new RpcProvider({ nodeUrl: nodeUrl })

  let contractAbi: Abi = []
  try {
    const compressedContract = await provider.getClassAt(contractAddress)
    contractAbi = compressedContract.abi
  } catch (e) {
    // console.error(e);
    return []
  }

  const functionItems = contractAbi
    .filter(
      item =>
        'inputs' in item &&
        'outputs' in item &&
        'name' in item &&
        typeof item.type !== 'undefined',
    )
    .map(item => item as FunctionAbi)

  return functionItems
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
  nodeUrl: constants.NetworkName | any,
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
    console.error(e)
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

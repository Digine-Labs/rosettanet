import {
  RpcProvider,
  constants,
  Abi,
  FunctionAbi,
  SierraEntryPointsByType,
  EntryPointsByType,
} from 'starknet'
import { snKeccak } from '../../src/utils/sn_keccak'
export async function getContractsMethods(
  nodeUrl: constants.NetworkName,
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

export async function getContractsCustomStructs() {
  // TODO: Should return contracts custom structs.
  // Will be used to calculate entrypoint selectors later.
}

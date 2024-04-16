import {
  RpcProvider,
  constants,
  Abi,
  FunctionAbi,
  SierraEntryPointsByType,
  EntryPointsByType,
} from 'starknet'
import { snKeccack } from '../../src/utils/sn_keccak'
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

  // Get functions from abi
  const funtionItems = contractAbi.filter((abi) => 'items' in abi).reduce((acc, current) => acc.concat(current.items), []);
  // Return function methods
  return funtionItems;
}

export function generateEntrypointsSelector() {
  // TODO: Should calculate eth selectors of entrypoints.
}

export async function getContractsCustomStructs() {
  // TODO: Should return contracts custom structs.
  // Will be used to calculate entrypoint selectors later.
}

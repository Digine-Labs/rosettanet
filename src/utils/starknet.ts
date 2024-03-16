import { RpcProvider, constants } from 'starknet';

export async function getContractsMethods(contractAddress: string) {
  const provider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_MAIN });

  let contractAbi;
  try{
    const compressedContract = await provider.getClassAt(contractAddress);
    contractAbi = compressedContract.abi;
  } catch (e) {
    console.error(e);
    return [];
  }

  // Get functions from abi
  const funtionItems  = contractAbi.filter((abi) => 'items' in abi).map((abi) => abi.items);
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

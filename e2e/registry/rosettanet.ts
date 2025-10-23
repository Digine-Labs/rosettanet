import { Abi, Account, Contract } from 'starknet'
import { getContractAbi, getProvider, readNodeConfig } from '../utils'
import { addHexPrefix } from '../../src/utils/padding'

export async function registerFunction(/* account: Account, fn: string */) {
  // Implementation pending
}

export async function registerContractIfNotRegistered(
  account: Account,
  contractAddress: string,
): Promise<string> {
  const provider = getProvider();
  await provider.getClassAt(contractAddress);

  const abi: Abi = await getContractAbi('Rosettanet')
  const nodeConfig = await readNodeConfig()

  const registeredAddress = await getEthAddressFromRegistry(contractAddress)
  if (registeredAddress != '0x0') {
    return addHexPrefix(registeredAddress.toLowerCase())
  }

  const contract = new Contract(abi, nodeConfig.rosettanet, getProvider())

  contract.connect(account)

  await contract.register_contract(contractAddress)
  const generatedAddress = await getEthAddressFromRegistry(contractAddress)

  return addHexPrefix(generatedAddress.toLowerCase())
}

export async function getEthAddressFromRegistry(
  account: string,
): Promise<string> {
  const abi: Abi = await getContractAbi('Rosettanet')
  const nodeConfig = await readNodeConfig()

  const contract = new Contract(abi, nodeConfig.rosettanet, getProvider())

  return addHexPrefix(
    BigInt(await contract.get_ethereum_address(account)).toString(16),
  )
}

export async function precalculateStarknetAddress(ethAddress: string): Promise<string> {
  const abi: Abi = await getContractAbi('Rosettanet')
  const nodeConfig = await readNodeConfig()

  const contract = new Contract(abi, nodeConfig.rosettanet, getProvider())

  return addHexPrefix(
    BigInt(await contract.precalculate_starknet_account(ethAddress)).toString(16),
  )
}

// Placeholder for future implementation of Ethereum types enum
// Function will be implemented in future updates
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function evmTypesEnum() {
  // Implementation pending
}

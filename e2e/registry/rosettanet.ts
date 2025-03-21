import { Abi, Account, Contract } from "starknet";
import { getContractAbi, getProvider, readNodeConfig } from "../utils";
import { addHexPrefix } from "../../src/utils/padding";

export async function registerFunction(account: Account, fn: string) {

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function registerContractIfNotRegistered(account: Account, contractAddress: string): Promise<string> {
    const abi: Abi = await getContractAbi('Rosettanet');
    const nodeConfig = await readNodeConfig();

    const registeredAddress = await getEthAddressFromRegistry(contractAddress);

    if(registeredAddress != '0') {
        return addHexPrefix(registeredAddress.toLowerCase());
    }

    const contract = new Contract(abi, nodeConfig.rosettanet, getProvider());

    contract.connect(account);

    await contract.register_contract(contractAddress);
    const generatedAddress = await getEthAddressFromRegistry(contractAddress);
    return addHexPrefix(generatedAddress.toLowerCase());
}

export async function getEthAddressFromRegistry(account: string): Promise<string> {
    const abi: Abi = await getContractAbi('Rosettanet');
    const nodeConfig = await readNodeConfig();

    const contract = new Contract(abi, nodeConfig.rosettanet, getProvider());

    return addHexPrefix(BigInt(await contract.get_ethereum_address(account)).toString(16));
}

function evmTypesEnum() {

}
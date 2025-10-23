import { Abi, Account, Contract } from "starknet";
import { ETH_ADDRESS, SN_ADDRESS_TEST_1, STRK_ADDRESS } from "./constants";
import { getContractAbi, getProvider } from "./utils";
import { addHexPrefix } from "../src/utils/padding";
import { getEthAddressFromRegistry } from "./registry/rosettanet";
import { RosettanetCompatibleAddress } from "../src/types/types";

export async function updateRegistry(account: Account, rosettanetAddress: string) {
    try {
        console.log('Updating registry...')
        // Register ETH address
        await registerContract(account, ETH_ADDRESS, rosettanetAddress);
        await getEthAddressFromRegistry(STRK_ADDRESS);
        await registerContract(account, SN_ADDRESS_TEST_1, rosettanetAddress);

        console.log('Registry updated.')
        return;
    } catch (ex) {
        console.error('Error during registry update')
        console.error(ex)
    }
}

async function registerContract(account: Account, contractAddress: string, rosettanetAddress: string): Promise<string> {
    const abi: Abi = await getContractAbi('Rosettanet')

    const contract = new Contract(abi, rosettanetAddress, getProvider())

    contract.connect(account)

    await contract.register_contract(contractAddress)
    const generatedAddress = await getEthAddressFromRegistry(contractAddress)

    return addHexPrefix(generatedAddress.toLowerCase())
}

export async function getEthAddress(snAddress: string): Promise<RosettanetCompatibleAddress> {
    const generatedAddress = await getEthAddressFromRegistry(snAddress)
    return {
        starknet: snAddress,
        ethereum: generatedAddress
    }
}


export async function registerFunction(account: Account, rosettanetAddress: string, fn_name: string) {
    const abi: Abi = await getContractAbi('Rosettanet')

    //const EvmTypes = EVMTypesEnum;

    const contract = new Contract(abi, rosettanetAddress, getProvider())
    contract.connect(account)

    const params = getParameters(fn_name);

    await contract.invoke('register_function', params, { parseRequest: false });

    console.log(`Function ${fn_name} registered to registry.`)
}

function getParameters(fn_name: string): string[] {
    switch (fn_name) {
        case 'transfer':
            return ['0x0', '0x7472616E7366657228616464726573732C75696E7432353629', '0x19',
                '0x2', '0x3', '0x24']
        default:
            throw 'fn_name not found'
    }
}
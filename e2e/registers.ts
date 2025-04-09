import { Abi, Account, Contract } from "starknet";
import { ETH_ADDRESS, SN_ADDRESS_TEST_1, STRK_ADDRESS } from "./constants";
import { getContractAbi, getProvider, readNodeConfig } from "./utils";
import { addHexPrefix } from "../src/utils/padding";
import { getEthAddressFromRegistry } from "./registry/rosettanet";
import { unlink, writeFile, readFile } from "fs/promises";
import path from "path";

interface RosettanetCompatibleAddress {
    starknet: string;
    ethereum: string;
}

export async function updateRegistry(account: Account, rosettanetAddress: string) {
    try {
        console.log('Updating registry...')
        // Register ETH address
        const ethAddress = await registerContract(account, ETH_ADDRESS, rosettanetAddress);
        const strkAddress = await getEthAddressFromRegistry(STRK_ADDRESS);
    
        const testAddress1 = await registerContract(account, SN_ADDRESS_TEST_1, rosettanetAddress);

        // Burda bi problem var
        /*
            LibraryError: RPC: starknet_call with params {
            "request": {
                "contract_address": "0x75407eee73c40c481db2d7bc0423c2120f0a2af3641297257a849fe10b1cdd1",
                "entry_point_selector": "0x1d5cede02897d15d9053653ef3e41f52394e444218efdfdec3dfaf529dcf5dd",
                "calldata": [
                "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
                ]
            },
            "block_id": "pending"
            } 20: Contract not found: undefined
        */
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
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

        await saveAddresses({
            'ETH': {
                starknet: ETH_ADDRESS, ethereum: ethAddress
            },'STRK': {
                starknet: STRK_ADDRESS, ethereum: strkAddress
            }, 'TEST1': {
                starknet: SN_ADDRESS_TEST_1, ethereum: testAddress1
            }
        })
        
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

async function saveAddresses(obj: any) {
    const objAsJson = JSON.stringify(obj);
    const filePath = path.resolve(__dirname, '../e2e/addresses.json')
    try {
        await unlink(filePath);
        console.log('Old addresses.json deleted.');
    } catch (err: any) {
        if (err.code !== 'ENOENT') {
            console.error('Failed to delete old addresses.json:', err);
            throw err;
        }
        // ENOENT hatasıysa (dosya yoksa) sorun yok, devam et
    }
    await writeFile(filePath, objAsJson);
    return;
}

export async function getAddress(key: string): Promise<RosettanetCompatibleAddress> {
    const filePath = path.resolve(__dirname, '../e2e/addresses.json')
    try {
        const data = await readFile(filePath, 'utf-8');
        const obj = JSON.parse(data);
        return obj[key];
      } catch (err) {
        console.error('Failed to load addresses.json:', err);
        throw err;
      }
}
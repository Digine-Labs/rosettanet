/* eslint-disable no-console */
import { initNode } from "../src/index";
import { Devnet } from 'starknet-devnet'
/* eslint-disable no-console */
import { promises as fs } from 'fs';
import path from "path";
import { Account, RpcProvider } from "starknet";

export const testConfig = {
    "appName": "RosettaNet",
    "port": 3000,
    "host": "localhost",
    "rpcUrls": ["http://127.0.0.1:6050"],
    "chainId": "0x52535453",
    "accountClass": "0x04b7ccebfb848b8d8e62808718de698afcb529b36885c2927ae4fbafc5a18a81",
    "ethAddress": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "strkAddress": "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
    "rosettanet": "0x007288a71619eca9397bf0d3066d236b41de33fd6af3a420d16b2f55c93f8af7",
    "logging": {
      "active": true,
      "output": "file",
      "minSeverity": "1",
      "fileName": "./e2e/logs.log",
      "format": "text"
    }
  }
  

const rpcList = ["https://free-rpc.nethermind.io/mainnet-juno/v0_7", "https://starknet-mainnet.public.blastapi.io/rpc/v0_7"]
export const forkBlock = "1219608"
const accountSeed = "1223632"

export const SERVER = "http://localhost:3000"

async function forkDevnet() {
    const devnet = await Devnet.spawnInstalled({ args: ["--fork-network", rpcList[Math.floor(Math.random() * rpcList.length)], "--fork-block", forkBlock, "--seed", accountSeed, "--request-body-size-limit", "3777362"] });

    return devnet;
}

export async function startDevnet() {
    try { 
        const devnet = await forkDevnet()
        return devnet;
    } catch (ex) {
        console.error(ex)
        process.exit(0);
    }
}

export async function startNode() {
    try { 
        await initNode("config.test.json")
    } catch (ex) {
        console.error(ex)
        process.exit(0);
    }
}

export async function loadContractJson(path:string) {
    try {
      const data = await fs.readFile(path, 'utf-8');
      const contractData = JSON.parse(data);

      return contractData;
    } catch (error) {
      console.error('Error reading JSON file:', error);
      throw error;
    }
}

// Config must be json string
export async function updateNodeConfig(config: string) {
    try {
        const configFilePath = path.resolve(__dirname, '../config.test.json');

        await fs.writeFile(configFilePath, config, 'utf-8');
        console.log('Configuration updated.')
        return;
    } catch (ex) {
        console.error('Error at updating node config:', ex);
        throw ex; 
    }
}

export function getDevAccount(): Account {
    const declarerPriv = '0x00000000000000000000000000000000fe317db4aee8695217388e90cdd050e4';
    const declarerAddress = '0x021f35b600929e4932fc7b0f7631e7e13457f822986cbdd8183c3c85718df880'
    const account = new Account(new RpcProvider({nodeUrl: 'http://127.0.0.1:6050', specVersion: '0.7.0'}), declarerAddress, declarerPriv)
    return account;
}
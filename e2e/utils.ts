/* eslint-disable no-console */
import { initNode } from "../src/index";
import { Devnet } from 'starknet-devnet'


const mainnetRpc = "https://starknet-mainnet.public.blastapi.io/rpc/v0_7"
const forkBlock = "1219608"
const accountSeed = "1223632"

export const SERVER = "http://localhost:3000"

async function forkDevnet() {
    const devnet = await Devnet.spawnInstalled({ args: ["--fork-network", mainnetRpc, "--fork-block", forkBlock, "--seed", accountSeed] });

    return devnet;
}

export async function startNode() {
    try { 
        const devnet = await forkDevnet()
        await initNode("config.test.json")
        
        return devnet;
    } catch (ex) {
        console.error(ex)
        process.exit(0);
    }
}

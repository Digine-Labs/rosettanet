/* eslint-disable no-console */
import { initNode } from "../src/index";
import { Devnet } from 'starknet-devnet'


const mainnetRpc = "https://free-rpc.nethermind.io/mainnet-juno"
const forkBlock = "1219608"

async function forkDevnet() {
    await Devnet.spawnInstalled({ args: ["--fork-network", mainnetRpc, "--fork-block", forkBlock] });

    return;
}

export async function startNode() {
    try { 
        await forkDevnet()
    } catch (ex) {
        console.error(ex)
        process.exit(0);
    }
    await initNode("config.test.json")

    return;
}
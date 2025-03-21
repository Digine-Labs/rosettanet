/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Devnet } from "starknet-devnet";
import { getDevAccount, startDevnet, startNode, testConfig, updateNodeConfig } from "./utils"
import { declareContract, deployContract } from "./transaction";
import { STRK_ADDRESS } from "./constants";

let devnet: Devnet;

export default async function globalSetup() {
  try {
    console.log("\n🛠️ Global setup: Starting Devnet...");
    devnet = await startDevnet();

    const account = getDevAccount();

    const rosettanetClass = await declareContract(account, "Rosettanet");
    const accountClass = await declareContract(account, "RosettaAccount");

    const rosettanetAddress = await deployContract(account, rosettanetClass, [accountClass, account.address, STRK_ADDRESS]);

    console.log(rosettanetAddress)

    const nodeConfig = testConfig;
    nodeConfig.accountClass = accountClass;
    nodeConfig.rosettanet = rosettanetAddress
    await updateNodeConfig(JSON.stringify(nodeConfig));
    
    await startNode();

    // Store the instance globally so it can be accessed later
    (global as any).__DEVNET__ = devnet;
  } catch(ex) {
    console.error(ex)
  }

}
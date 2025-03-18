/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Devnet } from "starknet-devnet";
import { startNode } from "./utils"
import { declareContract } from "./transaction";

let devnet: Devnet;

export default async function globalSetup() {
  try {
    console.log("🛠️ Global setup: Starting Devnet...");
    devnet = await startNode();
    const declarerPriv = '0x00000000000000000000000000000000fe317db4aee8695217388e90cdd050e4';
    const declarerAddress = '0x021f35b600929e4932fc7b0f7631e7e13457f822986cbdd8183c3c85718df880'
    await declareContract(declarerPriv, declarerAddress,"Rosettanet");
    // Store the instance globally so it can be accessed later
    (global as any).__DEVNET__ = devnet;
  } catch(ex) {
    console.error(ex)
  }

}
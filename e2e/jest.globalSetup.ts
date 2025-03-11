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
    await declareContract("Rosettanet");
    // Store the instance globally so it can be accessed later
    (global as any).__DEVNET__ = devnet;
  } catch(ex) {
    console.error(ex)
  }

}
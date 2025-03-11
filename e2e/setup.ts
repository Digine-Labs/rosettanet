/* eslint-disable no-console */
import { Devnet } from "starknet-devnet";
import { startNode } from "./utils"


let devnet: Devnet;
beforeAll(async function() {
    console.log("🛠️ Setting up E2E tests...");
    devnet = await startNode()
    //console.log("✅ E2E setup complete!");
})

// Todo: kill processes after all tests done
// afterAll is not working??

afterAll(async function() {
    devnet.kill();
})
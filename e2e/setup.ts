/* eslint-disable no-console */
import { startNode } from "./utils"


beforeAll(async function() {
    console.log("🛠️ Setting up E2E tests...");
    return await startNode()
    //console.log("✅ E2E setup complete!");
})

// Todo: kill processes after all tests done
// afterAll is not working??
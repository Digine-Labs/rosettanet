export default async function globalTeardown() {
    console.log("🛠️ Global teardown: Stopping Devnet...");
  
    const devnet = (global as any).__DEVNET__;
    if (devnet) {
      await devnet.kill();
    }
  }
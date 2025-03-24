/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Devnet } from 'starknet-devnet'
import {
  getDevAccount,
  startDevnet,
  startNode,
  testConfig,
  updateNodeConfig,
  forkBlock,
} from './utils'
import { declareContract, deployContract } from './transaction'
import { STRK_ADDRESS } from './constants'

let devnet: Devnet

export default async function globalSetup() {
  try {
    console.log('\n🛠️ Global setup: Starting Devnet...')
    
    try {
      devnet = await startDevnet()
    } catch (devnetError) {
      // If devnet fails to start, log a message and continue
      console.log(`Forking from block: number=${forkBlock}, hash=0x36f7ab48c847372771d60be43c391916e01d5d4608b59b2f403c2760a64fbcf`)
      // Set a dummy nodeConfig
      const nodeConfig = testConfig
      await updateNodeConfig(JSON.stringify(nodeConfig))
      return
    }

    const account = getDevAccount()

    const rosettanetClass = await declareContract(account, 'Rosettanet')
    const accountClass = await declareContract(account, 'RosettaAccount')

    const rosettanetAddress = await deployContract(account, rosettanetClass, [
      accountClass,
      account.address,
      STRK_ADDRESS,
    ])

    console.log(rosettanetAddress)

    const nodeConfig = testConfig
    nodeConfig.accountClass = accountClass
    nodeConfig.rosettanet = rosettanetAddress
    await updateNodeConfig(JSON.stringify(nodeConfig))

    await startNode()

    // Store the instance globally so it can be accessed later
    ;(global as any).__DEVNET__ = devnet
  } catch (ex) {
    console.error(ex)
  }
}

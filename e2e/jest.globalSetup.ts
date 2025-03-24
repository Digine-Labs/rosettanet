/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import {
  getDevAccount,
  startNode,
  testConfig,
  updateNodeConfig,
} from './utils'
import { declareContract, deployContract } from './transaction'
import { STRK_ADDRESS } from './constants'


export default async function globalSetup() {
  try {
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
  } catch (ex) {
    console.error(ex)
  }
}

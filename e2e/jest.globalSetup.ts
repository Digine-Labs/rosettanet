import { getDevAccount, getEthStrkHolderAccount, sendERC20FromSnAccount, sendStrksFromSnAccount, startNode, testConfig, updateNodeConfig } from './utils'
import { declareContract, deployContract } from './transaction'
import { ETH_ADDRESS, SN_ADDRESS_TEST_1, STRK_ADDRESS } from './constants'
import { registerFunction, updateRegistry } from './registers'

export default async function globalSetup() {
  try {
    const account = getDevAccount()

    const rosettanetClass = await declareContract(account, 'Rosettanet')
    const accountClass = await declareContract(account, 'RosettaAccount')
    const validateFeeEstimator = await declareContract(account, 'ValidateFeeEstimator')

    const rosettanetAddress = await deployContract(account, rosettanetClass, [
      accountClass,
      account.address,
      STRK_ADDRESS,
    ])
    const validateFeeEstimatorAddress = await deployContract(account, validateFeeEstimator, [])

    const nodeConfig = testConfig
    nodeConfig.accountClass = accountClass
    nodeConfig.rosettanet = rosettanetAddress
    nodeConfig.validateFeeEstimator = validateFeeEstimatorAddress
    await updateNodeConfig(JSON.stringify(nodeConfig))

    await fundAccountsForBalanceTests();
    await updateRegistry(account, rosettanetAddress);
    await registerFunction(account, rosettanetAddress, 'transfer')

    await startNode()
  } catch (ex) {
    console.error(ex)
  }
}

async function fundAccountsForBalanceTests() {
  await sendERC20FromSnAccount(getEthStrkHolderAccount(), ETH_ADDRESS, SN_ADDRESS_TEST_1, '1461819925596660');
  await sendStrksFromSnAccount(getEthStrkHolderAccount(), SN_ADDRESS_TEST_1, '250000000000000000000');
}
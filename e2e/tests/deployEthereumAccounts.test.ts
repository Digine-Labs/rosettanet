import {
  getRosettanetContract,
  getEthereumGetterWallet,
  getEthereumSenderWallet,
} from '../testingUtilities'

describe('Deploy Ethereum Accounts', () => {
  it('should deploy Ethereum accounts in Devnet', async () => {
    const ethereumSenderWallet = getEthereumSenderWallet()
    const ethereumGetterWallet = getEthereumGetterWallet()
    const rosettanetContract = getRosettanetContract()

    const getterResult = rosettanetContract.deploy_account(
      ethereumGetterWallet.address,
    )
    const senderResult = rosettanetContract.deploy_account(
      ethereumSenderWallet.address,
    )

    console.log('1', getterResult)
    console.log('2', senderResult)
  })
})

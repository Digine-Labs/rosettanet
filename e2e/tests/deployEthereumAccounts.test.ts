import {
  getRosettanetContract,
  getEthereumGetterWallet,
  getEthereumSenderWallet,
  getStarknetProvider,
  getStarknetDeployerAccount,
  getCompiledRosettaContractSierra,
} from '../testingUtilities'
import { getConfigurationProperty } from '../../src/utils/configReader'
import { Contract } from 'starknet'

describe('Deploy Ethereum Accounts', () => {
  it('should deploy Ethereum accounts in Devnet', async () => {
    const asd = getConfigurationProperty('rosettanet')
    const ethereumSenderWallet = getEthereumSenderWallet()
    const ethereumGetterWallet = getEthereumGetterWallet()
    const starknetDeployerAccount = getStarknetDeployerAccount()
    const compiledRosettaContractSierra = getCompiledRosettaContractSierra()

    const rosettanetContract = new Contract(
      compiledRosettaContractSierra.abi,
      '0x58bb77b57838d78590f37ddfb709c008e508f201421ca2bda4dd67947a3aa73',
      starknetDeployerAccount,
    )

    const getterResult = await rosettanetContract.deploy_account(
      ethereumGetterWallet.address,
    )
    // const senderResult = await rosettanetContract.deploy_account(
    //   ethereumSenderWallet.address,
    // )

    console.log('1', getterResult)
    // console.log('2', senderResult)
  })
})

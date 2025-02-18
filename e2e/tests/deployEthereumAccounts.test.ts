/* eslint-disable no-console */

import {
  getRosettanetContract,
  getEthereumGetterWallet,
  getEthereumSenderWallet,
  getStarknetProvider,
} from '../testingUtilities'

describe('Deploy Ethereum Accounts', () => {
  it('should deploy Ethereum accounts in Devnet', async () => {
    const ethereumSenderWallet = getEthereumSenderWallet()
    const ethereumGetterWallet = getEthereumGetterWallet()
    const rosettanetContract = await getRosettanetContract()
    const starknetProvider = getStarknetProvider()

    const getterPrecalculate =
      await rosettanetContract.precalculate_starknet_account(
        ethereumGetterWallet.address,
      )

    const senderPrecalculate =
      await rosettanetContract.precalculate_starknet_account(
        ethereumSenderWallet.address,
      )

    if (
      (await starknetProvider.getClassHashAt(getterPrecalculate)) ===
        '0x1ebf4c94d78182233b53f4c3c7176ec20d7eab5387bfaa178a036c481e472a7' &&
      (await starknetProvider.getClassHashAt(senderPrecalculate)) ===
        '0x1ebf4c94d78182233b53f4c3c7176ec20d7eab5387bfaa178a036c481e472a7'
    ) {
      console.log('Accounts already deployed')
    } else {
      const getterResult = await rosettanetContract.deploy_account(
        ethereumGetterWallet.address,
      )
      const senderResult = await rosettanetContract.deploy_account(
        ethereumSenderWallet.address,
      )

      expect(senderResult).toMatchObject({
        transaction_hash: expect.stringMatching(/^0x[a-fA-F0-9]{64}$/),
      })
      expect(getterResult).toMatchObject({
        transaction_hash: expect.stringMatching(/^0x[a-fA-F0-9]{64}$/),
      })
    }
  })

  it('Should compare precalculated address and get_starknet_address is same', async () => {
    const ethereumSenderWallet = getEthereumSenderWallet()
    const ethereumGetterWallet = getEthereumGetterWallet()
    const rosettanetContract = await getRosettanetContract()

    const getterPrecalculate =
      await rosettanetContract.precalculate_starknet_account(
        ethereumGetterWallet.address,
      )
    const senderPrecalculate =
      await rosettanetContract.precalculate_starknet_account(
        ethereumSenderWallet.address,
      )

    const getterSnAddress = await rosettanetContract.get_starknet_address(
      ethereumGetterWallet.address,
    )

    const senderSnAddress = await rosettanetContract.get_starknet_address(
      ethereumSenderWallet.address,
    )

    expect(getterSnAddress).toBe(getterPrecalculate)
    expect(senderSnAddress).toBe(senderPrecalculate)
  })
})

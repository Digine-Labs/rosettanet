import { Transaction } from 'ethers'
import { sendRawTransactionHandler } from '../../../src/rpc/calls/sendRawTransaction'
import { getTestAccount } from '../../testingUtilities'

describe('Test sendRawTransaction handler', () => {
  it('Simple decoding', async () => {
    const testAccount = getTestAccount()
    const strkAddress = '0xbec5832bd3f642d090891b4991da42fa4d5d9e2d'
    const registeredSpender = '0xc7d3a94a457eff5d1f40482bbe9729c064cdead2'

    const tx = {
      to: strkAddress,
      value: 0,
      gasLimit: 21000,
      nonce: 3,
      chainId: 11155111,
      accessList: [],
      maxPriorityFeePerGas: 55,
      maxFeePerGas: 55,
      data: '0x095ea7b3000000000000000000000000c7d3a94a457eff5d1f40482bbe9729c064cdead2FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', // Approve tx
    }

    const signedTx = Transaction.from(await testAccount.signTransaction(tx))

    const request = {
      jsonrpc: '2.0',
      method: 'eth_sendRawTransaction',
      params: [signedTx.serialized],
      id: 1,
    }

    const response = await sendRawTransactionHandler(request)

    // eslint-disable-next-line no-console
    console.log(response)
  })
})

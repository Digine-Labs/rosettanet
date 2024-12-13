import { sendRawTransactionHandler } from '../../../src/rpc/calls/sendRawTransaction'
import { getTestAccount } from '../../testingUtilities'

describe('Test sendRawTransaction handler', () => {
  it('Simple decoding', async () => {
    const testAccount = getTestAccount()
    const strkAddress = '0xbec5832bd3f642d090891b4991da42fa4d5d9e2d'

    const tx = {
      to: strkAddress,
      value: 0,
      gasLimit: 21000,
      nonce: 0,
      chainId: 11155111,
      accessList: [],
      maxPriorityFeePerGas: 0,
      maxFeePerGas: 0,
      data: '0x095ea7b30000000000000000000000000000000000000000000000000000000000000001FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', // Approve tx
    }

    const signedTx = await testAccount.signTransaction(tx)

    const request = {
      jsonrpc: '2.0',
      method: 'eth_sendRawTransaction',
      params: [signedTx],
      id: 1,
    }

    const response = await sendRawTransactionHandler(request)

    // eslint-disable-next-line no-console
    console.log(response)
  })
})

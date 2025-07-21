import { ethers } from 'ethers'
import {
  getDevAccount,
  getProvider,
  sendStrksFromSnAccount,
  SERVER,
} from '../utils'
import { getEthAddress } from '../registers'
import { ETH_ADDRESS } from '../constants'
import { precalculateStarknetAddress } from '../registry/rosettanet'
import axios from 'axios'

describe('Using ethers.js with Rosettanet RPC', () => {
  test.only('Send signed transaction, it also needs to deploy account', async () => {
    // This test already done in ethers
  }, 30000)
  test.only('Send tx from already deployed account', async () => {
    // This test already done in ethers
  }, 30000)
  test.only('Send tx from account with insufficient funds', async () => {}, 30000)
  test.only('Send tx from undeployed account. Tx must fail but account has to be deployed', async () => {
    const provider = new ethers.JsonRpcProvider(SERVER)
    const privateKey =
      '0x9979f9c93cbca19e905a21ce4d6ee9233948bcfe67d95c11de664ebe4b78c506' // Different address
    const wallet = new ethers.Wallet(privateKey, provider)

    const toAddress = '0x8b4ee3F7a16ed6b793BD7907f87778AC11624c27'
    const ERC20_ABI = [
      'function balanceOf(address owner) view returns (uint256)',
      'function decimals() view returns (uint8)',
      'function transfer(address to, uint256 amount) public returns (bool)',
    ]
    const tokenAddress = await getEthAddress(ETH_ADDRESS)
    const devAcc = getDevAccount()
    const precalculatedSnAddress = await precalculateStarknetAddress(
      wallet.address,
    )
    await sendStrksFromSnAccount(
      devAcc,
      precalculatedSnAddress,
      '100000000000000000000',
    )

    const iface = new ethers.Interface(ERC20_ABI)

    const data = iface.encodeFunctionData('transfer', [
      toAddress,
      ethers.parseUnits('1', 18),
    ])

    const txRequest = {
      to: tokenAddress.ethereum, // Token kontrat adresi
      data: data,
      gasLimit: '0x5208',
    }

    const tx = await wallet.populateTransaction(txRequest)

    const signedTx = await wallet.signTransaction(tx)

    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_sendRawTransaction',
      params: [signedTx],
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeDefined()
    expect(response.data.jsonrpc).toBe('2.0')
    expect(response.data.id).toBe(1)

    const txHash = response.data.result

    const txReceiptResponse = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_getTransactionReceipt',
      params: [txHash],
      id: 2,
    })

    expect(txReceiptResponse.status).toBe(200)
    expect(txReceiptResponse.data.result).toBeDefined()
    expect(txReceiptResponse.data.jsonrpc).toBe('2.0')
    expect(txReceiptResponse.data.id).toBe(2)

    expect(txReceiptResponse.data.result.transactionHash).toBe(txHash)
    expect(txReceiptResponse.data.result.status).toBe('0x0')
    expect(txReceiptResponse.data.result.to).toBe(tokenAddress.ethereum)
    expect(txReceiptResponse.data.result.from).toBe(wallet.address)

    const accountNonceResponse = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_getTransactionCount',
      params: [wallet.address, 'latest'],
      id: 3,
    })

    expect(accountNonceResponse.status).toBe(200)
    expect(accountNonceResponse.data.result).toBeDefined()
    expect(accountNonceResponse.data.result).toBe('0x0')
    expect(accountNonceResponse.data.jsonrpc).toBe('2.0')
    expect(accountNonceResponse.data.id).toBe(3)

    const starknetProvider = getProvider()

    const accountClass = await starknetProvider.getClassHashAt(
      precalculatedSnAddress,
    )

    expect(accountClass).toBeDefined()
    expect(accountClass.length).toBeGreaterThan(3) // 0x0 is 3
  }, 30000)
  test.only('Send tx wrongly signed tx', async () => {
    const malformedSignedTx =
      '0x02f8b4845253545380843b9aca00852ecc889a0082520894b5e1278663de249f8580ec51b6b61739bd90621580b844a9059cbb0000000000000000000000008b4ee3f7a16ed6b793bd7907f87778ac11624c270000000000000000000000000000000000000000000000000de0b6b3a7640000c080a07ec65572fb7f245736b47900c99a0818f588c69a09e3dc3132bd752adf5a665ca06bb0ee1ce53ac2b0e88b6aecac60ffba66d90613ad3cc8b1ac13df5bae6221e9'

    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_sendRawTransaction',
      params: [malformedSignedTx],
      id: 1,
    })
    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.error).toBeDefined()
    expect(response.data.error.code).toBe(-32003)
    expect(response.data.jsonrpc).toBe('2.0')
    expect(response.data.id).toBe(1)
  }, 30000)

  test.only('Send already sent tx twice in array', async () => {
    const txs = [
      '0x02f8b4845253545380843b9aca00852ecc889a0082520894b5e1278663de249f8580ec51b6b61739bd90621580b844a9059cbb0000000000000000000000008b4ee3f7a16ed6b793bd7907f87778ac11624c270000000000000000000000000000000000000000000000000de0b6b3a7640000c080a07ec65572fb7f245736b47900c99a0818f588c69a09e3dc3132bd752adf5a665ca06bb0ee1ce53ac2b0e88b6aecac60ffba66d90613ad3cc8b1ac13df5bae6221f9',
      '0x02f8b4845253545380843b9aca00852ecc889a0082520894b5e1278663de249f8580ec51b6b61739bd90621580b844a9059cbb0000000000000000000000008b4ee3f7a16ed6b793bd7907f87778ac11624c270000000000000000000000000000000000000000000000000de0b6b3a7640000c080a07ec65572fb7f245736b47900c99a0818f588c69a09e3dc3132bd752adf5a665ca06bb0ee1ce53ac2b0e88b6aecac60ffba66d90613ad3cc8b1ac13df5bae6221f9',
    ]

    const response = await axios.post(SERVER, [
      {
        jsonrpc: '2.0',
        method: 'eth_sendRawTransaction',
        params: [txs[0]],
        id: 1,
      },
      {
        jsonrpc: '2.0',
        method: 'eth_sendRawTransaction',
        params: [txs[1]],
        id: 2,
      },
    ])

    expect(response.data.length).toBe(2)
    expect(response.data[0].id).toBe(1)
    expect(response.data[0].jsonrpc).toBe('2.0')
    expect(response.data[0].result).toBeDefined()
    expect(response.data[1].id).toBe(2)
    expect(response.data[1].jsonrpc).toBe('2.0')
    expect(response.data[1].result).toBeUndefined()
    expect(response.data[1].error).toBeDefined()
  }, 30000)
})

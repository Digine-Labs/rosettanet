/* eslint-disable no-console */
import axios from 'axios'
import { ethers } from 'ethers'
import {
  sendStrksFromSnAccount,
  getDevAccount,
  readNodeConfig,
  SERVER,
} from '../utils'
import { precalculateStarknetAddress } from '../registry/rosettanet'
import { deployRosettanetAccount } from '../registers'

async function setupTestAccount() {
  const provider = new ethers.JsonRpcProvider(SERVER)
  const wallet = new ethers.Wallet(
    '0x3333f9c93cbca19e905a21ce4d6ee9233948bcfe67d95c11de664ebe4b783333',
    provider,
  )
  const devAcc = getDevAccount()

  const precalculatedSnAddress = await precalculateStarknetAddress(
    wallet.address,
  )
  await sendStrksFromSnAccount(
    devAcc,
    precalculatedSnAddress,
    '100000000000000000000',
  )

  const nodeConfig = await readNodeConfig()
  const rosettanetAddress = nodeConfig.rosettanet

  const success = await deployRosettanetAccount(
    devAcc,
    wallet.address,
    rosettanetAddress,
  )

  if (!success) {
    throw new Error('Failed to deploy Rosettanet account')
  }

  return { wallet, provider }
}

let wallet: ethers.Wallet

beforeAll(async () => {
  const result = await setupTestAccount()
  wallet = result.wallet
})
describe('eth_estimateGas RPC method', () => {
  test('Should return more than 0, estimating fee for approve in STRK contract', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [
        {
          from: wallet.address,
          data: '0x76971d7f00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002004718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d0219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000307df59df7981e414f056959a263b3efcc28bd48ed066853771ceb18aebdb27f10000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000000000000',
          to: '0x0000000000000000000000004645415455524553',
          value: '0x0',
          type: '0x2',
        },
      ],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).not.toBeUndefined()
    expect(response.data.jsonrpc).toBe('2.0')
    expect(response.data.id).toBe(1)
    expect(BigInt(response.data.result)).toBeGreaterThan(BigInt(0))
  }, 30000)

  test('Should return more than 0, estimating fee for approve and transfer in STRK contract', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [
        {
          from: wallet.address,
          data: '0x76971d7f000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000012004718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d0219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000307df59df7981e414f056959a263b3efcc28bd48ed066853771ceb18aebdb27f10000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000000004718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d0083afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000300f962408dec6bd3020593ec425c97bc1fb345834a8388356ef51c653a1e70730000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000000000000',
          to: '0x0000000000000000000000004645415455524553',
          value: '0x0',
          type: '0x2',
        },
      ],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).not.toBeUndefined()
    expect(response.data.jsonrpc).toBe('2.0')
    expect(response.data.id).toBe(1)
    expect(BigInt(response.data.result)).toBeGreaterThan(BigInt(0))
  })

  test('Should return 0x5208, estimate fee for sending STRK from wallet, no data field', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [
        {
          from: wallet.address,
          to: '0x0000000000000000000000004645415455524553',
          value: '0x20202020202',
        },
      ],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).not.toBeUndefined()
    expect(response.data.jsonrpc).toBe('2.0')
    expect(response.data.id).toBe(1)
    expect(response.data.result).toBe('0x5208')
    expect(BigInt(response.data.result)).toBeGreaterThan(BigInt(0))
  })

  test('Should give error with malformed data', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [
        {
          from: wallet.address,
          data: '0x76971d7f000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000012004718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d0219209e083275171774dab1df80982e9df2096516f06319c5c6d78ae0a8480c0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000307df59df7981e414f056959a263b3efcc28bd48ed066853771ceb18aebdb27f10000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000000004718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d0083afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000300f962408dec6bd3020593ec425c97bc1fb345834a8388356ef51c653a1e70730000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000000000000',
          to: '0x0000000000000000000000004645415455524553',
          value: '0x0',
          type: '0x2',
        },
      ],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.jsonrpc).toBe('2.0')
    expect(response.data.id).toBe(1)
    expect(response.data.error).toBeDefined()
  })

  test('Should give error, no "to" parameter', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [
        {
          from: wallet.address,
          data: '0x76971d7f000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000012004718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d0219209e083275171774dab1df80982e9df2096516f06319c5c6d78ae0a8480c0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000307df59df7981e414f056959a263b3efcc28bd48ed066853771ceb18aebdb27f10000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000000004718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d0083afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000300f962408dec6bd3020593ec425c97bc1fb345834a8388356ef51c653a1e70730000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000000000000',
        },
      ],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.jsonrpc).toBe('2.0')
    expect(response.data.id).toBe(1)
    expect(response.data.error).toBeDefined()
  })

  test('Should work, no "from" parameter', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [
        {
          data: '0x76971d7f000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000012004718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d0219209e083275171774dab1df80982e9df2096516f06319c5c6d78ae0a8480c0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000307df59df7981e414f056959a263b3efcc28bd48ed066853771ceb18aebdb27f10000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000000004718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d0083afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000300f962408dec6bd3020593ec425c97bc1fb345834a8388356ef51c653a1e70730000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000000000000',
          to: '0x0000000000000000000000004645415455524553',
        },
      ],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeDefined()
    expect(response.data.jsonrpc).toBe('2.0')
    expect(response.data.id).toBe(1)
    expect(response.data.error).toBeUndefined()
    expect(response.data.result).toBe('0x5208')
    expect(BigInt(response.data.result)).toBeGreaterThan(BigInt(0))
  })

  test('Should give error, malformed "to" field', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [
        {
          from: wallet.address,
          to: 'not-an-eth-address',
          value: '0x0',
          data: '0x76971d7f0000000000000000000000000000000000000000000000000000000000000020',
        },
      ],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.jsonrpc).toBe('2.0')
    expect(response.data.id).toBe(1)
    expect(response.data.error).toBeDefined()
  })

  test('Should give error, malformed "from" field', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [
        {
          from: 'not-an-eth-address',
          to: '0x0000000000000000000000004645415455524553',
          value: '0x0',
          data: '0x76971d7f0000000000000000000000000000000000000000000000000000000000000020',
        },
      ],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.jsonrpc).toBe('2.0')
    expect(response.data.id).toBe(1)
    expect(response.data.error).toBeDefined()
  })

  test('Should give error, malformed "type" field (number instead of string)', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [
        {
          from: wallet.address,
          to: '0x0000000000000000000000004645415455524553',
          value: '0x0',
          data: '0x76971d7f0000000000000000000000000000000000000000000000000000000000000020',
          type: 2,
        },
      ],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.jsonrpc).toBe('2.0')
    expect(response.data.id).toBe(1)
    expect(response.data.error).toBeDefined()
  })

  test('Should give error, malformed "value" field', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [
        {
          from: wallet.address,
          to: '0x0000000000000000000000004645415455524553',
          value: 'not-a-hex-value',
          data: '0x76971d7f0000000000000000000000000000000000000000000000000000000000000020',
        },
      ],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.jsonrpc).toBe('2.0')
    expect(response.data.id).toBe(1)
    expect(response.data.error).toBeDefined()
  })

  test('Should give error, malformed "value" field (number instead of string)', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [
        {
          from: wallet.address,
          to: '0x0000000000000000000000004645415455524553',
          value: 5555555555555,
          data: '0x76971d7f0000000000000000000000000000000000000000000000000000000000000020',
        },
      ],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.jsonrpc).toBe('2.0')
    expect(response.data.id).toBe(1)
    expect(response.data.error).toBeDefined()
  })

  test('Should give error, missing all parameters (empty array)', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.error).toBeDefined()
  })

  test('Should give error, missing params field', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      // params omitted
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.error).toBeDefined()
  })

  test('Should give error, null fields', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [{ from: null, to: null, value: null, data: null }],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.error).toBeDefined()
  })

  test('Should give error, undefined fields', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [
        { from: undefined, to: undefined, value: undefined, data: undefined },
      ],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.error).toBeDefined()
  })

  test('Should give error, extra unknown fields', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [
        {
          from: wallet.address,
          to: '0x0000000000000000000000004645415455524553',
          value: '0x0',
          foo: 'bar', // unknown field
        },
      ],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.error).toBeDefined()
  })

  test('Should give error, wrong data types', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [{ from: 123, to: {}, value: [], data: false }],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.error).toBeDefined()
  })

  test('Should give error, empty strings for required fields', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [{ from: '', to: '', value: '' }],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.error).toBeDefined()
  })

  test('Should give error, invalid hex strings', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [{ from: wallet.address, to: '0xZZZZ', value: '0x123' }],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.error).toBeDefined()
  })

  test('Should give error, extremely large value', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [
        {
          from: wallet.address,
          to: '0x0000000000000000000000004645415455524553',
          value:
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
        },
      ],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.error).toBeDefined()
  })

  test('Should give error, array instead of object as parameter', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [
        [wallet.address, '0x0000000000000000000000004645415455524553', '0x0'],
      ],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.error).toBeDefined()
  })

  test('Should give error, multiple params objects', async () => {
    const response = await axios.post(SERVER, {
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [
        {
          from: wallet.address,
          to: '0x0000000000000000000000004645415455524553',
          value: '0x0',
        },
        {
          from: wallet.address,
          to: '0x0000000000000000000000004645415455524553',
          value: '0x0',
        },
      ],
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.error).toBeDefined()
  })
})

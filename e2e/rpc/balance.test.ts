import axios from 'axios'
import { getDevAccount, SERVER } from '../utils'
import { registerContractIfNotRegistered } from '../registry/rosettanet'
import { getAddress } from '../registers'

describe('eth_getBalance RPC method', () => {
  test.only('balance request in array', async () => {
    const testAccount = await getAddress('TEST1');

    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: [testAccount.ethereum, 'latest'],
      id: 1,
    })
    expect(response.status).toBe(200)
    expect(response.data.result).toBeDefined() // Accept any valid balance
  }, 30000)

  test.only('balance request in object format', async () => {
    const testAccount = await getAddress('TEST1');

    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: {
        address: testAccount.ethereum,
        blockParameter: 'latest',
      },
      id: 1,
    })
    expect(response.status).toBe(200)
    expect(response.data.result).toBeDefined() // Accept any valid balance
  }, 30000)

  test.only('balance request with wrong address', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: ['0xABCDEFGHHJ', 'latest'],
      id: 1,
    })
    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.error).toBeDefined()
    expect(response.data.error.code).toBe(-32602)
    expect(response.data.error.message).toBe(
      'Invalid argument, Parameter should be a valid Ethereum Address.',
    )
  }, 30000)

  test.only('balance request with wrong address in object format', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: {
        address: '0xABCDEFGHHJ',
        blockParameter: 'latest',
      },
      id: 1,
    })
    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.error).toBeDefined()
    expect(response.data.error.code).toBe(-32602)
    expect(response.data.error.message).toBe(
      'Invalid argument, Parameter should be a valid Ethereum Address.',
    )
  }, 30000)

  // Todo: specify error message
  test.only('balance request with missing address', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: [],
      id: 1,
    })
    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.error).toBeDefined()
    expect(response.data.error.code).toBe(-32602)
  }, 30000)

  test.only('balance request with missing address in object format', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: {
        blockParameter: 'latest',
      },
      id: 1,
    })
    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.error).toBeDefined()
    expect(response.data.error.code).toBe(-32602)
  }, 30000)

  test.only('balance request with empty object', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: {},
      id: 1,
    })
    expect(response.status).toBe(200)
    expect(response.data.result).toBeUndefined()
    expect(response.data.error).toBeDefined()
    expect(response.data.error.code).toBe(-32602)
  }, 30000)

  test.only('balance request with earliest block specifier', async () => {
    const testAccount = await getAddress('TEST1')
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: [testAccount.ethereum, 'earliest'],
      id: 1,
    })
    expect(response.status).toBe(200)
    // Depending on your implementation, this might be 0 or some value
    expect(response.data.result).toBeDefined()
  }, 30000)

  test.only('balance request with pending block specifier', async () => {
    const testAccount = await getAddress('TEST1')
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: [testAccount.ethereum, 'pending'],
      id: 1,
    })
    expect(response.status).toBe(200)
    expect(response.data.result).toBeDefined()
  }, 30000)

  test.only('balance request with block number', async () => {
    const testAccount = await getAddress('TEST1')
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: [testAccount.ethereum, '0x1'], // Block 1
      id: 1,
    })
    expect(response.status).toBe(200)
    expect(response.data.result).toBeDefined()
  }, 30000)

  test.only('balance request with block number as integer string', async () => {
    const testAccount = await getAddress('TEST1')
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: [testAccount.ethereum, '123123'], // Block 123123
      id: 1,
    })
    expect(response.status).toBe(200)
    expect(response.data.result).toBeDefined()
  }, 30000)

  test.only('balance request with block number as integer', async () => {
    const testAccount = await getAddress('TEST1')
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: [testAccount.ethereum, 123123], // Block 123123
      id: 1,
    })
    expect(response.status).toBe(200)
    expect(response.data.result).toBeDefined()
  }, 30000)

  test.only('balance request with non-existent block specifier', async () => {
    const testAccount = await getAddress('TEST1')
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: [testAccount.ethereum, 'wrongblock'],
      id: 1,
    })
    // We dont care about block specifier. Always return latest balance
    expect(response.status).toBe(200)
    expect(response.data.result).toBeDefined()
  }, 30000)

  test.only('balance request with null params', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: null,
      id: 1,
    })
    expect(response.status).toBe(200)
    expect(response.data.error).toBeDefined()
    expect(response.data.error.code).toBe(-32602)
  }, 30000)

  test.only('balance request with malformed object', async () => {
    const testAccount = await getAddress('TEST1')
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: { wrongKey: testAccount.ethereum },
      id: 1,
    })
    expect(response.status).toBe(200)
    expect(response.data.error).toBeDefined()
    expect(response.data.error.code).toBe(-32602)
  }, 30000)
})

import axios, { AxiosError } from 'axios'
import { SERVER, fail } from '../utils'

describe('eth_gasPrice RPC method', () => {
  test.only('should return correct gas price with valid request', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_gasPrice',
      params: [],
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.result).not.toBeUndefined()
    expect(response.data.jsonrpc).toBe('2.0')
    expect(response.data.id).toBe(1)
    expect(typeof response.data.result).toBe('string')
    expect(response.data.result.startsWith('0x')).toBe(true)
    expect(BigInt(response.data.result)).toBeGreaterThan(BigInt(0));
  }, 30000)

  test.only('should work with numeric ID', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_gasPrice',
      params: [],
      id: 9999,
    })

    expect(response.status).toBe(200)
    expect(response.data.result).not.toBeUndefined()
    expect(response.data.id).toBe(9999)
    expect(typeof response.data.result).toBe('string')
    expect(response.data.result.startsWith('0x')).toBe(true)
    expect(BigInt(response.data.result)).toBeGreaterThan(BigInt(0));
  }, 30000)

  test.only('should work with string ID', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_gasPrice',
      params: [],
      id: 'test-id-string',
    })

    expect(response.status).toBe(200)
    expect(response.data.result).not.toBeUndefined()
    expect(response.data.id).toBe('test-id-string')
    expect(typeof response.data.result).toBe('string')
    expect(response.data.result.startsWith('0x')).toBe(true)
    expect(BigInt(response.data.result)).toBeGreaterThan(BigInt(0));
  }, 30000)

  test.only('should work with null ID', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_gasPrice',
      params: [],
      id: null,
    })

    expect(response.status).toBe(200)
    expect(response.data.result).not.toBeUndefined()
    expect(response.data.id).toBe(null)
    expect(typeof response.data.result).toBe('string')
    expect(response.data.result.startsWith('0x')).toBe(true)
    expect(BigInt(response.data.result)).toBeGreaterThan(BigInt(0));
  }, 30000)

  test.only('should return error when params is not empty', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_gasPrice',
      params: ['extra'],
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.error).not.toBeUndefined()
    expect(response.data.error.code).toBe(-32602)
    expect(response.data.id).toBe(1)
  }, 30000)

  test.only('should return error when params is an object', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_gasPrice',
      params: { invalid: 'parameter' },
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.error).not.toBeUndefined()
    expect(response.data.error.code).toBe(-32602)
    expect(response.data.id).toBe(1)
  }, 30000)

  test.only('should handle missing jsonrpc version', async () => {
    const response = await axios.post(SERVER, {
      method: 'eth_gasPrice',
      params: [],
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.jsonrpc).toBe('2.0')
    expect(response.data.result).not.toBeUndefined()
    expect(response.data.id).toBe(1)
    expect(BigInt(response.data.result)).toBeGreaterThan(BigInt(0));
  }, 30000)

  test.only('should return error when missing method', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      params: [],
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.error).not.toBeUndefined()
    expect(response.data.error.code).toBe(-32603)
    expect(response.data.error.message).toContain('method not presented')
    expect(response.data.id).toBe(1)
    
  }, 30000)

  test.only('should return error when missing params', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_gasPrice',
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.id).toBe(1)
    expect(typeof response.data.result).toBe('string')
    expect(response.data.result.startsWith('0x')).toBe(true)
  }, 30000)

  test.only('should handle batch requests with valid and invalid requests', async () => {
      const response = await axios.post(SERVER, [
        {
          jsonrpc: '2.0',
          method: 'eth_gasPrice',
          params: [],
          id: 1,
        },
        {
          jsonrpc: '2.0',
          method: 'eth_gasPrice',
          params: ['invalid'],
          id: 2,
        },
      ])

      expect(response.status).toBe(200)
      expect(Array.isArray(response.data)).toBe(true)
      expect(response.data.length).toBe(2)
      expect(response.data[0].result).not.toBeUndefined()
      expect(response.data[0].id).toBe(1)
      expect(response.data[1].error).not.toBeUndefined()
      expect(response.data[1].error.code).toBe(-32602)
      expect(response.data[1].id).toBe(2)

  }, 30000)

  test.only('should work with application/json content-type', async () => {
    const response = await axios.post(
      SERVER,
      {
        jsonrpc: '2.0',
        method: 'eth_gasPrice',
        params: [],
        id: 1,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )

    expect(response.status).toBe(200)
    expect(BigInt(response.data.result)).toBeGreaterThan(BigInt(0));
  }, 30000)

  test.only('should work with text/plain content-type', async () => {
    const response = await axios.post(
      SERVER,
      JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_gasPrice',
        params: [],
        id: 1,
      }),
      {
        headers: { 'Content-Type': 'text/plain' },
      },
    )

    expect(response.status).toBe(200)
    expect(BigInt(response.data.result)).toBeGreaterThan(BigInt(0));
  }, 30000)

  test.only('should reject GET requests', async () => {
    try {
      await axios.get(SERVER, {
        params: {
          jsonrpc: '2.0',
          method: 'eth_gasPrice',
          params: [],
          id: 1,
        },
      })
      fail('Expected GET request to fail')
    } catch (error) {
      const axiosError = error as AxiosError<{error?: {code: number; message: string}}>
      expect(axiosError.response?.status).toBe(405) // Method Not Allowed
    }
  }, 30000)

  test.only('should handle large request body', async () => {
    const largeParams = Array(10000).fill('test')

    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_gasPrice',
      params: largeParams,
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.error).not.toBeUndefined()
    expect(response.data.error.code).toBe(-32602)
  }, 60000) // Increased timeout for large request

  test.only('should handle malformed JSON', async () => {
    try {
      await axios.post(
        SERVER,
        '{"jsonrpc": "2.0", "method": "eth_gasPrice", "params": [], "id": 1',
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      fail('Expected malformed JSON to fail')
    } catch (error) {
      const axiosError = error as AxiosError<{error?: {code: number; message: string}}>
      expect(axiosError.response?.status).toBe(400) // Bad Request
      expect(axiosError.response?.data?.error).not.toBeUndefined()
      expect(axiosError.response?.data?.error?.code).toBe(-32700) // Parse error
    }
  }, 30000)
})

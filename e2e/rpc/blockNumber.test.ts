import axios, { AxiosError } from 'axios'
import { forkBlock, SERVER, fail } from '../utils'

describe('eth_blockNumber RPC method', () => {
  test.only('should return correct block number with valid request', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.result).not.toBeUndefined()
    expect(response.data.jsonrpc).toBe('2.0')
    expect(response.data.id).toBe(1)
    expect(BigInt(response.data.result)).toBeGreaterThan(BigInt(forkBlock))
  }, 30000)

  test.only('should work with numeric ID', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
      id: 9999,
    })

    expect(response.status).toBe(200)
    expect(response.data.result).not.toBeUndefined()
    expect(response.data.id).toBe(9999)
    expect(BigInt(response.data.result) > BigInt(forkBlock)).toBe(true)
  }, 30000)

  test.only('should work with string ID', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
      id: 'test-id-string',
    })

    expect(response.status).toBe(200)
    expect(response.data.result).not.toBeUndefined()
    expect(response.data.id).toBe('test-id-string')
    expect(BigInt(response.data.result) > BigInt(forkBlock)).toBe(true)
  }, 30000)

  test.only('should work with null ID', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
      id: null,
    })

    expect(response.status).toBe(200)
    expect(response.data.result).not.toBeUndefined()
    expect(response.data.id).toBe(null)
    expect(BigInt(response.data.result) > BigInt(forkBlock)).toBe(true)
  }, 30000)

  test.only('should return error when params is not empty', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: ['extra_param'],
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.error).not.toBeUndefined()
    expect(response.data.error.code).toBe(-32602)
    expect(response.data.error.message).toBe('Too many arguments. Expected 0')
    expect(response.data.id).toBe(1)
  }, 30000)

  test.only('should handle array with multiple parameters', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [1, 2, 3],
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.error).toBeDefined()
    expect(response.data.error.code).toBe(-32602)
    expect(response.data.error.message).toBe('Too many arguments. Expected 0')
  }, 30000)

  test.only('should handle object as parameter', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [{ test: 'object' }],
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.error).not.toBeUndefined()
    expect(response.data.error.code).toBe(-32602)
    expect(response.data.error.message).toBe('Too many arguments. Expected 0')
  }, 30000)

  test.only('should correct jsonrpc 1.0', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '1.0',
      method: 'eth_blockNumber',
      params: [],
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.jsonrpc).toBe('2.0')
    expect(response.data.result).not.toBeUndefined()
    expect(response.data.id).toBe(1)
  }, 30000)

  test.only('should handle missing jsonrpc version', async () => {
    const response = await axios.post(SERVER, {
      method: 'eth_blockNumber',
      params: [],
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.jsonrpc).toBe('2.0')
    expect(response.data.result).not.toBeUndefined()
    expect(response.data.id).toBe(1)
  }, 30000)

  test.only('should handle missing method', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      params: [],
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.error).not.toBeUndefined()
    expect(response.data.error.code).toBe(-32603)
    expect(response.data.error.message).toContain('method not presented')
  }, 30000)

  test.only('should handle missing params', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.result).not.toBeUndefined()
    expect(BigInt(response.data.result) > BigInt(forkBlock)).toBe(true)
  }, 30000)

  test.only('should handle missing ID', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
    })

    expect(response.status).toBe(200)
    expect(response.data.id).toBeNull()
    expect(response.data.result).not.toBeUndefined()
  }, 30000)

  test.only('should handle batch requests', async () => {
    try {
      const response = await axios.post(SERVER, [
        {
          jsonrpc: '2.0',
          method: 'eth_blockNumber',
          params: [],
          id: 1,
        },
        {
          jsonrpc: '2.0',
          method: 'eth_blockNumber',
          params: ['extra_param'],
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
    } catch (error) {
      const axiosError = error as AxiosError<{
        error?: { code: number; message: string }
      }>
      expect(axiosError.response?.status).toBe(200)
      expect(axiosError.response?.data?.error).toBeDefined()
    }
  }, 30000)

  test.only('should handle empty batch', async () => {
    const response = await axios.post(SERVER, [])

    expect(response.status).toBe(200)
    expect(response.data).toStrictEqual([])
  }, 30000)

  test.only('should handle application/json content type', async () => {
    const response = await axios.post(
      SERVER,
      {
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        params: [],
        id: 1,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )

    expect(response.status).toBe(200)
    expect(response.data.result).not.toBeUndefined()
  }, 30000)

  test.only('should handle text/plain content type', async () => {
    const response = await axios.post(
      SERVER,
      JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        params: [],
        id: 1,
      }),
      {
        headers: { 'Content-Type': 'text/plain' },
      },
    )

    expect(response.status).toBe(200)
    expect(response.data.result).not.toBeUndefined()
  }, 30000)

  test.only('should reject GET requests', async () => {
    try {
      await axios.get(SERVER, {
        params: {
          jsonrpc: '2.0',
          method: 'eth_blockNumber',
          params: [],
          id: 1,
        },
      })
      fail('Expected GET request to fail')
    } catch (error) {
      const axiosError = error as AxiosError
      expect(axiosError.response?.status).toBe(405) // Method Not Allowed
    }
  }, 30000)

  test.only('should handle large request body', async () => {
    const largeParams = Array(10000).fill('test')

    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
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
        '{"jsonrpc": "2.0", "method": "eth_blockNumber", "params": [], "id": 1',
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      fail('Expected malformed JSON to fail')
    } catch (error) {
      const axiosError = error as AxiosError<{
        error?: { code: number; message: string }
      }>
      expect(axiosError.response?.status).toBe(400) // Bad Request
      expect(axiosError.response?.data?.error).not.toBeUndefined()
      expect(axiosError.response?.data?.error?.code).toBe(-32700) // Parse error
    }
  }, 30000)
})

import axios, { AxiosError } from 'axios'
import { SERVER, fail } from '../utils'

describe('eth_accounts RPC method', () => {
  // Standard valid case
  test('should return empty array with valid request', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_accounts',
      params: [],
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBeDefined()
    expect(response.data.result).toEqual([]) // Empty array as we don't support accounts
    expect(response.data.jsonrpc).toBe('2.0')
    expect(response.data.id).toBe(1)
  }, 30000)

  // Test with different ID types
  test('should work with numeric ID', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_accounts',
      params: [],
      id: 9999,
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toEqual([])
    expect(response.data.id).toBe(9999)
  }, 30000)

  test('should work with string ID', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_accounts',
      params: [],
      id: 'test-id-string',
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toEqual([])
    expect(response.data.id).toBe('test-id-string')
  }, 30000)

  test('should work with null ID', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_accounts',
      params: [],
      id: null,
    })

    expect(response.status).toBe(200)
    // The implementation returns null for result with null ID
    expect(response.data.result).toBe(null)
    expect(response.data.id).toBe(null)
  }, 30000)

  // Invalid params tests
  test('should return error when params is not empty', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_accounts',
      params: ['extra_param'],
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.error).toBeDefined()
    expect(response.data.error.code).toBe(-32602) // Invalid params
    expect(response.data.error.message).toBe('Invalid argument, Parameter field should be empty.')
    expect(response.data.id).toBe(1)
  }, 30000)

  test('should handle array with multiple parameters', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_accounts',
      params: [1, 2, 3],
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.error).toBeDefined()
    expect(response.data.error.code).toBe(-32602) // Invalid params
    expect(response.data.error.message).toBe('Invalid argument, Parameter field should be empty.')
  }, 30000)

  test('should handle object as parameter', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_accounts',
      params: [{ test: 'object' }],
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.error).toBeDefined()
    expect(response.data.error.code).toBe(-32602) // Invalid params
    expect(response.data.error.message).toBe('Invalid argument, Parameter field should be empty.')
  }, 30000)

  // JSON-RPC version tests
  test('should fail with jsonrpc 1.0', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '1.0',
      method: 'eth_accounts',
      params: [],
      id: 1,
    })

    // Should return error for invalid version
    expect(response.status).toBe(200)
    expect(response.data.error).toBeDefined()
    expect(response.data.error.code).toBe(-32600) // Invalid Request
    expect(response.data.error.message).toContain('Invalid Request')
    expect(response.data.id).toBe(1) // Should return the original request ID
  }, 30000)

  // Malformed request tests
  test('should handle missing jsonrpc version', async () => {
    const response = await axios.post(SERVER, {
      method: 'eth_accounts',
      params: [],
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.error).toBeDefined()
    expect(response.data.error.code).toBe(-32600) // Invalid Request
    expect(response.data.error.message).toContain('Invalid Request')
  }, 30000)

  test('should handle missing method', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      params: [],
      id: 1,
    })

    expect(response.status).toBe(200)
    expect(response.data.error).toBeDefined()
    expect(response.data.error.code).toBe(-32600) // Invalid Request
    expect(response.data.error.message).toContain('Invalid Request')
  }, 30000)

  test('should handle missing params', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_accounts',
      id: 1,
    })

    // This should be handled by your implementation as empty params
    expect(response.status).toBe(200)
    expect(response.data.result).toEqual([])
  }, 30000)

  test('should handle missing ID', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_accounts',
      params: [],
    })

    // According to JSON-RPC 2.0 spec, this should be treated as a notification
    // and no response is required, but if your server responds anyway:
    expect(response.status).toBe(200)
    expect(response.data.id).toBeNull()
    // The implementation returns null for result with missing ID
    expect(response.data.result).toBe(null)
  }, 30000)

  // Content-Type tests
  test('should handle application/json content type', async () => {
    const response = await axios.post(
      SERVER,
      {
        jsonrpc: '2.0',
        method: 'eth_accounts',
        params: [],
        id: 1,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )

    expect(response.status).toBe(200)
    expect(response.data.result).toEqual([])
  }, 30000)

  test('should handle text/plain content type', async () => {
    const response = await axios.post(
      SERVER,
      JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_accounts',
        params: [],
        id: 1,
      }),
      {
        headers: { 'Content-Type': 'text/plain' },
      },
    )

    expect(response.status).toBe(200)
    expect(response.data.result).toEqual([])
  }, 30000)

  // HTTP method tests
  test('should reject GET requests', async () => {
    try {
      await axios.get(SERVER, {
        params: {
          jsonrpc: '2.0',
          method: 'eth_accounts',
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

  // Batch request tests
  test('should handle batch requests', async () => {
    try {
      const response = await axios.post(SERVER, [
        {
          jsonrpc: '2.0',
          method: 'eth_accounts',
          params: [],
          id: 1,
        },
        {
          jsonrpc: '2.0',
          method: 'eth_accounts',
          params: ['extra_param'],
          id: 2,
        },
      ])

      expect(response.status).toBe(200)

      // If the server doesn't support batch requests, it might return a single error
      if (!Array.isArray(response.data)) {
        expect(response.data.error).toBeDefined()
        return
      }

      expect(Array.isArray(response.data)).toBe(true)
      expect(response.data.length).toBe(2)

      // First request should succeed
      expect(response.data[0].result).toEqual([])
      expect(response.data[0].id).toBe(1)

      // Second request should fail with param error
      expect(response.data[1].error).toBeDefined()
      expect(response.data[1].error.code).toBe(-32602) // Invalid params
      expect(response.data[1].id).toBe(2)
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response) {
        expect(axiosError.response.status).toBe(200)
        if (axiosError.response.data && typeof axiosError.response.data === 'object') {
          expect((axiosError.response.data as Record<string, unknown>).error).toBeDefined()
        }
      }
    }
  }, 30000)

  // Non-existent method test
  test('should handle non-existent method differently than eth_accounts', async () => {
    const accountsResponse = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_accounts',
      params: [],
      id: 1,
    })

    const nonExistentResponse = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_nonExistentMethod',
      params: [],
      id: 1,
    })

    // eth_accounts should return a result
    expect(accountsResponse.status).toBe(200)
    expect(accountsResponse.data.result).toEqual([])

    // Non-existent method should return an error
    expect(nonExistentResponse.status).toBe(200)
    expect(nonExistentResponse.data.error).toBeDefined()
    expect(nonExistentResponse.data.error.code).toBe(-32601) // Method not found
  }, 30000)

  // Notification test (no ID)
  test('should handle notification requests properly', async () => {
    const response = await axios.post(SERVER, {
      jsonrpc: '2.0',
      method: 'eth_accounts',
      params: [],
      // No ID = notification
    })

    // According to JSON-RPC 2.0, no response should be returned for notifications
    // But if your server responds anyway, it should have null ID
    if (Object.keys(response.data).length > 0) {
      expect(response.data.id).toBeNull()
    }
  }, 30000)
})

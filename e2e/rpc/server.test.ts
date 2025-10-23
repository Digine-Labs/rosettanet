import axios, { AxiosError } from 'axios'
import { SERVER, fail } from '../utils'

// These tests verify that the server remains stable when receiving malformed requests
// The server should return appropriate errors but should not crash
describe('Server robustness tests', () => {
  // Skip all tests if server is not running
  beforeAll(async () => {
    try {
      await axios.post(
        SERVER,
        {
          jsonrpc: '2.0',
          method: 'eth_chainId',
          params: [],
          id: 1,
        },
        { timeout: 2000 },
      )
    } catch {
      // Skip all tests in this suite
      fail('server is not working')
    }
  })

  // Helper function to check if server is running
  const isServerRunning = async (): Promise<boolean> => {
    try {
      await axios.post(
        SERVER,
        {
          jsonrpc: '2.0',
          method: 'eth_chainId',
          params: [],
          id: 1,
        },
        { timeout: 2000 },
      )
      return true
    } catch (error) {
      const axiosError = error as AxiosError
      // If we get a response with any status code, the server is running
      const isRunning = axiosError.response !== undefined

      if (!isRunning) {
        fail('Server is not working')
      }
      return isRunning
    }
  }
  // Test for malformed JSON
  test.only('should handle malformed JSON without crashing', async () => {
    // Skip test if server is not running
    const serverRunning = await isServerRunning()
    if (!serverRunning) {
      return
    }

    try {
      await axios.post(
        SERVER,
        '{jsonrpc:"2.0",method:"eth_chainId",params:[],id:1}', // Malformed JSON (missing quotes)
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      fail('Expected request to fail')
    } catch (error) {
      const axiosError = error as AxiosError
      // Server should respond with an error, not crash
      expect(axiosError.response).toBeDefined()
      if (axiosError.response) {
        expect(axiosError.response.status).toBe(400)
        expect(axiosError.response.data).toHaveProperty('error')
      }
    }

    // Verify server is still running after the test
    const serverStillRunning = await isServerRunning()
    expect(serverStillRunning).toBe(true)
  }, 30000)

  // Test for extremely large request body
  test.only('should handle extremely large request body', async () => {
    // Skip test if server is not running
    const serverRunning = await isServerRunning()
    if (!serverRunning) {
      return
    }

    // Create a large params array (10MB+)
    const largeParams = Array(1000000).fill('test')

    try {
      await axios.post(SERVER, {
        jsonrpc: '2.0',
        method: 'eth_chainId',
        params: largeParams,
        id: 1,
      })
      fail('Expected request to fail due to size')
    } catch (error) {
      const axiosError = error as AxiosError
      // Server should respond with an error, not crash
      expect(axiosError.response || axiosError.request).toBeDefined()
    }

    // Verify server is still running after the test
    const serverStillRunning = await isServerRunning()
    expect(serverStillRunning).toBe(true)
  }, 30000)

  // Test for multiple rapid requests
  test.only('should handle multiple rapid requests without crashing', async () => {
    // Skip test if server is not running
    const serverRunning = await isServerRunning()
    if (!serverRunning) {
      return
    }

    const requests: Promise<unknown>[] = []
    // Send 50 requests in parallel (reduced from 100 to avoid overwhelming the server)
    for (let i = 0; i < 50; i++) {
      requests.push(
        axios
          .post(SERVER, {
            jsonrpc: '2.0',
            method: 'eth_chainId',
            params: [],
            id: i,
          })
          .catch(error => {
            // Catch errors to prevent test from failing if some requests fail
            return { status: 'rejected', reason: error }
          }),
      )
    }

    await Promise.all(requests)

    // Verify server is still running after the test
    const serverStillRunning = await isServerRunning()
    expect(serverStillRunning).toBe(true)
  }, 60000)

  // Test for invalid content type
  test.only('should handle invalid content type without crashing', async () => {
    // Skip test if server is not running
    const serverRunning = await isServerRunning()
    if (!serverRunning) {
      return
    }

    try {
      await axios.post(
        SERVER,
        {
          jsonrpc: '2.0',
          method: 'eth_chainId',
          params: [],
          id: 1,
        },
        {
          headers: {
            'Content-Type': 'application/xml', // Invalid content type
          },
        },
      )
    } catch (error) {
      // Expected to fail, but server should not crash
      const axiosError = error as AxiosError
      expect(axiosError.response || axiosError.request).toBeDefined()
    }

    // Verify server is still running after the test
    const serverStillRunning = await isServerRunning()
    expect(serverStillRunning).toBe(true)
  }, 30000)

  // Test for extremely long method name
  test.only('should handle extremely long method name', async () => {
    // Skip test if server is not running
    const serverRunning = await isServerRunning()
    if (!serverRunning) {
      return
    }

    // Create a method name that's 10,000 characters long
    const longMethodName = 'a'.repeat(10000)

    try {
      const response = await axios.post(SERVER, {
        jsonrpc: '2.0',
        method: longMethodName,
        params: [],
        id: 1,
      })

      expect(response.status).toBe(200)
      expect(response.data.error).toBeDefined()
      expect(response.data.error.code).toBe(-32601) // Method not found
    } catch (error) {
      // If connection fails, that's okay - we're testing server stability
      const axiosError = error as AxiosError
      expect(axiosError.request).toBeDefined()
    }

    // Verify server is still running after the test
    const serverStillRunning = await isServerRunning()
    expect(serverStillRunning).toBe(true)
  }, 30000)

  // Test for nested JSON objects
  test.only('should handle deeply nested JSON objects', async () => {
    // Skip test if server is not running
    const serverRunning = await isServerRunning()
    if (!serverRunning) {
      return
    }

    // Create a deeply nested object (100 levels)
    let nestedObject: Record<string, unknown> = { value: 1 }
    for (let i = 0; i < 100; i++) {
      nestedObject = { nested: nestedObject }
    }

    try {
      const response = await axios.post(SERVER, {
        jsonrpc: '2.0',
        method: 'eth_chainId',
        params: [nestedObject],
        id: 1,
      })

      expect(response.status).toBe(200)
      // The server should either handle it or return an error, but not crash
    } catch (error) {
      // If connection fails, that's okay - we're testing server stability
      const axiosError = error as AxiosError
      expect(axiosError.request).toBeDefined()
    }

    // Verify server is still running after the test
    const serverStillRunning = await isServerRunning()
    expect(serverStillRunning).toBe(true)
  }, 30000)

  // Test for special characters in parameters
  test.only('should handle special characters in parameters', async () => {
    // Skip test if server is not running
    const serverRunning = await isServerRunning()
    if (!serverRunning) {
      return
    }

    const specialChars = '!@#$%^&*()_+{}|:"<>?~`-=[]\\;\',./😀🔥💯'

    try {
      const response = await axios.post(SERVER, {
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [specialChars, 'latest'],
        id: 1,
      })

      expect(response.status).toBe(200)
      expect(response.data.error).toBeDefined() // Should return an error for invalid address
    } catch (error) {
      // If connection fails, that's okay - we're testing server stability
      const axiosError = error as AxiosError
      expect(axiosError.request).toBeDefined()
    }

    // Verify server is still running after the test
    const serverStillRunning = await isServerRunning()
    expect(serverStillRunning).toBe(true)
  }, 30000)

  // Test for null values in unexpected places
  test.only('should handle null values in unexpected places', async () => {
    // Skip test if server is not running
    const serverRunning = await isServerRunning()
    if (!serverRunning) {
      return
    }

    try {
      const response = await axios.post(SERVER, {
        jsonrpc: null,
        method: null,
        params: null,
        id: null,
      })

      expect(response.status).toBe(200)
      expect(response.data.error).toBeDefined() // Should return an error
    } catch (error) {
      // If connection fails, that's okay - we're testing server stability
      const axiosError = error as AxiosError
      expect(axiosError.request).toBeDefined()
    }

    // Verify server is still running after the test
    const serverStillRunning = await isServerRunning()
    expect(serverStillRunning).toBe(true)
  }, 30000)

  // Test for empty request body
  test.only('should handle empty request body', async () => {
    // Skip test if server is not running
    const serverRunning = await isServerRunning()
    if (!serverRunning) {
      return
    }

    try {
      await axios.post(SERVER, '', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      // If connection fails, that's okay - we're testing server stability
      const axiosError = error as AxiosError
      expect(axiosError.request).toBeDefined()
    }

    // Verify server is still running after the test
    const serverStillRunning = await isServerRunning()
    expect(serverStillRunning).toBe(true)
  }, 30000)

  // Test for extremely long request
  test.only('should handle extremely long request URL', async () => {
    // Skip test if server is not running
    const serverRunning = await isServerRunning()
    if (!serverRunning) {
      return
    }

    try {
      // Create a URL with a very long query string
      const longQueryParam = 'a'.repeat(10000)
      await axios.get(`${SERVER}?param=${longQueryParam}`)
    } catch (error) {
      // If connection fails, that's okay - we're testing server stability
      const axiosError = error as AxiosError
      expect(axiosError.request).toBeDefined()
    }

    // Verify server is still running after the test
    const serverStillRunning = await isServerRunning()
    expect(serverStillRunning).toBe(true)
  }, 30000)
})

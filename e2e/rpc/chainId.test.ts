import axios from "axios";
import { SERVER } from "../utils";

describe('eth_chainId RPC method', () => {
    // Standard valid case
    test.only('should return correct chain ID with valid request', async () => {
      const response = await axios.post(SERVER, {
        jsonrpc: '2.0',
        method: 'eth_chainId',
        params: [],
        id: 1,
      });
      
      expect(response.status).toBe(200);
      expect(response.data.result).toBeDefined();
      expect(response.data.result).toBe('0x52535453');
      expect(response.data.jsonrpc).toBe('2.0');
      expect(response.data.id).toBe(1);
    }, 30000);
  
    // Test with different ID types
    test.only('should work with numeric ID', async () => {
      const response = await axios.post(SERVER, {
        jsonrpc: '2.0',
        method: 'eth_chainId',
        params: [],
        id: 9999,
      });
      
      expect(response.status).toBe(200);
      expect(response.data.result).toBe('0x52535453');
      expect(response.data.id).toBe(9999);
    }, 30000);
  
    test.only('should work with string ID', async () => {
      const response = await axios.post(SERVER, {
        jsonrpc: '2.0',
        method: 'eth_chainId',
        params: [],
        id: 'test-id-string',
      });
      
      expect(response.status).toBe(200);
      expect(response.data.result).toBe('0x52535453');
      expect(response.data.id).toBe('test-id-string');
    }, 30000);
  
    test.only('should work with null ID', async () => {
      const response = await axios.post(SERVER, {
        jsonrpc: '2.0',
        method: 'eth_chainId',
        params: [],
        id: null,
      });
      
      expect(response.status).toBe(200);
      expect(response.data.result).toBe('0x52535453');
      expect(response.data.id).toBe(null);
    }, 30000);
  
    // Invalid params tests
    test.only('should return error when params is not empty', async () => {
      const response = await axios.post(SERVER, {
        jsonrpc: '2.0',
        method: 'eth_chainId',
        params: ['extra_param'],
        id: 1,
      });
      
      expect(response.status).toBe(200);
      expect(response.data.error).not.toBeUndefined();
      expect(response.data.error.code).toBe(-32602);
      expect(response.data.error.message).toBe('Too many arguments. Expected 0');
      expect(response.data.id).toBe(1);
    }, 30000);
  
    test.only('should handle array with multiple parameters', async () => {
      const response = await axios.post(SERVER, {
        jsonrpc: '2.0',
        method: 'eth_chainId',
        params: [1, 2, 3],
        id: 1,
      });
      
      expect(response.status).toBe(200);
      expect(response.data.error).toBeDefined();
      expect(response.data.error.code).toBe(-32602);
      expect(response.data.error.message).toBe('Too many arguments. Expected 0');
    }, 30000);
  
    test.only('should handle object as parameter', async () => {
      const response = await axios.post(SERVER, {
        jsonrpc: '2.0',
        method: 'eth_chainId',
        params: [{ test: 'object' }],
        id: 1,
      });
      
      expect(response.status).toBe(200);
      expect(response.data.error).not.toBeUndefined();
      expect(response.data.error.code).toBe(-32602);
      expect(response.data.error.message).toBe('Too many arguments. Expected 0');
    }, 30000);
  
    // JSON-RPC version tests
    test.only('should fail with jsonrpc 1.0', async () => {
      const response = await axios.post(SERVER, {
        jsonrpc: '1.0',
        method: 'eth_chainId',
        params: [],
        id: 1,
      });
      
      // Should return error for invalid version
      expect(response.status).toBe(200);
      expect(response.data.error).not.toBeUndefined();
      expect(response.data.error.code).toBe(-32600); // Invalid Request
      expect(response.data.error.message).toContain('Invalid Request');
      expect(response.data.id).toBe(1); // Should return the original request ID
    }, 30000);
  
    // Malformed request tests
    test.only('should handle missing jsonrpc version', async () => {
      const response = await axios.post(SERVER, {
        method: 'eth_chainId',
        params: [],
        id: 1,
      });
      
      expect(response.status).toBe(200);
      // Appropriate error response based on your error handling
      expect(response.data.error).not.toBeUndefined();
      expect(response.data.error.code).toBe(-32600);
      expect(response.data.error.message).toContain('Invalid request');
    }, 30000);
  
    test.only('should handle missing method', async () => {
      const response = await axios.post(SERVER, {
        jsonrpc: '2.0',
        params: [],
        id: 1,
      });
      
      expect(response.status).toBe(200);
      expect(response.data.error).not.toBeUndefined();
      expect(response.data.error.code).toBe(-32600);
      expect(response.data.error.message).toContain('Invalid request');
    }, 30000);
  
    test.only('should handle missing params', async () => {
      const response = await axios.post(SERVER, {
        jsonrpc: '2.0',
        method: 'eth_chainId',
        id: 1,
      });
      
      // This should be handled by your implementation as empty params
      expect(response.status).toBe(200);
      expect(response.data.result).toBe('0x52535453');
    }, 30000);
  
    test.only('should handle missing ID', async () => {
      const response = await axios.post(SERVER, {
        jsonrpc: '2.0',
        method: 'eth_chainId',
        params: [],
      });
      
      // According to JSON-RPC 2.0 spec, this should be treated as a notification
      // and no response is required, but if your server responds anyway:
      expect(response.status).toBe(200);
      expect(response.data.id).toBeNull();
      expect(response.data.result).toBe('0x52535453');
    }, 30000);
  
    // Batch request tests
    test.only('should handle batch requests', async () => {
      const response = await axios.post(SERVER, [
        {
          jsonrpc: '2.0',
          method: 'eth_chainId',
          params: [],
          id: 1,
        },
        {
          jsonrpc: '2.0',
          method: 'eth_chainId',
          params: ['extra_param'],
          id: 2,
        }
      ]);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.length).toBe(2);
      
      // First request should succeed
      expect(response.data[0].result).toBe('0x52535453');
      expect(response.data[0].id).toBe(1);
      
      // Second request should fail with param error
      expect(response.data[1].error).not.toBeUndefined();
      expect(response.data[1].error.code).toBe(-32602);
      expect(response.data[1].id).toBe(2);
    }, 30000);
  
    test.only('should handle empty batch', async () => {
      const response = await axios.post(SERVER, []);
      
      expect(response.status).toBe(200);
      expect(response.data.error).not.toBeUndefined();
      expect(response.data.error.code).toBe(-32600);
      expect(response.data.error.message).toContain('Invalid request');
    }, 30000);
  
    // Content-Type tests
    test.only('should handle application/json content type', async () => {
      const response = await axios.post(
        SERVER, 
        {
          jsonrpc: '2.0',
          method: 'eth_chainId',
          params: [],
          id: 1,
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      
      expect(response.status).toBe(200);
      expect(response.data.result).toBe('0x52535453');
    }, 30000);
  
    test.only('should handle text/plain content type', async () => {
      const response = await axios.post(
        SERVER, 
        JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_chainId',
          params: [],
          id: 1,
        }),
        {
          headers: { 'Content-Type': 'text/plain' }
        }
      );
      
      expect(response.status).toBe(200);
      expect(response.data.result).toBe('0x52535453');
    }, 30000);
  
    // HTTP method tests
    test.only('should reject GET requests', async () => {
      try {
        await axios.get(SERVER, {
          params: {
            jsonrpc: '2.0',
            method: 'eth_chainId',
            params: [],
            id: 1,
          }
        });
        fail('Expected GET request to fail');
      } catch (error) {
        expect(error.response.status).toBe(405); // Method Not Allowed
      }
    }, 30000);
  
    // Stress test with large/malformed data
    test.only('should handle large request body', async () => {
      // Create a large params array
      const largeParams = Array(10000).fill('test');
      
      const response = await axios.post(SERVER, {
        jsonrpc: '2.0',
        method: 'eth_chainId',
        params: largeParams,
        id: 1,
      });
      
      expect(response.status).toBe(200);
      expect(response.data.error).not.toBeUndefined();
      expect(response.data.error.code).toBe(-32602);
    }, 60000); // Increased timeout for large request
  
    test.only('should handle malformed JSON', async () => {
      try {
        await axios.post(
          SERVER,
          '{"jsonrpc": "2.0", "method": "eth_chainId", "params": [], "id": 1',
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
        fail('Expected malformed JSON to fail');
      } catch (error) {
        expect(error.response.status).toBe(400); // Bad Request
        expect(error.response.data.error).not.toBeUndefined();
        expect(error.response.data.error.code).toBe(-32700); // Parse error
      }
    }, 30000);
  
    // Non-existent method test
    test.only('should handle non-existent method', async () => {
      const response = await axios.post(SERVER, {
        jsonrpc: '2.0',
        method: 'eth_nonExistentMethod',
        params: [],
        id: 1,
      });
      
      expect(response.status).toBe(200);
      expect(response.data.error).not.toBeUndefined();
      expect(response.data.error.code).toBe(-32601); // Method not found
    }, 30000);
  
    // Notification test (no ID)
    test.only('should handle notification requests properly', async () => {
      const response = await axios.post(SERVER, {
        jsonrpc: '2.0',
        method: 'eth_chainId',
        params: []
        // No ID = notification
      });
      
      // According to JSON-RPC 2.0, no response should be returned for notifications
      // But if your server responds anyway, it should have null ID
      if (Object.keys(response.data).length > 0) {
        expect(response.data.id).toBeNull();
      }
    }, 30000);
  });
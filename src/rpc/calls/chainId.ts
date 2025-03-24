import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { getConfigurationProperty } from '../../utils/configReader'

export async function chainIdHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  // Validate params - must be an empty array for eth_chainId
  if (!Array.isArray(request.params)) {
    return {
      jsonrpc: '2.0',
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid params',
      },
    }
  }
  
  if (request.params.length !== 0) {
    return {
      jsonrpc: '2.0',
      id: request.id,
      error: {
        code: -32602,
        message: 'Too many arguments. Expected 0',
      },
    }
  }

  // Get chainId from configuration
  const chainId = getConfigurationProperty('chainId')
  
  // Return successful response (always use jsonrpc 2.0 in the response)
  return {
    jsonrpc: '2.0',
    id: request.id,
    result: chainId,
  }
}

import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { getConfigurationProperty } from '../../utils/configReader'

export async function chainIdHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  if (request.params.length != 0) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter field should be empty.',
      },
    }
  }

  const chainId = getConfigurationProperty('chainId')
  return {
    jsonrpc: '2.0',
    id: request.id,
    result: chainId,
  }
}

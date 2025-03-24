import {
  NativeBalance,
  RPCError,
  RPCRequest,
  RPCResponse,
  StarknetRPCError,
} from '../../types/types'
import { getSTRKBalance } from '../../utils/callHelper'
import { validateEthAddress } from '../../utils/validations'
import { getSnAddressWithFallback } from '../../utils/wrapper'
import { isStarknetRPCError } from '../../types/typeGuards'
import { getCachedBlockNumber } from '../../cache/blockNumber'

export async function getBalanceHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  // Handle both array and object format params
  let ethAddress: string;
  let blockParameter: string = 'latest'; // Default to latest
  
  if (Array.isArray(request.params)) {
    if (request.params.length == 0) {
      return {
        jsonrpc: '2.0',
        id: request.id,
        error: {
          code: -32602,
          message:
            'Invalid argument, Parameter should be a valid Ethereum Address and block parameter.',
        },
      }
    }
    ethAddress = request.params[0] as string;
    
    // Get block parameter if provided
    if (request.params.length > 1) {
      blockParameter = request.params[1] as string;
    }
  } else if (typeof request.params === 'object' && request.params !== null) {
    // Handle object format params
    ethAddress = (request.params as Record<string, unknown>).address as string;
    if (!ethAddress) {
      return {
        jsonrpc: '2.0',
        id: request.id,
        error: {
          code: -32602,
          message: 'Invalid params: missing address parameter',
        },
      }
    }
    
    // Get block parameter if provided
    const objParams = request.params as Record<string, unknown>;
    if (objParams.blockParameter) {
      blockParameter = objParams.blockParameter as string;
    }
  } else {
    return {
      jsonrpc: '2.0',
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid params',
      },
    }
  }
  
  // Validate Ethereum address
  if (!validateEthAddress(ethAddress)) {
    return {
      jsonrpc: '2.0',
      id: request.id,
      error: {
        code: -32602,
        message:
          'Invalid argument, Parameter should be a valid Ethereum Address.',
      },
    }
  }
  
  // Validate block parameter
  if (typeof blockParameter === 'string') {
    // Check if it's a valid string specifier
    if (blockParameter !== 'latest' && 
        blockParameter !== 'pending' && 
        blockParameter !== 'earliest' &&
        blockParameter !== 'safe' &&
        blockParameter !== 'finalized') {
      
      // Check if it's a valid hex block number
      if (blockParameter.startsWith('0x')) {
        try {
          const blockNumber = parseInt(blockParameter, 16);
          const cachedBlockNumber = parseInt(getCachedBlockNumber(), 16);
          
          // Check if block number is higher than cached block
          if (blockNumber > cachedBlockNumber) {
            return {
              jsonrpc: '2.0',
              id: request.id,
              error: {
                code: -32000,
                message: 'header not found',
              },
            }
          }
        } catch (e) {
          return {
            jsonrpc: '2.0',
            id: request.id,
            error: {
              code: -32602,
              message: 'Invalid block parameter',
            },
          }
        }
      } else {
        // Not a valid string specifier or hex block number
        return {
          jsonrpc: '2.0',
          id: request.id,
          error: {
            code: -32602,
            message: 'Invalid block parameter',
          },
        }
      }
    }
  } else if (blockParameter !== undefined) {
    // Block parameter is not a string
    return {
      jsonrpc: '2.0',
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid block parameter',
      },
    }
  }

  const snAddress: string | StarknetRPCError =
    await getSnAddressWithFallback(ethAddress)
  if (isStarknetRPCError(snAddress)) {
    if (snAddress.code == -32700) {
      return {
        jsonrpc: '2.0',
        id: request.id,
        result: '0x0',
      }
    }
    return <RPCError>{
      jsonrpc: '2.0',
      id: request.id,
      error: snAddress,
    }
  }

  const balance: NativeBalance | StarknetRPCError =
    await getSTRKBalance(snAddress)

  if (isStarknetRPCError(balance)) {
    return <RPCError>{
      jsonrpc: '2.0',
      id: request.id,
      error: balance,
    }
  }

  return {
    jsonrpc: '2.0',
    id: request.id,
    result: balance.ethereumFormat,
  }
}

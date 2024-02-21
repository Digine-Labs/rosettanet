import { getRpc } from './getRpc'
import { RPCError, RPCRequest, RPCResponse } from '../types/types'
import axios from 'axios'

export async function callStarknet(
  network: string,
  request: RPCRequest,
): Promise<RPCResponse | string> {
  try {
    const rpcUrl: string = getRpc(network)
    const { data } = await axios.post<RPCResponse>(
      rpcUrl,
      JSON.stringify(request),
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message
    } else {
      return 'An unexpected error occurred'
    }
  }
}

export async function forwardRequest(
  request: RPCRequest,
  method: string,
  params: any[]
): Promise<RPCResponse | RPCError> {
  // TODO: dynamic network from env?
  const network = 'testnet'
  const response: RPCResponse | string = await callStarknet(network, {
    jsonrpc: request.jsonrpc,
    method,
    params,
    id: request.id,
  })

  if (typeof response === 'string') {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: response,
    }
  }

  return {
    jsonrpc: '2.0',
    id: 1,
    result: response.result,
  }
}

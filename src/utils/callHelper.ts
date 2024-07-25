import { getRpc } from './getRpc'
import { RPCRequest, RPCResponse } from '../types/types'
import axios from 'axios'

interface EstimateFeeRequest {
  jsonrpc: string
  method: string
  params: {
    request: Array<object>
    block_id: string
    simulation_flags: Array<string>
  }
  id: number
}

export async function callStarknet(
  network: string,
  request: RPCRequest | EstimateFeeRequest,
): Promise<RPCResponse | string> {
  try {
    const rpcUrl: string = getRpc()
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

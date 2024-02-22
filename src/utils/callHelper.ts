import { getRpc } from './getRpc'
import { RPCRequest, RPCResponse, RPCError } from '../types/types'
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

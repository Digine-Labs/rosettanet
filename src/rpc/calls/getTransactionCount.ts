import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { validateEthAddress } from '../../utils/validations'
import { getSnAddressFromEthAddress } from '../../utils/wrapper'

export async function getTransactionCountHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  const network = 'mainnet'
  const method = 'starknet_getNonce'

  if (request.params.length == 0) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'params should not be empty',
    }
  }

  const ethAddress = request.params[0] as string
  if (!validateEthAddress(ethAddress)) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'invalid eth address',
    }
  }

  const snAddress = await getSnAddressFromEthAddress(ethAddress)

  const response: RPCResponse | string = await callStarknet(network, {
    jsonrpc: request.jsonrpc,
    method: method,
    params: ['latest', snAddress],
    id: request.id,
  })

  if (!response || typeof response === 'string') {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: response || 'No response from StarkNet',
    }
  }

  return {
    jsonrpc: '2.0',
    id: request.id,
    result: response.result,
  }
}

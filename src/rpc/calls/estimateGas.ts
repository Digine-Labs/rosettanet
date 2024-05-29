import { RPCError, RPCResponse, RPCRequest } from '../../types/types'
import { getSnAddressFromEthAddress } from '../../utils/wrapper'
import { callStarknet } from '../../utils/callHelper'
import { validateEthAddress } from '../../utils/validations'

interface ParameterObject {
  from?: string
  to: string
  gas?: string
  gasPrice?: string
  value?: string
  data?: string
}

export async function estimateGasHandler(
  call: RPCRequest,
): Promise<RPCResponse | RPCError> {
  const network = 'mainnet'
  const method = 'starknet_estimateFee'

  const parameters: ParameterObject = call.params[0] as ParameterObject

  const ethAddress = parameters.from as string

  if (!validateEthAddress(ethAddress)) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'invalid eth address',
    }
  }

  const snAddress = await getSnAddressFromEthAddress(ethAddress)

  const getSnNonce: RPCResponse | string = await callStarknet(network, {
    jsonrpc: call.jsonrpc,
    method: 'starknet_getNonce',
    params: ['latest', snAddress],
    id: call.id,
  })

  if (typeof getSnNonce === 'string') {
    return {
      code: 7979,
      message: 'Starknet RPC error, getNonce',
      data: getSnNonce,
    }
  }

  const snNonce = getSnNonce.result

  const response: RPCResponse | string = await callStarknet(network, {
    jsonrpc: call.jsonrpc,
    method: method,
    params: {
      request: [
        {
          type: 'INVOKE',
          max_fee: '0x28ed6103d0000',
          version: '0x1',
          signature: ['0x0', '0x0'],
          sender_address: snAddress,
          calldata: [],
          nonce: snNonce,
        },
      ],
      block_id: 'latest',
      simulation_flags: ['SKIP_VALIDATE'],
    },
    id: call.id,
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

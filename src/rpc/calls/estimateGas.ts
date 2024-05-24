import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { getSnAddressFromEthAddress } from '../../utils/wrapper'
import { validateEthAddress } from '../../utils/validations'

interface CallParameterObject {
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

  const parameters: CallParameterObject = call.params[0] as CallParameterObject

  const ethAddress = parameters.from as string

  if (!validateEthAddress(ethAddress)) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'invalid eth address',
    }
  }

  const snAddress = await getSnAddressFromEthAddress(ethAddress)

  const response: RPCResponse | string = await callStarknet(network, {
    jsonrpc: call.jsonrpc,
    method: method,
    params: [
      {
        request: [
          {
            type: 'INVOKE',
            max_fee: '0xb3a2f1ab6d632',
            version: '0x1',
            signature: [
              '0x54c2201c7b9021777389e208e28eafc67e4ba1f1aa7016a1123b61c6ff79c29',
              '0x58c2d97614e5abfd9668b314f344c945d16ea154cb32a7b08b4445204f1f1d3',
            ],
            sender_address: snAddress,
            calldata: [],
            nonce: '0x51',
          },
        ],
        block_id: call.params[1],
      },
    ],
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

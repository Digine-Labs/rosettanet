import { isStarknetRPCError } from '../../types/typeGuards'
import {
  RPCError,
  RPCRequest,
  RPCResponse,
  StarknetRPCError,
} from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { getFunctionSelectorFromCalldata } from '../../utils/calldata'
import { validateEthAddress } from '../../utils/validations'
import { getSnAddressWithFallback } from '../../utils/wrapper'
import {
  decodeMulticallCalldata,
  decodeMulticallFeatureCalldata,
} from '../../utils/calldata'

interface EthCallParameters {
  from?: string
  to: string
  gas?: string | number | bigint
  gasPrice?: string | number | bigint
  maxFeePerGas?: string | number | bigint
  maxPriorityFeePerGas?: string | number | bigint
  value?: string | number | bigint
  data?: string
  blockNumber?: string | number | bigint
  type?: string
}

function isEthCallParameters(value: unknown): value is EthCallParameters {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const obj = value as Record<string, unknown>

  // Check required 'to' field
  if (typeof obj.to !== 'string') {
    return false
  }

  // Check optional 'from' field
  if (obj.from !== undefined && typeof obj.from !== 'string') {
    return false
  }

  // Check optional 'data' field
  if (obj.data !== undefined && typeof obj.data !== 'string') {
    return false
  }

  // Check optional 'value' field
  if (
    obj.value !== undefined &&
    typeof obj.value !== 'string' &&
    typeof obj.value !== 'number' &&
    typeof obj.value !== 'bigint'
  ) {
    return false
  }

  // Check optional 'type' field
  if (obj.type !== undefined && typeof obj.type !== 'string') {
    return false
  }

  return true
}

export async function estimateGasHandlerOld(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  try {
    return <RPCResponse>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: '0x5208',
    }
  } catch (ex) {
    return <RPCResponse>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: '0x5208',
    }
  }
}

export async function estimateGasHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  const parameters = request.params[0]
  if (Array.isArray(request.params) && !isEthCallParameters(parameters)) {
    return <RPCError>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message:
          'Invalid argument, Parameter should be Ethereum Call Parameters.',
      },
    }
  }

  if (!validateEthAddress(parameters.to)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, "to" field is not valid Ethereum address',
      },
    }
  }

  if (parameters.from && !validateEthAddress(parameters.from)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, "from" field is not valid Ethereum address',
      },
    }
  }

  const calldata = parameters.data ?? null
  const targetFunctionSelector: string | null =
    getFunctionSelectorFromCalldata(calldata)

  //! calldata olmadan sadece value gönderilirse 0x5208 döndür fakat değişmesi lazım TODO
  if (
    targetFunctionSelector == null ||
    typeof calldata === 'undefined' ||
    calldata == null
  ) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: '0x5208',
    }
  }

  const senderAddress: string | StarknetRPCError =
    await getSnAddressWithFallback(parameters.from)
  if (isStarknetRPCError(senderAddress)) {
    return <RPCError>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602, //! check error code
        message: 'Cannot convert from Ethereum address to Starknet address.',
      },
    }
  }

  //! couldnt make it work
  // const decodedMulticallCalldata: EVMDecodeResult | EVMDecodeError =
  //   decodeMulticallFeatureCalldata(
  //     '0x' + parameters.data.slice(10),
  //     '0x76971d7f',
  //   )

  const response: RPCResponse | StarknetRPCError = await callStarknet({
    jsonrpc: request.jsonrpc,
    method: 'starknet_estimateFee',
    params: {
      request: [
        {
          type: 'INVOKE',
          version: '0x3',
          sender_address: senderAddress,
          calldata: ['not-done-yet'],
          signature: [],
          nonce: 'get-account-nonce',
          tip: '0x0',
          paymaster_data: [],
          account_deployment_data: [],
          nonce_data_availability_mode: 'L2',
          fee_data_availability_mode: 'L2',
          resource_bounds: {
            l1_gas: {
              max_amount: '0x0',
              max_price_per_unit: '0x0',
            },
            l2_gas: {
              max_amount: '0x0',
              max_price_per_unit: '0x0',
            },
            l1_data_gas: {
              max_amount: '0x0',
              max_price_per_unit: '0x0',
            },
          },
        },
      ],
      simulation_flags: ['SKIP_VALIDATE'],
      block_id: 'latest',
    },
    id: request.id,
  })

  if (isStarknetRPCError(response)) {
    return <RPCError>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32603, //! check error code
        message: 'Failed to estimate fee on Starknet',
      },
    }
  }

  //   result type
  //   {
  //     "id": 1,
  //     "jsonrpc": "2.0",
  //     "result": [
  //         {
  //             "l1_data_gas_consumed": "0x400",
  //             "l1_data_gas_price": "0x5877",
  //             "l1_gas_consumed": "0x0",
  //             "l1_gas_price": "0x14d5f9fd2c5c",
  //             "l2_gas_consumed": "0x45a650",
  //             "l2_gas_price": "0xb2d05e00",
  //             "overall_fee": "0x30a65455733c00",
  //             "unit": "FRI"
  //         }
  //     ]
  // }

  return {
    jsonrpc: request.jsonrpc,
    id: request.id,
    result: response.result[0].overall_fee,
  }
}

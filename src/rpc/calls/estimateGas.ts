import { isStarknetRPCError } from '../../types/typeGuards'
import {
  RPCError,
  RPCRequest,
  RPCResponse,
  StarknetRPCError,
} from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import {
  validateEthAddress,
  validateValue,
  validateEthCallParameters,
} from '../../utils/validations'
import { getSnAddressWithFallback } from '../../utils/wrapper'
import {
  decodeMulticallCalldataForEstimateFee,
  getFunctionSelectorFromCalldata,
} from '../../utils/calldata'
import { getAccountNonce } from '../../utils/starknet'
import { addHexPrefix } from '../../utils/padding'
import { sumTotalGasConsumption } from '../../utils/gas'

const allowedKeys = [
  'from',
  'to',
  'gas',
  'gasPrice',
  'maxFeePerGas',
  'maxPriorityFeePerGas',
  'value',
  'data',
  'blockNumber',
  'type',
  'nonce',
]

export async function estimateGasHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  if (!Array.isArray(request.params) || request.params.length !== 1) {
    return <RPCError>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, expected a single parameter object.',
      },
    }
  }

  const parameters = request.params[0]
  const paramKeys = Object.keys(parameters)
  const unknownKeys = paramKeys.filter(key => !allowedKeys.includes(key))

  if (unknownKeys.length > 0) {
    return <RPCError>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: `Invalid argument, unknown field(s): ${unknownKeys.join(', ')}`,
      },
    }
  }
  if (Array.isArray(request.params) && !validateEthCallParameters(parameters)) {
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

  if (
    parameters.value !== undefined &&
    parameters.value !== null &&
    validateValue(parameters.value)
  ) {
    return <RPCError>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message:
          '"value" field is too big, it should be less than or equal to 2^256 - 1',
      },
    }
  }

  //! return 0x5208 if no calldata or no "from" parameter
  const shouldReturn5208 =
    targetFunctionSelector == null ||
    typeof calldata === 'undefined' ||
    calldata == null ||
    calldata === '0x' ||
    parameters.from === undefined ||
    parameters.from === null

  if (shouldReturn5208) {
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
        code: -32602,
        message:
          'Cannot convert from Ethereum address to Starknet address please check from parameter.',
      },
    }
  }

  const decodedMulticallCalldata = decodeMulticallCalldataForEstimateFee(
    parameters.data,
  )

  const accountNonce = await getAccountNonce(senderAddress)

  const txType = addHexPrefix(parameters.type ?? '0x2')

  if (txType !== '0x0' && txType !== '0x2') {
    return <RPCError>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message:
          'Invalid transaction type, only legacy and EIP-1559 are supported.',
      },
    }
  }

  const parametersForRosettanet: string[] = [
    txType, // tx type
    parameters.to, // To field
    accountNonce, // nonce
    '0x0', // maxPriorityFeePerGas
    '0x0', // maxFeePerGas
    '0x0', // gasPrice
    '0x0', // gasLimit
    '0x0', // value low
    '0x0', // value high
    addHexPrefix(decodedMulticallCalldata.length.toString(16)), // calldata length
  ]

  const starknetCalldata: string[] = parametersForRosettanet.concat(
    decodedMulticallCalldata,
  )

  const response: RPCResponse | StarknetRPCError = await callStarknet({
    jsonrpc: request.jsonrpc,
    method: 'starknet_estimateFee',
    params: {
      request: [
        {
          type: 'INVOKE',
          version: '0x3',
          sender_address: senderAddress,
          calldata: starknetCalldata,
          signature: [],
          nonce: accountNonce,
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
        code: -32603,
        message: `Failed to estimate fee on Starknet. ${response.message}`,
      },
    }
  }

  try {
    const consumedGas = sumTotalGasConsumption(
      response.result[0].l1_gas_consumed,
      response.result[0].l1_data_gas_consumed,
      response.result[0].l2_gas_consumed,
    )

    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: consumedGas,
    }
  } catch (error) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: '0x5208',
    }
  }
}

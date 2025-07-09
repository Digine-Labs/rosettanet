import { isStarknetRPCError } from '../../types/typeGuards'
import {
  RPCError,
  RPCRequest,
  RPCResponse,
  StarknetRPCError,
  EVMDecodeResult,
  EVMDecodeError,
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
        code: -32602, //! error code değişmeli
        message: 'Cannot convert from Ethereum address to Starknet address.',
      },
    }
  }

  const decodedMulticallCalldata: EVMDecodeResult | EVMDecodeError =
    decodeMulticallFeatureCalldata(
      '0x' + parameters.data.slice(10),
      '0x76971d7f',
    )

  console.log('decodedMulticallCalldata', decodedMulticallCalldata)
  return {
    jsonrpc: request.jsonrpc,
    id: request.id,
    result: '0x5208',
  }
}

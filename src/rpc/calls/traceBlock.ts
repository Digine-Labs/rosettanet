import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { validateBlockNumber } from '../../utils/validations'

interface snTraceBlockResponse {
  result: Trace[]
  error?: {
    code?: number
    message?: string
    data?: object
  }
  jsonrpc: string
  id: number
}

interface Trace {
  trace_root: TraceRoot
  transaction_hash: string
}

interface TraceRoot {
  type: 'DEPLOY_ACCOUNT' | 'L1_HANDLER' | 'INVOKE' | 'DECLARE'
  validate_invocation?: Invocation
  execute_invocation?: Invocation
  fee_transfer_invocation?: Invocation
  function_invocation?: Invocation
  constructor_invocation?: Invocation
}

interface Invocation {
  contract_address: string
  entry_point_selector: string
  calldata: string[]
  caller_address: string
  class_hash: string
  entry_point_type: 'EXTERNAL' | 'L1_HANDLER' | 'CONSTRUCTOR'
  call_type: 'LIBRARY_CALL' | 'CALL' | 'DELEGATE'
  result: string[]
  calls: Invocation[]
  events: Event[]
  messages: Message[]
  execution_resources: ExecutionResources
}

interface Event {
  order: number
  keys: string[]
  data: string[]
}

interface Message {
  order: number
  from_address: string
  to_address: string
  payload: string
}

interface ExecutionResources {
  steps: number
  memory_holes?: number
  range_check_builtin_applications?: number
  ec_op_builtin_applications?: number
  pedersen_builtin_applications?: number
  poseidon_builtin_applications?: number
  ecdsa_builtin_applications?: number
  bitwise_builtin_applications?: number
  keccak_builtin_applications?: number
  segment_arena_builtin?: number
}

export async function traceBlockHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  if (request.params.length != 1) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter lenght should be 1.',
      },
    }
  }

  function isSnTraceBlockResponse(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response: any,
  ): response is snTraceBlockResponse {
    return (
      typeof response === 'object' &&
      response !== null &&
      'result' in response &&
      typeof response.result === 'object' &&
      'type' in response.result
    )
  }

  const blockNumber = request.params[0] as string

  // Validate the blockNumber
  if (!validateBlockNumber(blockNumber)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Invalid blockNumber.',
      },
    }
  }

  const response: RPCResponse | string | snTraceBlockResponse =
    await callStarknet({
      jsonrpc: request.jsonrpc,
      method: 'starknet_traceBlockTransactions',
      params: [{ block_number: parseInt(blockNumber, 16) }],
      id: request.id,
    })

  if (
    typeof response == 'string' ||
    response == null ||
    response == undefined
  ) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: response,
      },
    }
  }

  let resultArray: any = response.result
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let ethResponseArray: any = []

  function countAllInvocations(invocation: Invocation): number {
    let count = 1
    for (const call of invocation.calls) {
      count += countAllInvocations(call)
    }
    return count
  }

  resultArray.map((transaction: Trace) => {
    let ethResponse

    function generateEthResponse(invocation: Invocation) {
      const invocationCount = countAllInvocations(invocation)

      return {
        action: {
          from: invocation.caller_address,
          callType: invocation.call_type,
          input: invocation.calldata,
          to: invocation.contract_address,
        },
        blockHash: '0x0',
        blockNumber: blockNumber,
        result: {
          gasUsed: '0x0',
          output: invocation.result,
        },
        subtraces: invocationCount - 1,
        traceAddress: [],
        transactionHash: transaction.transaction_hash,
        transactionPosition: 0,
        type: invocation.call_type,
      }
    }

    if (transaction.trace_root.execute_invocation) {
      ethResponse = generateEthResponse(
        transaction.trace_root.execute_invocation,
      )
    } else if (transaction.trace_root.constructor_invocation) {
      ethResponse = generateEthResponse(
        transaction.trace_root.constructor_invocation,
      )
    } else if (transaction.trace_root.validate_invocation) {
      ethResponse = generateEthResponse(
        transaction.trace_root.validate_invocation,
      )
    }

    if (ethResponse) {
      ethResponseArray.push(ethResponse)
    }
  })
  return {
    jsonrpc: request.jsonrpc,
    id: request.id,
    result: ethResponseArray,
  }
}

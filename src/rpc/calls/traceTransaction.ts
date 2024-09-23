import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'

interface snTraceTransactionResponse {
  result: TraceRoot
  error?: {
    code?: number
    message?: string
    data?: object
  }
  jsonrpc: string
  id: number
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

export async function traceTransactionHandler(
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

  function isSnTraceTransactionResponse(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response: any,
  ): response is snTraceTransactionResponse {
    return (
      typeof response === 'object' &&
      response !== null &&
      'result' in response &&
      typeof response.result === 'object' &&
      'type' in response.result &&
      'execute_invocation' in response.result
    )
  }

  const transactionHash = request.params[0] as string

  const response: RPCResponse | string | snTraceTransactionResponse =
    await callStarknet({
      jsonrpc: request.jsonrpc,
      method: 'starknet_traceTransaction',
      params: [transactionHash],
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

  let allInvocations: Invocation[] = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let ethResponse: any = []

  //execute_invocation yok ise ne yapılmalı?
  if (
    isSnTraceTransactionResponse(response) &&
    response.result.execute_invocation
  ) {
    const hasNestedInvocationCheck = (invocation: Invocation): boolean => {
      // Check if the 'calls' array has nested invocations
      if (invocation.calls && invocation.calls.length > 0) {
        for (const call of invocation.calls) {
          if (hasNestedInvocationCheck(call)) {
            return true // Found nested invocation
          }
        }
        return true // At least one call exists
      }
      return false // No nested invocations
    }

    const hasNestedInvocation = hasNestedInvocationCheck(
      response.result.execute_invocation,
    )

    if (hasNestedInvocation) {
      // Function to extract all nested invocation objects
      // eslint-disable-next-line no-inner-declarations
      function extractAllInvocations(invocation: Invocation): Invocation[] {
        const invocations: Invocation[] = [invocation] // Start with the current invocation

        // Recursively extract nested invocations from the 'calls' array
        for (const call of invocation.calls) {
          invocations.push(...extractAllInvocations(call)) // Recursively get nested invocations
        }

        return invocations
      }

      // Example usage with the provided invocation structure
      allInvocations = extractAllInvocations(response.result.execute_invocation)

      ethResponse = allInvocations.map(invocation => ({
        action: {
          from: invocation.caller_address, //TODO: should be getSnAddressFromEthAddress(invocation.caller_address), but not every address added to lens it can cause problems right now it need fix
          callType: invocation.call_type, //todo: calltype in sn can be different then eth find a way to convert "LIBRARY_CALL" and "DELEGATE". "CALL" should be same, maybe can lowercase it
          gas: '0x0',
          input: invocation.calldata, //todo: maybe need to join() array of strings to make it more like ethereum
          to: invocation.contract_address,
        },
        blockHash: '0x0',
        blockNumber: '0x0',
        result: {
          gasUsed: '0x0',
          output: invocation.result, //todo: maybe need to join() array of strings to make it more like ethereum
        },
        subtraces: 0,
        traceAddress: [],
        transactionHash: transactionHash,
        transactionPosition: 0,
        type: invocation.call_type, //todo: calltype in sn can be different then eth find a way to convert "LIBRARY_CALL" and "DELEGATE". "CALL" should be same, maybe can lowercase it
      }))
    } else {
      ethResponse = {
        action: {
          from: response.result.execute_invocation.caller_address,
          callType: response.result.execute_invocation.call_type,
          input: response.result.execute_invocation.calldata,
          to: response.result.execute_invocation.contract_address,
        },
        blockHash: '0x0',
        blockNumber: '0x0',
        result: {
          gasUsed: '0x0',
          output: response.result.execute_invocation.result,
        },
        subtraces: 0,
        traceAddress: [],
        transactionHash: transactionHash,
        transactionPosition: 0,
        type: response.result.execute_invocation.call_type,
      }
    }
  } else if (
    isSnTraceTransactionResponse(response) &&
    response.result.constructor_invocation
  ) {
    ethResponse = {
      action: {
        from: response.result.constructor_invocation.caller_address,
        callType: response.result.constructor_invocation.call_type,
        input: response.result.constructor_invocation.calldata,
        to: response.result.constructor_invocation.contract_address,
      },
      blockHash: '0x0',
      blockNumber: '0x0',
      result: {
        gasUsed: '0x0',
        output: response.result.constructor_invocation.result,
      },
      subtraces: 0,
      traceAddress: [],
      transactionHash: transactionHash,
      transactionPosition: 0,
      type: response.result.constructor_invocation.call_type,
    }
  } else if (
    isSnTraceTransactionResponse(response) &&
    response.result.function_invocation
  ) {
    ethResponse = {
      action: {
        from: response.result.function_invocation.caller_address,
        callType: response.result.function_invocation.call_type,
        input: response.result.function_invocation.calldata,
        to: response.result.function_invocation.contract_address,
      },
      blockHash: '0x0',
      blockNumber: '0x0',
      result: {
        gasUsed: '0x0',
        output: response.result.function_invocation.result,
      },
      subtraces: 0,
      traceAddress: [],
      transactionHash: transactionHash,
      transactionPosition: 0,
      type: response.result.function_invocation.call_type,
    }
  }

  return {
    jsonrpc: request.jsonrpc,
    id: request.id,
    result: ethResponse,
  }
}

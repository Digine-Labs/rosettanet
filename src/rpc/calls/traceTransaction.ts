/* eslint-disable @typescript-eslint/no-explicit-any */

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

  let ethResponse: any = []

  // Helper function to extract all nested invocations
  function extractAllInvocations(invocation: Invocation): Invocation[] {
    const invocations: Invocation[] = [invocation] // Start with the current invocation

    // Recursively extract nested invocations from the 'calls' array
    for (const call of invocation.calls) {
      invocations.push(...extractAllInvocations(call)) // Add all nested invocations
    }

    return invocations
  }

  function generateEthResponse(
    invocation: Invocation,
    transactionHash: string,
  ) {
    return {
      action: {
        from: invocation.caller_address, // TODO: handle address conversion
        callType: invocation.call_type, // TODO: handle call type conversion for "LIBRARY_CALL" and "DELEGATE"
        gas: '0x0',
        input: invocation.calldata, // TODO: possibly join array for Ethereum format
        to: invocation.contract_address,
      },
      blockHash: '0x0',
      blockNumber: '0x0',
      result: {
        gasUsed: '0x0',
        output: invocation.result, // TODO: possibly join array for Ethereum format
      },
      subtraces: 0,
      traceAddress: [],
      transactionHash: transactionHash,
      transactionPosition: 0,
      type: invocation.call_type, // TODO: handle call type conversion
    }
  }

  function processInvocation(
    invocation: Invocation | undefined,
    transactionHash: string,
  ): any[] | undefined {
    if (!invocation) return undefined

    const allInvocations = extractAllInvocations(invocation) // Extract all invocations including nested ones

    // Map all invocations to ethResponse objects
    return allInvocations.map(inv => generateEthResponse(inv, transactionHash))
  }

  if (isSnTraceTransactionResponse(response)) {
    const executeInvocation = processInvocation(
      response.result.execute_invocation,
      transactionHash,
    )

    const constructorInvocation = processInvocation(
      response.result.constructor_invocation,
      transactionHash,
    )

    const functionInvocation = processInvocation(
      response.result.function_invocation,
      transactionHash,
    )

    ethResponse =
      executeInvocation || constructorInvocation || functionInvocation
  }

  return {
    jsonrpc: request.jsonrpc,
    id: request.id,
    result: ethResponse,
  }
}

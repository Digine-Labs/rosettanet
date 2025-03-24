import { RPCError, RPCResponse } from '../../src/types/types'
import { isRPCError } from '../../src/types/typeGuards'

export function assertError(
  response: RPCResponse | RPCError,
  expectedMessage: string,
): void {
  expect(isRPCError(response)).toBeTruthy()
  const errorResponse = response as RPCError
  expect(errorResponse.error.message).toBe(expectedMessage)
}

export function assertResult(response: RPCResponse | RPCError): RPCResponse {
  expect(!isRPCError(response)).toBeTruthy()
  return response as RPCResponse
}

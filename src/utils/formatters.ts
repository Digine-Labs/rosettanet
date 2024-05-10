import { StarknetFunction } from '../types/types'

// Formats starknet rpc response into eth response
export async function formatStarknetResponse(
  result: Array<string>,
  fn: StarknetFunction,
): Promise<string> {
  if (typeof fn.outputs === 'undefined') {
    return '0x0'
  }

  // TODO
  return ''
  // First calculate howmuch eth slot we need, and which variables can fit on these slots with order.
}

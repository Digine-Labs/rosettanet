import { StarknetFunction } from '../types/types'

export function getDirectivesForStarknetFunction(
  fn: StarknetFunction,
): Array<number> {
  if (typeof fn.inputs === 'undefined') {
    return []
  }
  for(const input of fn.inputs) {
    console.log(input)
  }
  return []
}

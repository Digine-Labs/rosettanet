import { StarknetFunction } from '../types/types'

export function getDirectivesForStarknetFunction(
  fn: StarknetFunction,
): Array<number> {
  if (typeof fn.inputs === 'undefined') {
    return []
  }
  const directives = [];
  for(const input of fn.inputs) {
    if(input.type === 'core::starknet::contract_address::ContractAddress') {
      directives.push(2)
    } else if(input.type === 'core::integer::u256' || input.type === 'core::integer::i256') {
      directives.push(1)
      directives.push(0)
    } else {
      directives.push(0)
    }
  }
  return directives
}

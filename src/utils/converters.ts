import { StarknetType } from '../types/types'
import { Uint256ToU256 } from './converters/integer'

const STARKNET_CONVERTERS = new Map<string, StarknetType>()

STARKNET_CONVERTERS.set('u256', {
  name: 'u256',
  converter: Uint256ToU256,
}) // TODO: DEPRECATE THIS

export function toStarknetType(
  value: string,
  targetType: string,
): string | Array<string> | undefined {
  if (!STARKNET_CONVERTERS.has(targetType)) {
    return
  }
  const targetHandler = STARKNET_CONVERTERS.get(targetType)

  const result = targetHandler?.converter(value)
  return result
}

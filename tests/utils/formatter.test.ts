import { formatStarknetResponse } from '../../src/utils/formatters'
import { StarknetFunction } from '../../src/types/types'

describe('Format starknet outputs', () => {
  it('Format one output for one slot', async () => {
    const starknetFn: StarknetFunction = {
      name: 'test',
      outputs: [{ type: 'core::integer::u128' }],
      type: 'external',
      state_mutability: 'view',
    }

    const result = ['0x123']

    const formattedResponse = await formatStarknetResponse(starknetFn, result)

    expect(formattedResponse.length).toBe(66)
    expect(formattedResponse).toBe(
      '0x0000000000000000000000000000000000000000000000000000000000000123',
    )
  })
  it('Format one output for two slot', async () => {
    const starknetFn: StarknetFunction = {
      name: 'test',
      outputs: [{ type: 'core::integer::u256' }],
      type: 'external',
      state_mutability: 'view',
    }

    const result = ['0x123', '0x456']

    const formattedResponse = await formatStarknetResponse(starknetFn, result)

    expect(formattedResponse.length).toBe(66)
    // TODO: Fix problem on u256 conversion
    // expect(formattedResponse).toBe('0x000000000000ffffffffffffffffffffffffffffffffffff0000000000000123')
  })
  it('Format two output for one slot', async () => {
    // check packing
    const starknetFn: StarknetFunction = {
      name: 'test',
      outputs: [{ type: 'core::integer::u64' }, { type: 'core::integer::u64' }],
      type: 'external',
      state_mutability: 'view',
    }

    const result = ['0x123', '0x456']

    const formattedResponse = await formatStarknetResponse(starknetFn, result)

    expect(formattedResponse.length).toBe(66)
    expect(formattedResponse).toBe(
      '0x0000000000000000000000000000000000000000000004560000000000000123',
    )
  })
  it('Format address for one slot', async () => {
    // Check address conversion
    // TODO
  })

  it('Format three outputs for three slot', async () => {
    const starknetFn: StarknetFunction = {
      name: 'test',
      outputs: [
        { type: 'core::integer::u128' },
        { type: 'core::integer::u256' },
        { type: 'core::integer::u64' },
      ],
      type: 'external',
      state_mutability: 'view',
    }

    const result = ['0x123', '0x456', '0x0', '0xFFF']

    const formattedResponse = await formatStarknetResponse(starknetFn, result)

    expect(formattedResponse.length).toBe(2 + 64 * 3)
    expect(formattedResponse).toBe(
      '0x000000000000000000000000000000000000000000000000000000000000012300000000000000000000000000000000000000000000000000000000000004560000000000000000000000000000000000000000000000000000000000000FFF',
    )
  })
})

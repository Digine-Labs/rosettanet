import {
  getFunctionSelectorFromCalldata,
  getCalldataByteSize,
} from '../../src/utils/calldata'
import { EthereumSlot } from '../../src/types/types'

describe('Tests calldata function selector', () => {
  it('Returns eth function selector', async () => {
    const sample = '0xa9059cbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

    const selector = getFunctionSelectorFromCalldata(sample)

    expect(selector).toBe('0xa9059cbb')
  })

  it('Returns 0x0 if calldata wrong', async () => {
    const sample = '0xa90'

    const selector = getFunctionSelectorFromCalldata(sample)

    expect(selector).toBe('0x0')
  })
})

describe('Tests ethereum bitsize calculations', () => {
  it('One param slot', async () => {
    const sample = 'balanceOf(address)'

    const slots: Array<EthereumSlot> = getCalldataByteSize(sample)

    expect(slots.length).toBe(1)
    expect(slots[0]).toStrictEqual({
      order: 0,
      bits: 160,
    })
  })

  it('Two param two slots', async () => {
    const sample = 'balanceOf(address,uint256)'

    const slots: Array<EthereumSlot> = getCalldataByteSize(sample)

    expect(slots.length).toBe(2)
    expect(slots[0]).toStrictEqual({
      order: 0,
      bits: 160,
    })
    expect(slots[1]).toStrictEqual({
      order: 1,
      bits: 256,
    })
  })

  it('Two params but fits', async () => {
    const sample = 'balanceOf(uint64,uint64)'

    const slots: Array<EthereumSlot> = getCalldataByteSize(sample)

    expect(slots.length).toBe(1)
    expect(slots[0]).toStrictEqual({
      order: 0,
      bits: 128,
    })
  })

  it('Two params but fits different', async () => {
    const sample = 'balanceOf(uint64,uint128)'

    const slots: Array<EthereumSlot> = getCalldataByteSize(sample)

    expect(slots.length).toBe(1)
    expect(slots[0]).toStrictEqual({
      order: 0,
      bits: 192,
    })
  })

  it('Three params but fits different', async () => {
    const sample = 'balanceOf(uint64,uint128,uint256)'

    const slots: Array<EthereumSlot> = getCalldataByteSize(sample)

    expect(slots.length).toBe(2)
    expect(slots[0]).toStrictEqual({
      order: 0,
      bits: 192,
    })
    expect(slots[1]).toStrictEqual({
      order: 1,
      bits: 256,
    })
  })

  it('Bytes', async () => {
    const sample = 'balanceOf(bytes9)'

    const slots: Array<EthereumSlot> = getCalldataByteSize(sample)

    expect(slots.length).toBe(1)
    expect(slots[0]).toStrictEqual({
      order: 0,
      bits: 9 * 8,
    })
  })

  it('Two non fit not 256', async () => {
    const sample = 'balanceOf(address,address)'

    const slots: Array<EthereumSlot> = getCalldataByteSize(sample)

    expect(slots.length).toBe(2)
    expect(slots[0]).toStrictEqual({
      order: 0,
      bits: 160,
    })
    expect(slots[1]).toStrictEqual({
      order: 1,
      bits: 160,
    })
  })

  it('empty', async () => {
    const sample = 'balanceOf()'

    const slots: Array<EthereumSlot> = getCalldataByteSize(sample)

    expect(slots.length).toBe(0)
  })
})

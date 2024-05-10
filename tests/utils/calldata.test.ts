import {
  getFunctionSelectorFromCalldata,
  getCalldataByteSize,
  convertEthereumCalldataToParameters,
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

describe('Tests convertEthereumCalldataToParameters', () => {
  it('convert 0 parameter', () => {
    const functionName = 'balanceOf()'
    const slots: Array<EthereumSlot> = getCalldataByteSize(functionName)
    const data = '0x70a08231'

    const params = convertEthereumCalldataToParameters(
      functionName,
      slots,
      data,
    )
    expect(params.length).toBe(0)
  })

  it('convert 1 parameter', () => {
    const functionName = 'balanceOf(address)'
    const slots: Array<EthereumSlot> = getCalldataByteSize(functionName)
    const data =
      '0x70a08231000000000000000000000000d3fcc84644ddd6b96f7c741b1562b82f9e004dc7'

    const params = convertEthereumCalldataToParameters(
      functionName,
      slots,
      data,
    )
    expect(params.length).toBe(1)
    expect(params[0]).toBe('d3fcc84644ddd6b96f7c741b1562b82f9e004dc7')
  })

  it('convert 2 parameters', () => {
    const functionName = 'balanceOf(address,uint256)'
    const slots: Array<EthereumSlot> = getCalldataByteSize(functionName)
    const data =
      '0x70a08231000000000000000000000000d3fcc84644ddd6b96f7c741b1562b82f9e004dc7aaa000000000000000000000d3fcc84644ddd6b96f7c741b1562b82f9e004dc7'

    const params = convertEthereumCalldataToParameters(
      functionName,
      slots,
      data,
    )
    expect(params.length).toBe(2)
    expect(params[0]).toBe('d3fcc84644ddd6b96f7c741b1562b82f9e004dc7')
    expect(params[1]).toBe(
      'aaa000000000000000000000d3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    )
  })

  it('convert 2 parameters packed', () => {
    const functionName = 'balanceOf(uint128,uint128)'
    const slots: Array<EthereumSlot> = getCalldataByteSize(functionName)
    const data =
      '0x70a08231900010000000000000000000d3fcc84644ddd6b96f7c741b1562b82f9e004dc7'

    const params = convertEthereumCalldataToParameters(
      functionName,
      slots,
      data,
    )
    expect(params.length).toBe(2)
    expect(params[0]).toBe('900010000000000000000000d3fcc846')
    expect(params[1]).toBe('44ddd6b96f7c741b1562b82f9e004dc7')
  })

  it('convert 3 parameters packed on second', () => {
    const functionName = 'balanceOf(address,uint128,uint128)'
    const slots: Array<EthereumSlot> = getCalldataByteSize(functionName)
    const data =
      '0x70a08231000000000000000000000000d3fcc84644ddd6b96f7c741b1562b82f9e004dc7aaa000000000000000000000d3fcc84644ddd6b96f7c741b1562b82f9e004dc7'

    const params = convertEthereumCalldataToParameters(
      functionName,
      slots,
      data,
    )
    expect(params.length).toBe(3)
    expect(params[0]).toBe('d3fcc84644ddd6b96f7c741b1562b82f9e004dc7')
    expect(params[1]).toBe('aaa000000000000000000000d3fcc846')
    expect(params[2]).toBe('44ddd6b96f7c741b1562b82f9e004dc7')
  })

  it('convert 2 parameters packed but not full slot', () => {
    const functionName = 'balanceOf(uint64,uint64)'
    const slots: Array<EthereumSlot> = getCalldataByteSize(functionName)
    const data =
      '0x70a082310000000000000000000000000000000012312312312313239999999999999999'

    const params = convertEthereumCalldataToParameters(
      functionName,
      slots,
      data,
    )
    expect(params.length).toBe(2)
    expect(params[0]).toBe('1231231231231323')
    expect(params[1]).toBe('9999999999999999')
  })

  it('convert 4 parameters packed and different', () => {
    const functionName = 'balanceOf(uint32,address,uint128,uint64)'
    const slots: Array<EthereumSlot> = getCalldataByteSize(functionName)
    const data =
      '0x70a08231000000000000000012312312abcabcabcabcabcabcabcabcabcabcabcabcabca0000000000000000454545454545454545454545454545457878787878787878'

    const params = convertEthereumCalldataToParameters(
      functionName,
      slots,
      data,
    )
    expect(params.length).toBe(4)
    expect(params[0]).toBe('12312312')
    expect(params[1]).toBe('abcabcabcabcabcabcabcabcabcabcabcabcabca')
    expect(params[2]).toBe('45454545454545454545454545454545')
    expect(params[3]).toBe('7878787878787878')
  })
})

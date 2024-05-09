import { getFunctionSelectorFromCalldata } from '../../../src/utils/converters/calldata'

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

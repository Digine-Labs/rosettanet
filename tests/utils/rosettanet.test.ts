import { isRosettaAccountDeployed } from '../../src/utils/rosettanet'
describe('Checks account deployed', () => {
  it('Tries to check unexist account', async () => {
    const address = '0x123'

    const response = await isRosettaAccountDeployed(address, '0x123')
    expect(typeof response).toBe('boolean')
    expect(response).toBe(false)
  })

  it('Tries to check different account', async () => {
    const address =
      '0x061D2D0E093B92116632A5068Ce683d051E2Ada4ACddf948bA77ec2Fed9786d6'

    const response = await isRosettaAccountDeployed(address, '0x123')
    expect(typeof response).toBe('boolean')
    expect(response).toBe(false)
  })

  it('Tries to check same account', async () => {
    const address =
      '0x061D2D0E093B92116632A5068Ce683d051E2Ada4ACddf948bA77ec2Fed9786d6' // Sepolia account, test may fail if account upgraded

    const response = await isRosettaAccountDeployed(
      address,
      '0x29927c8af6bccf3f6fda035981e765a7bdbf18a2dc0d630494f8758aa908e2b',
    )
    expect(typeof response).toBe('boolean')
    expect(response).toBe(true)
  })
})

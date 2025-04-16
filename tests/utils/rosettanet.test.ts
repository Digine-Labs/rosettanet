import { decodeCalldataInput, isRosettaAccountDeployed } from '../../src/utils/rosettanet'
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


describe('Test calldata backs to evm format', () => {
  it('Returns empty calldata', () => {
    const calldata = [
      "0x0",
      "0x1e495b498736bba9d2cbe8daba652058d46b2d5a",
      "0x2",
      "0x0",
      "0x0",
      "0x14c3449932c8e",
      "0x7b0c",
      "0xde0b6b3a7640000",
      "0x0",
      "0x0"
  ]

    const result = decodeCalldataInput(calldata)

    expect(result.rawInput.length).toBe(2)
    expect(result.rawInput).toBe('0x')
    expect(result.selector).toBe('0x')
  })

  it('Multicall calldata', () => {
    const data = [
      "0x0",
      "0xaa79a8e98e1c8fac6fe4dd0e677d01bf1ca5f419",
      "0x3",
      "0x0",
      "0x0",
      "0x232dbbf3f7b11",
      "0x7b0c",
      "0x0",
      "0x0",
      "0x1b",
      "0x76971d7f",
      "0x0",
      "0x20",
      "0x0",
      "0x1",
      "0x0",
      "0x20",
      "0x494a72a742b7880725a965ee487d93",
      "0x7fa6d08a94ba4eb9e29dd0663bc653a2",
      "0x14b9c006653b96dd1312a62b5921c46",
      "0x5d08352de1546550f0ed804fcc0ef9e9",
      "0x0",
      "0x60",
      "0x0",
      "0x6",
      "0x46f10efce1ca3a4ef01e342e7c707b3",
      "0xe7dd274285a2a5aa1163909a7b405633",
      "0x0",
      "0x617364",
      "0x0",
      "0x64736164",
      "0x0",
      "0x123",
      "0x0",
      "0x0",
      "0x0",
      "0x353534343333"
  ]

    const result = decodeCalldataInput(data)

    expect(result.selector).toBe('0x76971d7f')
    console.log(result.rawInput)
  })
})
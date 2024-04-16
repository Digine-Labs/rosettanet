import {
  getContractsMethods,
  generateEntrypointsSelector,
} from '../../src/utils/starknet'
import { FunctionAbi, constants } from 'starknet'
describe('test get contract methods from starknet contract abi', () => {
  // https://starkscan.co/contract/0x07a6f98c03379b9513ca84cca1373ff452a7462a3b61598f0af5bb27ad7f76d1
  it('should return contract methods', async () => {
    const contractAddress =
      '0x07a6f98c03379b9513ca84cca1373ff452a7462a3b61598f0af5bb27ad7f76d1'
    const result = await getContractsMethods(
      constants.NetworkName.SN_MAIN,
      contractAddress,
    )
    expect(result).toHaveLength(12)
  })

  it('should return entrypoint selector given contract methods', async () => {
    const contractMethods: FunctionAbi[] = [
      {
        name: 'constructor',
        type: 2,
        inputs: [
          {
            name: 'factory',
            type: 'felt',
          },
          {
            name: 'pairClass',
            type: 'felt',
          },
        ],
        outputs: [],
      },
      {
        name: 'factory',
        type: 0,
        inputs: [],
        outputs: [
          {
            name: 'factory',
            type: 'felt',
          },
        ],
        stateMutability: 'view',
      },
    ]
    const result = await generateEntrypointsSelector(contractMethods)
    expect(result).toHaveLength(2)
    expect(result).toContain(
      '0x28ffe4ff0f226a9107253e17a904099aa4f63a02a5621de0576e5aa71bc5194',
    )
    expect(result).toContain(
      '0x366a98476020cb9ff8cc566d0cdeac414e546d2e7ede445f4e7032a4272c771',
    )
  })
})

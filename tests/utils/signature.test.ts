import { getAddress } from "ethers"
import { getEthersTransactionFromRosettanetCall } from "../../src/utils/signature"

describe('Decodes raw rosettanet calldata', () => {
  it('find sender address legacy multicall', async () => {
    const calldata = [
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

    const signature = [
        "0x6b69083733fa655ba7f23a780261a5cb",
        "0x5c78f452d9137e72c96922344be93b7e",
        "0x2438c3c7b92036638c4751539336771d",
        "0x2bf5024c92b334871e68edcba12e0300",
        "0x1c",
        "0x0",
        "0x0"
    ]
    const tx = getEthersTransactionFromRosettanetCall(signature, calldata)
    expect(tx.from).toBe(getAddress('0xaa79a8e98e1c8fac6fe4dd0e677d01bf1ca5f419'))
  })
  it('extract sender address non multicall non calldata tx legacy', async () => {
    const calldata = [
        "0x0",
        "0x1e495b498736bba9d2cbe8daba652058d46b2d5a",
        "0x4",
        "0x0",
        "0x0",
        "0x107183af677d8",
        "0x7b0c",
        "0x4563918244f40000",
        "0x0",
        "0x0"
    ]

    const signature = [
        "0xc4a6e199de582dd7e80a89be5b43a58b",
        "0x89f630b57182171198623262ba5dd867",
        "0x4efd6cf4b57dfe68ed18d6ee59ed1b87",
        "0x189c50da7c634cfd80f2c2b1b1ef42ea",
        "0x1b",
        "0x4563918244f40000",
        "0x0"
    ]
    const tx = getEthersTransactionFromRosettanetCall(signature, calldata)
    expect(tx.from).toBe(getAddress('0xaa79a8e98e1c8fac6fe4dd0e677d01bf1ca5f419'))
  })

  it('extract sender address non multicall non calldata tx eip1559', async () => {
    const calldata = [
            "0x2",
            "0x1e495b498736bba9d2cbe8daba652058d46b2d5a",
            "0x0",
            "0xe08ac1e37dcb",
            "0xe08ac1e37dcb",
            "0x0",
            "0x5208",
            "0x8ac7230489e80000",
            "0x0",
            "0x0"
    ]

    const signature = [
        "0x71026e017ba9b32f09c0c33bfc4428cf",
        "0x164955140f612ab27748427b11e19a4c",
        "0x31a9d4508aa028adf88fea170282b6bd",
        "0x24a3e2c8105066a040c0eb3663fdea04",
        "0x1c",
        "0x8ac7230489e80000",
        "0x0"
    ]
    const tx = getEthersTransactionFromRosettanetCall(signature, calldata)
    expect(tx.from).toBe(getAddress('0xE4306a06B19Fdc04FDf98cF3c00472f29254c0e1'))
  })
})

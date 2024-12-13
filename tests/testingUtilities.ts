import { Wallet } from 'ethers'

const TEST_PRIVATE_KEY =
  '0x29a98ffd0692bb7012b9eed05ba2f186ef7d6a9bf8a536b84c9792f1784a3aee'
// Account addr: 0x30ffDf2c33b929F749afE49D7aBf3f4B8D399B40

export function getTestAccount(): Wallet {
  const signer = new Wallet(TEST_PRIVATE_KEY)

  return signer
}

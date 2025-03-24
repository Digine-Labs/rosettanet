import { getDevAccount } from '../utils'
import {
  getEthAddressFromRegistry,
  registerContractIfNotRegistered,
} from '../registry/rosettanet'

const snAddress =
  '0x06419f7dea356b74bc1443bd1600ab3831b7808d1ef897789facfad11a172da7'

test.only('Register contract address to registry', async () => {
  const devAccount = getDevAccount()
  await registerContractIfNotRegistered(devAccount, snAddress)

  const ethAddress = await getEthAddressFromRegistry(snAddress)

  const expectedAddress =
    '0xEB3D98FC043921EFECCAA89DD55367338DA76E6E'.toLowerCase()

  expect(ethAddress.toLowerCase()).toBe(expectedAddress)
}, 30000)

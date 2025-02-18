import { RpcProvider, Account, Contract, json } from 'starknet'
import * as fs from 'fs'
import * as path from 'path'
import { Wallet } from 'ethers'

const configAccount1 = {
  address: '0x064b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691',
  privateKey:
    '0x0000000000000000000000000000000071d7bb07b9a64f6f78ac4c816aff4da9',
  publicKey:
    '0x039d9e6ce352ad4530a0ef5d5a18fd3303c3606a7fa6ac5b620020ad681cc33b',
}
const configAccount2 = {
  address: '0x078662e7352d062084b0010068b99288486c2d8b914f6e2a55ce945f8792c8b1',
  privateKey:
    '0x000000000000000000000000000000000e1406455b7d66b1690803be066cbe5e',
  publicKey:
    '0x007a1bb2744a7dd29bffd44341dbd78008adb4bc11733601e7eddff322ada9cb',
}

const starknetProvider = new RpcProvider({ nodeUrl: 'http://127.0.0.1:5050' })
const compiledRosettanetContractSierraPath = path.resolve(
  __dirname,
  './rosettaCompiledContracts/rosettacontracts_Rosettanet.contract_class.json',
)
const compiledRosettaContractSierra = json.parse(
  fs.readFileSync(compiledRosettanetContractSierraPath).toString('ascii'),
)
const starknetDeployerAccount = new Account(
  starknetProvider,
  configAccount1.address,
  configAccount1.privateKey,
)
const starknetUserAccount = new Account(
  starknetProvider,
  configAccount2.address,
  configAccount2.privateKey,
)

const ethereumSenderWalletPrivateKey =
  '0x29a98ffd0692bb7012b9eed05ba2f186ef7d6a9bf8a536b84c9792f1784a3aee'
// Account addr: 0x30ffDf2c33b929F749afE49D7aBf3f4B8D399B40
const ethereumSenderWallet = new Wallet(ethereumSenderWalletPrivateKey)

const ethereumGetterWalletPrivateKey =
  '0x29a98ffd0692bb7012b9eed05ba2f186ef7d6a9bf8a536b84c9792f1784a3ae1'

const ethereumGetterWallet = new Wallet(ethereumGetterWalletPrivateKey)

export function getStarknetProvider() {
  return starknetProvider
}

export function getCompiledRosettaContractSierra() {
  return compiledRosettaContractSierra
}

export async function getRosettanetContract() {
  const rosettanetAddress =
    '0x37a66400579d7a1bbeec478d4b189b25e486a59b5f9ad1e4d5aa89b9bf9b002'

  const rosettanetContract = new Contract(
    compiledRosettaContractSierra.abi,
    rosettanetAddress,
    starknetDeployerAccount,
  )
  return rosettanetContract
}

export function getStarknetDeployerAccount() {
  return starknetDeployerAccount
}

export function getStarknetUserAccount() {
  return starknetUserAccount
}

export function getEthereumSenderWallet() {
  return ethereumSenderWallet
}

export function getEthereumGetterWallet() {
  return ethereumGetterWallet
}

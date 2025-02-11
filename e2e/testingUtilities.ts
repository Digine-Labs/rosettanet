import { RpcProvider, Account, Contract, json } from 'starknet'
import { getRpc } from '../src/utils/getRpc'
import { getConfigurationProperty } from '../src/utils/configReader'
import * as fs from 'fs'
import * as path from 'path'
import { Wallet } from 'ethers'

const rosettanetAddress = getConfigurationProperty('rosettanet')
const configAccount1 = getConfigurationProperty('account1')
const configAccount2 = getConfigurationProperty('account2')

const rpc = getRpc()
const starknetProvider = new RpcProvider({ nodeUrl: rpc })
const compiledRosettanetContractSierraPath = path.resolve(
  __dirname,
  './rosettaCompiledContracts/rosettacontracts_Rosettanet.contract_class.json',
)
const compiledRosettaContractSierra = json.parse(
  fs.readFileSync(compiledRosettanetContractSierraPath).toString('ascii'),
)
const rosettanetContract = new Contract(
  compiledRosettaContractSierra.abi,
  rosettanetAddress,
  starknetProvider,
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

const ethereumGetterWalletPrivateKey = '0x12345abcde'

const ethereumGetterWallet = new Wallet(ethereumGetterWalletPrivateKey)

export function getStarknetProvider() {
  return starknetProvider
}

export function getCompiledRosettaContractSierra() {
  return compiledRosettaContractSierra
}

export function getRosettanetContract() {
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

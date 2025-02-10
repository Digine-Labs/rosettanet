import {
  RpcProvider,
  Account,
  Contract,
  json,
  stark,
  uint256,
  shortString,
} from 'starknet'
import { getRpc } from '../src/utils/getRpc'
import {
  addConfigurationElement,
  getConfigurationProperty,
} from '../src/utils/configReader'
import * as fs from 'fs'
import * as path from 'path'

export async function deployRosettaContracts() {
  const rpc = getRpc()

  const provider = new RpcProvider({ baseUrl: rpc })

  const account1Address = getConfigurationProperty('account1.address')
  const account1PrivateKey = getConfigurationProperty('account1.privateKey')
  const account1 = new Account(provider, account1Address, account1PrivateKey)

  const compiledRosettanetContractCasmPath = path.resolve(
    './rosettaCompiledContracts/rosettacontracts_Rosettanet.compiled_contract_class.json',
  )

  const compiledRosettanetContractSierraPath = path.resolve(
    './rosettaCompiledContracts/rosettacontracts_Rosettanet.contract_class.json',
  )

  const compiledRosettanetAccountContractCasmPath = path.resolve(
    './rosettaCompiledContracts/rosettacontracts_RosettaAccount.compiled_contract_class.json',
  )

  const compiledRosettanetAccountContractSierraPath = path.resolve(
    './rosettaCompiledContracts/rosettacontracts_RosettaAccount.contract_class.json',
  )

  const compiledRosettanetContractCasm = json.parse(
    fs.readFileSync(compiledRosettanetContractCasmPath).toString('ascii'),
  )

  const compiledRosettaContractSierra = json.parse(
    fs.readFileSync(compiledRosettanetContractSierraPath).toString('ascii'),
  )

  const compiledRosettanetAccountContractCasm = json.parse(
    fs
      .readFileSync(compiledRosettanetAccountContractCasmPath)
      .toString('ascii'),
  )

  const compiledRosettanetAccountContractSierra = json.parse(
    fs
      .readFileSync(compiledRosettanetAccountContractSierraPath)
      .toString('ascii'),
  )

  const deployRosettanet = await account1.declareAndDeploy({
    contract: compiledRosettaContractSierra,
    casm: compiledRosettanetContractCasm,
  })

  const deployAccount = await account1.declareAndDeploy({
    contract: compiledRosettanetAccountContractSierra,
    casm: compiledRosettanetAccountContractCasm,
  })

  const rosettanetContract = new Contract(
    compiledRosettaContractSierra.abi,
    deployRosettanet.deploy.contract_address,
    provider,
  )

  const accountContract = new Contract(
    compiledRosettanetAccountContractSierra.abi,
    deployAccount.deploy.contract_address,
    provider,
  )

  addConfigurationElement('account', accountContract.address)
  addConfigurationElement('rosettanet', rosettanetContract.address)
}

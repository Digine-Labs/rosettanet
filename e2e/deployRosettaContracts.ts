import { RpcProvider, Contract, json, ContractFactory } from 'starknet'
import * as fs from 'fs'
import * as path from 'path'
import { getStarknetDeployerAccount } from './testingUtilities'
import {
  addConfigurationElement,
  getConfigurationProperty,
} from '../src/utils/configReader'
import { getRpc } from '../src/utils/getRpc'

let rosettanetAddress: any

export async function deployRosettaContracts() {
  const rpc = getRpc()

  const provider = new RpcProvider({ nodeUrl: rpc })

  const configStrkAddress = getConfigurationProperty('strkAddress')

  const account1 = getStarknetDeployerAccount()

  const compiledRosettanetContractCasmPath = path.resolve(
    __dirname,
    './rosettaCompiledContracts/rosettacontracts_Rosettanet.compiled_contract_class.json',
  )

  const compiledRosettanetContractSierraPath = path.resolve(
    __dirname,
    './rosettaCompiledContracts/rosettacontracts_Rosettanet.contract_class.json',
  )

  const compiledRosettanetAccountContractCasmPath = path.resolve(
    __dirname,
    './rosettaCompiledContracts/rosettacontracts_RosettaAccount.compiled_contract_class.json',
  )

  const compiledRosettanetAccountContractSierraPath = path.resolve(
    __dirname,
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

  let declareAccountContract

  try {
    declareAccountContract = await account1.declare({
      contract: compiledRosettanetAccountContractSierra,
      casm: compiledRosettanetAccountContractCasm,
    })
  } catch {
    declareAccountContract = {
      class_hash:
        '0x01ebf4c94d78182233b53f4c3c7176ec20d7eab5387bfaa178a036c481e472a7',
    }
  }

  const rosettanetFactory = new ContractFactory({
    compiledContract: compiledRosettaContractSierra,
    account: account1,
    casm: compiledRosettanetContractCasm,
  })

  const rosettanetDeployer = await rosettanetFactory.deploy(
    declareAccountContract.class_hash,
    account1.address,
    configStrkAddress,
  )

  const rosettanetContract = new Contract(
    compiledRosettaContractSierra.abi,
    rosettanetDeployer.address,
    provider,
  )

  console.log(
    'Rosettanet contracts are deployed. You can get addresses with getConfigurationProperty("rosettanet") or getConfigurationProperty("accountClass") function.',
  )

  rosettanetAddress = rosettanetDeployer.address

  addConfigurationElement('rosettanet', rosettanetContract.address)
  addConfigurationElement('accountClass', declareAccountContract.class_hash)
  console.log('Rosettanet contract address:', rosettanetContract.address)
  console.log('Account class hash:', declareAccountContract.class_hash)
}

export async function getRosettanetAddress() {
  return rosettanetAddress
}

/* eslint-disable no-console */

import { Contract, json } from 'starknet'
import * as fs from 'fs'
import * as path from 'path'
import { getStarknetDeployerAccount } from './testingUtilities'
import { addConfigurationElement } from '../src/utils/configReader'

const configStrkAddress =
  '0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d'

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
  fs.readFileSync(compiledRosettanetAccountContractCasmPath).toString('ascii'),
)

const compiledRosettanetAccountContractSierra = json.parse(
  fs
    .readFileSync(compiledRosettanetAccountContractSierraPath)
    .toString('ascii'),
)

const rosettanetAddress =
  '0x37a66400579d7a1bbeec478d4b189b25e486a59b5f9ad1e4d5aa89b9bf9b002'

function isRosettaDeployed() {
  const rosettanetContract = new Contract(
    compiledRosettaContractSierra.abi,
    rosettanetAddress,
    account1,
  )

  if (rosettanetContract.latest_class() !== undefined) {
    return true
  } else {
    return false
  }
}

export async function deployRosettaContracts() {
  if (isRosettaDeployed()) {
    console.log(
      'Rosettanet contracts are deployed. You can get addresses with getConfigurationProperty("rosettanet") or getConfigurationProperty("accountClass") function.',
    )
    console.log(
      'Rosettanet contract address: 0x37a66400579d7a1bbeec478d4b189b25e486a59b5f9ad1e4d5aa89b9bf9b002',
    )
    console.log(
      'Account class hash: 0xc050554bb686f9c5e6a9557a372fcc0d6e9a9cc15b3d080bd37b15ff67af17',
    )
    addConfigurationElement(
      'rosettanet',
      '0x37a66400579d7a1bbeec478d4b189b25e486a59b5f9ad1e4d5aa89b9bf9b002',
    )
    addConfigurationElement(
      'accountClass',
      '0xc050554bb686f9c5e6a9557a372fcc0d6e9a9cc15b3d080bd37b15ff67af17',
    )
  } else {
    let declareAccountContract
    let declareRosettaContract

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

    try {
      declareRosettaContract = await account1.declare({
        contract: compiledRosettaContractSierra,
        casm: compiledRosettanetContractCasm,
      })
    } catch {
      declareRosettaContract = {
        class_hash:
          '0xc050554bb686f9c5e6a9557a372fcc0d6e9a9cc15b3d080bd37b15ff67af17',
      }
    }

    const rosettanetWithUDC = account1.deployContract({
      classHash: declareRosettaContract.class_hash,
      salt: '0x1',
      unique: false,
      constructorCalldata: [
        declareAccountContract.class_hash,
        account1.address,
        configStrkAddress,
      ],
    })
    console.log(
      'Rosettanet contracts are deployed. You can get addresses with getConfigurationProperty("rosettanet") or getConfigurationProperty("accountClass") function.',
    )

    addConfigurationElement('rosettanet', (await rosettanetWithUDC).address)
    addConfigurationElement('accountClass', declareAccountContract.class_hash)
    console.log(
      'Rosettanet contract address:',
      (await rosettanetWithUDC).address,
    )
    console.log('Account class hash:', declareAccountContract.class_hash)
  }
}

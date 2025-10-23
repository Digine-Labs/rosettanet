import { initNode } from '../src/index'
import { promises as fs } from 'fs'
import path from 'path'
import { Abi, Account, BigNumberish, RpcProvider, uint256 } from 'starknet'
import { STRK_ADDRESS } from './constants'

export const testConfig = {
  appName: 'RosettaNet',
  port: 3000,
  host: 'localhost',
  rpcUrls: ['http://127.0.0.1:6050'],
  chainId: '0x52535453',
  accountClass:
    '0x04b7ccebfb848b8d8e62808718de698afcb529b36885c2927ae4fbafc5a18a81',
  ethAddress:
    '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
  strkAddress:
    '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
  rosettanet:
    '0x007288a71619eca9397bf0d3066d236b41de33fd6af3a420d16b2f55c93f8af7',
  validateFeeEstimator: "0x0",
  featureTarget: "0x0000000000000000000000004645415455524553",
  logging: {
    active: true,
    sniffer: true,
    output: 'file',
    minSeverity: '0',
    fileName: './e2e/logs.log',
    format: 'text',
  },
}

export type NodeConfig = typeof testConfig

// These values are used in the devnet setup script
// export const rpcList = ["https://free-rpc.nethermind.io/mainnet-juno/v0_7"]
// export const accountSeed = "1223632"

export const SERVER = 'http://localhost:3000'

export async function startNode() {
  try {
    await initNode('config.test.json')
  } catch (ex) {
    console.error(ex)
    process.exit(0)
  }
}

export async function loadContractJson(path: string) {
  try {
    const data = await fs.readFile(path, 'utf-8')
    const contractData = JSON.parse(data)

    return contractData
  } catch (error) {
    console.error('Error reading JSON file:', error)
    throw error
  }
}

export async function getContractAbi(contract: string): Promise<Abi> {
  try {
    const pt = path.resolve(
      __dirname,
      `../contracts/target/dev/rosettacontracts_${contract}.contract_class.json`,
    )
    const data = await fs.readFile(pt)
    const contractData = JSON.parse(data.toString('ascii'))

    return contractData.abi
  } catch (error) {
    console.error('Error reading JSON file:', error)
    throw error
  }
}

// Config must be json string
export async function updateNodeConfig(config: string) {
  try {
    const configFilePath = path.resolve(__dirname, '../config.test.json')

    await fs.writeFile(configFilePath, config, 'utf-8')
    console.log('Contracts deployed & Configuration updated.')
    return
  } catch (ex) {
    console.error('Error at updating node config:', ex)
    throw ex
  }
}


export async function readNodeConfig(): Promise<NodeConfig> {
  try {
    const configFilePath = path.resolve(__dirname, '../config.test.json')

    const config = await fs.readFile(configFilePath, 'utf-8')

    return JSON.parse(config)
  } catch (ex) {
    console.error('Error at updating node config:', ex)
    throw ex
  }
}

export function getDevAccount(): Account {
  const declarerPriv =
    '0x00000000000000000000000000000000fe317db4aee8695217388e90cdd050e4'
  const declarerAddress =
    '0x021f35b600929e4932fc7b0f7631e7e13457f822986cbdd8183c3c85718df880'
  const account = new Account(
    getProvider(),
    declarerAddress,
    declarerPriv,
    undefined,
    '0x3',
  )
  return account
}

export function getEthStrkHolderAccount(): Account {
  const account = new Account(
    getProvider(),
    '0x0431c9dc987fde5f7a88a0aff061082d2db737be7e81e9a6f090d7b03083b5ef',
    '0x00000000000000000000000000000000ce4a3adf51d4f7852c582b8e2b10df04',
    undefined,
    '0x3',
  )

  return account;
}

export async function sendStrksFromSnAccount(account: Account, recipient: string, amount: BigNumberish) {
  try {
    await account.execute({
      contractAddress: STRK_ADDRESS,
      entrypoint: 'transfer',
      calldata: [recipient, uint256.bnToUint256(amount).low, uint256.bnToUint256(amount).high]
    })
    return true
  } catch (e) {
    console.log(e);
    throw new Error("Failed to sendStrksFromSnAccount");
  }
}

export async function sendERC20FromSnAccount(account: Account, erc20Contract: string, recipient: string, amount: BigNumberish) {
  try {
    await account.execute({
      contractAddress: erc20Contract,
      entrypoint: 'transfer',
      calldata: [recipient, uint256.bnToUint256(amount).low, uint256.bnToUint256(amount).high]
    })
    return true
  } catch (e) {
    console.log(e);
    throw new Error("Failed to sendERC20FromSnAccount");
  }
}

export function getProvider(): RpcProvider {
  return new RpcProvider({
    nodeUrl: 'http://127.0.0.1:6050',
    specVersion: '0.8.1',
  })
}

export function fail(msg: string) {
  throw new Error(msg)
}

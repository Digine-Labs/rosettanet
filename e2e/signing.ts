import { Wallet, Transaction, JsonRpcProvider, ethers } from 'ethers'
import { promises as fs } from 'fs'
import path from 'path'

/**
 * Interface for Ethereum transaction signature
 */
export interface EthereumSignature {
  v: number
  r: string
  s: string
  networkV?: string
}

/**
 * Interface for a signed Ethereum transaction
 */
export interface EthereumTransaction {
  chainId?: string
  type?: string
  hash?: string
  nonce?: number
  gasLimit?: string
  maxFeePerGas?: string
  maxPriorityFeePerGas?: string
  from?: string
  to?: string
  publicKey?: string
  data: string
  value?: string
  signature: EthereumSignature
}

/**
 * Signs an EIP-1559 transaction with a private key
 * @param privateKey - The private key to sign with
 * @param transaction - Transaction parameters
 * @param nonce - Transaction nonce (optional, will be fetched if not provided)
 * @param provider - JSON RPC provider for fetching nonce (optional)
 * @returns Raw signed transaction string
 */
export async function signEip1559Transaction(
  privateKey: string,
  transaction: {
    to: string
    value?: string
    data?: string
    gasLimit?: string
    maxFeePerGas?: string
    maxPriorityFeePerGas?: string
    chainId?: string
  },
  nonce?: number,
  provider?: JsonRpcProvider
): Promise<string> {
  const wallet = new Wallet(privateKey)
  
  // If nonce is not provided and provider is available, fetch the nonce
  if (nonce === undefined && provider) {
    nonce = await provider.getTransactionCount(wallet.address)
  } else if (nonce === undefined) {
    throw new Error('Nonce must be provided if no provider is available')
  }
  
  // Create transaction object
  const tx = {
    to: transaction.to,
    value: transaction.value || '0x0',
    data: transaction.data || '0x',
    gasLimit: transaction.gasLimit || '0x100000',
    maxFeePerGas: transaction.maxFeePerGas || '0x1000000000',
    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas || '0x1000000000',
    nonce,
    type: 2, // EIP-1559
    chainId: transaction.chainId ? parseInt(transaction.chainId, 16) : 1,
  }
  
  return await wallet.signTransaction(tx)
}

/**
 * Signs a Legacy transaction with a private key
 * @param privateKey - The private key to sign with
 * @param transaction - Transaction parameters
 * @param nonce - Transaction nonce (optional, will be fetched if not provided)
 * @param provider - JSON RPC provider for fetching nonce (optional)
 * @returns Raw signed transaction string
 */
export async function signLegacyTransaction(
  privateKey: string,
  transaction: {
    to: string
    value?: string
    data?: string
    gasLimit?: string
    gasPrice?: string
    chainId?: string
  },
  nonce?: number,
  provider?: JsonRpcProvider
): Promise<string> {
  const wallet = new Wallet(privateKey)
  
  // If nonce is not provided and provider is available, fetch the nonce
  if (nonce === undefined && provider) {
    nonce = await provider.getTransactionCount(wallet.address)
  } else if (nonce === undefined) {
    throw new Error('Nonce must be provided if no provider is available')
  }
  
  // Create transaction object
  const tx = {
    to: transaction.to,
    value: transaction.value || '0x0',
    data: transaction.data || '0x',
    gasLimit: transaction.gasLimit || '0x100000',
    gasPrice: transaction.gasPrice || '0x1000000000',
    nonce,
    type: 0, // Legacy
    chainId: transaction.chainId ? parseInt(transaction.chainId, 16) : 1,
  }
  
  return await wallet.signTransaction(tx)
}

/**
 * Prepares calldata for a contract function call using ABI
 * @param contractAddress - The address of the contract
 * @param functionName - The name of the function to call
 * @param params - The parameters to pass to the function
 * @param abiPath - Path to the ABI JSON file (relative to e2e/abis)
 * @returns The encoded calldata
 */
export async function prepareCalldata(
  contractAddress: string,
  functionName: string,
  params: unknown[],
  abiPath: string
): Promise<string> {
  // Load ABI from file
  const abiFilePath = path.resolve(__dirname, 'abis', abiPath)
  const abiJson = await fs.readFile(abiFilePath, 'utf-8')
  const abi = JSON.parse(abiJson)
  
  // Create contract interface
  const iface = new ethers.Interface(abi)
  
  // Encode function call
  const calldata = iface.encodeFunctionData(functionName, params)
  
  return calldata
}

/**
 * Utility function to get the current nonce for an address
 * @param address - The address to get the nonce for
 * @param provider - JSON RPC provider
 * @returns The current nonce
 */
export async function getNonce(
  address: string,
  provider: JsonRpcProvider
): Promise<number> {
  return await provider.getTransactionCount(address)
}

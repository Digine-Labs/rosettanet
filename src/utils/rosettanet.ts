import { callStarknet } from './callHelper'
import {
  RosettanetRawCalldata,
  RPCResponse,
  SignedRawTransaction,
  StarknetRPCError,
} from '../types/types'
import { getConfigurationProperty } from './configReader'
import { isRPCResponse, isStarknetRPCError } from '../types/typeGuards'
import { hexPadding } from './padding'
import { writeLog } from '../logger'
import { safeU256ToUint256, U256ToUint256HexString } from './converters/integer'
import { getDeploymentResourceBounds } from './resourceBounds'
import { RosettanetAccountResult, AccountDeployResult, AccountDeployError } from '../types/types'

// Calls starknet factory contract to precalculate starknet account address
export async function getRosettaAccountAddress(
  ethAddress: string,
): Promise<RosettanetAccountResult> {
  const rosettanet = getConfigurationProperty('rosettanet')
  const callParams = [
    {
      calldata: [ethAddress],
      contract_address: rosettanet,
      entry_point_selector:
        '0x025356d5707a314336daf6636019fcd414e2403787a6dfb3eacc0c8450b341c8',
    },
    'pending',
  ]

  const response: RPCResponse | StarknetRPCError = await callStarknet({
    // todo handle error if string
    jsonrpc: '2.0',
    method: 'starknet_call',
    params: callParams,
    id: 1,
  })

  if (isStarknetRPCError(response)) {
    return <RosettanetAccountResult>{
      contractAddress: '',
      ethAddress: ethAddress,
      isDeployed: false,
    }
  }

  const precalculatedAddress = response.result[0].toString()

  const classHashCall: RPCResponse | StarknetRPCError = await callStarknet({
    jsonrpc: '2.0',
    method: 'starknet_getClassHashAt',
    params: {
      block_id: 'latest',
      contract_address: precalculatedAddress,
    },
    id: 2,
  })

  if (
    isStarknetRPCError(classHashCall) ||
    typeof classHashCall.result === 'undefined'
  ) {
    return <RosettanetAccountResult>{
      contractAddress: '',
      ethAddress: ethAddress,
      isDeployed: false,
    }
  }

  return <RosettanetAccountResult>{
    contractAddress: precalculatedAddress,
    ethAddress: ethAddress,
    isDeployed: true,
  }
}

export async function isRosettaAccountDeployed(
  snAddress: string,
  expectedClass: string,
): Promise<boolean> {
  const response: RPCResponse | StarknetRPCError = await callStarknet({
    jsonrpc: '2.0',
    id: 1,
    method: 'starknet_getClassHashAt',
    params: {
      block_id: 'latest',
      contract_address: snAddress,
    },
  })

  if (isStarknetRPCError(response)) {
    return false
  }

  return response.result === expectedClass
}




export async function deployRosettanetAccount(
  txn: SignedRawTransaction,
): Promise<AccountDeployResult | AccountDeployError> {
  const rosettanet = getConfigurationProperty('rosettanet')
  const accountClass = getConfigurationProperty('accountClass')
  //const gasPrice = txn.maxFeePerGas == null ? txn.gasPrice : txn.maxFeePerGas
  // const actualGasPrice = gasPrice == null ? '0x0' : gasPrice
  //console.log('MAX FEE: ' + txn.gasLimit.toString(16))
  //console.log('MAX price per unit: ' + actualGasPrice.toString(16))
  //const gasObject = getGasObject(txn)
  const resourceBounds = getDeploymentResourceBounds();
  const deployRequest = {
    // todo handle error if string
    jsonrpc: '2.0',
    method: 'starknet_addDeployAccountTransaction',
    params: {
      deploy_account_transaction: {
        type: 'DEPLOY_ACCOUNT',
        version: '0x3',
        signature: ['0x0'],
        nonce: '0x0',
        contract_address_salt: txn.from,
        class_hash: accountClass,
        constructor_calldata: [txn.from, rosettanet],
        resource_bounds: resourceBounds,
        tip: '0x0',
        paymaster_data: [],
        nonce_data_availability_mode: 'L1',
        fee_data_availability_mode: 'L1',
      },
    },
    id: 1,
  }
  const response: RPCResponse | StarknetRPCError =
    await callStarknet(deployRequest)

  /*
 {
    "jsonrpc": "2.0",
    "result": {
        "transaction_hash": "0xf1e9633377819a8941be313a4b54b5a0d7db66f42820ceb1af4b672d536854",
        "contract_address": "0x2292d3b1a3d6472fc63669d4a71a142dad5400100792c4b065358578e5d430"
    },
    "id": 1
}
 */
  if (!isRPCResponse(response)) {
    writeLog(2, 'deployRosettanetAccount respone is in wrong format')
    return response
  }

  if (
    typeof response.result['contract_address'] === 'string' &&
    typeof response.result['transaction_hash'] === 'string'
  ) {
    return <AccountDeployResult>{
      transactionHash: response.result.transaction_hash,
      contractAddress: response.result.contract_address,
    }
  }

  return <AccountDeployError>{
    code: -32700,
    message: 'Starknet RPC respond unexpected data format.',
  }
}

const nonceEntrypoint =
  '0x2b1577440dd7bedf920cb6de2f9fc6bf7ba98c78c85a3fa1f8311aac95e1759'

export async function getRosettanetAccountNonce(
  snAddress: string,
): Promise<string> {
  try {
    const response = await callStarknet({
      jsonrpc: '2.0',
      method: 'starknet_call',
      id: 123,
      params: {
        request: {
          contract_address: snAddress,
          calldata: [],
          entry_point_selector: nonceEntrypoint,
        },
        block_id: 'latest',
      },
    })

    if (isStarknetRPCError(response)) {
      throw response
    }

    if (Array.isArray(response.result)) {
      if (response.result.length > 0) {
        return response.result[0]
      } else {
        writeLog(1, 'getRosettanetAccountNonce response length zero')
        return '0x0'
      }
    } else {
      writeLog(1, 'getRosettanetAccountNonce response not array')
      return '0x0'
    }
  } catch (ex) {
    writeLog(1, 'Error at getRosettanetAccountNonce ' + (ex as Error).message)
    return '0x0'
  }
}

export function decodeCalldataInput(rawCalldata: string[]): { selector: string, rawInput: string } {
  const calldataLength = Number(BigInt(rawCalldata[9]))
  if (calldataLength == 0) {
    return {
      selector: '0x', rawInput: '0x'
    }
  }
  const selector = hexPadding(rawCalldata[10], 8)
  if (calldataLength == 1) {
    return {
      selector: selector, rawInput: selector
    }
  }
  let rawInput = `${selector}`
  for (let i = 1; i < calldataLength; i++) {
    const data = U256ToUint256HexString([rawCalldata[i + 11].replace('0x', ''), rawCalldata[i + 10].replace('0x', '')]).replace('0x', '');
    rawInput = rawInput + data
    i += 1;
  }

  return {
    selector,
    rawInput
  }
}

export function parseRosettanetRawCalldata(rawCalldata: string[]): RosettanetRawCalldata | undefined {
  if (rawCalldata.length >= 10) {
    const decodedCalldata = decodeCalldataInput(rawCalldata)
    return {
      txType: rawCalldata[0],
      to: rawCalldata[1],
      nonce: rawCalldata[2],
      maxPriorityFeePerGas: rawCalldata[3],
      maxFeePerGas: rawCalldata[4],
      gasPrice: rawCalldata[5],
      gasLimit: rawCalldata[6],
      value: safeU256ToUint256([rawCalldata[7], rawCalldata[8]]),
      selector: decodedCalldata.selector,
      rawInput: decodedCalldata.rawInput
    }
  }

  return undefined
}
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Transaction } from "ethers";
import { writeLog } from "../../logger";
import { isStarknetRPCError } from "../../types/typeGuards";
import { RosettanetRawCalldata, RPCError, RPCRequest, RPCResponse, StarknetRPCError } from "../../types/types";
import { callStarknet } from "../../utils/callHelper";
import { sumHexStrings } from "../../utils/converters/integer";
import { padHashTo64, padTo256Byte } from "../../utils/padding";
import { parseRosettanetRawCalldata, isRosettaAccountDeployed } from "../../utils/rosettanet";
import { getEthersTransactionFromRosettanetCall, getEthersTransactionFromStarknetCall } from "../../utils/signature";
import { TransactionWithHash, TransactionReceipt } from "starknet";
import { getConfigurationProperty } from "../../utils/configReader";

export async function getTransactionReceiptHandler(request: RPCRequest): Promise<RPCResponse | RPCError> {
  if (!Array.isArray(request.params)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter must be array',
      },
    }
  }
  if (request.params.length != 1) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Arguments must be length of 1',
      },
    }
  }

  const txHash = request.params[0] as string

  const starknetTxReceipt: RPCResponse | StarknetRPCError = await callStarknet({
    jsonrpc: request.jsonrpc,
    method: 'starknet_getTransactionReceipt',
    params: {
      transaction_hash: txHash,
    },
    id: request.id,
  })

  if (isStarknetRPCError(starknetTxReceipt)) {
    return <RPCError>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: starknetTxReceipt,
    }
  }

  const starknetTxDetails: RPCResponse | StarknetRPCError = await callStarknet({
    jsonrpc: request.jsonrpc,
    method: 'starknet_getTransactionByHash',
    params: {
      transaction_hash: txHash,
    },
    id: request.id,
  })



  if (isStarknetRPCError(starknetTxDetails)) {
    return <RPCError>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: starknetTxDetails,
    }
  }

  writeLog(0, JSON.stringify(starknetTxReceipt.result))
  writeLog(0, JSON.stringify(starknetTxDetails.result))

  const { blockHash, blockNumber, status } = parseTxReceipt(starknetTxReceipt.result);
  const { from, to, gasUsed, cumulativeGasUsed, effectiveGasPrice } = await parseTxDetails(starknetTxDetails.result);

  const txType = getTransactionType(starknetTxDetails.result)



  // Notice: In latest version we do not return deploy account tx hash to wallets. So we dont need to check for tx type
  // Todo: assert starknet response
  const receiptResponse = {
    blockHash,
    blockNumber,
    transactionHash: padHashTo64(txHash),
    status,
    type: txType,
    contractAddress: null,
    logs: [],
    logsBloom: padTo256Byte('0x0'), // Belki bu 256 bytelik 0 olmasi gerekiyordur ?
    from, to, gasUsed, cumulativeGasUsed, effectiveGasPrice, transactionIndex: '0x1'
  }

  return {
    jsonrpc: '2.0',
    id: request.id,
    result: receiptResponse
  }
}

// Inputs starknet_getTransactionByHash result
async function parseTxDetails(result: TransactionWithHash): Promise<{ from: string; to: string; gasUsed: string; cumulativeGasUsed: string; type: string; effectiveGasPrice: string }> {
  // from address await ile eth adres cekilmeli ama??
  const accountClass = getConfigurationProperty("accountClass")

  let ethersTx: Transaction | undefined

  const signature: string[] = ('signature' in result && result.signature ? result.signature : []) as string[]
  const calldata: string[] = ('calldata' in result && result.calldata ? result.calldata : []) as string[]
  const senderAddress: string = ('sender_address' in result && result.sender_address ? result.sender_address : '0x0') as string

  const isRosettanetAccount = await isRosettaAccountDeployed(senderAddress, accountClass)


  if (isRosettanetAccount) {
    ethersTx = getEthersTransactionFromRosettanetCall(signature, calldata)
  } else {
    console.log("123")
    ethersTx = getEthersTransactionFromStarknetCall(result)
  }
  const parsedCalldata: RosettanetRawCalldata | undefined = parseRosettanetRawCalldata(calldata)

  if (typeof parsedCalldata === 'undefined') {
    writeLog(2, 'Error at parsing RawCalldata')
    writeLog(2, JSON.stringify(calldata))
    return {
      gasUsed: '0x0', from: '0x0', to: '0x0', cumulativeGasUsed: '0x0', type: '0x0', effectiveGasPrice: '0x0'
    };
  }

  const type = parsedCalldata?.txType ? parsedCalldata.txType : (ethersTx?.type?.toString() ?? '0x0');
  const to = parsedCalldata?.to ? parsedCalldata.to : (ethersTx?.to ?? '0x0');
  const gasUsed = parsedCalldata?.gasLimit ? parsedCalldata.gasLimit : (ethersTx?.gasLimit ? '0x' + ethersTx.gasLimit.toString(16) : '0x0');
  const cumulativeGasUsed = sumHexStrings(gasUsed, gasUsed);
  const from = ethersTx?.from ?? '0x0'
  // Calculate gas price from calldata
  return {
    gasUsed, cumulativeGasUsed, from, to, type, effectiveGasPrice: ethersTx ? getEffectiveGasPrice(ethersTx) : '0x0'
  }
}

function getEffectiveGasPrice(tx: Transaction): string {
  if (tx.type == 2) {
    // EIP-1559
    const price = tx.maxFeePerGas;
    if (price) {
      return '0x' + price.toString(16)
    } else {
      return '0x0'
    }
  } else {
    // Legacy
    const price = tx.gasPrice;
    if (price) {
      return '0x' + price.toString(16)
    } else {
      return '0x0'
    }
  }
}

// Inputs starknet_getTransactionReceipt result
function parseTxReceipt(result: TransactionReceipt): { blockHash: string; blockNumber: string; transactionHash: string; status: string; events: any; } {
  const blockHash = typeof result.block_hash === 'string' ? padHashTo64(result.block_hash) : padHashTo64('0x0');
  const blockNumber = typeof result.block_number === 'number' ? '0x' + result.block_number.toString(16) : '0x0';
  const transactionHash = typeof result.transaction_hash === 'string' ? padHashTo64(result.transaction_hash) : padHashTo64('0x0');
  const status = typeof result.execution_status === 'string' ? getTransactionStatus(result.execution_status) : '0x0';
  const events = result.events;
  writeLog(2, 'tx status')
  writeLog(2, result.execution_status)
  return {
    blockHash, blockNumber, transactionHash, status, events
  }
}

function getTransactionStatus(exec_status: string): string {
  if (exec_status === 'REVERTED') {
    return '0x0'
  }

  return '0x1'
}

// Inputs starknet_getTransactionByHash result
function getTransactionType(txDetailsResult: TransactionWithHash): string {
  const calldata = 'calldata' in txDetailsResult ? txDetailsResult.calldata : [];
  if (!Array.isArray(calldata)) {
    return '0x0'
  }
  if (calldata.length == 0) {
    return '0x0'
  }

  if (calldata[0] === '0x0') {
    return '0x0'
  } else {
    return '0x2'
  }
}
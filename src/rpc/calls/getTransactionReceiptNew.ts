/* eslint-disable @typescript-eslint/no-explicit-any */
import { writeLog } from "../../logger";
import { isStarknetRPCError } from "../../types/typeGuards";
import { RosettanetRawCalldata, RPCError, RPCRequest, RPCResponse, StarknetRPCError } from "../../types/types";
import { callStarknet } from "../../utils/callHelper";
import { sumHexStrings } from "../../utils/converters/integer";
import { padHashTo64 } from "../../utils/padding";
import { parseRosettanetRawCalldata } from "../../utils/rosettanet";
import { getEthAddressFromSnAddress } from "../../utils/wrapper";

export async function getTransactionReceiptHandler(request: RPCRequest): Promise<RPCResponse | RPCError> {
    if(!Array.isArray(request.params)) {
        return {
            jsonrpc: request.jsonrpc,
            id: request.id,
            error: {
              code: -32602,
              message: 'Invalid argument, Parameter must be array',
            },
        }
    }
    if(request.params.length != 1) {
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

    if(isStarknetRPCError(starknetTxReceipt)) {
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

    if(isStarknetRPCError(starknetTxDetails)) {
      return <RPCError>{
        jsonrpc: request.jsonrpc,
        id: request.id,
        error: starknetTxDetails,
      }
    }

    const { blockHash, blockNumber, status, transactionHash, events } = parseTxReceipt(starknetTxReceipt.result);

    const txType = getTransactionType(starknetTxDetails.result)

    // Notice: In latest version we do not return deploy account tx hash to wallets. So we dont need to check for tx type
    // Todo: assert starknet response
    const receiptResponse = {
        blockHash,
        blockNumber,
        transactionHash,
        status,
        type: txType,
        contractAddress: null,
        logs : [],
        logsBloom: padHashTo64('0x0'), // Belki bu 256 bytelik 0 olmasi gerekiyordur ?
    }
}   

/*
    + "blockHash": "0x0a79eca9f5ca58a1d5d5030a0fabfdd8e815b8b77a9f223f74d59aa39596e1c7", 
    + "blockNumber": "0x11e5883",
    + "contractAddress": null,
    "cumulativeGasUsed": "0xc5f3e7",
    "effectiveGasPrice": "0xa45b9a444",
    "from": "0x690b9a9e9aa1c9db991c7721a92d351db4fac990",
    "gasUsed": "0x565f",
    + "logs": [],
    + "logsBloom": "0x00000000000000000000000000000000000100004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000",
    + "status": "0x1",
    "to": "0x388c818ca8b9251b393131c08a736a67ccb19297",
    + "transactionHash": "0x7114b4da1a6ed391d5d781447ed443733dcf2b508c515b81c17379dea8a3c9af",
    "transactionIndex": "0x76",
    "type": "0x2"
*/
// Inputs starknet_getTransactionByHash result
function parseTxDetails(result:any) {
  // from address await ile eth adres cekilmeli ama??
  
  const txType = getTransactionType(result);
  const parsedCalldata: RosettanetRawCalldata | undefined = parseRosettanetRawCalldata(result.calldata)

  if(typeof parsedCalldata === 'undefined') {
    writeLog(2, 'Error at parsing RawCalldata')
    writeLog(2, result.calldata)
    return;
  }

  const type = parsedCalldata.txType;
  const to = parsedCalldata.to;
  const gasUsed = parsedCalldata.gasLimit;
  const cumulativeGasUsed = sumHexStrings(gasUsed, gasUsed);
  // Calculate gas price from calldata
}

// Inputs starknet_getTransactionReceipt result
function parseTxReceipt(result: any): {blockHash:string; blockNumber:string; transactionHash: string; status:string; events:any;} {
  const blockHash = typeof result.block_hash === 'string' ? padHashTo64(result.block_hash) : padHashTo64('0x0');
  const blockNumber = typeof result.block_number === 'number' ? '0x' + result.block_number.toString(16) : '0x0';
  const transactionHash = typeof result.transaction_hash === 'string' ? padHashTo64(result.transaction_hash) : padHashTo64('0x0');
  const status = typeof result.execution_status === 'string' ? getTransactionStatus(result.execution_status) : '0x0';
  const events = result.events;

  return {
    blockHash, blockNumber, transactionHash, status, events
  }
}

function getTransactionStatus(exec_status: string): string {
  if(exec_status === 'REVERTED') {
    return '0x0'
  }

  return '0x1'
}

// Inputs starknet_getTransactionByHash result
function getTransactionType(txDetailsResult: any): string {
  const calldata = txDetailsResult?.calldata;
  if(!Array.isArray(calldata)) {
    return '0x0'
  }
  if(calldata.length == 0) {
    return '0x0'
  }

  if(calldata[0] === '0x0') {
    return '0x0'
  } else {
    return '0x2'
  }
}
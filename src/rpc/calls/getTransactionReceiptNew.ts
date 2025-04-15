import { RPCError, RPCRequest, RPCResponse, StarknetRPCError } from "../../types/types";
import { callStarknet } from "../../utils/callHelper";

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

    const starknetTxDetails: RPCResponse | StarknetRPCError = await callStarknet({
        jsonrpc: request.jsonrpc,
        method: 'starknet_getTransactionByHash',
        params: {
          transaction_hash: txHash,
        },
        id: request.id,
    })

    const txType = starknetTxDetails.calldata[0] as string === "0x2" ? "0x2" : "0x0"

    // Notice: In latest version we do not return deploy account tx hash to wallets. So we dont need to check for tx type
    // Todo: assert starknet response
    const receiptResponse = {
        blockHash: starknetTxReceipt.block_hash,
        blockNumber: starknetTxReceipt.block_number,
        transactionHash: starknetTxReceipt.transaction_hash,
        type: txType,
        
    }
}   

/*
    "blockHash": "0x0a79eca9f5ca58a1d5d5030a0fabfdd8e815b8b77a9f223f74d59aa39596e1c7",
    "blockNumber": "0x11e5883",
    "contractAddress": null,
    "cumulativeGasUsed": "0xc5f3e7",
    "effectiveGasPrice": "0xa45b9a444",
    "from": "0x690b9a9e9aa1c9db991c7721a92d351db4fac990",
    "gasUsed": "0x565f",
    "logs": [
      {
        "address": "0x388c818ca8b9251b393131c08a736a67ccb19297",
        "blockHash": "0x0a79eca9f5ca58a1d5d5030a0fabfdd8e815b8b77a9f223f74d59aa39596e1c7",
        "blockNumber": "0x11e5883",
        "data": "0x00000000000000000000000000000000000000000000000011b6b79503fb875d",
        "logIndex": "0x187",
        "removed": false,
        "topics": [
          "0x27f12abfe35860a9a927b465bb3d4a9c23c8428174b83f278fe45ed7b4da2662"
        ],
        "transactionHash": "0x7114b4da1a6ed391d5d781447ed443733dcf2b508c515b81c17379dea8a3c9af",
        "transactionIndex": "0x76"
      }
    ],
    "logsBloom": "0x00000000000000000000000000000000000100004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000",
    "status": "0x1",
    "to": "0x388c818ca8b9251b393131c08a736a67ccb19297",
    "transactionHash": "0x7114b4da1a6ed391d5d781447ed443733dcf2b508c515b81c17379dea8a3c9af",
    "transactionIndex": "0x76",
    "type": "0x2"
*/
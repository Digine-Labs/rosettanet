/* eslint-disable @typescript-eslint/no-explicit-any */
import { isHexString } from "ethers";
import { isStarknetRPCError } from "../../types/typeGuards";
import { RPCError, RPCRequest, RPCResponse } from "../../types/types";
import { callStarknet } from "../../utils/callHelper";
import { getConfigurationProperty } from "../../utils/configReader";
import { numberToHex } from "../../utils/converters/integer";
import { getLast160Bits } from "../../utils/padding";

export async function getBlockByHashHandler(request: RPCRequest): Promise<RPCResponse | RPCError>{
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
    if (request.params.length != 2) {
        return {
          jsonrpc: request.jsonrpc,
          id: request.id,
          error: {
            code: -32602,
            message: 'Invalid argument, Parameter length must be 2.',
          },
        }
    }
    
    /*
    Alttaki blocknumber ve burasi icin ayni olabilir
    latest ve pending parametre olarak gelebilir mi kontrol et ?
  const params =
    blockNumber === 'latest' || blockNumber === 'pending'
      ? [blockNumber]
      : isHexString(blockNumber)
        ? [{ block_number: parseInt(blockNumber, 16) }]
        : [{ block_number: blockNumber }]

    */

    const blockHash = request.params[0] as string;
    const txDetails = request.params[1] as boolean;

    const parameter = isHexString(blockHash) ? [{ block_hash: blockHash }] : [blockHash === "latest" ? blockHash : "pending"]

    let blockData;

    if(txDetails == false) {
      const response = await callStarknet({
        jsonrpc: request.jsonrpc,
        method: 'starknet_getBlockWithTxHashes',
        params: parameter,
        id: request.id,
      })

      if(isStarknetRPCError(response)) {
        return <RPCError>{
          jsonrpc: request.jsonrpc,
          id: request.id,
          error: response,
        }
      }

      blockData = response.result;
    } else {
      const response = await callStarknet({
        jsonrpc: request.jsonrpc,
        method: 'starknet_getBlockWithTxs',
        params: [{ block_hash: blockHash }],
        id: request.id,
      })

      if(isStarknetRPCError(response)) {
        return <RPCError>{
          jsonrpc: request.jsonrpc,
          id: request.id,
          error: response,
        }
      }
      blockData = response.result;
    }

    return parseBlockData(request, blockData, txDetails);
}

function parseBlockData(request: RPCRequest, starknetData: any, txDetails: boolean): RPCResponse {
  const baseFeePerGas = starknetData.l1_gas_price?.price_in_wei ?? '0x0';
  if(!txDetails) {
    const txList = starknetData.transactions;
    return <RPCResponse> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      result : {
        baseFeePerGas: baseFeePerGas, // Calculate from l1_gas_price
        blobGasUsed: "0xa0000", // use value like this
        difficulty: "0x0", // this value ok
        excessBlobGas: "0x1300000", // use value like this
        extraData: "0x546974616e2028746974616e6275696c6465722e78797a29", //??
        gasLimit: "0x223b56f", // maximum gas allowed in this block. Must be higher than 21000
        gasUsed: "0xef2614", // Sum of gas used in transactions
        hash: starknetData.block_hash, // block_hash
        logsBloom: "0xddf9f4006dd134869302a254c431b1d9ebd98ef2984794233f4d226865e6ce4f0db237e5b8df5537c9f75be64e1aafbe8f61dd699e51fab11561b6e8102e81445c64fd1e1bf38eea7b5b41785a52f8f8d86d95bf3566aa306397d4f7bb6e34071c6061498b7a38ae3006e42aa909ac43b23f85423d004dd8dfc665f60fbf63272c67c27914800319a0cc6d7c0bfe59244de9fd7de733364d4c61eee6d3337fe2cb074d62cff178962bda55ff5d81ec5a24c8ce922accd4d9976a8dd23c4ac6d029c2bf66d0af747323667fbac1e07804c7e7274c9620067427cf736a2a0a68c3243ae6c1b3e5c8c888fd9eb8bce1d8d31cbdc955dffeacf4734ba85e2088f7cb",
        miner: getLast160Bits(starknetData.sequencer_address), // sequencer_address but in eth format
        mixHash: "0xf89d2f938507b1113a61c12bc04baf572ba97386b7283861edaca8308d77b5a3", // ?? 
        nonce: "0x0000000000000000", // always zero after pow
        number: numberToHex(starknetData.block_number), // block_number
        parentBeaconBlockRoot: starknetData.new_root, // maybe parent_hash again?
        parentHash: starknetData.parent_hash, // parent_hash
        receiptsRoot: starknetData.new_root,
        sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347", // ??
        size: "0x14fa4", // Blocks size in bytes. Random value but non zero will work for sn
        stateRoot: starknetData.new_root, // new_root
        timestamp: numberToHex(starknetData.timestamp), // timestamp but in hex
        transactions: txList, // Only return tx hashes
        transactionsRoot: "0xeb565bb82a7fde4c8afbc83a68d2319ab2b27461d42b8748bcef5c8ffadc6b70",
        uncles: [],
        withdrawals: [],
        withdrawalsRoot: "0x1ef8c90ee7db9bc4929abdb8e6062dbcb7971d7ef02306ba72f0a61872ed493f"
      }
    }
  } else {
    const txList = starknetData.transactions.map((tx: any) => createTxObject(starknetData, tx));
    return <RPCResponse> {
      jsonrpc: request.jsonrpc,
      id: request.id,
      result : {
        baseFeePerGas: baseFeePerGas, // Calculate from l1_gas_price
        blobGasUsed: "0xa0000", // use value like this
        difficulty: "0x0", // this value ok
        excessBlobGas: "0x1300000", // use value like this
        extraData: "0x546974616e2028746974616e6275696c6465722e78797a29", //??
        gasLimit: "0x223b56f", // maximum gas allowed in this block. Must be higher than 21000
        gasUsed: "0xef2614", // Sum of gas used in transactions
        hash: starknetData.block_hash, // block_hash
        logsBloom: "0xddf9f4006dd134869302a254c431b1d9ebd98ef2984794233f4d226865e6ce4f0db237e5b8df5537c9f75be64e1aafbe8f61dd699e51fab11561b6e8102e81445c64fd1e1bf38eea7b5b41785a52f8f8d86d95bf3566aa306397d4f7bb6e34071c6061498b7a38ae3006e42aa909ac43b23f85423d004dd8dfc665f60fbf63272c67c27914800319a0cc6d7c0bfe59244de9fd7de733364d4c61eee6d3337fe2cb074d62cff178962bda55ff5d81ec5a24c8ce922accd4d9976a8dd23c4ac6d029c2bf66d0af747323667fbac1e07804c7e7274c9620067427cf736a2a0a68c3243ae6c1b3e5c8c888fd9eb8bce1d8d31cbdc955dffeacf4734ba85e2088f7cb",
        miner: getLast160Bits(starknetData.sequencer_address), // sequencer_address but in eth format
        mixHash: "0xf89d2f938507b1113a61c12bc04baf572ba97386b7283861edaca8308d77b5a3", // ?? 
        nonce: "0x0000000000000000", // always zero after pow
        number: numberToHex(starknetData.block_number), // block_number
        parentBeaconBlockRoot: starknetData.new_root, // maybe parent_hash again?
        parentHash: starknetData.parent_hash, // parent_hash
        receiptsRoot: starknetData.new_root,
        sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347", // ??
        size: "0x14fa4", // Blocks size in bytes. Random value but non zero will work for sn
        stateRoot: starknetData.new_root, // new_root
        timestamp: numberToHex(starknetData.timestamp), // timestamp but in hex
        transactions: txList, // Only return tx hashes
        transactionsRoot: "0xeb565bb82a7fde4c8afbc83a68d2319ab2b27461d42b8748bcef5c8ffadc6b70",
        uncles: [],
        withdrawals: [],
        withdrawalsRoot: "0x1ef8c90ee7db9bc4929abdb8e6062dbcb7971d7ef02306ba72f0a61872ed493f"
      }
    }
  }
}

function createTxObject(starknetData: any, tx: any): any {
  const gas = tx.version === "0x3" ? tx.resource_bounds.l1_gas.max_amount : '0x0'
  const r = typeof tx.signature[0] === "string" ? tx.signature[0] : '0x0'
  const s = typeof tx.signature[1] === "string" ? tx.signature[1] : '0x0'
  const chainId = getConfigurationProperty('chainId')
  return {
    blockHash: starknetData.block_hash,
    blockNumber: numberToHex(starknetData.block_number),
    from: getLast160Bits(starknetData.sender_address), // TODO: We cant fetch registry for each tx so this is temp solution here
    gas: gas,
    gasPrice: "0x8e2a40e26",
    maxPriorityFeePerGas: "0x8e2a40e26",
    maxFeePerGas: "0x8e2a40e26",
    hash: tx.transaction_hash,
    input: "0x389dba8c048cafcb6ce0729fb63f303b96ed3908475667a14cd337828323d0c",
    nonce: tx.nonce,
    to: getLast160Bits(starknetData.sender_address), // TODO: We cant parse starknet calldata now. So we return sender address here.
    transactionIndex: "0x0",
    value: "0x0",
    type: "0x2", // All txs returned as eip1559 by default. In further we may match with sn versions.
    accessList: [],
    chainId: chainId,
    v: "0x0",
    yParity: "0x0",
    r: r,
    s: s
  }
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isHexString } from "ethers";
import { isStarknetRPCError } from "../../types/typeGuards";
import { RPCError, RPCRequest, RPCResponse } from "../../types/types";
import { callStarknet } from "../../utils/callHelper";
import { getConfigurationProperty } from "../../utils/configReader";
import { numberToHex } from "../../utils/converters/integer";
import { getLast160Bits, padHashTo64 } from "../../utils/padding";

export async function getBlockByHashHandler(request: RPCRequest): Promise<RPCResponse | RPCError> {
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

  if (txDetails == false) {
    const response = await callStarknet({
      jsonrpc: request.jsonrpc,
      method: 'starknet_getBlockWithTxHashes',
      params: parameter,
      id: request.id,
    })

    if (isStarknetRPCError(response)) {
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

    if (isStarknetRPCError(response)) {
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

export function parseBlockData(request: RPCRequest, starknetData: any, txDetails: boolean): RPCResponse {
  const baseFeePerGas = starknetData.l1_gas_price?.price_in_wei ?? '0x0';
  if (!txDetails) {
    const txList = starknetData.transactions;
    return <RPCResponse>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: {
        baseFeePerGas: baseFeePerGas, // Calculate from l1_gas_price
        blobGasUsed: "0x60000", // use value like this
        difficulty: "0x0", // this value ok
        excessBlobGas: "0x40000", // use value like this
        extraData: "0x546974616e2028746974616e6275696c6465722e78797a29", //??
        gasLimit: "0x2ad4e1b", // maximum gas allowed in this block. Must be higher than 21000
        gasUsed: "0x1287e57", // Sum of gas used in transactions
        hash: padHashTo64(starknetData.block_hash), // block_hash
        logsBloom: "0x8ff5c7f3ed5369eb783b6e19ca6dfd1d9fb0e4701e16fa7806a50b71f6fe8fb39b5d4bb66ffd608e5377bbc1bf9ff7ffeebd9fff9edfa99dfbbe77dda5ff68d7dd4cf9dd366dbbaa7f3be6dbc07fecf3f1df37f573773d7999f97ef7da62b867d75f28be8ffe227e6d26d3b6ac3b5e7bb3aba4623cf59fdd7bc06f1f3bab147d1fe8abdbd7b6fd7ee5eb9767ee33b9eede077e71e7ddb1caefb167d775f7663ebef9f1ffbedf3a763b57b5e6feefbedca5f67effc9d77d663e595636ff2b7feffeda5adf4b50efcaaedb1e77fffd78bdd26f3e5f372f9fd19ece7183ebf4a75bbfbb7c6aebf84f66f0e6cecda7cb6dcf8779aca9e3fa72e558a1ba7e54f976ef",
        miner: getLast160Bits(starknetData.sequencer_address), // sequencer_address but in eth format
        mixHash: "0x91eb7c2391a1186eb62e36f389a61333fcf46700d691f641548aaa4cce9d84e5", // ?? 
        nonce: "0x0000000000000000", // always zero after pow
        number: numberToHex(starknetData.block_number), // block_number
        parentBeaconBlockRoot: padHashTo64(starknetData.new_root), // maybe parent_hash again?
        parentHash: padHashTo64(starknetData.parent_hash), // parent_hash
        receiptsRoot: padHashTo64(starknetData.new_root),
        sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347", // ??
        size: "0x1b736", // Blocks size in bytes. Random value but non zero will work for sn
        stateRoot: padHashTo64(starknetData.new_root), // new_root
        timestamp: numberToHex(starknetData.timestamp), // timestamp but in hex
        transactions: txList, // Only return tx hashes
        transactionsRoot: "0xc00f25d59d5698d341d492876705c5810ddaac56ee81d683a7e911b4d63bdafe",
        uncles: [],
        withdrawals: [],
        withdrawalsRoot: "0xd508086310ca9344eec43a7e56dc362675ed3436ee5b1e6a060a9c0df81b4c5d"
      }
    }
  } else {
    const txList = starknetData.transactions.map((tx: any) => createTxObject(starknetData, tx));
    return <RPCResponse>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: {
        baseFeePerGas: baseFeePerGas, // Calculate from l1_gas_price
        blobGasUsed: "0x60000", // use value like this
        difficulty: "0x0", // this value ok
        excessBlobGas: "0x40000", // use value like this
        extraData: "0x546974616e2028746974616e6275696c6465722e78797a29", //??
        gasLimit: "0x2ad4e1b", // maximum gas allowed in this block. Must be higher than 21000
        gasUsed: "0x1287e57", // Sum of gas used in transactions
        hash: padHashTo64(starknetData.block_hash), // block_hash
        logsBloom: "0x8ff5c7f3ed5369eb783b6e19ca6dfd1d9fb0e4701e16fa7806a50b71f6fe8fb39b5d4bb66ffd608e5377bbc1bf9ff7ffeebd9fff9edfa99dfbbe77dda5ff68d7dd4cf9dd366dbbaa7f3be6dbc07fecf3f1df37f573773d7999f97ef7da62b867d75f28be8ffe227e6d26d3b6ac3b5e7bb3aba4623cf59fdd7bc06f1f3bab147d1fe8abdbd7b6fd7ee5eb9767ee33b9eede077e71e7ddb1caefb167d775f7663ebef9f1ffbedf3a763b57b5e6feefbedca5f67effc9d77d663e595636ff2b7feffeda5adf4b50efcaaedb1e77fffd78bdd26f3e5f372f9fd19ece7183ebf4a75bbfbb7c6aebf84f66f0e6cecda7cb6dcf8779aca9e3fa72e558a1ba7e54f976ef",
        miner: getLast160Bits(starknetData.sequencer_address), // sequencer_address but in eth format
        mixHash: "0x91eb7c2391a1186eb62e36f389a61333fcf46700d691f641548aaa4cce9d84e5", // ?? 
        nonce: "0x0000000000000000", // always zero after pow
        number: numberToHex(starknetData.block_number), // block_number
        parentBeaconBlockRoot: padHashTo64(starknetData.new_root), // maybe parent_hash again?
        parentHash: padHashTo64(starknetData.parent_hash), // parent_hash
        receiptsRoot: padHashTo64(starknetData.new_root),
        sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347", // ??
        size: "0x1b736", // Blocks size in bytes. Random value but non zero will work for sn
        stateRoot: padHashTo64(starknetData.new_root), // new_root
        timestamp: numberToHex(starknetData.timestamp), // timestamp but in hex
        transactions: txList, // Only return tx hashes
        transactionsRoot: "0xc00f25d59d5698d341d492876705c5810ddaac56ee81d683a7e911b4d63bdafe",
        uncles: [],
        withdrawals: [],
        withdrawalsRoot: "0xd508086310ca9344eec43a7e56dc362675ed3436ee5b1e6a060a9c0df81b4c5d"
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
    blockHash: padHashTo64(starknetData.block_hash),
    blockNumber: numberToHex(starknetData.block_number),
    from: getLast160Bits(tx.sender_address), // TODO: We cant fetch registry for each tx so this is temp solution here
    gas: gas,
    gasPrice: "0x8e2a40e26",
    maxPriorityFeePerGas: tx.resource_bounds.l2_gas.max_amount,
    maxFeePerGas: tx.resource_bounds.l2_gas.max_price_per_unit,
    hash: padHashTo64(tx.transaction_hash),
    input: "0x0", // We cant parse starknet calldata now. So we return 0x0 here.
    nonce: tx.nonce,
    to: getLast160Bits(tx.sender_address), // TODO: We cant parse starknet calldata now. So we return sender address here.
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
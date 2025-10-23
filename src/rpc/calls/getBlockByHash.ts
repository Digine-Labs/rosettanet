import { isHexString } from "ethers";
import { isStarknetRPCError } from "../../types/typeGuards";
import { RPCError, RPCRequest, RPCResponse } from "../../types/types";
import { callStarknet } from "../../utils/callHelper";
import { getConfigurationProperty } from "../../utils/configReader";
import { numberToHex } from "../../utils/converters/integer";
import { getLast160Bits, padHashTo64 } from "../../utils/padding";
import { BlockWithTxs, BlockWithTxHashes, TXN } from "@starknet-io/types-js";

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

export function parseBlockData(request: RPCRequest, starknetData: BlockWithTxs | BlockWithTxHashes, txDetails: boolean): RPCResponse {
  const baseFeePerGas = starknetData.l1_gas_price?.price_in_wei ?? '0x0';
  if (!txDetails) {
    const txList = (starknetData as BlockWithTxHashes).transactions;
    return <RPCResponse>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: {
        baseFeePerGas: baseFeePerGas,
        blobGasUsed: "0x60000",
        difficulty: "0x0",
        excessBlobGas: "0x40000",
        extraData: "0x546974616e2028746974616e6275696c6465722e78797a29",
        gasLimit: "0x2ad4e1b",
        gasUsed: "0x1287e57",
        hash: padHashTo64(starknetData.block_hash ?? '0x0'),
        logsBloom: "0x8ff5c7f3ed5369eb783b6e19ca6dfd1d9fb0e4701e16fa7806a50b71f6fe8fb39b5d4bb66ffd608e5377bbc1bf9ff7ffeebd9fff9edfa99dfbbe77dda5ff68d7dd4cf9dd366dbbaa7f3be6dbc07fecf3f1df37f573773d7999f97ef7da62b867d75f28be8ffe227e6d26d3b6ac3b5e7bb3aba4623cf59fdd7bc06f1f3bab147d1fe8abdbd7b6fd7ee5eb9767ee33b9eede077e71e7ddb1caefb167d775f7663ebef9f1ffbedf3a763b57b5e6feefbedca5f67effc9d77d663e595636ff2b7feffeda5adf4b50efcaaedb1e77fffd78bdd26f3e5f372f9fd19ece7183ebf4a75bbfbb7c6aebf84f66f0e6cecda7cb6dcf8779aca9e3fa72e558a1ba7e54f976ef",
        miner: getLast160Bits(starknetData.sequencer_address ?? '0x0'),
        mixHash: "0x91eb7c2391a1186eb62e36f389a61333fcf46700d691f641548aaa4cce9d84e5",
        nonce: "0x0000000000000000",
        number: numberToHex(starknetData.block_number ?? 0),
        parentBeaconBlockRoot: padHashTo64(starknetData.new_root ?? '0x0'),
        parentHash: padHashTo64(starknetData.parent_hash ?? '0x0'),
        receiptsRoot: padHashTo64(starknetData.new_root ?? '0x0'),
        sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        size: "0x1b736",
        stateRoot: padHashTo64(starknetData.new_root ?? '0x0'),
        timestamp: numberToHex(starknetData.timestamp ?? 0),
        transactions: txList,
        transactionsRoot: "0xc00f25d59d5698d341d492876705c5810ddaac56ee81d683a7e911b4d63bdafe",
        uncles: [],
        withdrawals: [],
        withdrawalsRoot: "0xd508086310ca9344eec43a7e56dc362675ed3436ee5b1e6a060a9c0df81b4c5d"
      }
    }
  } else {
    const txList = (starknetData as BlockWithTxs).transactions.map((tx: TXN) => createTxObject(starknetData, tx));
    return <RPCResponse>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      result: {
        baseFeePerGas: baseFeePerGas,
        blobGasUsed: "0x60000",
        difficulty: "0x0",
        excessBlobGas: "0x40000",
        extraData: "0x546974616e2028746974616e6275696c6465722e78797a29",
        gasLimit: "0x2ad4e1b",
        gasUsed: "0x1287e57",
        hash: padHashTo64(starknetData.block_hash ?? '0x0'),
        logsBloom: "0x8ff5c7f3ed5369eb783b6e19ca6dfd1d9fb0e4701e16fa7806a50b71f6fe8fb39b5d4bb66ffd608e5377bbc1bf9ff7ffeebd9fff9edfa99dfbbe77dda5ff68d7dd4cf9dd366dbbaa7f3be6dbc07fecf3f1df37f573773d7999f97ef7da62b867d75f28be8ffe227e6d26d3b6ac3b5e7bb3aba4623cf59fdd7bc06f1f3bab147d1fe8abdbd7b6fd7ee5eb9767ee33b9eede077e71e7ddb1caefb167d775f7663ebef9f1ffbedf3a763b57b5e6feefbedca5f67effc9d77d663e595636ff2b7feffeda5adf4b50efcaaedb1e77fffd78bdd26f3e5f372f9fd19ece7183ebf4a75bbfbb7c6aebf84f66f0e6cecda7cb6dcf8779aca9e3fa72e558a1ba7e54f976ef",
        miner: getLast160Bits(starknetData.sequencer_address ?? '0x0'),
        mixHash: "0x91eb7c2391a1186eb62e36f389a61333fcf46700d691f641548aaa4cce9d84e5",
        nonce: "0x0000000000000000",
        number: numberToHex(starknetData.block_number ?? 0),
        parentBeaconBlockRoot: padHashTo64(starknetData.new_root ?? '0x0'),
        parentHash: padHashTo64(starknetData.parent_hash ?? '0x0'),
        receiptsRoot: padHashTo64(starknetData.new_root ?? '0x0'),
        sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        size: "0x1b736",
        stateRoot: padHashTo64(starknetData.new_root ?? '0x0'),
        timestamp: numberToHex(starknetData.timestamp ?? 0),
        transactions: txList,
        transactionsRoot: "0xc00f25d59d5698d341d492876705c5810ddaac56ee81d683a7e911b4d63bdafe",
        uncles: [],
        withdrawals: [],
        withdrawalsRoot: "0xd508086310ca9344eec43a7e56dc362675ed3436ee5b1e6a060a9c0df81b4c5d"
      }
    }
  }
}

function createTxObject(starknetData: BlockWithTxs | BlockWithTxHashes, tx: TXN): Record<string, unknown> {
  const txAny = tx as Record<string, unknown>
  const gas = tx.version === "0x3" && 'resource_bounds' in tx ? (tx.resource_bounds as {l1_gas: {max_amount: string}}).l1_gas.max_amount : '0x0'
  const signature = 'signature' in tx ? tx.signature as string[] : []
  const r = typeof signature[0] === "string" ? signature[0] : '0x0'
  const s = typeof signature[1] === "string" ? signature[1] : '0x0'
  const chainId = getConfigurationProperty('chainId')

  const senderAddress = 'sender_address' in tx ? (tx.sender_address as string) : '0x0'
  const transactionHash = 'transaction_hash' in tx ? (tx.transaction_hash as string) : '0x0'
  const nonce = 'nonce' in tx ? txAny.nonce : '0x0'
  const resourceBounds = 'resource_bounds' in tx ? (tx.resource_bounds as {l2_gas: {max_amount: string, max_price_per_unit: string}}) : {l2_gas: {max_amount: '0x0', max_price_per_unit: '0x0'}}

  return {
    blockHash: padHashTo64(starknetData.block_hash ?? '0x0'),
    blockNumber: numberToHex(starknetData.block_number ?? 0),
    from: getLast160Bits(senderAddress),
    gas: gas,
    gasPrice: "0x8e2a40e26",
    maxPriorityFeePerGas: resourceBounds.l2_gas.max_amount,
    maxFeePerGas: resourceBounds.l2_gas.max_price_per_unit,
    hash: padHashTo64(transactionHash),
    input: "0x0",
    nonce: nonce,
    to: getLast160Bits(senderAddress),
    transactionIndex: "0x0",
    value: "0x0",
    type: "0x2",
    accessList: [],
    chainId: chainId,
    v: "0x0",
    yParity: "0x0",
    r: r,
    s: s
  }
}
import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'

export async function getTransactionsByBlockHashAndIndexHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  const network = 'testnet'
  const method = 'starknet_getBlockWithTxs'

  if (request.params.length != 2) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'two params are expected',
    }
  }

  // Extract the blockHash and index from the request parameters.
  const blockHash = request.params[0] as string;
  const index = parseInt(request.params[1] as string, 16) // Convert index from hex to integer.

  const response: RPCResponse | string = await callStarknet(network, {
    jsonrpc: request.jsonrpc,
    method,
    params: [blockHash],
    id: request.id,
  })

  if (typeof response === 'string') {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: response,
    }
  }

  // Check if the response contains an error property
  if ('error' in response) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Starknet RPC error',
    }
  }

  const result = response.result as {
    block_hash: string;
    block_number: number;
    l1_gas_price: {
      price_in_wei: string;
    };
    new_root: string;
    parent_hash: string;
    sequencer_address: string;
    starknet_version: string;
    status: 'ACCEPTED_ON_L2';
    timestamp: number;
    transactions: Array<{
      calldata: string[];
      max_fee: string;
      nonce: string;
      sender_address: string;
      signature: string[];
      transaction_hash: string;
      type: 'INVOKE';
      version: string;
    }>;
  };


  // Attempt to retrieve the specified transaction by index.
  const transaction = result.transactions[index];

  if (!transaction) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Transaction index out of bounds',
    }
  }

  // Construct the Ethereum-like response, mapping StarkNet transaction details.
  return {
    jsonrpc: '2.0',
    id: request.id,
    result: {
      blockHash: blockHash,
      blockNumber: '0x' + result.block_number.toString(16),
      from: transaction.sender_address,
      gas: '0x0', // Placeholder, as StarkNet transactions don't directly map to gas.
      gasPrice: '0x0', // Placeholder, StarkNet transactions use a different fee model.
      hash: transaction.transaction_hash,
      input: '0x' + transaction.calldata.join(''), // Concatenate calldata for simplicity.
      nonce: '0x' + parseInt(transaction.nonce).toString(16),
      to: '0x', // StarkNet transactions may not always have a direct 'to' field.
      transactionIndex: '0x' + index.toString(16),
      value: '0x0', // StarkNet transactions don't directly map to ETH value transfers.
      v: '0x0', // Placeholder, as StarkNet signatures are different.
      r: '0x0', // Placeholder, as StarkNet signatures are different.
      s: '0x0', // Placeholder, as StarkNet signatures are different.
    },
  }
}

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
  // Check if the block is pending by looking for pending-specific properties
  const isPendingBlock = (block: any): boolean => {
    // Check for required pending block properties
    return 'parent_hash' in block && 'timestamp' in block && 'sequencer_address' in block &&
          'l1_gas_price' in block && 'starknet_version' in block;
  };

  if (isPendingBlock(response.result)) {
    // If it's a pending block, return an error response
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'The block is still pending. Pending blocks cannot be processed.',
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
    status: 'RECEIVED' | 'REJECTED' | 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1';
    timestamp: number;
    transactions: Array<{
      calldata: string[];
      max_fee: string;
      nonce: string;
      sender_address: string;
      signature: string[];
      transaction_hash: string;
      type: 'DECLARE' | 'DEPLOY' | 'DEPLOY_ACCOUNT' | 'INVOKE' | 'L1_HANDLER';
      version: string;
    }>;
  };

  if (result.status !== 'ACCEPTED_ON_L1' && result.status !== 'ACCEPTED_ON_L2') { // Check if the block is accepted
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'The block is not accepted',
    }
  }

  // Attempt to retrieve the specified transaction by index.
  const transaction = result.transactions[index];

  if (!transaction) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Transaction index out of bounds',
    }
  }

  // Map StarkNet signature components to Ethereum's v, r, s
  const signature = transaction.signature; // Assuming this is an array of FELT values
  let v = '0x1b'; // Placeholder, as StarkNet does not have a direct 'v' equivalent, or use `0x1c` (27 or 28)
  let r = signature.length > 0 ? signature[0] : '0x0'; // Map the first signature element to 'r'
  let s = signature.length > 1 ? signature[1] : '0x0'; // Map the second signature element to 's'

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
      v: v,
      r: r,
      s: s,
    },
  }
}

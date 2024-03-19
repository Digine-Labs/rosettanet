import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { validateBlockHash } from '../../utils/validations'

export async function getTransactionReceiptHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  const network = 'mainnet'
  const method = 'starknet_getTransactionReceipt'

  if (request.params.length != 1) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'one param is expected',
    }
  }

  // Get the transaction hash from the request parameters.
  const txHash = request.params[0] as string;

  // Validate the tx hash
  if (!validateBlockHash(txHash)) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid tx hash',
    }
  }

  const response: RPCResponse | string = await callStarknet(network, {
    jsonrpc: request.jsonrpc,
    method:method,
    params: [txHash],
    id: request.id,
  })
  

  if (!response || typeof response === 'string') {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: response || 'No response from StarkNet',
    }
  }
  

  const result = response.result as {
    type: 'INVOKE' | 'L1_HANDLER' | 'DECLARE' | 'DEPLOY' | 'DEPLOY_ACCOUNT'
    transaction_hash: string;
    actual_fee: {
      amount:string,
      unit:'WEI',  
    };
    finality_status: "RECEIVED" | "REJECTED" | "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1";
    block_hash : string;
    block_number: number;
    messages_sent: Array<{
      to_address: string,
      paylod: Array<string>,
    }>;
    events: Array<{
      from_address: string,
      keys: Array<string>,
      data: Array<string>,
    }>;
    id: number,
    contract_address: string,
  };

  if (result.finality_status !== 'ACCEPTED_ON_L1' && result.finality_status !== 'ACCEPTED_ON_L2') { // Check if the tx accepted
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'The block is not accepted',
    }
  }

  const mapped = result.events.map((event) => ({
      address: event.from_address,
      blockHash: result.block_hash,
      topics:['0x0'],
      data:{
        keys: event.keys,
        data: event.data,
      },
      blockNumber:result.block_number,
      transactionHash: result.transaction_hash,
      transactionIndex:'0x1',
      logIndex:'0x1',
      removed: false,
    }));


  // Construct the Ethereum-like response, mapping StarkNet transaction details.
  return {
    id: request.id,
    jsonrpc: '2.0',
    result: {
      transactionHash:result.transaction_hash,
      transactionIndex: '0x1', // String value
      blockNumber: result.block_number, // String value
      blockHash: result.block_hash, // String value
      cumulativeGasUsed: '0x33bc', // Mock value, unfortunately
      gasUsed: result.actual_fee.amount,
      contractAddress: result.contract_address || null, // No contract address in type:'INVOKE'. If type is invoke, this will return null.
      logs: mapped,
      logsBloom:'0x00000000000000000000000000000000000100004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000', // The mechanism for indexing and querying these events in Starknet does not rely on a Bloom filter. Starknet doesn't return any
      status: '0x1', 

    },
  }
}

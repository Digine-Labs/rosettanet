import { RPCResponse,RPCError, RPCRequest } from "../../types/types";
import { callStarknet } from '../../utils/callHelper'
import { validateBlockHash } from '../../utils/validations'


export async function getTransactionReceipt(
    request:RPCRequest,
): Promise<RPCRequest,RPCError>{
    const network = 'testnet';
    const method = 'starknet_getTransactionReceipt';

    if(request.params.length != 1){
        return {
            code: 7979,
            message: 'Starknet RPC error',
            data: 'no parameters returned',
          }
    }

    const blockHash = request.params[0] as string;


    if (!validateBlockHash(blockHash)) {
        return {
        code: 7979,
        message: 'Starknet RPC error',
        data: 'Invalid block hash',
        }
    }

    const response: RPCResponse | string = await callStarknet(network, {
        jsonrpc: request.jsonrpc,
        method,
        params: [{ block_hash: blockHash }],
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

    result.transactions.forEach(async transaction => {
        
        const hash = transaction.transaction_hash

        const transactionReceipt: RPCResponse | string = await callStarknet('testnet', {
            jsonrpc: request.jsonrpc,
            method : "starknet_getTransactionReceipt",
            params :[hash],
            id : request.id
        })
    }
    )


    // Get the transaction recipt of this transaction
    const transactionReceipt: RPCResponse | string = await callStarknet('testnet', {
        jsonrpc: request.jsonrpc,
        method: 'starknet_getTransactionReceipt',
        params: [hash],
        id: request.id,
    })

    if (typeof transactionReceipt === 'string') {
        return {
        code: 7979,
        message: 'Starknet RPC error',
        data: transactionReceipt,
        }
  }


    return {
        jsonrpc: '2.0',
        id: 1,
        result: transactionReceipt,
    }

    // #KeepStarknetStrange
}

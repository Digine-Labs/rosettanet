import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { validateBlockNumber } from '../../utils/validations'

export async function getBlockByNumberHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  // Define the network and method
  const network = 'testnet'

  // Check params' length
  if (request.params.length != 2) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter lenght should be 2.',
      },
    }
  }

  // Get the block hash
  const blockNumber = request.params[0] as string | number

  // Validate the block hash
  if (!validateBlockNumber(blockNumber)) {
    // TODO: check validation
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Invalid block number.',
      },
    }
  }

  // Get the boolean parameter and check its type
  const isFullTxObjectRequested = request.params[1]

  if (typeof isFullTxObjectRequested != 'boolean') {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message:
          'Invalid argument, Invalid parameter[1] type. Expected boolean',
      },
    }
  }

  const params =
    typeof blockNumber === 'string'
      ? [blockNumber]
      : [{ block_number: blockNumber }]

  if (isFullTxObjectRequested == true) {
    const method = 'starknet_getBlockWithTxs'

    const response: RPCResponse | string = await callStarknet(network, {
      jsonrpc: request.jsonrpc,
      method,
      params,
      id: request.id,
    })

    // Check response
    if (
      typeof response == 'string' ||
      response == null ||
      response == undefined
    ) {
      return {
        jsonrpc: request.jsonrpc,
        id: request.id,
        error: {
          code: -32602,
          message: response,
        },
      }
    }

    // Construct the result with types
    const result = response.result as {
      block_hash: string
      block_number: number
      l1_gas_price: {
        price_in_wei: string
      }
      new_root: string
      parent_hash: string
      sequencer_address: string
      starknet_version: string
      status: 'RECEIVED' | 'REJECTED' | 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1'
      timestamp: number
      transactions: Array<{
        calldata: string[]
        max_fee: string
        nonce: string
        sender_address: string
        signature: string[]
        transaction_hash: string
        type: 'DECLARE' | 'DEPLOY' | 'DEPLOY_ACCOUNT' | 'INVOKE' | 'L1_HANDLER'
        version: string
      }>
    }

    if (
      result.status !== 'ACCEPTED_ON_L1' &&
      result.status !== 'ACCEPTED_ON_L2'
    ) {
      // Check if the block is accepted
      return {
        jsonrpc: request.jsonrpc,
        id: request.id,
        error: {
          code: -32002,
          message: 'Resource unavailable, Block is not accepted yet.',
        },
      }
    }

    const transactions = result.transactions.map((transaction, index) => {
      return {
        accessList: [],
        blockHash: result.block_hash,
        blockNumber: '0x' + result.block_number.toString(16),
        chainId: '0x0', // No chainId field returned by StarkNet
        from: transaction.sender_address,
        gas: '0x0', // No gas field can be retrieved from given methods
        gasPrice: '0x' + result.l1_gas_price.price_in_wei,
        hash: transaction.transaction_hash,
        input: '0x' + transaction.calldata?.join(''), // Concatenate calldata for simplicity.
        maxFeePerGas: transaction.max_fee || '0x0', // maxFeePerGas field may not be returned by StarkNet
        maxPriorityFeePerGas: '0x0', // No maxPriorityFeePerGas field returned by StarkNet
        nonce: '0x' + parseInt(transaction.nonce).toString(16),
        r: transaction.signature?.length > 0 ? transaction.signature[0] : '0x0', // Map the first signature element to 'r'
        s: transaction.signature?.length > 1 ? transaction.signature[1] : '0x0', // Map the first signature element to 's'
        to: '0x0', // StarkNet transactions may not always have a direct 'to' field.
        transactionIndex: '0x' + index.toString(16),
        type: transaction.type,
        v: '0x1b', // Placeholder, as StarkNet does not have a direct 'v' equivalent, or use `0x1c` (27 or 28)
        value: '0x0', // StarkNet transactions don't directly map to ETH value transfers.
      }
    })

    return {
      jsonrpc: '2.0',
      id: request.id,
      result: {
        number: '0x' + result.block_number.toString(16), // 'number' is the block number in hex format
        difficulty: '0x0', // StarkNet does not work in PoW
        extraData: '0x0', // StarkNet does not work in PoW
        gasLimit: '0x0', // Gas metrics in StarkNet are more focused on individual transactions
        gasUsed: '0x0', // Gas metrics in StarkNet are more focused on individual transactions
        hash: result.block_hash,
        logsBloom: '0x0', // The mechanism for indexing and querying these events in Starknet does not rely on a Bloom filter
        miner: '0x0', // StarkNet does not work in PoW
        mixHash: '0x0', // StarkNet does not work in PoW
        nonce: '0x0', // The nonce here demonstrates computational work, which is not applicable to StarkNet
        parentHash: result.parent_hash,
        receiptsRoot: '0x0', // No receiptsRoot field returned by StarkNet
        sha3Uncles: '0x0', // Uncles are the mechanism for rewarding miners in PoW, which is not applicable to StarkNet
        size: '0x0', // No size field returned by StarkNet
        stateRoot: '0x' + result.new_root,
        timestamp: '0x' + result.timestamp.toString(16),
        totalDifficulty: '0x0', // StarkNet does not work in PoW
        transactions: transactions,
        transactionsRoot: '0x0', // No transactionsRoot field returned by StarkNet
        uncles: [], // Uncles are the mechanism for rewarding miners in PoW, which is not applicable to StarkNet
      },
    }
  } else {
    const method = 'starknet_getBlockWithTxHashes'

    const response: RPCResponse | string = await callStarknet(network, {
      jsonrpc: request.jsonrpc,
      method,
      params,
      id: request.id,
    })

    // Check response
    if (
      typeof response == 'string' ||
      response == null ||
      response == undefined
    ) {
      return {
        jsonrpc: request.jsonrpc,
        id: request.id,
        error: {
          code: -32602,
          message: response,
        },
      }
    }

    // Construct the result with types
    const result = response.result as {
      block_hash: string
      block_number: number
      l1_gas_price: {
        price_in_wei: string
      }
      new_root: string
      parent_hash: string
      sequencer_address: string
      starknet_version: string
      status: 'RECEIVED' | 'REJECTED' | 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1'
      timestamp: number
      transactions: string[]
    }

    return {
      jsonrpc: '2.0',
      id: request.id,
      result: {
        number: '0x' + result.block_number.toString(16), // 'number' is the block number in hex format
        difficulty: '0x0', // StarkNet does not work in PoW
        extraData: '0x0', // StarkNet does not work in PoW
        gasLimit: '0x0', // Gas metrics in StarkNet are more focused on individual transactions
        gasUsed: '0x0', // Gas metrics in StarkNet are more focused on individual transactions
        hash: result.block_hash,
        logsBloom: '0x0', // The mechanism for indexing and querying these events in Starknet does not rely on a Bloom filter
        miner: '0x0', // StarkNet does not work in PoW
        mixHash: '0x0', // StarkNet does not work in PoW
        nonce: '0x0', // The nonce here demonstrates computational work, which is not applicable to StarkNet
        parentHash: result.parent_hash,
        receiptsRoot: '0x0', // No receiptsRoot field returned by StarkNet
        sha3Uncles: '0x0', // Uncles are the mechanism for rewarding miners in PoW, which is not applicable to StarkNet
        size: '0x0', // No size field returned by StarkNet
        stateRoot: '0x' + result.new_root,
        timestamp: '0x' + result.timestamp.toString(16),
        totalDifficulty: '0x0', // StarkNet does not work in PoW
        transactions: result.transactions,
        transactionsRoot: '0x0', // No transactionsRoot field returned by StarkNet
        uncles: [], // Uncles are the mechanism for rewarding miners in PoW, which is not applicable to StarkNet
      },
    }
  }
}

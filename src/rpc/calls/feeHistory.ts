import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { validateBlockNumber } from '../../utils/validations'

export async function feeHistoryHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  const blockCount = request.params[0] as number
  const newestBlock = request.params[1] as string | number

  if (blockCount === undefined || newestBlock === undefined) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter lenght should be 2.',
      },
    }
  } // Validate block count

  if (blockCount < 1 || blockCount > 1024) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message:
          'Invalid argument, blockCount out of range. Expected range is between 1 and 1024.',
      },
    }
  } // Validate block number

  if (!validateBlockNumber(newestBlock)) {
    return {
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Invalid block number.',
      },
    }
  }

  return {
    jsonrpc: '2.0',
    id: request.id,
    result: {
      oldestBlock: 10762137,
      reward: [
        ['0x4a817c7ee', '0x4a817c7ee'],
        ['0x773593f0', '0x773593f5'],
        ['0x0', '0x0'],
        ['0x773593f5', '0x773bae75'],
      ],
      baseFeePerGas: ['0x12', '0x10', '0x10', '0xe', '0xd'],
      gasUsedRatio: [0.026089875, 0.406803, 0, 0.0866665],
    },
  }
}

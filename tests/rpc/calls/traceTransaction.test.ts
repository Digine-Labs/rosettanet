import { traceTransactionHandler } from '../../../src/rpc/calls/traceTransaction'
import { RPCResponse } from '../../../src/types/types'

describe('Test traceTransaction', () => {
  it('Returns object, checks response', async () => {
    const request = {
      id: 1,
      jsonrpc: '2.0',
      method: 'starknet_traceTransaction',
      params: [
        '0x02ca8ff9bf256b4552b99c1ca8cac370aa6387eb4cfce2ea682e4a355d99b524',
      ],
    }
    const starkResult: RPCResponse = <RPCResponse>(
      await traceTransactionHandler(request)
    )

    expect(typeof starkResult.result).toBe('object')
    expect(starkResult.result).toStrictEqual([
      {
        action: {
          callType: 'CALL',
          from: '0x0',
          gas: '0x0',
          input: [
            '0x1',
            '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
            '0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e',
            '0x3',
            '0x3dcb14ca2e71c0148fa69ff84b70f01ff09e078e89339ededb96f5f3fd5c90',
            '0x58d15e17628000',
            '0x0',
          ],
          to: '0x324b04e5a4270605007334372ce455c47581e51cdd091559df2739d1c4e2677',
        },
        blockHash: '0x0',
        blockNumber: '0x0',
        result: { gasUsed: '0x0', output: ['0x1', '0x1', '0x1'] },
        subtraces: 0,
        traceAddress: [],
        transactionHash:
          '0x02ca8ff9bf256b4552b99c1ca8cac370aa6387eb4cfce2ea682e4a355d99b524',
        transactionPosition: 0,
        type: 'CALL',
      },
      {
        action: {
          callType: 'CALL',
          from: '0x324b04e5a4270605007334372ce455c47581e51cdd091559df2739d1c4e2677',
          gas: '0x0',
          input: [
            '0x3dcb14ca2e71c0148fa69ff84b70f01ff09e078e89339ededb96f5f3fd5c90',
            '0x58d15e17628000',
            '0x0',
          ],
          to: '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
        },
        blockHash: '0x0',
        blockNumber: '0x0',
        result: { gasUsed: '0x0', output: ['0x1'] },
        subtraces: 0,
        traceAddress: [],
        transactionHash:
          '0x02ca8ff9bf256b4552b99c1ca8cac370aa6387eb4cfce2ea682e4a355d99b524',
        transactionPosition: 0,
        type: 'CALL',
      },
    ])
  })
})

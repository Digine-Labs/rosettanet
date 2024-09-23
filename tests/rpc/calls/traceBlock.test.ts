import { traceBlockHandler } from '../../../src/rpc/calls/traceBlock'
import { RPCResponse } from '../../../src/types/types'

describe('Test trace_block', () => {
  it('Returns trace block answer', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'trace_block',
      params: ['0x1172'],
      id: 1,
    }
    const result: RPCResponse = <RPCResponse>await traceBlockHandler(request)
    expect(typeof result.result).toBe('object')
    expect(result.result).toStrictEqual([
      {
        action: {
          from: '0x0',
          callType: 'CALL',
          input: [
            '0x2',
            '0x267311365224e8d4eb4dd580f1b737f990dfc81112ca71ecce147e774bcecb',
            '0xf818e4530ec36b83dfe702489b4df537308c3b798b0cc120e32c2056d68b7d',
            '0x0',
            '0x0',
            '0xa3d19d9e80d74dd6140fed379e2c10a21609374811b244cc9d7d1f6d9e0037',
            '0x19a35a6e95cb7a3318dbb244f20975a1cd8587cc6b5259f15f61d7beb7ee43b',
            '0x0',
            '0x2',
            '0x2',
            '0x197b9913e67947b0605934ec72db497d341a0199282c1da6d4aae46b17e0e76',
            '0x146f520197134bbea4454630fd36b88262cfc043ddd01647c7c452e5ee3f1ea',
          ],
          to: '0x60664b576dae484dc3430ed3b1036e7879712e2c2c2728f568b8dbcbbc0f655',
        },
        blockHash: '0x0',
        blockNumber: '0x1172',
        result: { gasUsed: '0x0', output: [] },
        subtraces: 4,
        traceAddress: [],
        transactionHash:
          '0x17d2d2553a9ef35c43d309895e104b49fdb02015284c78acad89577258e45bb',
        transactionPosition: 0,
        type: 'CALL',
      },
      {
        action: {
          from: '0x0',
          callType: 'CALL',
          input: [
            '0x2',
            '0x267311365224e8d4eb4dd580f1b737f990dfc81112ca71ecce147e774bcecb',
            '0x1072fa630c537b7c9577ccb2aacb2803600d02266543fab0cc18f238708e198',
            '0x0',
            '0x1',
            '0x61c2931e7212bcc3b2e6c16805f15ceecebaad19fb3521c6b0761d063e6a1cd',
            '0x27a4a7332e590dd789019a6d125ff2aacd358e453090978cbf81f0d85e4c045',
            '0x1',
            '0x2',
            '0x3',
            '0x1072fa630c537b7c9577ccb2aacb2803600d02266543fab0cc18f238708e198',
            '0x482d672e49afe97707cbcf93798fcb438a72f74677107ff91f608a4b26c71cd',
            '0x57917b132c7929e7836c75107cd2672d2c4eb55d50e3eaf1676189238ba971b',
          ],
          to: '0x60664b576dae484dc3430ed3b1036e7879712e2c2c2728f568b8dbcbbc0f655',
        },
        blockHash: '0x0',
        blockNumber: '0x1172',
        result: { gasUsed: '0x0', output: [] },
        subtraces: 2,
        traceAddress: [],
        transactionHash:
          '0x23332450b701e01222476f76395bf8324ef3b80edf6afedd7c6834b7678deed',
        transactionPosition: 0,
        type: 'CALL',
      },
      {
        action: {
          from: '0x0',
          callType: 'CALL',
          input: [
            '0x2',
            '0x197b9913e67947b0605934ec72db497d341a0199282c1da6d4aae46b17e0e76',
            '0x317eb442b72a9fae758d4fb26830ed0d9f31c8e7da4dbff4e8c59ea6a158e7f',
            '0x0',
            '0x4',
            '0x197b9913e67947b0605934ec72db497d341a0199282c1da6d4aae46b17e0e76',
            '0x218f305395474a84a39307fa5297be118fe17bf65e27ac5e2de6617baa44c64',
            '0x4',
            '0x2',
            '0x6',
            '0x351936b786189cce43257dedae66aebb8dc61c38e16572ef24fdb2d7eedddd2',
            '0x2',
            '0xe83d5f4eafd2156473ecc0127f108f99d552a3b947e335810235933b481061',
            '0x501ee9e8b6bd19ca8372b3c15458352c51b9ecd34948516ebe728615a5d9bab',
            '0xa3d19d9e80d74dd6140fed379e2c10a21609374811b244cc9d7d1f6d9e0037',
            '0x1',
          ],
          to: '0x60664b576dae484dc3430ed3b1036e7879712e2c2c2728f568b8dbcbbc0f655',
        },
        blockHash: '0x0',
        blockNumber: '0x1172',
        result: { gasUsed: '0x0', output: [] },
        subtraces: 6,
        traceAddress: [],
        transactionHash:
          '0x406c659b7e77a9a6b4db667f6f240bf634b49111114465f00a390cfb74bf9fa',
        transactionPosition: 0,
        type: 'CALL',
      },
    ])
  })
})

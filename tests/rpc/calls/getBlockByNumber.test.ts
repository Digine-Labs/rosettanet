import { getBlockByNumberHandler } from '../../../src/rpc/calls/getBlockByNumber'
import { RPCResponse } from '../../../src/types/types'

describe('Test getBlockByNumber', () => {
  it('returns an RPC error if the block number is invalid', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: [-9832, false],
      id: 0,
    }

    const starkResult: RPCResponse = <RPCResponse>(
      await getBlockByNumberHandler(request)
    )
    expect(starkResult).toMatchObject({
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Invalid block number.',
      },
    })
  })

  it('returns an RPC error if the number of parameters is not 2', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: [false],
      id: 0,
    }

    const starkResult: RPCResponse = <RPCResponse>(
      await getBlockByNumberHandler(request)
    )
    expect(starkResult).toMatchObject({
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter lenght should be 2.',
      },
    })
  })

  it('returns an RPC error if the second parameter is not a boolean', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: [1024, 'true'],
      id: 0,
    }

    const starkResult: RPCResponse = <RPCResponse>(
      await getBlockByNumberHandler(request)
    )
    expect(starkResult).toMatchObject({
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message:
          'Invalid argument, Invalid parameter[1] type. Expected boolean',
      },
    })
  })

  it('returns block information with tx objects if true', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: [1024, true],
      id: 0,
    }

    const response: RPCResponse = <RPCResponse>(
      await getBlockByNumberHandler(request)
    )

    expect(typeof response.result).toBe('object')
    expect(response).toMatchObject({
      jsonrpc: '2.0',
      id: 0,
      result: {
        number: '0x400',
        difficulty: '0x0',
        extraData: '0x0',
        gasLimit: '0x0',
        gasUsed: '0x0',
        hash: '0xd6c2fc4d5ae8e6b6369ca0d8e653702bd3b53099b4393121e12c02a7d0af00',
        logsBloom: '0x0',
        miner: '0x0',
        mixHash: '0x0',
        nonce: '0x0',
        parentHash:
          '0x7c5a436ed84a9c969852ccb04fbce720b990c1e63159c2f00ee8ea307ec90aa',
        receiptsRoot: '0x0',
        sha3Uncles: '0x0',
        size: '0x0',
        stateRoot:
          '0x0x6ff056e8005a0437a85aedfe316f3662b5e0514e706af0c8875bac498a1e912',
        timestamp: '0x6569f05c',
        totalDifficulty: '0x0',
        transactions: [
          {
            accessList: [],
            blockHash:
              '0xd6c2fc4d5ae8e6b6369ca0d8e653702bd3b53099b4393121e12c02a7d0af00',
            blockNumber: '0x400',
            chainId: '0x0',
            from: '0x60664b576dae484dc3430ed3b1036e7879712e2c2c2728f568b8dbcbbc0f655',
            gas: '0x0',
            gasPrice: '0x0x46c15245',
            hash: '0x78b4a4d2f8806ae4d2d47cdefb3c385df5b71edb46c0b6e7416d08866a68eab',
            input:
              '0x0x10xa3d19d9e80d74dd6140fed379e2c10a21609374811b244cc9d7d1f6d9e00370x218f305395474a84a39307fa5297be118fe17bf65e27ac5e2de6617baa44c640x00x20x20x197b9913e67947b0605934ec72db497d341a0199282c1da6d4aae46b17e0e760x1',
            maxFeePerGas: '0x2386f26fc10000',
            maxPriorityFeePerGas: '0x0',
            nonce: '0xcd3',
            r: '0x134ffcd17cd791894550ecf188cafc7f7bd8d414b4c33b57ea73e3aaa762d96',
            s: '0x3afbfbba3e5fded20b5c642b7e208e76569a8f95dfa5ba9beb7843aa848cb55',
            to: '0x0',
            transactionIndex: '0x0',
            type: 'INVOKE',
            v: '0x1b',
            value: '0x0',
          },
          {
            accessList: [],
            blockHash:
              '0xd6c2fc4d5ae8e6b6369ca0d8e653702bd3b53099b4393121e12c02a7d0af00',
            blockNumber: '0x400',
            chainId: '0x0',
            from: '0x60664b576dae484dc3430ed3b1036e7879712e2c2c2728f568b8dbcbbc0f655',
            gas: '0x0',
            gasPrice: '0x0x46c15245',
            hash: '0x729965217dfff60d40307dd4ba3fd22ba19f5348f12ed6adda07e6c750da75',
            input:
              '0x0x10x61c2931e7212bcc3b2e6c16805f15ceecebaad19fb3521c6b0761d063e6a1cd0x5df99ae77df976b4f0e5cf28c7dcfe09bd6e81aab787b19ac0c08e03d928cf0x00x10x10x660f5572d19526d61901f7fac8acffeb3cdf175c6374ff1feb5292ab357c785',
            maxFeePerGas: '0x2386f26fc10000',
            maxPriorityFeePerGas: '0x0',
            nonce: '0xcd4',
            r: '0x339fd06848efcb00f7cd5d19b336a5b6092c305ad4760d8cba7b381c005fd7',
            s: '0x6aedef48cadde1f373776c364ab3ffd177e1d5c964c4a5011ce0f27d44a9d22',
            to: '0x0',
            transactionIndex: '0x1',
            type: 'INVOKE',
            v: '0x1b',
            value: '0x0',
          },
          {
            accessList: [],
            blockHash:
              '0xd6c2fc4d5ae8e6b6369ca0d8e653702bd3b53099b4393121e12c02a7d0af00',
            blockNumber: '0x400',
            chainId: '0x0',
            from: '0x60664b576dae484dc3430ed3b1036e7879712e2c2c2728f568b8dbcbbc0f655',
            gas: '0x0',
            gasPrice: '0x0x46c15245',
            hash: '0x585f91abe9d2df3e8ba718da6266374111eadf7ff7eff63f39aae49c9332350',
            input:
              '0x0x20xa3d19d9e80d74dd6140fed379e2c10a21609374811b244cc9d7d1f6d9e00370x317eb442b72a9fae758d4fb26830ed0d9f31c8e7da4dbff4e8c59ea6a158e7f0x00x40x61c2931e7212bcc3b2e6c16805f15ceecebaad19fb3521c6b0761d063e6a1cd0x2468d193cd15b621b24c2a602b8dbcfa5eaa14f88416c40c09d7fd12592cb4b0x40x00x40x2021c44c84cabfce8f64d4eac16b17725daad348d005cb8f9c46bdf73b87d030x20x71d6ac45f28190e306d118cad843767902d76aa4f4fb97abe07db244b0e87d00x7e6727cdb1a238edf6f9a7605b494437443a50a8afbdec15a1b521841fb0f32',
            maxFeePerGas: '0x2386f26fc10000',
            maxPriorityFeePerGas: '0x0',
            nonce: '0xcd5',
            r: '0x41a10e21440e2e7b3c3b81a7720ea58f3823529d4131df0a089c90e6f6ec0ec',
            s: '0x64d884e87de01ffe598df8af65621c60ff6f8dfc8a82b90b56e7cc5f17c3c0d',
            to: '0x0',
            transactionIndex: '0x2',
            type: 'INVOKE',
            v: '0x1b',
            value: '0x0',
          },
        ],
        transactionsRoot: '0x0',
        uncles: [],
      },
    })
  })

  it('returns block information with tx objects if false', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: [1024, false],
      id: 0,
    }

    const response: RPCResponse = <RPCResponse>(
      await getBlockByNumberHandler(request)
    )

    expect(typeof response.result).toBe('object')
    expect(response).toMatchObject({
      jsonrpc: '2.0',
      id: 0,
      result: {
        number: '0x400',
        difficulty: '0x0',
        extraData: '0x0',
        gasLimit: '0x0',
        gasUsed: '0x0',
        hash: '0xd6c2fc4d5ae8e6b6369ca0d8e653702bd3b53099b4393121e12c02a7d0af00',
        logsBloom: '0x0',
        miner: '0x0',
        mixHash: '0x0',
        nonce: '0x0',
        parentHash:
          '0x7c5a436ed84a9c969852ccb04fbce720b990c1e63159c2f00ee8ea307ec90aa',
        receiptsRoot: '0x0',
        sha3Uncles: '0x0',
        size: '0x0',
        stateRoot:
          '0x0x6ff056e8005a0437a85aedfe316f3662b5e0514e706af0c8875bac498a1e912',
        timestamp: '0x6569f05c',
        totalDifficulty: '0x0',
        transactions: [
          '0x78b4a4d2f8806ae4d2d47cdefb3c385df5b71edb46c0b6e7416d08866a68eab',
          '0x729965217dfff60d40307dd4ba3fd22ba19f5348f12ed6adda07e6c750da75',
          '0x585f91abe9d2df3e8ba718da6266374111eadf7ff7eff63f39aae49c9332350',
        ],
        transactionsRoot: '0x0',
        uncles: [],
      },
    })
  })
})

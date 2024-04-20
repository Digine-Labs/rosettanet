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
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid block number',
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
      code: 7979,
      message: 'Starknet RPC error',
      data: 'two params are expected',
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
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid parameter type at index 1. Expected a boolean',
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
      id: '0',
      result: {
        number: '0x400',
        difficulty: '0x0',
        extraData: '0x0',
        gasLimit: '0x0',
        gasUsed: '0x0',
        hash: '0x3b0e201d0c177bd51954bfdbdb7e950e57e0c4b1c58a0852a4255588419f761',
        logsBloom: '0x0',
        miner: '0x0',
        mixHash: '0x0',
        nonce: '0x0',
        parentHash:
          '0x2bef410afe94e0e82b5aef96b939118639828db214b8ded0de989b951ed9ebf',
        receiptsRoot: '0x0',
        sha3Uncles: '0x0',
        size: '0x0',
        stateRoot:
          '0x0x6ae8cad2202ca18cfc766ea14b5c5d80ad08e0230606634bc144eec1be4160c',
        timestamp: '0x6193f0d3',
        totalDifficulty: '0x0',
        transactions: [
          {
            accessList: [],
            blockHash:
              '0x3b0e201d0c177bd51954bfdbdb7e950e57e0c4b1c58a0852a4255588419f761',
            blockNumber: '0x400',
            chainId: '0x0',
            gas: '0x0',
            gasPrice: '0x0x0',
            hash: '0x66a17587c119e60e0946d75ca3567688de6fbae35ac819f84cef1cd8d67d842',
            input:
              '0x0x635e69431c9d6b6a26e5a32a9b8fb7c6f0da4d73515073886d993b0fb6589160x3b75104c977456e645f8b2d4bdb2c78e138eb4c9f52133d319ac71d03f1eddc',
            maxFeePerGas: '0x0',
            maxPriorityFeePerGas: '0x0',
            nonce: '0xNaN',
            r: '0x0',
            s: '0x0',
            to: '0x0',
            transactionIndex: '0x0',
            type: 'INVOKE',
            v: '0x1b',
            value: '0x0',
          },
          {
            accessList: [],
            blockHash:
              '0x3b0e201d0c177bd51954bfdbdb7e950e57e0c4b1c58a0852a4255588419f761',
            blockNumber: '0x400',
            chainId: '0x0',
            gas: '0x0',
            gasPrice: '0x0x0',
            hash: '0x782fcd4ed225a79fd6f5e2c8cc7d8e84cc6189ec8b0a2b02e2db23f083b33eb',
            input: '0xundefined',
            maxFeePerGas: '0x0',
            maxPriorityFeePerGas: '0x0',
            nonce: '0xNaN',
            r: '0x0',
            s: '0x0',
            to: '0x0',
            transactionIndex: '0x1',
            type: 'DEPLOY',
            v: '0x1b',
            value: '0x0',
          },
          {
            accessList: [],
            blockHash:
              '0x3b0e201d0c177bd51954bfdbdb7e950e57e0c4b1c58a0852a4255588419f761',
            blockNumber: '0x400',
            chainId: '0x0',
            gas: '0x0',
            gasPrice: '0x0x0',
            hash: '0x37a08f3d9630233e39e0178bb75918328efd25d0929ead010987a81c2943b4c',
            input:
              '0x0x7cd9ed94c7074aa006103e7e79e2d324a641d132fcad262dba6c3aac402fe780xbd7daa40535813d892224da817610f4c7e6fe8983abe588a4227586262d9d30x10x7cd9ed94c7074aa006103e7e79e2d324a641d132fcad262dba6c3aac402fe78',
            maxFeePerGas: '0x0',
            maxPriorityFeePerGas: '0x0',
            nonce: '0xNaN',
            r: '0x0',
            s: '0x0',
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

  it('returns block information with tx objects if true', async () => {
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
      id: '0',
      result: {
        number: '0x400',
        difficulty: '0x0',
        extraData: '0x0',
        gasLimit: '0x0',
        gasUsed: '0x0',
        hash: '0x3b0e201d0c177bd51954bfdbdb7e950e57e0c4b1c58a0852a4255588419f761',
        logsBloom: '0x0',
        miner: '0x0',
        mixHash: '0x0',
        nonce: '0x0',
        parentHash:
          '0x2bef410afe94e0e82b5aef96b939118639828db214b8ded0de989b951ed9ebf',
        receiptsRoot: '0x0',
        sha3Uncles: '0x0',
        size: '0x0',
        stateRoot:
          '0x0x6ae8cad2202ca18cfc766ea14b5c5d80ad08e0230606634bc144eec1be4160c',
        timestamp: '0x6193f0d3',
        totalDifficulty: '0x0',
        transactions: [
          '0x66a17587c119e60e0946d75ca3567688de6fbae35ac819f84cef1cd8d67d842',
          '0x782fcd4ed225a79fd6f5e2c8cc7d8e84cc6189ec8b0a2b02e2db23f083b33eb',
          '0x37a08f3d9630233e39e0178bb75918328efd25d0929ead010987a81c2943b4c',
        ],
        transactionsRoot: '0x0',
        uncles: [],
      },
    })
  })
})

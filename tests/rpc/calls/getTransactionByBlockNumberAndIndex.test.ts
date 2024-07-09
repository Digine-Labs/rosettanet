import { getTransactionsByBlockNumberAndIndexHandler } from '../../../src/rpc/calls/getTransactionByBlockNumberAndIndex'
import { RPCError, RPCResponse } from '../../../src/types/types'

describe('Test getTransactionByBlockNumberAndIndex', () => {
  it('Returns transaction details for a valid request', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionByBlockNumberAndIndex',
      params: ['0x3B90', '0x03'],
      id: 0,
    }

    const starknetResult: RPCResponse = <RPCResponse>(
      await getTransactionsByBlockNumberAndIndexHandler(request)
    )

    expect(typeof starknetResult.result).toBe('object')
    expect(starknetResult).toMatchObject({
      jsonrpc: '2.0',
      id: 0,
      result: {
        blockHash:
          '0x363475b3d6fadcd48b00065a099cc234828b747689cc467e9ee42d27f5ddcbd',
        blockNumber: '0x3b90',
        from: '0x35acd6dd6c5045d18ca6d0192af46b335a5402c02d41f46e4e77ea2c951d9a3',
        gas: '0xcfa17a2973f1',
        gasPrice: '0x0xecb2ab0a9',
        hash: '0x144474f59b9ac6571b752de4e2c11ba7f68b5ad058df8630baaa3f77044c171',
        input:
          '0x0x20x6359ed638df79b82f2f9dbf92abbcb41b57f9dd91ead86b1c85d2dee192c0x27a4a7332e590dd789019a6d125ff2aacd358e453090978cbf81f0d85e4c0450x20x8675d7b97e21933ab59d0e850277cd6d359d46fe1e89c65690d027749ef9a10x30e07fc1e48e738bd6cbda532e2cf48bb806121760715635584e093125c00a0x47ad6a25df680763e5663bd0eba3d2bfd18b24b1e8f6bd36b71c37433c63ed00x218f305395474a84a39307fa5297be118fe17bf65e27ac5e2de6617baa44c640x20x4d0b88ace5705bb7825f91ee95557d906600b7e7762f5615e6a4f407185a43a0x0',
        nonce: '0x6ded',
        to: '0x',
        transactionIndex: '0x3',
        value: '0x0',
        v: '0x1b',
        r: '0x3aad049678fb9db171e8db11749f12fe230ce80ed7ebcf6516dcc2af43e42e',
        s: '0x7d40f82eb41212201ba94de58aed13fff2a724e2f8ead03a3231414bbeb1254',
      },
    })
  })

  it('Returns RPC error message when invalid block number', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionByBlockNumberAndIndex',
      params: ['-1', '0x03'],
      id: 0,
    }

    const starknetResult: RPCResponse = <RPCResponse>(
      await getTransactionsByBlockNumberAndIndexHandler(request)
    )

    expect(starknetResult).toMatchObject({
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Invalid block number.',
      },
    })
  })

  it('Returns RPC error when invalid transaction index is used', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionByBlockNumberAndIndex',
      params: [
        '15248',
        '0xZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
      ],
      id: 0,
    }

    const starknetResult: RPCResponse = <RPCResponse>(
      await getTransactionsByBlockNumberAndIndexHandler(request)
    )
    expect(starknetResult).toMatchObject({
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Invalid block number.',
      },
    })
  })

  it('Returns error if parameter list is empty', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionsByBlockNumberAndIndex',
      params: [],
      id: 0,
    }
    const response: RPCError = <RPCError>(
      await getTransactionsByBlockNumberAndIndexHandler(request)
    )
    expect(response).toMatchObject({
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Parameter lenght should be 2.',
      },
    })
  })

  it('Returns error if block number is non-existent', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionsByBlockNumberAndIndex',
      params: ['0x1000000000000', '0x03'],
      id: 1,
    }
    const response: RPCError = <RPCError>(
      await getTransactionsByBlockNumberAndIndexHandler(request)
    )
    expect(response).toMatchObject({
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32002,
        message: 'Resource unavailable, Empty result body.',
      },
    })
  })
})

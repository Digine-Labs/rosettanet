import { getCodeHandler } from '../../../src/rpc/calls/getCode'
import { RPCResponse } from '../../../src/types/types'

describe('Test getCodeHandler', () => {
  it('Returns class hash for a valid request', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getCode',
      params: ['0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc7', 63232],
      id: 0,
    }

    const starknetRes: RPCResponse = <RPCResponse>await getCodeHandler(request)

    expect(typeof starknetRes.result).toBe('string')
    expect(starknetRes.result).toBe(
      '0x7f3777c99f3700505ea966676aac4a0d692c2a9f5e667f4c606b51ca1dd3420',
    )
  })

  it('Returns empty result for non-existant eth address', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getCode',
      params: ['0x94750381bE1AbA0504C666ee1DB118F68f0780D4', 960987],
      id: 0,
    }

    const starknetRes: RPCResponse = <RPCResponse>await getCodeHandler(request)

    expect(typeof starknetRes.result).toBeNull
    expect(starknetRes.result).toBeNull
  }, 10000)

  it('Returns empty result for non-existant block number', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getCode',
      params: ['0x94750381bE1AbA0504C666ee1DB118F68f0780D4', -1],
      id: 0,
    }

    const starknetRes: RPCResponse = <RPCResponse>await getCodeHandler(request)

    expect(starknetRes).toMatchObject({
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message: 'Invalid argument, Invalid block number.',
      },
    })
  })

  it('Returns error message for invalid eth address', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getCode',
      params: ['0xfffffffffffffffffffffffffffffffffff', 960987],
      id: 0,
    }

    const starknetRes: RPCResponse = <RPCResponse>await getCodeHandler(request)

    expect(starknetRes).toMatchObject({
      jsonrpc: request.jsonrpc,
      id: request.id,
      error: {
        code: -32602,
        message:
          'Invalid argument, Parameter[0] should be a valid Ethereum Address.',
      },
    })
  })
})

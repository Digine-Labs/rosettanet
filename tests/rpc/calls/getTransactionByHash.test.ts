import { getTransactionsByHashHandler } from '../../../src/rpc/calls/getTransactionByHash'
import { RPCResponse, RPCError } from '../../../src/types/types'

describe('Test getTransactionByHash', () => {
  it('Returns transaction details for a valid request', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionByHash',
      params: [
        '0x0314db5d42b3fc701274ee49060c6d9eabd0aad7bdce90fcb6bdd8c16ae89b01',
      ],
      id: 0,
    }

    const starkResult: RPCResponse = <RPCResponse>(
      await getTransactionsByHashHandler(request)
    )

    // Verify the structure and content of the response
    expect(typeof starkResult.result).toBe('object')
    expect(starkResult).toMatchObject({
      jsonrpc: '2.0',
      id: 0,
      result: {
        hash: '0x0314db5d42b3fc701274ee49060c6d9eabd0aad7bdce90fcb6bdd8c16ae89b01',
        blockHash:
          '0x0x2b8798021aeff15ebcf1be8acf7ff46c7197db1e00018bf0774b01dce3ff6bf',
        blockNumber: 63004,
        gas: '0x17099c53ecd93e0',
        gasPrice: '0xEE6B280',
        input:
          '0x0x10x12b0847cf221531f729090c10161692401c94994a033467c496db63a3d5facb0xc844fd57777b0cd7e75c8ea68deec0adf964a6308da7a58de32364b7131cc80x130x44b4d39504a21b1495d082177bb8455dd2116642deabdc35353b5785642dd0x1148010xe2afedfa5115103855c459006b0e5dc3861e8cdeb545b793c9d1bfc1de5cd40x6630d27c0x1020403000000000000000000000000000000000000000000000000000000000x40x5f510cc0x5f52ea50x5f559590x5f5a2690xc4fbc50bf9f13fee20x10x20x5261e67a2ba44ccd616f6ef6bf955c5f47093a087f834d233cef1b9e5483fb30x18e5b037e5ff3012ec6fb496690f4c304bea8aadefd9747d44914bf2f5b9dd90x2e7dc996ebf724c1cf18d668fc3455df4245749ebc0724101cbc6c9cb13c9620x6769f775dcabcbd9540a4d44ea1dc2b3a76dcdd7d39a2e6553beccb06cdf15d0x3d02d63a68422f9a6fcfbe3786c08343ab387e0e465c70c0c08ecd280086c2e0x4225d1c8ee8e451a25e30c10689ef898e11ccf5c0f68d0fc7876c47b318e946',
        nonce: '0x0',
        r: '0x4a596f0d9909e376458c758f48f9bdb9799c569687b3015f20f02a56f363142',
        s: '0x112c1d3d52e0568e9f7e117f72275dd227f249ce908a1aa4fb6002cfcd5039e',
        to: '0x0',
        transactionIndex: '0x0',
        v: '0x1b',
        value: '0x0',
      },
    })
  })

  it('Returns transaction details for invalid tx hash', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionByHash',
      params: [
        '0xZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
      ],
      id: 0,
    }

    const starkResult: RPCError = <RPCError>(
      await getTransactionsByHashHandler(request)
    )
    expect(starkResult).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid tx hash',
    })
  })
})

/* eslint-disable  @typescript-eslint/no-explicit-any */

import { writeLog } from '../logger'
import { isStarknetRPCError } from '../types/typeGuards'
import { RPCResponse, StarknetRPCError } from '../types/types'
import { callStarknet } from '../utils/callHelper'
import { GasData, SyncedGas } from '../types/types'

let syncedGasPrice: SyncedGas

export function getCachedGasPrice(): SyncedGas {
  if (typeof syncedGasPrice === 'undefined') {
    return {
      l1: {
        fri: '0x0',
        wei: '0x0'
      },
      l1_data: {
        fri: '0x0',
        wei: '0x0'
      },
      l2: {
        fri: '0x0',
        wei: '0x0'
      }
    }
  }
  return syncedGasPrice
}

async function updateGasPrice() {
  try {
    const blockResponse: RPCResponse | StarknetRPCError = await callStarknet({
      jsonrpc: '2.0',
      method: 'starknet_getBlockWithTxs',
      params: ['latest'],
      id: 0,
    })

    if (isStarknetRPCError(blockResponse)) {
      writeLog(2, 'Error at starknet_getBlockWithTxs call on gas price sync.')
      return
    }

    const l1Gas = blockResponse.result.l1_gas_price as GasData
    const l1DataGas = blockResponse.result.l1_data_gas_price as GasData
    const l2Gas = blockResponse.result.l2_gas_price as GasData
    // Assumes correctly received valued. If not error

    // Helper function for ceiling division with BigInt
    const ceilDiv = (a: bigint, b: bigint): bigint => {
      return (a + b - BigInt(1)) / b;
    };

    const gas = {
      l1: {
        fri: '0x' + ceilDiv(BigInt(l1Gas.price_in_fri) * BigInt(110), BigInt(100)).toString(16),
        wei: '0x' + ceilDiv(BigInt(l1Gas.price_in_wei) * BigInt(110), BigInt(100)).toString(16)
      },
      l1_data: {
        fri: '0x' + ceilDiv(BigInt(l1DataGas.price_in_fri) * BigInt(110), BigInt(100)).toString(16),
        wei: '0x' + ceilDiv(BigInt(l1DataGas.price_in_wei) * BigInt(110), BigInt(100)).toString(16)
      },
      l2: {
        fri: '0x' + ceilDiv(BigInt(l2Gas.price_in_fri) * BigInt(110), BigInt(100)).toString(16),
        wei: '0x' + ceilDiv(BigInt(l2Gas.price_in_wei) * BigInt(110), BigInt(100)).toString(16)
      }
    }

    syncedGasPrice = gas;
    writeLog(0, `Gas sync, l1: ${gas.l1.wei} (wei) ${gas.l1.fri} (fri), l1_data: ${gas.l1_data.wei} (wei) ${gas.l1_data.fri} (fri), l2: ${gas.l2.wei} (wei) ${gas.l2.fri} (fri)`)
    return
  } catch (e: any) {
    writeLog(2, 'Error at gas sync: ' + e.message)
  }
}

export async function initialSyncGasPrice() {
  await updateGasPrice()
  return
}

export async function syncGasPrice() {
  while (true) {
    await new Promise<void>(resolve => setTimeout(resolve, 10000)) // Sync new blocks in every 10 seconds
    await updateGasPrice()
  }
}

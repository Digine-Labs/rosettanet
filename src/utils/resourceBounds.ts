import { getCachedGasPrice } from "../cache/gasPrice"
import { SignedRawTransaction, ResourceBounds, SyncedGas, GasCost } from "../types/types"
import { estimateGasCost } from "./gas"
import { addHexPrefix } from "./padding"


// TODO: l1_gas and l1_data_gas fields will be set by rosettanet
// l1_gas ve l1_data_gasi estimate tx veya cacheden cekerek dolduralim.
// kontratlarda sadece l2_gas kismi verif edilmeli
export async function resourceBoundsFromSignedTxn(txn: SignedRawTransaction): Promise<ResourceBounds> {
    // 1) get estimateGas result.
    // 2) Get gaslimit to check is total gas in range
    // 3) If yes distribute gas amounts according to estimateGas Result

    const cachedGasPrices: SyncedGas = getCachedGasPrice();


    const gasCost: GasCost = await estimateGasCost({
        from: txn.from,
        to: txn.to,
        data: txn.data,
        value: txn.value,
        gasLimit: txn.gasLimit,
        ...(txn.gasPrice != null ? { gasPrice: txn.gasPrice } : {}),
        ...(txn.maxFeePerGas != null ? { maxFeePerGas: txn.maxFeePerGas } : {}),
        ...(txn.maxPriorityFeePerGas != null ? { maxPriorityFeePerGas: txn.maxPriorityFeePerGas } : {}),
        nonce: txn.nonce,
    })

    const totalFee = gasCost.l1 + gasCost.l1_data + gasCost.l2;

    const gasPrice = txn.maxFeePerGas == null ? txn.gasPrice : txn.maxFeePerGas;
    const actualGasPrice = gasPrice == null ? '0x0' : gasPrice;

    if (BigInt(totalFee) >= txn.gasLimit) {
        // Total fee is more than gas passed. So we should return max possible with priorities.
        // Priority l1_data > l2 > l1

        let availableGas = txn.gasLimit;

        const l1_data = availableGas > BigInt(gasCost.l1_data) ? BigInt(gasCost.l1_data) : availableGas;
        availableGas = availableGas - l1_data;

        const l2 = availableGas > BigInt(gasCost.l2) ? BigInt(gasCost.l2) : availableGas;
        availableGas = availableGas - l2;

        const l1 = availableGas > BigInt(gasCost.l1) ? BigInt(gasCost.l1) : availableGas;
        availableGas = availableGas - l1;

        return <ResourceBounds>{
            l1_gas: {
                max_amount: addHexPrefix(l1.toString(16)),
                max_price_per_unit: addHexPrefix(cachedGasPrices.l1.fri)
            },
            l2_gas: {
                max_amount: addHexPrefix(l2.toString(16)),
                max_price_per_unit: addHexPrefix(actualGasPrice.toString(16))
            },
            l1_data_gas: {
                max_amount: addHexPrefix(l1_data.toString(16)),
                max_price_per_unit: addHexPrefix(cachedGasPrices.l1_data.fri)
            }
        }
    }

    return <ResourceBounds>{
        l1_gas: {
            max_amount: addHexPrefix(gasCost.l1.toString(16)),
            max_price_per_unit: addHexPrefix(cachedGasPrices.l1.fri)
        },
        l2_gas: {
            max_amount: addHexPrefix(gasCost.l2.toString(16)),
            max_price_per_unit: addHexPrefix(actualGasPrice.toString(16))
        },
        l1_data_gas: {
            max_amount: addHexPrefix(gasCost.l1_data.toString(16)),
            max_price_per_unit: addHexPrefix(cachedGasPrices.l1_data.fri)
        }
    }
}

export function getDeploymentResourceBounds(): ResourceBounds {
    const cachedGasPrices: SyncedGas = getCachedGasPrice();

    return <ResourceBounds>{
        l1_gas: {
            max_amount: '0x0',
            max_price_per_unit: addHexPrefix(cachedGasPrices.l1.fri)
        },
        l1_data_gas: {
            max_amount: addHexPrefix(BigInt(512).toString(16)),
            max_price_per_unit: addHexPrefix(cachedGasPrices.l1_data.fri)
        },
        l2_gas: {
            max_amount: addHexPrefix(BigInt(2000000).toString(16)),
            max_price_per_unit: addHexPrefix(cachedGasPrices.l2.fri)
        }
    }
}
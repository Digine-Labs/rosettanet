import { SignedRawTransaction } from "../types/types"

interface ResourceBounds {
    l1_gas: {
        max_amount: string
        max_price_per_unit: string
    }
    l1_data_gas: {
        max_amount: string
        max_price_per_unit: string
    }
    l2_gas: {
        max_amount: string
        max_price_per_unit: string
    }
}
// TODO: l1_gas and l1_data_gas fields will be set by rosettanet
// l1_gas ve l1_data_gasi estimate tx veya cacheden cekerek dolduralim.
// kontratlarda sadece l2_gas kismi verif edilmeli
export function resourceBoundsFromSignedTxn(txn: SignedRawTransaction): ResourceBounds {
    // Gas calculation burada olmali. Sonrasinda bu fonksiyon tum broadcast txlerde kullanilacak
    // Deploy tx dahil

    // 0.14 ten sonra feeler strk amount ile gonderiliyor. SW 21000 den fazla tutar txler dedi. Buraya ornek 1-2 tane rosettanet tx estimate fee responseu lazim
}
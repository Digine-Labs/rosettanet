import BigNumber from "bignumber.js"

interface ActualFeeObject {
    amount: string
    unit: string
}

export function calculateSpentGas(max_price_per_unit: string, actual_fee: ActualFeeObject): string {
    if(actual_fee.unit === 'FRI') {
        const gasPrice = new BigNumber(max_price_per_unit);
        const feePaid = new BigNumber(actual_fee.amount); // STRK paid

        return feePaid.dividedBy(gasPrice).toString(16)
    } else {
        return '0x0' // Wei will be supported later
    }
}
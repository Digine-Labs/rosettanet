/*
Parameters

Object - The transaction call object
from: DATA, 20 Bytes - (optional) The address the transaction is sent from.
to: DATA, 20 Bytes - The address the transaction is directed to.
gas: QUANTITY - (optional) Integer of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions.
gasPrice: QUANTITY - (optional) Integer of the gasPrice used for each paid gas
value: QUANTITY - (optional) Integer of the value sent with this transaction
input: DATA - (optional) Hash of the method signature and encoded parameters. For details see Ethereum Contract ABI in the Solidity documentation(opens in a new tab).
QUANTITY|TAG - integer block number, or the string "latest", "earliest", "pending", "safe" or "finalized", see the default block parameter
*/

describe('eth_accounts RPC method', () => {
    test.only('Should return ETH balance of the account in EVM format', async () => {

    })
    // TODO: add test cases with using some params optional and some not
})
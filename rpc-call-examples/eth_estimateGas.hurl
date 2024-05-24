Parameters
Object - The transaction call object
from: DATA, 20 Bytes - (optional) The address the transaction is sent from.
to: DATA, 20 Bytes - The address to which the transaction is directed to.
gas: QUANTITY - (optional) Integer of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions.
gasPrice: QUANTITY - (optional) Integer of the gasPrice used for each paid gas.
value: QUANTITY - (optional) Integer of the value sent with this transaction
data: DATA - (optional) Hash of the method signature and encoded parameters. For details see Ethereum Contract ABI
QUANTITY|TAG - integer block number, or the string "latest", "earliest" or "pending", see the default block parameter.

REQUEST:
curl {{ ETHEREUM RPC }}
-X POST \
-H "Content-Type: application/json" \
{
    "jsonrpc":"2.0",
    "method":"eth_estimateGas",
    "params": [{"from": "0x9cE564c7d09f88E7d8233Cdd3A4d7AC42aBFf3aC",
    "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    "value": "0x9184e72a"}]
    "id":1
}

RESPONSE:

{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x5cec"
}


PARAMETERS:
QUANTITY|TAG - integer of a block number, or the string "earliest", "latest" or "pending"

REQUEST:

curl {{ ETHEREUM RPC }}
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["latest"],"id":0}'

RESULT:

{
  "jsonrpc": "2.0",
  "id": 0,
  "result": "0xee"
}
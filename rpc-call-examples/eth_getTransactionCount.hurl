PARAMETERS:
DATA, 20 Bytes - address.
QUANTITY|TAG - integer block number, or the string "latest", "earliest" or "pending"

REQUEST:

curl {{ ETHEREUM RPC }}
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"],"id":0}'

RESULT:

{
  "jsonrpc": "2.0",
  "id": 0,
  "result": "0x219"
}
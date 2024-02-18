PARAMETERS:
DATA, 20 Bytes - address to check for the balance.
QUANTITY|TAG - integer block number, or the string "latest", "earliest" or "pending"

REQUEST:

curl {{ ETHEREUM RPC }}
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":0}'

RESULT:

{
  "jsonrpc": "2.0",
  "id": 0,
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
PARAMETERS:
DATA, 32 Bytes - hash of a block.

REQUEST:

curl {{ ETHEREUM RPC }}
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],"id":0}'

RESULT:

{
  "id": 0,
  "jsonrpc": "2.0",
  "result": "0xb" // 11
}
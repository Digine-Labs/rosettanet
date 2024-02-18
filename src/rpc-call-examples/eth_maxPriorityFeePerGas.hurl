PARAMETERS:
none

REQUEST:

curl {{ ETHEREUM RPC }}
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_maxPriorityFeePerGas","params":[],"id":1}'

RESULT:

{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x12a05f1f9"
}
PARAMETERS:
none

REQUEST:

curl {{ ETHEREUM RPC }}
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":0}'

RESULT:

{
  "jsonrpc": "2.0",
  "id": 0,
  "result": "0x98bca5a00"
}
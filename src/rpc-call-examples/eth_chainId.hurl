PARAMETERS:
none

REQUEST:

curl {{ ETHEREUM RPC }}
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":83}'

RESULT:

{
  "id": 83,
  "jsonrpc": "2.0",
  "result": "0x3d" // 61
}
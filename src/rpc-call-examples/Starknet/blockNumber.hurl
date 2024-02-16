REQUEST:

curl {{STARKNET RPC}}
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"starknet_blockNumber","params":[],"id":0}'

RESULT:

{
    "jsonrpc": "2.0",
    "result": 4504,
    "id": 0
}
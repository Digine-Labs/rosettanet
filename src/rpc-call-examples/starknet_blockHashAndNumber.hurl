PARAMETERS:
none

REQUEST:

curl {{STARKNET RPC}}
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"starknet_blockHashAndNumber","params":[],"id":0}'

RESULT:

{
    "jsonrpc": "2.0",
    "result": {
        "block_hash": "0x1ba5d3910676f8383a1c472f1092a77cbe438b108face7873e0407ceee8da1e",
        "block_number": 4504
    },
    "id": 0
}
REQUEST:

curl {{STARKNET RPC}}
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"starknet_syncing","params":[],"id":0}'

RESULT:

{
    "jsonrpc": "2.0",
    "result": {
        "starting_block_hash": "0x3fab5dff46b07a0910cd3e255f53bee8183e1d22fdb48aed4514538ecf733d5",
        "starting_block_num": "0x1124",
        "current_block_hash": "0x59c29817b8d4f71fd355180aad76785a801d54eb08fdd2945d1eec8c1dfcd0b",
        "current_block_num": "0x1199",
        "highest_block_hash": "0x59c29817b8d4f71fd355180aad76785a801d54eb08fdd2945d1eec8c1dfcd0b",
        "highest_block_num": "0x1199"
    },
    "id": 0
}
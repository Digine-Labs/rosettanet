REQUEST:

curl {{STARKNET RPC}}
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"starknet_getBlockTransactionCount","params":[{"block_hash":"0x041b10c45dc3f39372f7b9409261cac9d880c5d75a5bb077d028db20b1bd76c4"}],"id":0}'

RESULT:

{
    "jsonrpc": "2.0",
    "result": 148,
    "id": 1
}
PARAMETERS:
address — the string of the address of the account.

REQUEST:

curl {{STARKNET RPC}}
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"starknet_getStorageAt","params": ["0x04D88BeCbd1DC984ae04A96E77828E603c5244e68224903D92CA0a1Ff1C8e807", "latest"],"id":1}'

RESULT:

{
    "jsonrpc": "2.0",
    "result": "0x0",
    "id": 1
}
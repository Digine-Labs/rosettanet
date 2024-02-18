PARAMETERS:
none

REQUEST:

curl {{STARKNET RPC}}
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"starknet_chainId","params":[],"id":0}'

RESULT:
{
    "jsonrpc": "2.0",
    "result": "0x534e5f4d41494e",
    "id": 0
}
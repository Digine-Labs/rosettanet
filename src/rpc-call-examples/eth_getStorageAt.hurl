PARAMETERS:
DATA, 20 Bytes - address of the storage.
QUANTITY - integer of the position in the storage.
QUANTITY|TAG - integer block number, or the string "latest", "earliest" or "pending"

REQUEST:

curl {{ ETHEREUM RPC }}
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}'
RESULT:

{
    "jsonrpc":"2.0",
    "id":1,
    "result":"0x00000000000000000000000000000000000000000000000000000000000004d2"
}
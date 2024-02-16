PARAMETERS:
block_id — the hash of the requested block, or number (height) of the requested block, or a block tag, for the block referencing the state or call the transaction on (`block_number`, `block_hash`, `latest`, `pending`).
address — the string of the address of the account.


REQUEST:

curl {{STARKNET RPC}}
-X POST \
-H "Content-Type: application/json" \
-d '
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "starknet_getNonce",
  "params": [
    "latest",
    "0x0569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10"
  ]
}
'

RESULT:

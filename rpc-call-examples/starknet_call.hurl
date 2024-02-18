PARAMETERS:

request — the details of the function call:
    contract_address — the address of the contract to be called.
    entry_point_selector — the selector of the function to be called. (example : balanceOf function's selector)
        calldata — the parameters passed to the function.
block_id  -  Expected one of block_number, block_hash, latest, pending.

REQUEST:

curl {{STARKNET RPC}}
-X POST \
-H "Content-Type: application/json" \
-d '
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "starknet_call",
  "params": [
    {
      "calldata": [
        "0x03a20d4f7b4229e7c4863dab158b4d076d7f454b893d90a62011882dc4caca2a"
      ],
      "contract_address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e"
    },
    "pending"
  ]
}
'

RESULT:

{
  "jsonrpc": "2.0",
  "result": [
    "0x6f7dd24c43cd994875",
    "0x0"
  ],
  "id": 1
}
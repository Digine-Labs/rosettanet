PARAMETERS:
message — the message to estimate, which includes the following fields:
    to — the string of the address to which the message is directed, a wallet, or a smart contract.
    data — additional data to be sent with the message, usually used to invoke functions from smart contracts as a string of the hash of the method signature and encoded parameters.
block_id — the hash of the requested block, or number (height) of the requested block, or a block tag, for the block referencing the state or call the transaction on.

REQUEST:

curl {{STARKNET RPC}}
-X POST \
-H "Content-Type: application/json" \
-d '
{
  "id": 0,
  "jsonrpc": "2.0",
  "method": "starknet_estimateMessageFee",
  "params": [
    {
      "from_address": "0xae0ee0a63a2ce6baeeffe56e7714fb4efe48d419",
      "to_address": "0x073314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82",
      "entry_point_selector": "0x02d757788a8d8d6f21d1cd40bce38a8222d70654214e96ff95d8086e684fbee5",
      "payload": [
        "0x1cf4ca56a4841f8a7d39d22d5369434f74e480b370be7bc5a814384b758e604",
        "0x6a94d74f430000",
        "0x0"
      ]
    },
    {
      "block_number": 387702
    }
  ]
}
'

RESULT:

{
  "jsonrpc": "2.0",
  "result": {
    "gas_consumed": "0x4bd0",
    "gas_price": "0x69b2bf560",
    "overall_fee": "0x1f4d3f49a7e00"
  },
  "id": 0
}
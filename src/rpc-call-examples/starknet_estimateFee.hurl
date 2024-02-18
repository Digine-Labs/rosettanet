PARAMETERS:

request — the transaction to estimate.
block_id  -  Expected one of block_number, block_hash, latest, pending.

REQUEST:

curl {{STARKNET RPC}}
-X POST \
-H "Content-Type: application/json" \
-d '
{
  "id": 0,
  "jsonrpc": "2.0",
  "method": "starknet_estimateFee",
  "params": {
    "request": [
      {
        "type": "INVOKE",
        "max_fee": "0xb3a2f1ab6d632",
        "version": "0x1",
        "signature": [
          "0x54c2201c7b9021777389e208e28eafc67e4ba1f1aa7016a1123b61c6ff79c29",
          "0x58c2d97614e5abfd9668b314f344c945d16ea154cb32a7b08b4445204f1f1d3"
        ],
        "sender_address": "0x0569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
        "calldata": [
          "0x3",
          "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
          "0x219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c",
          "0x3",
          "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
          "0x984e103a8acd6",
          "0x0",
          "0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
          "0x219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c",
          "0x3",
          "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
          "0x4c4b40",
          "0x0",
          "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
          "0x2f0b3c5710379609eb5495f1ecd348cb28167711b73609fe565a72734550354",
          "0xe",
          "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
          "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
          "0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
          "0x1f4",
          "0xa76cc",
          "0xa7b5e",
          "0x984e103a8acd6",
          "0x0",
          "0x4c4b40",
          "0x0",
          "0x9542431aa6bf1",
          "0x0",
          "0x4ac4a0",
          "0x0"
        ],
        "nonce": "0x51"
      }
    ],
    "block_id": {
      "block_number": 385940
    }
  }
}
'

RESULT:

{
  "jsonrpc": "2.0",
  "result": [
    {
      "gas_consumed": "0x9ae6",
      "gas_price": "0x5569d8d85",
      "overall_fee": "0x33ae698af277e"
    }
  ],
  "id": 0
}
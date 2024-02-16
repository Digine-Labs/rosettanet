PARAMETERS:
block_id — the hash of the requested block, or number (height) of the requested block, or a block tag:
    block_hash — hash of the block.
    block_number — block number, accept integer.
    block_tag — latest for the latest one added to the chain or pending for the pending one.

REQUEST:

curl {{STARKNET RPC}}
-X POST \
-H "Content-Type: application/json" \
-d '
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "starknet_traceBlockTransactions",
  "params": {
    "block_id": {
      "block_number": 456600
    }
  }
}
'

RESULT:

{
  "jsonrpc": "2.0",
  "result": [
    {
      "trace_root": {
        "execute_invocation": {
          "revert_reason": "Insufficient max fee: max_fee: Fee(195000000000000), actual_fee: Fee(698148535192018)"
        },
        "fee_transfer_invocation": {
          "call_type": "CALL",
          "calldata": [
            "0x1176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8",
            "0xb159f9bb3000",
            "0x0"
          ],
          "caller_address": "0x46ca9e02683e7dfb4011894f0cfc7a48c726dac819221ce1e83b33ff55d5624",
          "calls": [
            {
              "call_type": "DELEGATE",
              "calldata": [
                "0x1176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8",
                "0xb159f9bb3000",
                "0x0"
              ],
              "caller_address": "0x46ca9e02683e7dfb4011894f0cfc7a48c726dac819221ce1e83b33ff55d5624",
              "calls": [],
              "class_hash": "0x2760f25d5a4fb2bdde5f561fd0b44a3dee78c28903577d37d669939d97036a0",
              "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
              "entry_point_selector": "0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e",
              "entry_point_type": "EXTERNAL",
              "events": [
                {
                  "data": [
                    "0x46ca9e02683e7dfb4011894f0cfc7a48c726dac819221ce1e83b33ff55d5624",
                    "0x1176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8",
                    "0xb159f9bb3000",
                    "0x0"
                  ],
                  "keys": [
                    "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
                  ],
                  "order": 0
                }
              ],
              "messages": [],
              "result": [
                "0x1"
              ]
            }
          ],
          "class_hash": "0xd0e183745e9dae3e4e78a8ffedcce0903fc4900beace4e0abf192d4c202da3",
          "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
          "entry_point_selector": "0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e",
          "entry_point_type": "EXTERNAL",
          "events": [],
          "messages": [],
          "result": [
            "0x1"
          ]
        },
        "type": "INVOKE",
        "validate_invocation": {
          "call_type": "CALL",
          "calldata": [
            "0x1",
            "0x6182278e63816ff4080ed07d668f991df6773fd13db0ea10971096033411b11",
            "0x1d2613f386531385c613d975a214a1919b983788a444225907c58de5214edc3",
            "0x0",
            "0x0",
            "0x0"
          ],
          "caller_address": "0x0",
          "calls": [
            {
              "call_type": "DELEGATE",
              "calldata": [
                "0x1",
                "0x6182278e63816ff4080ed07d668f991df6773fd13db0ea10971096033411b11",
                "0x1d2613f386531385c613d975a214a1919b983788a444225907c58de5214edc3",
                "0x0",
                "0x0",
                "0x0"
              ],
              "caller_address": "0x0",
              "calls": [],
              "class_hash": "0x5dec330eebf36c8672b60db4a718d44762d3ae6d1333e553197acb47ee5a062",
              "contract_address": "0x46ca9e02683e7dfb4011894f0cfc7a48c726dac819221ce1e83b33ff55d5624",
              "entry_point_selector": "0x162da33a4585851fe8d3af3c2a9c60b557814e221e0d4f30ff0b2189d9c7775",
              "entry_point_type": "EXTERNAL",
              "events": [],
              "messages": [],
              "result": []
            }
          ],
          "class_hash": "0x3131fa018d520a037686ce3efddeab8f28895662f019ca3ca18a626650f7d1e",
          "contract_address": "0x46ca9e02683e7dfb4011894f0cfc7a48c726dac819221ce1e83b33ff55d5624",
          "entry_point_selector": "0x162da33a4585851fe8d3af3c2a9c60b557814e221e0d4f30ff0b2189d9c7775",
          "entry_point_type": "EXTERNAL",
          "events": [],
          "messages": [],
          "result": []
        }
      },
      "transaction_hash": "0xdc7dd6dd401bff49af944fbc37b112cda0d3db3c004b63b72881201d35e685"
    },
    ...
  ]
}
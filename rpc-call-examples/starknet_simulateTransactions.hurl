PARAMETERS:
request — the list of transactions to simulate.
block_id  -  Expected one of block_number, block_hash, latest, pending.

REQUEST:

curl {{STARKNET RPC}}
-X POST \
-H "Content-Type: application/json" \
-d '
{
  "id": 0,
  "jsonrpc": "2.0",
  "method": "starknet_simulateTransactions",
  "params": [
    {
      "block_number": 385940
    },
    [
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
    [
      "SKIP_VALIDATE",
      "SKIP_FEE_CHARGE"
    ]
  ]
}
'

RESULT:

{
  "jsonrpc": "2.0",
  "result": [
    {
      "fee_estimation": {
        "gas_consumed": "0x9ad6",
        "gas_price": "0x5569d8d85",
        "overall_fee": "0x33a912ed64f2e"
      },
      "transaction_trace": {
        "execute_invocation": {
          "call_type": "CALL",
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
          "caller_address": "0x0",
          "calls": [
            {
              "call_type": "CALL",
              "calldata": [
                "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                "0x984e103a8acd6",
                "0x0"
              ],
              "caller_address": "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
              "calls": [
                {
                  "call_type": "DELEGATE",
                  "calldata": [
                    "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                    "0x984e103a8acd6",
                    "0x0"
                  ],
                  "caller_address": "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
                  "calls": [],
                  "class_hash": "0x2760f25d5a4fb2bdde5f561fd0b44a3dee78c28903577d37d669939d97036a0",
                  "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                  "entry_point_selector": "0x219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c",
                  "entry_point_type": "EXTERNAL",
                  "events": [
                    {
                      "data": [
                        "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
                        "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                        "0x984e103a8acd6",
                        "0x0"
                      ],
                      "keys": [
                        "0x134692b230b9e1ffa39098904722134159652b09c5bc41d88d6698779d228ff"
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
              "entry_point_selector": "0x219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c",
              "entry_point_type": "EXTERNAL",
              "events": [],
              "messages": [],
              "result": [
                "0x1"
              ]
            },
            {
              "call_type": "CALL",
              "calldata": [
                "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                "0x4c4b40",
                "0x0"
              ],
              "caller_address": "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
              "calls": [
                {
                  "call_type": "DELEGATE",
                  "calldata": [
                    "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                    "0x4c4b40",
                    "0x0"
                  ],
                  "caller_address": "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
                  "calls": [],
                  "class_hash": "0x2760f25d5a4fb2bdde5f561fd0b44a3dee78c28903577d37d669939d97036a0",
                  "contract_address": "0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
                  "entry_point_selector": "0x219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c",
                  "entry_point_type": "EXTERNAL",
                  "events": [
                    {
                      "data": [
                        "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
                        "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                        "0x4c4b40",
                        "0x0"
                      ],
                      "keys": [
                        "0x134692b230b9e1ffa39098904722134159652b09c5bc41d88d6698779d228ff"
                      ],
                      "order": 1
                    }
                  ],
                  "messages": [],
                  "result": [
                    "0x1"
                  ]
                }
              ],
              "class_hash": "0x52c7ba99c77fc38dd3346beea6c0753c3471f2e3135af5bb837d6c9523fff62",
              "contract_address": "0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
              "entry_point_selector": "0x219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c",
              "entry_point_type": "EXTERNAL",
              "events": [],
              "messages": [],
              "result": [
                "0x1"
              ]
            },
            {
              "call_type": "CALL",
              "calldata": [
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
              "caller_address": "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
              "calls": [
                {
                  "call_type": "CALL",
                  "calldata": [
                    "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                    "0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
                    "0x1f4"
                  ],
                  "caller_address": "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                  "calls": [],
                  "class_hash": "0x43505736628b183a525d5a65c21a9ab47b36b36e6974f0ec998cd75207d6369",
                  "contract_address": "0x1114c7103e12c2b2ecbd3a2472ba9c48ddcbf702b1c242dd570057e26212111",
                  "entry_point_selector": "0x279193ae67f7ef3a6be330f5bd004266a0ec3fd5a6f7d2fe71a2096b3101578",
                  "entry_point_type": "EXTERNAL",
                  "events": [],
                  "messages": [],
                  "result": [
                    "0x30baaaf1b243f6e74c656f98dcb24b98687dcbe783d25f35854148c4c602d41"
                  ]
                },
                {
                  "call_type": "CALL",
                  "calldata": [
                    "0x30baaaf1b243f6e74c656f98dcb24b98687dcbe783d25f35854148c4c602d41"
                  ],
                  "caller_address": "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                  "calls": [],
                  "class_hash": "0x43505736628b183a525d5a65c21a9ab47b36b36e6974f0ec998cd75207d6369",
                  "contract_address": "0x1114c7103e12c2b2ecbd3a2472ba9c48ddcbf702b1c242dd570057e26212111",
                  "entry_point_selector": "0x3efc7911aa82a852fb49e2151fd08b690d12d17440d55cce2fd87c386568303",
                  "entry_point_type": "EXTERNAL",
                  "events": [],
                  "messages": [],
                  "result": [
                    "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                    "0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
                    "0x1f4",
                    "0xa"
                  ]
                },
                {
                  "call_type": "CALL",
                  "calldata": [
                    "0x30baaaf1b243f6e74c656f98dcb24b98687dcbe783d25f35854148c4c602d41"
                  ],
                  "caller_address": "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                  "calls": [],
                  "class_hash": "0x43505736628b183a525d5a65c21a9ab47b36b36e6974f0ec998cd75207d6369",
                  "contract_address": "0x1114c7103e12c2b2ecbd3a2472ba9c48ddcbf702b1c242dd570057e26212111",
                  "entry_point_selector": "0x2de97080d8dd1cf0ad5ae88a8868713cb968fb73f07d59ca52b6a3ba4352659",
                  "entry_point_type": "EXTERNAL",
                  "events": [],
                  "messages": [],
                  "result": [
                    "0x2d7eb092c9f697fa8511d",
                    "0x0"
                  ]
                },
                {
                  "call_type": "CALL",
                  "calldata": [
                    "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
                    "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                    "0x984e103a8acd6",
                    "0x0"
                  ],
                  "caller_address": "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                  "calls": [
                    {
                      "call_type": "DELEGATE",
                      "calldata": [
                        "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
                        "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                        "0x984e103a8acd6",
                        "0x0"
                      ],
                      "caller_address": "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                      "calls": [],
                      "class_hash": "0x2760f25d5a4fb2bdde5f561fd0b44a3dee78c28903577d37d669939d97036a0",
                      "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                      "entry_point_selector": "0x41b033f4a31df8067c24d1e9b550a2ce75fd4a29e1147af9752174f0e6cb20",
                      "entry_point_type": "EXTERNAL",
                      "events": [
                        {
                          "data": [
                            "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
                            "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                            "0x984e103a8acd6",
                            "0x0"
                          ],
                          "keys": [
                            "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
                          ],
                          "order": 2
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
                  "entry_point_selector": "0x41b033f4a31df8067c24d1e9b550a2ce75fd4a29e1147af9752174f0e6cb20",
                  "entry_point_type": "EXTERNAL",
                  "events": [],
                  "messages": [],
                  "result": [
                    "0x1"
                  ]
                },
                {
                  "call_type": "CALL",
                  "calldata": [
                    "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
                    "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                    "0x4c4b40",
                    "0x0"
                  ],
                  "caller_address": "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                  "calls": [
                    {
                      "call_type": "DELEGATE",
                      "calldata": [
                        "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
                        "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                        "0x4c4b40",
                        "0x0"
                      ],
                      "caller_address": "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                      "calls": [],
                      "class_hash": "0x2760f25d5a4fb2bdde5f561fd0b44a3dee78c28903577d37d669939d97036a0",
                      "contract_address": "0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
                      "entry_point_selector": "0x41b033f4a31df8067c24d1e9b550a2ce75fd4a29e1147af9752174f0e6cb20",
                      "entry_point_type": "EXTERNAL",
                      "events": [
                        {
                          "data": [
                            "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
                            "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                            "0x4c4b40",
                            "0x0"
                          ],
                          "keys": [
                            "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
                          ],
                          "order": 3
                        }
                      ],
                      "messages": [],
                      "result": [
                        "0x1"
                      ]
                    }
                  ],
                  "class_hash": "0x52c7ba99c77fc38dd3346beea6c0753c3471f2e3135af5bb837d6c9523fff62",
                  "contract_address": "0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
                  "entry_point_selector": "0x41b033f4a31df8067c24d1e9b550a2ce75fd4a29e1147af9752174f0e6cb20",
                  "entry_point_type": "EXTERNAL",
                  "events": [],
                  "messages": [],
                  "result": [
                    "0x1"
                  ]
                },
                {
                  "call_type": "CALL",
                  "calldata": [
                    "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                    "0x1114c7103e12c2b2ecbd3a2472ba9c48ddcbf702b1c242dd570057e26212111"
                  ],
                  "caller_address": "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                  "calls": [
                    {
                      "call_type": "DELEGATE",
                      "calldata": [
                        "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                        "0x1114c7103e12c2b2ecbd3a2472ba9c48ddcbf702b1c242dd570057e26212111"
                      ],
                      "caller_address": "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                      "calls": [],
                      "class_hash": "0x2760f25d5a4fb2bdde5f561fd0b44a3dee78c28903577d37d669939d97036a0",
                      "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                      "entry_point_selector": "0x1e888a1026b19c8c0b57c72d63ed1737106aa10034105b980ba117bd0c29fe1",
                      "entry_point_type": "EXTERNAL",
                      "events": [],
                      "messages": [],
                      "result": [
                        "0xffffffffffffffd577dcf93ffb240a9a",
                        "0xffffffffffffffffffffffffffffffff"
                      ]
                    }
                  ],
                  "class_hash": "0xd0e183745e9dae3e4e78a8ffedcce0903fc4900beace4e0abf192d4c202da3",
                  "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                  "entry_point_selector": "0x1e888a1026b19c8c0b57c72d63ed1737106aa10034105b980ba117bd0c29fe1",
                  "entry_point_type": "EXTERNAL",
                  "events": [],
                  "messages": [],
                  "result": [
                    "0xffffffffffffffd577dcf93ffb240a9a",
                    "0xffffffffffffffffffffffffffffffff"
                  ]
                },
                {
                  "call_type": "CALL",
                  "calldata": [
                    "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                    "0x1114c7103e12c2b2ecbd3a2472ba9c48ddcbf702b1c242dd570057e26212111"
                  ],
                  "caller_address": "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                  "calls": [
                    {
                      "call_type": "DELEGATE",
                      "calldata": [
                        "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                        "0x1114c7103e12c2b2ecbd3a2472ba9c48ddcbf702b1c242dd570057e26212111"
                      ],
                      "caller_address": "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                      "calls": [],
                      "class_hash": "0x2760f25d5a4fb2bdde5f561fd0b44a3dee78c28903577d37d669939d97036a0",
                      "contract_address": "0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
                      "entry_point_selector": "0x1e888a1026b19c8c0b57c72d63ed1737106aa10034105b980ba117bd0c29fe1",
                      "entry_point_type": "EXTERNAL",
                      "events": [],
                      "messages": [],
                      "result": [
                        "0xffffffffffffffffffffffad7286c328",
                        "0xffffffffffffffffffffffffffffffff"
                      ]
                    }
                  ],
                  "class_hash": "0x52c7ba99c77fc38dd3346beea6c0753c3471f2e3135af5bb837d6c9523fff62",
                  "contract_address": "0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
                  "entry_point_selector": "0x1e888a1026b19c8c0b57c72d63ed1737106aa10034105b980ba117bd0c29fe1",
                  "entry_point_type": "EXTERNAL",
                  "events": [],
                  "messages": [],
                  "result": [
                    "0xffffffffffffffffffffffad7286c328",
                    "0xffffffffffffffffffffffffffffffff"
                  ]
                },
                {
                  "call_type": "CALL",
                  "calldata": [
                    "0x30baaaf1b243f6e74c656f98dcb24b98687dcbe783d25f35854148c4c602d41",
                    "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                    "0xa76cc",
                    "0xa7b5e",
                    "0x3a5ded959d3"
                  ],
                  "caller_address": "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                  "calls": [
                    {
                      "call_type": "CALL",
                      "calldata": [
                        "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                        "0x1114c7103e12c2b2ecbd3a2472ba9c48ddcbf702b1c242dd570057e26212111",
                        "0x97f64d67c564b",
                        "0x0"
                      ],
                      "caller_address": "0x1114c7103e12c2b2ecbd3a2472ba9c48ddcbf702b1c242dd570057e26212111",
                      "calls": [
                        {
                          "call_type": "DELEGATE",
                          "calldata": [
                            "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                            "0x1114c7103e12c2b2ecbd3a2472ba9c48ddcbf702b1c242dd570057e26212111",
                            "0x97f64d67c564b",
                            "0x0"
                          ],
                          "caller_address": "0x1114c7103e12c2b2ecbd3a2472ba9c48ddcbf702b1c242dd570057e26212111",
                          "calls": [],
                          "class_hash": "0x2760f25d5a4fb2bdde5f561fd0b44a3dee78c28903577d37d669939d97036a0",
                          "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                          "entry_point_selector": "0x41b033f4a31df8067c24d1e9b550a2ce75fd4a29e1147af9752174f0e6cb20",
                          "entry_point_type": "EXTERNAL",
                          "events": [
                            {
                              "data": [
                                "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                                "0x1114c7103e12c2b2ecbd3a2472ba9c48ddcbf702b1c242dd570057e26212111",
                                "0x97f64d67c564b",
                                "0x0"
                              ],
                              "keys": [
                                "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
                              ],
                              "order": 4
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
                      "entry_point_selector": "0x41b033f4a31df8067c24d1e9b550a2ce75fd4a29e1147af9752174f0e6cb20",
                      "entry_point_type": "EXTERNAL",
                      "events": [],
                      "messages": [],
                      "result": [
                        "0x1"
                      ]
                    },
                    {
                      "call_type": "CALL",
                      "calldata": [
                        "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                        "0x1114c7103e12c2b2ecbd3a2472ba9c48ddcbf702b1c242dd570057e26212111",
                        "0x4c4b40",
                        "0x0"
                      ],
                      "caller_address": "0x1114c7103e12c2b2ecbd3a2472ba9c48ddcbf702b1c242dd570057e26212111",
                      "calls": [
                        {
                          "call_type": "DELEGATE",
                          "calldata": [
                            "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                            "0x1114c7103e12c2b2ecbd3a2472ba9c48ddcbf702b1c242dd570057e26212111",
                            "0x4c4b40",
                            "0x0"
                          ],
                          "caller_address": "0x1114c7103e12c2b2ecbd3a2472ba9c48ddcbf702b1c242dd570057e26212111",
                          "calls": [],
                          "class_hash": "0x2760f25d5a4fb2bdde5f561fd0b44a3dee78c28903577d37d669939d97036a0",
                          "contract_address": "0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
                          "entry_point_selector": "0x41b033f4a31df8067c24d1e9b550a2ce75fd4a29e1147af9752174f0e6cb20",
                          "entry_point_type": "EXTERNAL",
                          "events": [
                            {
                              "data": [
                                "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                                "0x1114c7103e12c2b2ecbd3a2472ba9c48ddcbf702b1c242dd570057e26212111",
                                "0x4c4b40",
                                "0x0"
                              ],
                              "keys": [
                                "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
                              ],
                              "order": 5
                            }
                          ],
                          "messages": [],
                          "result": [
                            "0x1"
                          ]
                        }
                      ],
                      "class_hash": "0x52c7ba99c77fc38dd3346beea6c0753c3471f2e3135af5bb837d6c9523fff62",
                      "contract_address": "0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
                      "entry_point_selector": "0x41b033f4a31df8067c24d1e9b550a2ce75fd4a29e1147af9752174f0e6cb20",
                      "entry_point_type": "EXTERNAL",
                      "events": [],
                      "messages": [],
                      "result": [
                        "0x1"
                      ]
                    }
                  ],
                  "class_hash": "0x43505736628b183a525d5a65c21a9ab47b36b36e6974f0ec998cd75207d6369",
                  "contract_address": "0x1114c7103e12c2b2ecbd3a2472ba9c48ddcbf702b1c242dd570057e26212111",
                  "entry_point_selector": "0x2f0b3c5710379609eb5495f1ecd348cb28167711b73609fe565a72734550354",
                  "entry_point_type": "EXTERNAL",
                  "events": [
                    {
                      "data": [
                        "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                        "0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
                        "0x1f4",
                        "0xa",
                        "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                        "0xa76cc",
                        "0xa7b5e",
                        "0x3a5ded959d3",
                        "0x97f64d67c564b",
                        "0x0",
                        "0x4c4b40",
                        "0x0",
                        "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff"
                      ],
                      "keys": [
                        "0x34e55c1cd55f1338241b50d352f0e91c7e4ffad0e4271d64eb347589ebdfd16"
                      ],
                      "order": 6
                    }
                  ],
                  "messages": [],
                  "result": [
                    "0x97f64d67c564b",
                    "0x0",
                    "0x4c4b40",
                    "0x0"
                  ]
                },
                {
                  "call_type": "CALL",
                  "calldata": [
                    "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
                    "0x57c2d2c568b",
                    "0x0"
                  ],
                  "caller_address": "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                  "calls": [
                    {
                      "call_type": "DELEGATE",
                      "calldata": [
                        "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
                        "0x57c2d2c568b",
                        "0x0"
                      ],
                      "caller_address": "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                      "calls": [],
                      "class_hash": "0x2760f25d5a4fb2bdde5f561fd0b44a3dee78c28903577d37d669939d97036a0",
                      "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                      "entry_point_selector": "0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e",
                      "entry_point_type": "EXTERNAL",
                      "events": [
                        {
                          "data": [
                            "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                            "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
                            "0x57c2d2c568b",
                            "0x0"
                          ],
                          "keys": [
                            "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
                          ],
                          "order": 7
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
                {
                  "call_type": "CALL",
                  "calldata": [
                    "0x30baaaf1b243f6e74c656f98dcb24b98687dcbe783d25f35854148c4c602d41",
                    "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                    "0xa76cc",
                    "0xa7b5e"
                  ],
                  "caller_address": "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
                  "calls": [],
                  "class_hash": "0x43505736628b183a525d5a65c21a9ab47b36b36e6974f0ec998cd75207d6369",
                  "contract_address": "0x1114c7103e12c2b2ecbd3a2472ba9c48ddcbf702b1c242dd570057e26212111",
                  "entry_point_selector": "0x3febd55483de69e1b4ad29a956f1cef83a67bd1ee8e48e8386c4a486c19238c",
                  "entry_point_type": "EXTERNAL",
                  "events": [],
                  "messages": [],
                  "result": [
                    "0x2b48bfbc9a7d",
                    "0x49d690ad63d33fb4839cab3ff506cfa",
                    "0x10",
                    "0x82149e729225f2a3f2870ccdc1",
                    "0x0"
                  ]
                }
              ],
              "class_hash": "0x78ea641b38dceaaee7145dae88ed6e49cfb6e31c87a729308bc71bdef79634a",
              "contract_address": "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
              "entry_point_selector": "0x2f0b3c5710379609eb5495f1ecd348cb28167711b73609fe565a72734550354",
              "entry_point_type": "EXTERNAL",
              "events": [
                {
                  "data": [
                    "0x0",
                    "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
                    "0x8a79",
                    "0x0"
                  ],
                  "keys": [
                    "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
                  ],
                  "order": 8
                },
                {
                  "data": [
                    "0x8a79",
                    "0x0",
                    "0x3a5ded959d3",
                    "0x97f64d67c564b",
                    "0x0",
                    "0x4c4b40",
                    "0x0"
                  ],
                  "keys": [
                    "0x3159b5cf425448a640d4666273b957d14e6c7a6a5a6a758af3c58d7ab7841fb"
                  ],
                  "order": 9
                }
              ],
              "messages": [],
              "result": [
                "0x8a79",
                "0x0",
                "0x3a5ded959d3",
                "0x97f64d67c564b",
                "0x0",
                "0x4c4b40",
                "0x0"
              ]
            }
          ],
          "class_hash": "0x1a736d6ed154502257f02b1ccdf4d9d1089f80811cd6acad48e6b6a9d1f2003",
          "contract_address": "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
          "entry_point_selector": "0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad",
          "entry_point_type": "EXTERNAL",
          "events": [
            {
              "data": [
                "0x3",
                "0x1",
                "0x1",
                "0x1",
                "0x1",
                "0x7",
                "0x8a79",
                "0x0",
                "0x3a5ded959d3",
                "0x97f64d67c564b",
                "0x0",
                "0x4c4b40",
                "0x0"
              ],
              "keys": [
                "0x1dcde06aabdbca2f80aa51392b345d7549d7757aa855f7e37f5d335ac8243b1",
                "0x24cfba646f79dd32c47a61d6de300f2ab1c9e2aff2e92f790c1368cd177d69c"
              ],
              "order": 10
            }
          ],
          "messages": [],
          "result": [
            "0x3",
            "0x1",
            "0x1",
            "0x1",
            "0x1",
            "0x7",
            "0x8a79",
            "0x0",
            "0x3a5ded959d3",
            "0x97f64d67c564b",
            "0x0",
            "0x4c4b40",
            "0x0"
          ]
        },
        "state_diff": {
          "declared_classes": [],
          "deployed_contracts": [],
          "deprecated_declared_classes": [],
          "nonces": [
            {
              "contract_address": "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10",
              "nonce": "0x52"
            }
          ],
          "replaced_classes": [],
          "storage_diffs": [
            {
              "address": "0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
              "storage_entries": [
                {
                  "key": "0x2bc92130481261ac8ebf05490c8f1799f651a4ebd2d64f0101f2a3f41bb441",
                  "value": "0x569b13e8164bc8000c0bbcf4887856516643af123c5bc3b01e229e92f9cfd10"
                },
                {
                  "key": "0x180cda4fd6c0599dc8ed498cc36eb9cab3ecad0efb3ccfd59043fbdd692374b",
                  "value": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
                },
                {
                  "key": "0x180cda4fd6c0599dc8ed498cc36eb9cab3ecad0efb3ccfd59043fbdd692374c",
                  "value": "0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8"
                },
                {
                  "key": "0x180cda4fd6c0599dc8ed498cc36eb9cab3ecad0efb3ccfd59043fbdd692374d",
                  "value": "0x1f4"
                },
                {
                  "key": "0x180cda4fd6c0599dc8ed498cc36eb9cab3ecad0efb3ccfd59043fbdd692374e",
                  "value": "0xa76cc"
                },
                {
                  "key": "0x180cda4fd6c0599dc8ed498cc36eb9cab3ecad0efb3ccfd59043fbdd692374f",
                  "value": "0xa7b5e"
                },
                {
                  "key": "0x180cda4fd6c0599dc8ed498cc36eb9cab3ecad0efb3ccfd59043fbdd6923750",
                  "value": "0x3a5ded959d3"
                },
                {
                  "key": "0x180cda4fd6c0599dc8ed498cc36eb9cab3ecad0efb3ccfd59043fbdd6923751",
                  "value": "0x49d690ad63d33fb4839cab3ff506cfa"
                },
                {
                  "key": "0x180cda4fd6c0599dc8ed498cc36eb9cab3ecad0efb3ccfd59043fbdd6923752",
                  "value": "0x10"
                },
                {
                  "key": "0x180cda4fd6c0599dc8ed498cc36eb9cab3ecad0efb3ccfd59043fbdd6923753",
                  "value": "0x82149e729225f2a3f2870ccdc1"
                },
                {
                  "key": "0x1b17a049a92942e9addea3ab67b43ebcc31f69a47577dfe3a2e7b51d2e87243",
                  "value": "0x8a7a"
                },
                {
                  "key": "0x262d01c4ea0ba5224219c45caec496441066662f6d51da63f7a7184ad4d7beb",
                  "value": "0x7c49"
                },
                {
                  "key": "0x3459c3a6e06e0f135cf117de6f098312d0c02f9fbf16e3a6d72759411bca0e3",
                  "value": "0x1"
                },
                {
                  "key": "0x489337eef8a53785cb84a0a34ca59fda785aa7b837e72c46c14dbf629b8a450",
                  "value": "0x7c48"
                },
                {
                  "key": "0x74dc6ace95c6b68b75359faf402cbb3cd4fe59ab17048baf296083ca60cfa6b",
                  "value": "0x8a79"
                },
                {
                  "key": "0x796f0dec51f60c15556de30ec7bcad14d8863eb983a9e52fcaba518aa2ed28f",
                  "value": "0x8a79"
                }
              ]
            },
            {
              "address": "0x1114c7103e12c2b2ecbd3a2472ba9c48ddcbf702b1c242dd570057e26212111",
              "storage_entries": [
                {
                  "key": "0x3fa65d6912e7d8d82b149d0cc034a285d8c33ae49e659642a4fd2e380937b7",
                  "value": "0x74272944c439"
                },
                {
                  "key": "0x3fa65d6912e7d8d82b149d0cc034a285d8c33ae49e659642a4fd2e380937b8",
                  "value": "0x648be4d87207"
                },
                {
                  "key": "0x52a714c7747ac1c22c598ff65c7aa097bb255c3fddb824f29e9b4fcedc30579",
                  "value": "0x3277a36fac30d6"
                },
                {
                  "key": "0x6920041ebb691d745e840f1946f08ecb0bded2cfc8cece129897a15584d682a",
                  "value": "0x2b48bfbc9a7d"
                },
                {
                  "key": "0x6920041ebb691d745e840f1946f08ecb0bded2cfc8cece129897a15584d682b",
                  "value": "0x49d690ad63d33fb4839cab3ff506cfa"
                },
                {
                  "key": "0x6920041ebb691d745e840f1946f08ecb0bded2cfc8cece129897a15584d682c",
                  "value": "0x10"
                },
                {
                  "key": "0x6920041ebb691d745e840f1946f08ecb0bded2cfc8cece129897a15584d682d",
                  "value": "0x82149e729225f2a3f2870ccdc1"
                },
                {
                  "key": "0x6920041ebb691d745e840f1946f08ecb0bded2cfc8cece129897a15584d682f",
                  "value": "0x4143324db3c0"
                },
                {
                  "key": "0x6920041ebb691d745e840f1946f08ecb0bded2cfc8cece129897a15584d6830",
                  "value": "0x210d5"
                },
                {
                  "key": "0x7cd5f403d59c96728f54d49606f0b1c4452791caf9dd87efea015e02589b984",
                  "value": "0x6c0f081dd4b8"
                },
                {
                  "key": "0x7cd5f403d59c96728f54d49606f0b1c4452791caf9dd87efea015e02589b985",
                  "value": "0x6c0f081dd4b8"
                }
              ]
            },
            {
              "address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
              "storage_entries": [
                {
                  "key": "0x14b36f2f827c4728ecac41e90cf996e64c4b20c345087b6be56bbe680051a1f",
                  "value": "0x70e0d9aa29d9c159a"
                },
                {
                  "key": "0x367c2ac2e63b88cb4382f26a49c62b1dfecb966e92138c574cfbec611723cce",
                  "value": "0x11ba205d123d0fb"
                },
                {
                  "key": "0x599b39b8f0e0e064f62ba921252b0735c2732a18e0b87e5b66e7f235d05dbf9",
                  "value": "0xffffffffffffffd577d379db24a7b44f"
                }
              ]
            },
            {
              "address": "0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
              "storage_entries": [
                {
                  "key": "0x14b36f2f827c4728ecac41e90cf996e64c4b20c345087b6be56bbe680051a1f",
                  "value": "0x1860959920"
                },
                {
                  "key": "0x367c2ac2e63b88cb4382f26a49c62b1dfecb966e92138c574cfbec611723cce",
                  "value": "0x11b0dac6"
                },
                {
                  "key": "0x599b39b8f0e0e064f62ba921252b0735c2732a18e0b87e5b66e7f235d05dbf9",
                  "value": "0xffffffffffffffffffffffad723a77e8"
                }
              ]
            }
          ]
        },
        "type": "INVOKE"
      }
    }
  ],
  "id": 0
}
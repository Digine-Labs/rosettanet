PARAMETERS:
block_id  -  Expected one of block_number, block_hash, latest, pending.

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
                "type": "INVOKE",
                "validate_invocation": {
                    "contract_address": "0x23de096d1c104ea81fa93dc7bf512cd18f47c2787b6dc1782c37558c66c4ce1",
                    "entry_point_selector": "0x162da33a4585851fe8d3af3c2a9c60b557814e221e0d4f30ff0b2189d9c7775",
                    "calldata": [
                        "0x1",
                        "0x1b22f7a9d18754c994ae0ee9adb4628d414232e3ebd748c386ac286f86c3066",
                        "0x2f0b3c5710379609eb5495f1ecd348cb28167711b73609fe565a72734550354",
                        "0x7",
                        "0x23de096d1c104ea81fa93dc7bf512cd18f47c2787b6dc1782c37558c66c4ce1",
                        "0x2d3d68",
                        "0x3",
                        "0x7a120",
                        "0x66506520",
                        "0x4766542af3b9615597ad4cdc5be0210b1c8c70ce849a1ab2b602d0adf4cdc5",
                        "0x4db2d0542c3fda556f7801ea8472f5c7a5e9780d20591f2881c872a1d0b5ed0"
                    ],
                    "caller_address": "0x0",
                    "class_hash": "0x1a736d6ed154502257f02b1ccdf4d9d1089f80811cd6acad48e6b6a9d1f2003",
                    "entry_point_type": "EXTERNAL",
                    "call_type": "CALL",
                    "result": [
                        "0x56414c4944"
                    ],
                    "calls": [],
                    "events": [],
                    "messages": [],
                    "execution_resources": {
                        "steps": 1262,
                        "memory_holes": 711,
                        "range_check_builtin_applications": 24,
                        "ec_op_builtin_applications": 3
                    }
                },
                "execute_invocation": {
                    "contract_address": "0x23de096d1c104ea81fa93dc7bf512cd18f47c2787b6dc1782c37558c66c4ce1",
                    "entry_point_selector": "0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad",
                    "calldata": [
                        "0x1",
                        "0x1b22f7a9d18754c994ae0ee9adb4628d414232e3ebd748c386ac286f86c3066",
                        "0x2f0b3c5710379609eb5495f1ecd348cb28167711b73609fe565a72734550354",
                        "0x7",
                        "0x23de096d1c104ea81fa93dc7bf512cd18f47c2787b6dc1782c37558c66c4ce1",
                        "0x2d3d68",
                        "0x3",
                        "0x7a120",
                        "0x66506520",
                        "0x4766542af3b9615597ad4cdc5be0210b1c8c70ce849a1ab2b602d0adf4cdc5",
                        "0x4db2d0542c3fda556f7801ea8472f5c7a5e9780d20591f2881c872a1d0b5ed0"
                    ],
                    "caller_address": "0x0",
                    "class_hash": "0x1a736d6ed154502257f02b1ccdf4d9d1089f80811cd6acad48e6b6a9d1f2003",
                    "entry_point_type": "EXTERNAL",
                    "call_type": "CALL",
                    "result": [
                        "0x1",
                        "0x0"
                    ],
                    "calls": [
                        {
                            "contract_address": "0x1b22f7a9d18754c994ae0ee9adb4628d414232e3ebd748c386ac286f86c3066",
                            "entry_point_selector": "0x2f0b3c5710379609eb5495f1ecd348cb28167711b73609fe565a72734550354",
                            "calldata": [
                                "0x23de096d1c104ea81fa93dc7bf512cd18f47c2787b6dc1782c37558c66c4ce1",
                                "0x2d3d68",
                                "0x3",
                                "0x7a120",
                                "0x66506520",
                                "0x4766542af3b9615597ad4cdc5be0210b1c8c70ce849a1ab2b602d0adf4cdc5",
                                "0x4db2d0542c3fda556f7801ea8472f5c7a5e9780d20591f2881c872a1d0b5ed0"
                            ],
                            "caller_address": "0x23de096d1c104ea81fa93dc7bf512cd18f47c2787b6dc1782c37558c66c4ce1",
                            "class_hash": "0x660f41e2ffebe07703729569eac75f2a68000488b24df74e65acf59fe225b1e",
                            "entry_point_type": "EXTERNAL",
                            "call_type": "CALL",
                            "result": [],
                            "calls": [
                                {
                                    "contract_address": "0x1b22f7a9d18754c994ae0ee9adb4628d414232e3ebd748c386ac286f86c3066",
                                    "entry_point_selector": "0x2f0b3c5710379609eb5495f1ecd348cb28167711b73609fe565a72734550354",
                                    "calldata": [
                                        "0x23de096d1c104ea81fa93dc7bf512cd18f47c2787b6dc1782c37558c66c4ce1",
                                        "0x2d3d68",
                                        "0x3",
                                        "0x7a120",
                                        "0x66506520",
                                        "0x4766542af3b9615597ad4cdc5be0210b1c8c70ce849a1ab2b602d0adf4cdc5",
                                        "0x4db2d0542c3fda556f7801ea8472f5c7a5e9780d20591f2881c872a1d0b5ed0"
                                    ],
                                    "caller_address": "0x23de096d1c104ea81fa93dc7bf512cd18f47c2787b6dc1782c37558c66c4ce1",
                                    "class_hash": "0x54659ac8392d7627971a4aaeaad88a9ed3c6b8bfac69a6861e475e3173369d3",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "DELEGATE",
                                    "result": [],
                                    "calls": [],
                                    "events": [
                                        {
                                            "order": 0,
                                            "keys": [
                                                "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
                                            ],
                                            "data": [
                                                "0x0",
                                                "0x23de096d1c104ea81fa93dc7bf512cd18f47c2787b6dc1782c37558c66c4ce1",
                                                "0x2d3d68",
                                                "0x0"
                                            ]
                                        }
                                    ],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 787,
                                        "memory_holes": 62,
                                        "pedersen_builtin_applications": 15,
                                        "range_check_builtin_applications": 32,
                                        "ecdsa_builtin_applications": 1
                                    }
                                }
                            ],
                            "events": [],
                            "messages": [],
                            "execution_resources": {
                                "steps": 847,
                                "memory_holes": 62,
                                "pedersen_builtin_applications": 15,
                                "range_check_builtin_applications": 32,
                                "ecdsa_builtin_applications": 1
                            }
                        }
                    ],
                    "events": [
                        {
                            "order": 1,
                            "keys": [
                                "0x1dcde06aabdbca2f80aa51392b345d7549d7757aa855f7e37f5d335ac8243b1",
                                "0x94ebcb13d2beaa2588489bb67d9c99ef51a03a4288ed65f184854bef224c78"
                            ],
                            "data": [
                                "0x1",
                                "0x0"
                            ]
                        }
                    ],
                    "messages": [],
                    "execution_resources": {
                        "steps": 2107,
                        "memory_holes": 69,
                        "pedersen_builtin_applications": 15,
                        "range_check_builtin_applications": 55,
                        "ecdsa_builtin_applications": 1
                    }
                },
                "fee_transfer_invocation": {
                    "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                    "entry_point_selector": "0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e",
                    "calldata": [
                        "0x1176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8",
                        "0x15aaa3b21803c",
                        "0x0"
                    ],
                    "caller_address": "0x23de096d1c104ea81fa93dc7bf512cd18f47c2787b6dc1782c37558c66c4ce1",
                    "class_hash": "0xd0e183745e9dae3e4e78a8ffedcce0903fc4900beace4e0abf192d4c202da3",
                    "entry_point_type": "EXTERNAL",
                    "call_type": "CALL",
                    "result": [
                        "0x1"
                    ],
                    "calls": [
                        {
                            "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                            "entry_point_selector": "0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e",
                            "calldata": [
                                "0x1176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8",
                                "0x15aaa3b21803c",
                                "0x0"
                            ],
                            "caller_address": "0x23de096d1c104ea81fa93dc7bf512cd18f47c2787b6dc1782c37558c66c4ce1",
                            "class_hash": "0x2760f25d5a4fb2bdde5f561fd0b44a3dee78c28903577d37d669939d97036a0",
                            "entry_point_type": "EXTERNAL",
                            "call_type": "DELEGATE",
                            "result": [
                                "0x1"
                            ],
                            "calls": [],
                            "events": [
                                {
                                    "order": 0,
                                    "keys": [
                                        "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
                                    ],
                                    "data": [
                                        "0x23de096d1c104ea81fa93dc7bf512cd18f47c2787b6dc1782c37558c66c4ce1",
                                        "0x1176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8",
                                        "0x15aaa3b21803c",
                                        "0x0"
                                    ]
                                }
                            ],
                            "messages": [],
                            "execution_resources": {
                                "steps": 526,
                                "memory_holes": 42,
                                "pedersen_builtin_applications": 4,
                                "range_check_builtin_applications": 21
                            }
                        }
                    ],
                    "events": [],
                    "messages": [],
                    "execution_resources": {
                        "steps": 586,
                        "memory_holes": 42,
                        "pedersen_builtin_applications": 4,
                        "range_check_builtin_applications": 21
                    }
                }
            },
            "transaction_hash": "0x94ebcb13d2beaa2588489bb67d9c99ef51a03a4288ed65f184854bef224c78"
        },
        {
            "trace_root": {
                "type": "L1_HANDLER",
                "function_invocation": {
                    "contract_address": "0x73314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82",
                    "entry_point_selector": "0x2d757788a8d8d6f21d1cd40bce38a8222d70654214e96ff95d8086e684fbee5",
                    "calldata": [
                        "0xae0ee0a63a2ce6baeeffe56e7714fb4efe48d419",
                        "0x238d1d30d5728054e63622da6ad4d0f7c59efe3aa682509fc46e33826d0a060",
                        "0x6f05b59d3b20000",
                        "0x0"
                    ],
                    "caller_address": "0x0",
                    "class_hash": "0xd0e183745e9dae3e4e78a8ffedcce0903fc4900beace4e0abf192d4c202da3",
                    "entry_point_type": "L1_HANDLER",
                    "call_type": "CALL",
                    "result": [],
                    "calls": [
                        {
                            "contract_address": "0x73314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82",
                            "entry_point_selector": "0x2d757788a8d8d6f21d1cd40bce38a8222d70654214e96ff95d8086e684fbee5",
                            "calldata": [
                                "0xae0ee0a63a2ce6baeeffe56e7714fb4efe48d419",
                                "0x238d1d30d5728054e63622da6ad4d0f7c59efe3aa682509fc46e33826d0a060",
                                "0x6f05b59d3b20000",
                                "0x0"
                            ],
                            "caller_address": "0x0",
                            "class_hash": "0x4f5bce5f70bb1fcf6573f68205d3e74538c46c14dc47d37bdbde4c1abaf4e1e",
                            "entry_point_type": "L1_HANDLER",
                            "call_type": "DELEGATE",
                            "result": [],
                            "calls": [
                                {
                                    "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x238d1d30d5728054e63622da6ad4d0f7c59efe3aa682509fc46e33826d0a060"
                                    ],
                                    "caller_address": "0x73314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82",
                                    "class_hash": "0xd0e183745e9dae3e4e78a8ffedcce0903fc4900beace4e0abf192d4c202da3",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x90097919c3f0",
                                        "0x0"
                                    ],
                                    "calls": [
                                        {
                                            "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                                            "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                            "calldata": [
                                                "0x238d1d30d5728054e63622da6ad4d0f7c59efe3aa682509fc46e33826d0a060"
                                            ],
                                            "caller_address": "0x73314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82",
                                            "class_hash": "0x2760f25d5a4fb2bdde5f561fd0b44a3dee78c28903577d37d669939d97036a0",
                                            "entry_point_type": "EXTERNAL",
                                            "call_type": "DELEGATE",
                                            "result": [
                                                "0x90097919c3f0",
                                                "0x0"
                                            ],
                                            "calls": [],
                                            "events": [],
                                            "messages": [],
                                            "execution_resources": {
                                                "steps": 95,
                                                "memory_holes": 10,
                                                "pedersen_builtin_applications": 1,
                                                "range_check_builtin_applications": 3
                                            }
                                        }
                                    ],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 155,
                                        "memory_holes": 10,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 3
                                    }
                                },
                                {
                                    "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                                    "entry_point_selector": "0x151e58b29179122a728eab07c8847e5baf5802379c5db3a7d57a8263a7bd1d",
                                    "calldata": [
                                        "0x238d1d30d5728054e63622da6ad4d0f7c59efe3aa682509fc46e33826d0a060",
                                        "0x6f05b59d3b20000",
                                        "0x0"
                                    ],
                                    "caller_address": "0x73314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82",
                                    "class_hash": "0xd0e183745e9dae3e4e78a8ffedcce0903fc4900beace4e0abf192d4c202da3",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [],
                                    "calls": [
                                        {
                                            "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                                            "entry_point_selector": "0x151e58b29179122a728eab07c8847e5baf5802379c5db3a7d57a8263a7bd1d",
                                            "calldata": [
                                                "0x238d1d30d5728054e63622da6ad4d0f7c59efe3aa682509fc46e33826d0a060",
                                                "0x6f05b59d3b20000",
                                                "0x0"
                                            ],
                                            "caller_address": "0x73314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82",
                                            "class_hash": "0x2760f25d5a4fb2bdde5f561fd0b44a3dee78c28903577d37d669939d97036a0",
                                            "entry_point_type": "EXTERNAL",
                                            "call_type": "DELEGATE",
                                            "result": [],
                                            "calls": [],
                                            "events": [
                                                {
                                                    "order": 0,
                                                    "keys": [
                                                        "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
                                                    ],
                                                    "data": [
                                                        "0x0",
                                                        "0x238d1d30d5728054e63622da6ad4d0f7c59efe3aa682509fc46e33826d0a060",
                                                        "0x6f05b59d3b20000",
                                                        "0x0"
                                                    ]
                                                }
                                            ],
                                            "messages": [],
                                            "execution_resources": {
                                                "steps": 398,
                                                "memory_holes": 20,
                                                "pedersen_builtin_applications": 2,
                                                "range_check_builtin_applications": 12
                                            }
                                        }
                                    ],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 458,
                                        "memory_holes": 20,
                                        "pedersen_builtin_applications": 2,
                                        "range_check_builtin_applications": 12
                                    }
                                },
                                {
                                    "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x238d1d30d5728054e63622da6ad4d0f7c59efe3aa682509fc46e33826d0a060"
                                    ],
                                    "caller_address": "0x73314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82",
                                    "class_hash": "0xd0e183745e9dae3e4e78a8ffedcce0903fc4900beace4e0abf192d4c202da3",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x6f0eb634ccbc3f0",
                                        "0x0"
                                    ],
                                    "calls": [
                                        {
                                            "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                                            "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                            "calldata": [
                                                "0x238d1d30d5728054e63622da6ad4d0f7c59efe3aa682509fc46e33826d0a060"
                                            ],
                                            "caller_address": "0x73314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82",
                                            "class_hash": "0x2760f25d5a4fb2bdde5f561fd0b44a3dee78c28903577d37d669939d97036a0",
                                            "entry_point_type": "EXTERNAL",
                                            "call_type": "DELEGATE",
                                            "result": [
                                                "0x6f0eb634ccbc3f0",
                                                "0x0"
                                            ],
                                            "calls": [],
                                            "events": [],
                                            "messages": [],
                                            "execution_resources": {
                                                "steps": 95,
                                                "memory_holes": 10,
                                                "pedersen_builtin_applications": 1,
                                                "range_check_builtin_applications": 3
                                            }
                                        }
                                    ],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 155,
                                        "memory_holes": 10,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 3
                                    }
                                }
                            ],
                            "events": [
                                {
                                    "order": 1,
                                    "keys": [
                                        "0x221e5a5008f7a28564f0eaa32cdeb0848d10657c449aed3e15d12150a7c2db3"
                                    ],
                                    "data": [
                                        "0x238d1d30d5728054e63622da6ad4d0f7c59efe3aa682509fc46e33826d0a060",
                                        "0x6f05b59d3b20000",
                                        "0x0"
                                    ]
                                }
                            ],
                            "messages": [],
                            "execution_resources": {
                                "steps": 1066,
                                "memory_holes": 40,
                                "pedersen_builtin_applications": 4,
                                "range_check_builtin_applications": 22
                            }
                        }
                    ],
                    "events": [],
                    "messages": [],
                    "execution_resources": {
                        "steps": 1130,
                        "memory_holes": 40,
                        "pedersen_builtin_applications": 4,
                        "range_check_builtin_applications": 22
                    }
                }
            },
            "transaction_hash": "0x7a4b7f161cae3e7d540b15a8efd56d0035364048fff91024a2a6e704b5220f1"
        },
        {
            "trace_root": {
                "type": "DEPLOY_ACCOUNT",
                "validate_invocation": {
                    "contract_address": "0x20acea067eec2ecbd5148bac6346d9829cfd7fa4257ccaaac1b4780e117d8ce",
                    "entry_point_selector": "0x36fcbf06cd96843058359e1a75928beacfac10727dab22a3972f0af8aa92895",
                    "calldata": [
                        "0x3530cc4759d78042f1b543bf797f5f3d647cde0388c33734cf91b7f7b9314a9",
                        "0x12ea4902d29b05eb7ed447114d38e539f917a52c8300e4829f7fbdcb8a28a4",
                        "0x309c042d3729173c7f2f91a34f04d8c509c1b292d334679ef1aabf8da0899cc",
                        "0x79dc0da7c54b95f10aa182ad0a46400db63156920adb65eca2654c0945a463",
                        "0x2",
                        "0x12ea4902d29b05eb7ed447114d38e539f917a52c8300e4829f7fbdcb8a28a4",
                        "0x0"
                    ],
                    "caller_address": "0x0",
                    "class_hash": "0x3530cc4759d78042f1b543bf797f5f3d647cde0388c33734cf91b7f7b9314a9",
                    "entry_point_type": "EXTERNAL",
                    "call_type": "CALL",
                    "result": [],
                    "calls": [
                        {
                            "contract_address": "0x20acea067eec2ecbd5148bac6346d9829cfd7fa4257ccaaac1b4780e117d8ce",
                            "entry_point_selector": "0x36fcbf06cd96843058359e1a75928beacfac10727dab22a3972f0af8aa92895",
                            "calldata": [
                                "0x3530cc4759d78042f1b543bf797f5f3d647cde0388c33734cf91b7f7b9314a9",
                                "0x12ea4902d29b05eb7ed447114d38e539f917a52c8300e4829f7fbdcb8a28a4",
                                "0x309c042d3729173c7f2f91a34f04d8c509c1b292d334679ef1aabf8da0899cc",
                                "0x79dc0da7c54b95f10aa182ad0a46400db63156920adb65eca2654c0945a463",
                                "0x2",
                                "0x12ea4902d29b05eb7ed447114d38e539f917a52c8300e4829f7fbdcb8a28a4",
                                "0x0"
                            ],
                            "caller_address": "0x0",
                            "class_hash": "0x309c042d3729173c7f2f91a34f04d8c509c1b292d334679ef1aabf8da0899cc",
                            "entry_point_type": "EXTERNAL",
                            "call_type": "DELEGATE",
                            "result": [],
                            "calls": [],
                            "events": [],
                            "messages": [],
                            "execution_resources": {
                                "steps": 127,
                                "range_check_builtin_applications": 1,
                                "ecdsa_builtin_applications": 1
                            }
                        }
                    ],
                    "events": [],
                    "messages": [],
                    "execution_resources": {
                        "steps": 187,
                        "range_check_builtin_applications": 1,
                        "ecdsa_builtin_applications": 1
                    }
                },
                "fee_transfer_invocation": {
                    "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                    "entry_point_selector": "0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e",
                    "calldata": [
                        "0x1176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8",
                        "0x10346d5beb924",
                        "0x0"
                    ],
                    "caller_address": "0x20acea067eec2ecbd5148bac6346d9829cfd7fa4257ccaaac1b4780e117d8ce",
                    "class_hash": "0xd0e183745e9dae3e4e78a8ffedcce0903fc4900beace4e0abf192d4c202da3",
                    "entry_point_type": "EXTERNAL",
                    "call_type": "CALL",
                    "result": [
                        "0x1"
                    ],
                    "calls": [
                        {
                            "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                            "entry_point_selector": "0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e",
                            "calldata": [
                                "0x1176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8",
                                "0x10346d5beb924",
                                "0x0"
                            ],
                            "caller_address": "0x20acea067eec2ecbd5148bac6346d9829cfd7fa4257ccaaac1b4780e117d8ce",
                            "class_hash": "0x2760f25d5a4fb2bdde5f561fd0b44a3dee78c28903577d37d669939d97036a0",
                            "entry_point_type": "EXTERNAL",
                            "call_type": "DELEGATE",
                            "result": [
                                "0x1"
                            ],
                            "calls": [],
                            "events": [
                                {
                                    "order": 0,
                                    "keys": [
                                        "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
                                    ],
                                    "data": [
                                        "0x20acea067eec2ecbd5148bac6346d9829cfd7fa4257ccaaac1b4780e117d8ce",
                                        "0x1176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8",
                                        "0x10346d5beb924",
                                        "0x0"
                                    ]
                                }
                            ],
                            "messages": [],
                            "execution_resources": {
                                "steps": 526,
                                "memory_holes": 42,
                                "pedersen_builtin_applications": 4,
                                "range_check_builtin_applications": 21
                            }
                        }
                    ],
                    "events": [],
                    "messages": [],
                    "execution_resources": {
                        "steps": 586,
                        "memory_holes": 42,
                        "pedersen_builtin_applications": 4,
                        "range_check_builtin_applications": 21
                    }
                },
                "constructor_invocation": {
                    "contract_address": "0x20acea067eec2ecbd5148bac6346d9829cfd7fa4257ccaaac1b4780e117d8ce",
                    "entry_point_selector": "0x28ffe4ff0f226a9107253e17a904099aa4f63a02a5621de0576e5aa71bc5194",
                    "calldata": [
                        "0x309c042d3729173c7f2f91a34f04d8c509c1b292d334679ef1aabf8da0899cc",
                        "0x79dc0da7c54b95f10aa182ad0a46400db63156920adb65eca2654c0945a463",
                        "0x2",
                        "0x12ea4902d29b05eb7ed447114d38e539f917a52c8300e4829f7fbdcb8a28a4",
                        "0x0"
                    ],
                    "caller_address": "0x0",
                    "class_hash": "0x3530cc4759d78042f1b543bf797f5f3d647cde0388c33734cf91b7f7b9314a9",
                    "entry_point_type": "CONSTRUCTOR",
                    "call_type": "CALL",
                    "result": [],
                    "calls": [
                        {
                            "contract_address": "0x20acea067eec2ecbd5148bac6346d9829cfd7fa4257ccaaac1b4780e117d8ce",
                            "entry_point_selector": "0x79dc0da7c54b95f10aa182ad0a46400db63156920adb65eca2654c0945a463",
                            "calldata": [
                                "0x12ea4902d29b05eb7ed447114d38e539f917a52c8300e4829f7fbdcb8a28a4",
                                "0x0"
                            ],
                            "caller_address": "0x0",
                            "class_hash": "0x309c042d3729173c7f2f91a34f04d8c509c1b292d334679ef1aabf8da0899cc",
                            "entry_point_type": "EXTERNAL",
                            "call_type": "DELEGATE",
                            "result": [],
                            "calls": [],
                            "events": [
                                {
                                    "order": 0,
                                    "keys": [
                                        "0x10c19bef19acd19b2c9f4caa40fd47c9fbe1d9f91324d44dcd36be2dae96784"
                                    ],
                                    "data": [
                                        "0x20acea067eec2ecbd5148bac6346d9829cfd7fa4257ccaaac1b4780e117d8ce",
                                        "0x12ea4902d29b05eb7ed447114d38e539f917a52c8300e4829f7fbdcb8a28a4",
                                        "0x0"
                                    ]
                                }
                            ],
                            "messages": [],
                            "execution_resources": {
                                "steps": 148
                            }
                        }
                    ],
                    "events": [],
                    "messages": [],
                    "execution_resources": {
                        "steps": 226,
                        "range_check_builtin_applications": 1
                    }
                }
            },
            "transaction_hash": "0x124e3d2167caff211459c1b3830a001f108d03c70b6bbaf7cfb2af6d1ee1ec0"
        },
    ]
    "id":1}
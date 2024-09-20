REQUEST:

{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "starknet_traceTransaction",
    "params": [
        "0x64f7c084d9cba540cba343f3ec1b69a06bd9169c9016e518d06d418003a31fd"
    ]
}

RESULT:

{
    "jsonrpc": "2.0",
    "result": {
        "type": "INVOKE",
        "validate_invocation": {
            "contract_address": "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a",
            "entry_point_selector": "0x162da33a4585851fe8d3af3c2a9c60b557814e221e0d4f30ff0b2189d9c7775",
            "calldata": [
                "0x1",
                "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                "0x2f0b3c5710379609eb5495f1ecd348cb28167711b73609fe565a72734550354",
                "0x3",
                "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a",
                "0xee6b280",
                "0x0"
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
                "steps": 1074,
                "memory_holes": 711,
                "range_check_builtin_applications": 20,
                "ec_op_builtin_applications": 3
            }
        },
        "execute_invocation": {
            "contract_address": "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a",
            "entry_point_selector": "0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad",
            "calldata": [
                "0x1",
                "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                "0x2f0b3c5710379609eb5495f1ecd348cb28167711b73609fe565a72734550354",
                "0x3",
                "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a",
                "0xee6b280",
                "0x0"
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
                    "contract_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                    "entry_point_selector": "0x2f0b3c5710379609eb5495f1ecd348cb28167711b73609fe565a72734550354",
                    "calldata": [
                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a",
                        "0xee6b280",
                        "0x0"
                    ],
                    "caller_address": "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a",
                    "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                    "entry_point_type": "EXTERNAL",
                    "call_type": "CALL",
                    "result": [],
                    "calls": [
                        {
                            "contract_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                            "entry_point_selector": "0x1bbd47d7e78551fa93f489d2c8f331fc4368912b47591c35199e379c7073ff4",
                            "calldata": [
                                "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51"
                            ],
                            "caller_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                            "class_hash": "0x69273566b9fe6cb2fffed3d5a81366c2e62d1d01a16f23bf82ddd8f564bda66",
                            "entry_point_type": "EXTERNAL",
                            "call_type": "CALL",
                            "result": [],
                            "calls": [
                                {
                                    "contract_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                    "entry_point_selector": "0x251f4d888ccbae2961f24b92b84579f2dea0d130428586bcb6a21747f69e484",
                                    "calldata": [],
                                    "caller_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                    "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x240873a7f46",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 68
                                    }
                                },
                                {
                                    "contract_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                    "entry_point_selector": "0x251f4d888ccbae2961f24b92b84579f2dea0d130428586bcb6a21747f69e484",
                                    "calldata": [],
                                    "caller_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                    "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x240873a7f46",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 68
                                    }
                                },
                                {
                                    "contract_address": "0x2fc2d4b41cc1f03d185e6681cbd40cced61915d4891517a042658d61cba3b1",
                                    "entry_point_selector": "0xfe0c839feb1893112457cbc3934d8de3278cf60d639fdb7b67482f1e239cc2",
                                    "calldata": [
                                        "0x8718bf271493c557974f8aab1179f431a0ca956c74e83f8ec4c37834f0f9ce",
                                        "0x233d5",
                                        "0x0"
                                    ],
                                    "caller_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                    "class_hash": "0x3454df602367830febe19a1b36ad737040e66dee66ce944211f6757ef3eb679",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [],
                                    "calls": [
                                        {
                                            "contract_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                            "entry_point_selector": "0x1b20c98176dbf60c9f92354aebb9359ec4aa99f5ed95221126e89e3364bce1a",
                                            "calldata": [],
                                            "caller_address": "0x2fc2d4b41cc1f03d185e6681cbd40cced61915d4891517a042658d61cba3b1",
                                            "class_hash": "0x3c12aacab71a40d75783f87c921fb003fe1effd5c4042363eb623f3fcfa7ba6",
                                            "entry_point_type": "EXTERNAL",
                                            "call_type": "CALL",
                                            "result": [],
                                            "calls": [],
                                            "events": [],
                                            "messages": [],
                                            "execution_resources": {
                                                "steps": 48
                                            }
                                        },
                                        {
                                            "contract_address": "0x2fc2d4b41cc1f03d185e6681cbd40cced61915d4891517a042658d61cba3b1",
                                            "entry_point_selector": "0x37d10bcd2567a053f7a15f91c3c6ce0a88cac7ecfea28d71321fd924fa9878f",
                                            "calldata": [],
                                            "caller_address": "0x2fc2d4b41cc1f03d185e6681cbd40cced61915d4891517a042658d61cba3b1",
                                            "class_hash": "0x3454df602367830febe19a1b36ad737040e66dee66ce944211f6757ef3eb679",
                                            "entry_point_type": "EXTERNAL",
                                            "call_type": "CALL",
                                            "result": [
                                                "0xe0abda244785c71",
                                                "0x0"
                                            ],
                                            "calls": [
                                                {
                                                    "contract_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                                    "entry_point_selector": "0x3fe575bac3386ca9be28a0a86c06cdf49a18e1ac1aaa25e56fa95418d72400b",
                                                    "calldata": [
                                                        "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51"
                                                    ],
                                                    "caller_address": "0x2fc2d4b41cc1f03d185e6681cbd40cced61915d4891517a042658d61cba3b1",
                                                    "class_hash": "0x69273566b9fe6cb2fffed3d5a81366c2e62d1d01a16f23bf82ddd8f564bda66",
                                                    "entry_point_type": "EXTERNAL",
                                                    "call_type": "CALL",
                                                    "result": [
                                                        "0xe0abda244785c71",
                                                        "0x0"
                                                    ],
                                                    "calls": [],
                                                    "events": [],
                                                    "messages": [],
                                                    "execution_resources": {
                                                        "steps": 337,
                                                        "memory_holes": 44,
                                                        "pedersen_builtin_applications": 4,
                                                        "range_check_builtin_applications": 12
                                                    }
                                                }
                                            ],
                                            "events": [],
                                            "messages": [],
                                            "execution_resources": {
                                                "steps": 450,
                                                "memory_holes": 44,
                                                "pedersen_builtin_applications": 4,
                                                "range_check_builtin_applications": 12
                                            }
                                        },
                                        {
                                            "contract_address": "0x2fc2d4b41cc1f03d185e6681cbd40cced61915d4891517a042658d61cba3b1",
                                            "entry_point_selector": "0x37d10bcd2567a053f7a15f91c3c6ce0a88cac7ecfea28d71321fd924fa9878f",
                                            "calldata": [],
                                            "caller_address": "0x2fc2d4b41cc1f03d185e6681cbd40cced61915d4891517a042658d61cba3b1",
                                            "class_hash": "0x3454df602367830febe19a1b36ad737040e66dee66ce944211f6757ef3eb679",
                                            "entry_point_type": "EXTERNAL",
                                            "call_type": "CALL",
                                            "result": [
                                                "0xe0abda244785c71",
                                                "0x0"
                                            ],
                                            "calls": [
                                                {
                                                    "contract_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                                    "entry_point_selector": "0x3fe575bac3386ca9be28a0a86c06cdf49a18e1ac1aaa25e56fa95418d72400b",
                                                    "calldata": [
                                                        "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51"
                                                    ],
                                                    "caller_address": "0x2fc2d4b41cc1f03d185e6681cbd40cced61915d4891517a042658d61cba3b1",
                                                    "class_hash": "0x69273566b9fe6cb2fffed3d5a81366c2e62d1d01a16f23bf82ddd8f564bda66",
                                                    "entry_point_type": "EXTERNAL",
                                                    "call_type": "CALL",
                                                    "result": [
                                                        "0xe0abda244785c71",
                                                        "0x0"
                                                    ],
                                                    "calls": [],
                                                    "events": [],
                                                    "messages": [],
                                                    "execution_resources": {
                                                        "steps": 337,
                                                        "memory_holes": 44,
                                                        "pedersen_builtin_applications": 4,
                                                        "range_check_builtin_applications": 12
                                                    }
                                                }
                                            ],
                                            "events": [],
                                            "messages": [],
                                            "execution_resources": {
                                                "steps": 450,
                                                "memory_holes": 44,
                                                "pedersen_builtin_applications": 4,
                                                "range_check_builtin_applications": 12
                                            }
                                        }
                                    ],
                                    "events": [
                                        {
                                            "order": 3,
                                            "keys": [
                                                "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
                                            ],
                                            "data": [
                                                "0x0",
                                                "0x8718bf271493c557974f8aab1179f431a0ca956c74e83f8ec4c37834f0f9ce",
                                                "0x22d3e",
                                                "0x0"
                                            ]
                                        },
                                        {
                                            "order": 4,
                                            "keys": [
                                                "0x34e55c1cd55f1338241b50d352f0e91c7e4ffad0e4271d64eb347589ebdfd16"
                                            ],
                                            "data": [
                                                "0x8718bf271493c557974f8aab1179f431a0ca956c74e83f8ec4c37834f0f9ce",
                                                "0x233d5",
                                                "0x0"
                                            ]
                                        }
                                    ],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 3150,
                                        "memory_holes": 167,
                                        "pedersen_builtin_applications": 10,
                                        "range_check_builtin_applications": 215
                                    }
                                }
                            ],
                            "events": [
                                {
                                    "order": 0,
                                    "keys": [
                                        "0x2d869564c7a090f9b3cd65b3da756ce0477042ddacf02cf39dd19ca4c223e5f"
                                    ],
                                    "data": [
                                        "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                        "0xe0abda244785c71",
                                        "0x0"
                                    ]
                                },
                                {
                                    "order": 1,
                                    "keys": [
                                        "0x3fe378208b9b410fecd7e94ee45037c8715f0f12c7a8455bde0f35277b83d65"
                                    ],
                                    "data": [
                                        "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                        "0xe2ebc577af532df",
                                        "0x0"
                                    ]
                                },
                                {
                                    "order": 2,
                                    "keys": [
                                        "0x624ef3ac9a411845bcc671de3155f9c27c29a2539be56d17acff46d0747877"
                                    ],
                                    "data": [
                                        "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                        "0x65db9cc0"
                                    ]
                                }
                            ],
                            "messages": [],
                            "execution_resources": {
                                "steps": 14792,
                                "memory_holes": 847,
                                "pedersen_builtin_applications": 39,
                                "range_check_builtin_applications": 1392
                            }
                        },
                        {
                            "contract_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                            "entry_point_selector": "0x3863156918810824fe4dde14341adbb0b1a27313ff68bc450f7b9901dd3ce9e",
                            "calldata": [
                                "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a",
                                "0xee6b280",
                                "0x0"
                            ],
                            "caller_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                            "class_hash": "0x69273566b9fe6cb2fffed3d5a81366c2e62d1d01a16f23bf82ddd8f564bda66",
                            "entry_point_type": "EXTERNAL",
                            "call_type": "CALL",
                            "result": [],
                            "calls": [
                                {
                                    "contract_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                    "entry_point_selector": "0x12d60825cc57ee4a44efdb81f0050fb99bcc550c411acb3ca38c9b83103dc2f",
                                    "calldata": [],
                                    "caller_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                    "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 57
                                    }
                                },
                                {
                                    "contract_address": "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                                    "entry_point_selector": "0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a",
                                        "0xee6b280",
                                        "0x0"
                                    ],
                                    "caller_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                    "class_hash": "0x5ffbcfeb50d200a0677c48a129a11245a3fc519d1d98d76882d1c9a1b19c6ed",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x1"
                                    ],
                                    "calls": [],
                                    "events": [
                                        {
                                            "order": 5,
                                            "keys": [
                                                "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
                                            ],
                                            "data": [
                                                "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                                "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a",
                                                "0xee6b280",
                                                "0x0"
                                            ]
                                        }
                                    ],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 876,
                                        "memory_holes": 56,
                                        "pedersen_builtin_applications": 4,
                                        "range_check_builtin_applications": 27
                                    }
                                }
                            ],
                            "events": [],
                            "messages": [],
                            "execution_resources": {
                                "steps": 1132,
                                "memory_holes": 66,
                                "pedersen_builtin_applications": 5,
                                "range_check_builtin_applications": 30
                            }
                        },
                        {
                            "contract_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                            "entry_point_selector": "0x1b20c98176dbf60c9f92354aebb9359ec4aa99f5ed95221126e89e3364bce1a",
                            "calldata": [],
                            "caller_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                            "class_hash": "0x3c12aacab71a40d75783f87c921fb003fe1effd5c4042363eb623f3fcfa7ba6",
                            "entry_point_type": "EXTERNAL",
                            "call_type": "CALL",
                            "result": [],
                            "calls": [],
                            "events": [],
                            "messages": [],
                            "execution_resources": {
                                "steps": 48
                            }
                        },
                        {
                            "contract_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                            "entry_point_selector": "0x37d10bcd2567a053f7a15f91c3c6ce0a88cac7ecfea28d71321fd924fa9878f",
                            "calldata": [],
                            "caller_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                            "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                            "entry_point_type": "EXTERNAL",
                            "call_type": "CALL",
                            "result": [
                                "0xe2ebc577af532df",
                                "0x0"
                            ],
                            "calls": [
                                {
                                    "contract_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                    "entry_point_selector": "0x8f8d1f3e5e6660b5e7277188c99295a7663466e468d86b49babaf818526669",
                                    "calldata": [
                                        "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51"
                                    ],
                                    "caller_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                    "class_hash": "0x69273566b9fe6cb2fffed3d5a81366c2e62d1d01a16f23bf82ddd8f564bda66",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0xe2ebc577af532df",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 337,
                                        "memory_holes": 44,
                                        "pedersen_builtin_applications": 4,
                                        "range_check_builtin_applications": 12
                                    }
                                }
                            ],
                            "events": [],
                            "messages": [],
                            "execution_resources": {
                                "steps": 432,
                                "memory_holes": 44,
                                "pedersen_builtin_applications": 4,
                                "range_check_builtin_applications": 12
                            }
                        },
                        {
                            "contract_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                            "entry_point_selector": "0x37d10bcd2567a053f7a15f91c3c6ce0a88cac7ecfea28d71321fd924fa9878f",
                            "calldata": [],
                            "caller_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                            "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                            "entry_point_type": "EXTERNAL",
                            "call_type": "CALL",
                            "result": [
                                "0xe2ebc577af532df",
                                "0x0"
                            ],
                            "calls": [
                                {
                                    "contract_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                    "entry_point_selector": "0x8f8d1f3e5e6660b5e7277188c99295a7663466e468d86b49babaf818526669",
                                    "calldata": [
                                        "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51"
                                    ],
                                    "caller_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                    "class_hash": "0x69273566b9fe6cb2fffed3d5a81366c2e62d1d01a16f23bf82ddd8f564bda66",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0xe2ebc577af532df",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 337,
                                        "memory_holes": 44,
                                        "pedersen_builtin_applications": 4,
                                        "range_check_builtin_applications": 12
                                    }
                                }
                            ],
                            "events": [],
                            "messages": [],
                            "execution_resources": {
                                "steps": 432,
                                "memory_holes": 44,
                                "pedersen_builtin_applications": 4,
                                "range_check_builtin_applications": 12
                            }
                        },
                        {
                            "contract_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                            "entry_point_selector": "0x37d10bcd2567a053f7a15f91c3c6ce0a88cac7ecfea28d71321fd924fa9878f",
                            "calldata": [],
                            "caller_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                            "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                            "entry_point_type": "EXTERNAL",
                            "call_type": "CALL",
                            "result": [
                                "0xe2ebc577af532df",
                                "0x0"
                            ],
                            "calls": [
                                {
                                    "contract_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                    "entry_point_selector": "0x8f8d1f3e5e6660b5e7277188c99295a7663466e468d86b49babaf818526669",
                                    "calldata": [
                                        "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51"
                                    ],
                                    "caller_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                    "class_hash": "0x69273566b9fe6cb2fffed3d5a81366c2e62d1d01a16f23bf82ddd8f564bda66",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0xe2ebc577af532df",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 337,
                                        "memory_holes": 44,
                                        "pedersen_builtin_applications": 4,
                                        "range_check_builtin_applications": 12
                                    }
                                }
                            ],
                            "events": [],
                            "messages": [],
                            "execution_resources": {
                                "steps": 432,
                                "memory_holes": 44,
                                "pedersen_builtin_applications": 4,
                                "range_check_builtin_applications": 12
                            }
                        },
                        {
                            "contract_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                            "entry_point_selector": "0x3623cf27b80a9ae523e5232e550fcf2f7886af44a354c531d961efada460be5",
                            "calldata": [
                                "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                            ],
                            "caller_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                            "class_hash": "0x3c12aacab71a40d75783f87c921fb003fe1effd5c4042363eb623f3fcfa7ba6",
                            "entry_point_type": "EXTERNAL",
                            "call_type": "CALL",
                            "result": [],
                            "calls": [
                                {
                                    "contract_address": "0xba3037d968790ac486f70acaa9a1cab10cf5843bb85c986624b4d0e5a82e74",
                                    "entry_point_selector": "0x12d60825cc57ee4a44efdb81f0050fb99bcc550c411acb3ca38c9b83103dc2f",
                                    "calldata": [],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 57
                                    }
                                },
                                {
                                    "contract_address": "0xba3037d968790ac486f70acaa9a1cab10cf5843bb85c986624b4d0e5a82e74",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x0",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 139,
                                        "memory_holes": 11,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 3
                                    }
                                },
                                {
                                    "contract_address": "0x66037c083c33330a8460a65e4748ceec275bbf5f28aa71b686cbc0010e12597",
                                    "entry_point_selector": "0x12d60825cc57ee4a44efdb81f0050fb99bcc550c411acb3ca38c9b83103dc2f",
                                    "calldata": [],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0xda114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 57
                                    }
                                },
                                {
                                    "contract_address": "0x66037c083c33330a8460a65e4748ceec275bbf5f28aa71b686cbc0010e12597",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x0",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 139,
                                        "memory_holes": 11,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 3
                                    }
                                },
                                {
                                    "contract_address": "0x491480f21299223b9ce770f23a2c383437f9fbf57abc2ac952e9af8cdb12c97",
                                    "entry_point_selector": "0x12d60825cc57ee4a44efdb81f0050fb99bcc550c411acb3ca38c9b83103dc2f",
                                    "calldata": [],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x3fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 57
                                    }
                                },
                                {
                                    "contract_address": "0x491480f21299223b9ce770f23a2c383437f9fbf57abc2ac952e9af8cdb12c97",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x0",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 139,
                                        "memory_holes": 11,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 3
                                    }
                                },
                                {
                                    "contract_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                    "entry_point_selector": "0x12d60825cc57ee4a44efdb81f0050fb99bcc550c411acb3ca38c9b83103dc2f",
                                    "calldata": [],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 57
                                    }
                                },
                                {
                                    "contract_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0xee6b280",
                                        "0x0"
                                    ],
                                    "calls": [
                                        {
                                            "contract_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                            "entry_point_selector": "0x37d10bcd2567a053f7a15f91c3c6ce0a88cac7ecfea28d71321fd924fa9878f",
                                            "calldata": [],
                                            "caller_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                            "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                                            "entry_point_type": "EXTERNAL",
                                            "call_type": "CALL",
                                            "result": [
                                                "0xe2ebc577af532df",
                                                "0x0"
                                            ],
                                            "calls": [
                                                {
                                                    "contract_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                                    "entry_point_selector": "0x8f8d1f3e5e6660b5e7277188c99295a7663466e468d86b49babaf818526669",
                                                    "calldata": [
                                                        "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51"
                                                    ],
                                                    "caller_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                                    "class_hash": "0x69273566b9fe6cb2fffed3d5a81366c2e62d1d01a16f23bf82ddd8f564bda66",
                                                    "entry_point_type": "EXTERNAL",
                                                    "call_type": "CALL",
                                                    "result": [
                                                        "0xe2ebc577af532df",
                                                        "0x0"
                                                    ],
                                                    "calls": [],
                                                    "events": [],
                                                    "messages": [],
                                                    "execution_resources": {
                                                        "steps": 337,
                                                        "memory_holes": 44,
                                                        "pedersen_builtin_applications": 4,
                                                        "range_check_builtin_applications": 12
                                                    }
                                                }
                                            ],
                                            "events": [],
                                            "messages": [],
                                            "execution_resources": {
                                                "steps": 432,
                                                "memory_holes": 44,
                                                "pedersen_builtin_applications": 4,
                                                "range_check_builtin_applications": 12
                                            }
                                        }
                                    ],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 1355,
                                        "memory_holes": 75,
                                        "pedersen_builtin_applications": 5,
                                        "range_check_builtin_applications": 102
                                    }
                                },
                                {
                                    "contract_address": "0x683852789848dea686fcfb66aaebf6477d83b25d8894aae73b15ff19b765bf0",
                                    "entry_point_selector": "0x3296cc786c10cb1de1a21b26a4855077a07e96d5d5b8900379fbf5eb2768184",
                                    "calldata": [
                                        "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x5807986d79d4ba7e8729baaad831399979ac5ef9dd516508e0c27cfaae62620",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x126ee52353000",
                                        "0x0"
                                    ],
                                    "calls": [
                                        {
                                            "contract_address": "0x7b05e8dc9c770b72befcf09599132093cf9e57becb2d1b3e89514e1f9bdf0ab",
                                            "entry_point_selector": "0x3296cc786c10cb1de1a21b26a4855077a07e96d5d5b8900379fbf5eb2768184",
                                            "calldata": [
                                                "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8"
                                            ],
                                            "caller_address": "0x683852789848dea686fcfb66aaebf6477d83b25d8894aae73b15ff19b765bf0",
                                            "class_hash": "0x322e6fc040c1985e5239d79838736a09f9f8cdce5db3336770c8c97f93c3a61",
                                            "entry_point_type": "EXTERNAL",
                                            "call_type": "CALL",
                                            "result": [
                                                "0x126ee52353000",
                                                "0x0"
                                            ],
                                            "calls": [
                                                {
                                                    "contract_address": "0x6714fc78773c0ab8f8d7668ba77da713333473f18da47595249d9b8ade2d8d4",
                                                    "entry_point_selector": "0x1bc9acbad94155b8ff5d7f6fcccf6c81ef1c3787af540c17d288a179e4c0256",
                                                    "calldata": [
                                                        "0x55534443",
                                                        "0x455448",
                                                        "0x4d454449414e"
                                                    ],
                                                    "caller_address": "0x7b05e8dc9c770b72befcf09599132093cf9e57becb2d1b3e89514e1f9bdf0ab",
                                                    "class_hash": "0x17913e3921aac1eb817d3a9455b97a45220b2660bbb47c01c946f2401bff234",
                                                    "entry_point_type": "EXTERNAL",
                                                    "call_type": "CALL",
                                                    "result": [
                                                        "0x7eac",
                                                        "0x8",
                                                        "0x65db9c87",
                                                        "0x8"
                                                    ],
                                                    "calls": [
                                                        {
                                                            "contract_address": "0x2a85bd616f912537c50a49a4076db02c00b29b2cdc8a197ce92ed1837fa875b",
                                                            "entry_point_selector": "0x3ceffcfb2dba0d775a368cf80bd2bd1184b754e93cb00a10f87373f32c89e35",
                                                            "calldata": [
                                                                "0x55534443",
                                                                "0x455448",
                                                                "0x0",
                                                                "0x0",
                                                                "0x1"
                                                            ],
                                                            "caller_address": "0x6714fc78773c0ab8f8d7668ba77da713333473f18da47595249d9b8ade2d8d4",
                                                            "class_hash": "0x25abeffbd83906d362db31c461a2c72b71a9b106d3c29fa054bf2d23949ae26",
                                                            "entry_point_type": "EXTERNAL",
                                                            "call_type": "CALL",
                                                            "result": [
                                                                "0x7eac",
                                                                "0x8",
                                                                "0x65db9c87",
                                                                "0x8",
                                                                "0x1"
                                                            ],
                                                            "calls": [],
                                                            "events": [],
                                                            "messages": [],
                                                            "execution_resources": {
                                                                "steps": 172989,
                                                                "memory_holes": 10046,
                                                                "pedersen_builtin_applications": 679,
                                                                "range_check_builtin_applications": 8231,
                                                                "poseidon_builtin_applications": 200
                                                            }
                                                        }
                                                    ],
                                                    "events": [],
                                                    "messages": [],
                                                    "execution_resources": {
                                                        "steps": 173419,
                                                        "memory_holes": 10081,
                                                        "pedersen_builtin_applications": 679,
                                                        "range_check_builtin_applications": 8240,
                                                        "poseidon_builtin_applications": 200
                                                    }
                                                }
                                            ],
                                            "events": [],
                                            "messages": [],
                                            "execution_resources": {
                                                "steps": 174575,
                                                "memory_holes": 10154,
                                                "pedersen_builtin_applications": 680,
                                                "range_check_builtin_applications": 8345,
                                                "poseidon_builtin_applications": 200
                                            }
                                        }
                                    ],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 174698,
                                        "memory_holes": 10158,
                                        "pedersen_builtin_applications": 680,
                                        "range_check_builtin_applications": 8345,
                                        "poseidon_builtin_applications": 200
                                    }
                                },
                                {
                                    "contract_address": "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                                    "entry_point_selector": "0x4c4fb1ab068f6039d5780c68dd0fa2f8742cceb3426d19667778ca7f3518a9",
                                    "calldata": [],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x5ffbcfeb50d200a0677c48a129a11245a3fc519d1d98d76882d1c9a1b19c6ed",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x6"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 97,
                                        "memory_holes": 7,
                                        "range_check_builtin_applications": 4
                                    }
                                },
                                {
                                    "contract_address": "0x24e9b0d6bc79e111e6872bb1ada2a874c25712cf08dfc5bcf0de008a7cca55f",
                                    "entry_point_selector": "0x12d60825cc57ee4a44efdb81f0050fb99bcc550c411acb3ca38c9b83103dc2f",
                                    "calldata": [],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 57
                                    }
                                },
                                {
                                    "contract_address": "0x24e9b0d6bc79e111e6872bb1ada2a874c25712cf08dfc5bcf0de008a7cca55f",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x0",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 139,
                                        "memory_holes": 11,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 3
                                    }
                                },
                                {
                                    "contract_address": "0x348cc417fc877a7868a66510e8e0d0f3f351f5e6b0886a86b652fcb30a3d1fb",
                                    "entry_point_selector": "0x12d60825cc57ee4a44efdb81f0050fb99bcc550c411acb3ca38c9b83103dc2f",
                                    "calldata": [],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x79561bce61f39a0dfab9413cee86f6cfe7d9112b96abce545c6e929b20081eb",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x42b8f0484674ca266ac5d08e4ac6a3fe65bd3129795def2dca5c34ecc5f96d2"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 99,
                                        "memory_holes": 1,
                                        "range_check_builtin_applications": 5
                                    }
                                },
                                {
                                    "contract_address": "0x348cc417fc877a7868a66510e8e0d0f3f351f5e6b0886a86b652fcb30a3d1fb",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x79561bce61f39a0dfab9413cee86f6cfe7d9112b96abce545c6e929b20081eb",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x0",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 235,
                                        "memory_holes": 464,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 10
                                    }
                                },
                                {
                                    "contract_address": "0x35778d24792bbebcf7651146896df5f787641af9e2a3db06480a637fbc9fff8",
                                    "entry_point_selector": "0x12d60825cc57ee4a44efdb81f0050fb99bcc550c411acb3ca38c9b83103dc2f",
                                    "calldata": [],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x79561bce61f39a0dfab9413cee86f6cfe7d9112b96abce545c6e929b20081eb",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 99,
                                        "memory_holes": 1,
                                        "range_check_builtin_applications": 5
                                    }
                                },
                                {
                                    "contract_address": "0x35778d24792bbebcf7651146896df5f787641af9e2a3db06480a637fbc9fff8",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x79561bce61f39a0dfab9413cee86f6cfe7d9112b96abce545c6e929b20081eb",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x0",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 235,
                                        "memory_holes": 464,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 10
                                    }
                                },
                                {
                                    "contract_address": "0x1258eae3eae5002125bebf062d611a772e8aea3a1879b64a19f363ebd00947",
                                    "entry_point_selector": "0x12d60825cc57ee4a44efdb81f0050fb99bcc550c411acb3ca38c9b83103dc2f",
                                    "calldata": [],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x79561bce61f39a0dfab9413cee86f6cfe7d9112b96abce545c6e929b20081eb",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 99,
                                        "memory_holes": 1,
                                        "range_check_builtin_applications": 5
                                    }
                                },
                                {
                                    "contract_address": "0x1258eae3eae5002125bebf062d611a772e8aea3a1879b64a19f363ebd00947",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x79561bce61f39a0dfab9413cee86f6cfe7d9112b96abce545c6e929b20081eb",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x0",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 235,
                                        "memory_holes": 464,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 10
                                    }
                                },
                                {
                                    "contract_address": "0x44debfe17e4d9a5a1e226dabaf286e72c9cc36abbe71c5b847e669da4503893",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x33478650b3b71be225cbad55fda8a590022eea17be3212d0ccbf3d364b1e448",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x0",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 100,
                                        "memory_holes": 11,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 3
                                    }
                                },
                                {
                                    "contract_address": "0x57146f6409deb4c9fa12866915dd952aa07c1eb2752e451d7f3b042086bdeb8",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x3454df602367830febe19a1b36ad737040e66dee66ce944211f6757ef3eb679",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x0",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 133,
                                        "memory_holes": 11,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 3
                                    }
                                },
                                {
                                    "contract_address": "0x5c4676bcb21454659479b3cd0129884d914df9c9b922c1c649696d2e058d70",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x33478650b3b71be225cbad55fda8a590022eea17be3212d0ccbf3d364b1e448",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x0",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 100,
                                        "memory_holes": 11,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 3
                                    }
                                },
                                {
                                    "contract_address": "0x4f18ffc850cdfa223a530d7246d3c6fc12a5969e0aa5d4a88f470f5fe6c46e9",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x3454df602367830febe19a1b36ad737040e66dee66ce944211f6757ef3eb679",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x0",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 133,
                                        "memory_holes": 11,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 3
                                    }
                                },
                                {
                                    "contract_address": "0x5b7d301fa769274f20e89222169c0fad4d846c366440afc160aafadd6f88f0c",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x3454df602367830febe19a1b36ad737040e66dee66ce944211f6757ef3eb679",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x0",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 133,
                                        "memory_holes": 11,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 3
                                    }
                                },
                                {
                                    "contract_address": "0x36b68238f3a90639d062669fdec08c4d0bdd09826b1b6d24ef49de6d8141eaa",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x33478650b3b71be225cbad55fda8a590022eea17be3212d0ccbf3d364b1e448",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x0",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 100,
                                        "memory_holes": 11,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 3
                                    }
                                },
                                {
                                    "contract_address": "0x5f296e1b9f4cf1ab452c218e72e02a8713cee98921dad2d3b5706235e128ee4",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x33478650b3b71be225cbad55fda8a590022eea17be3212d0ccbf3d364b1e448",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x0",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 100,
                                        "memory_holes": 11,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 3
                                    }
                                },
                                {
                                    "contract_address": "0x5dcd26c25d9d8fd9fc860038dcb6e4d835e524eb8a85213a8cda5b7fff845f6",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x3454df602367830febe19a1b36ad737040e66dee66ce944211f6757ef3eb679",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0xb532bca",
                                        "0x0"
                                    ],
                                    "calls": [
                                        {
                                            "contract_address": "0x5dcd26c25d9d8fd9fc860038dcb6e4d835e524eb8a85213a8cda5b7fff845f6",
                                            "entry_point_selector": "0x37d10bcd2567a053f7a15f91c3c6ce0a88cac7ecfea28d71321fd924fa9878f",
                                            "calldata": [],
                                            "caller_address": "0x5dcd26c25d9d8fd9fc860038dcb6e4d835e524eb8a85213a8cda5b7fff845f6",
                                            "class_hash": "0x3454df602367830febe19a1b36ad737040e66dee66ce944211f6757ef3eb679",
                                            "entry_point_type": "EXTERNAL",
                                            "call_type": "CALL",
                                            "result": [
                                                "0xe0abda244785c71",
                                                "0x0"
                                            ],
                                            "calls": [
                                                {
                                                    "contract_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                                    "entry_point_selector": "0x3fe575bac3386ca9be28a0a86c06cdf49a18e1ac1aaa25e56fa95418d72400b",
                                                    "calldata": [
                                                        "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51"
                                                    ],
                                                    "caller_address": "0x5dcd26c25d9d8fd9fc860038dcb6e4d835e524eb8a85213a8cda5b7fff845f6",
                                                    "class_hash": "0x69273566b9fe6cb2fffed3d5a81366c2e62d1d01a16f23bf82ddd8f564bda66",
                                                    "entry_point_type": "EXTERNAL",
                                                    "call_type": "CALL",
                                                    "result": [
                                                        "0xe0abda244785c71",
                                                        "0x0"
                                                    ],
                                                    "calls": [],
                                                    "events": [],
                                                    "messages": [],
                                                    "execution_resources": {
                                                        "steps": 337,
                                                        "memory_holes": 44,
                                                        "pedersen_builtin_applications": 4,
                                                        "range_check_builtin_applications": 12
                                                    }
                                                }
                                            ],
                                            "events": [],
                                            "messages": [],
                                            "execution_resources": {
                                                "steps": 450,
                                                "memory_holes": 44,
                                                "pedersen_builtin_applications": 4,
                                                "range_check_builtin_applications": 12
                                            }
                                        }
                                    ],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 1296,
                                        "memory_holes": 75,
                                        "pedersen_builtin_applications": 5,
                                        "range_check_builtin_applications": 96
                                    }
                                },
                                {
                                    "contract_address": "0x683852789848dea686fcfb66aaebf6477d83b25d8894aae73b15ff19b765bf0",
                                    "entry_point_selector": "0x3296cc786c10cb1de1a21b26a4855077a07e96d5d5b8900379fbf5eb2768184",
                                    "calldata": [
                                        "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x5807986d79d4ba7e8729baaad831399979ac5ef9dd516508e0c27cfaae62620",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x126ee52353000",
                                        "0x0"
                                    ],
                                    "calls": [
                                        {
                                            "contract_address": "0x7b05e8dc9c770b72befcf09599132093cf9e57becb2d1b3e89514e1f9bdf0ab",
                                            "entry_point_selector": "0x3296cc786c10cb1de1a21b26a4855077a07e96d5d5b8900379fbf5eb2768184",
                                            "calldata": [
                                                "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8"
                                            ],
                                            "caller_address": "0x683852789848dea686fcfb66aaebf6477d83b25d8894aae73b15ff19b765bf0",
                                            "class_hash": "0x322e6fc040c1985e5239d79838736a09f9f8cdce5db3336770c8c97f93c3a61",
                                            "entry_point_type": "EXTERNAL",
                                            "call_type": "CALL",
                                            "result": [
                                                "0x126ee52353000",
                                                "0x0"
                                            ],
                                            "calls": [
                                                {
                                                    "contract_address": "0x6714fc78773c0ab8f8d7668ba77da713333473f18da47595249d9b8ade2d8d4",
                                                    "entry_point_selector": "0x1bc9acbad94155b8ff5d7f6fcccf6c81ef1c3787af540c17d288a179e4c0256",
                                                    "calldata": [
                                                        "0x55534443",
                                                        "0x455448",
                                                        "0x4d454449414e"
                                                    ],
                                                    "caller_address": "0x7b05e8dc9c770b72befcf09599132093cf9e57becb2d1b3e89514e1f9bdf0ab",
                                                    "class_hash": "0x17913e3921aac1eb817d3a9455b97a45220b2660bbb47c01c946f2401bff234",
                                                    "entry_point_type": "EXTERNAL",
                                                    "call_type": "CALL",
                                                    "result": [
                                                        "0x7eac",
                                                        "0x8",
                                                        "0x65db9c87",
                                                        "0x8"
                                                    ],
                                                    "calls": [
                                                        {
                                                            "contract_address": "0x2a85bd616f912537c50a49a4076db02c00b29b2cdc8a197ce92ed1837fa875b",
                                                            "entry_point_selector": "0x3ceffcfb2dba0d775a368cf80bd2bd1184b754e93cb00a10f87373f32c89e35",
                                                            "calldata": [
                                                                "0x55534443",
                                                                "0x455448",
                                                                "0x0",
                                                                "0x0",
                                                                "0x1"
                                                            ],
                                                            "caller_address": "0x6714fc78773c0ab8f8d7668ba77da713333473f18da47595249d9b8ade2d8d4",
                                                            "class_hash": "0x25abeffbd83906d362db31c461a2c72b71a9b106d3c29fa054bf2d23949ae26",
                                                            "entry_point_type": "EXTERNAL",
                                                            "call_type": "CALL",
                                                            "result": [
                                                                "0x7eac",
                                                                "0x8",
                                                                "0x65db9c87",
                                                                "0x8",
                                                                "0x1"
                                                            ],
                                                            "calls": [],
                                                            "events": [],
                                                            "messages": [],
                                                            "execution_resources": {
                                                                "steps": 172989,
                                                                "memory_holes": 10046,
                                                                "pedersen_builtin_applications": 679,
                                                                "range_check_builtin_applications": 8231,
                                                                "poseidon_builtin_applications": 200
                                                            }
                                                        }
                                                    ],
                                                    "events": [],
                                                    "messages": [],
                                                    "execution_resources": {
                                                        "steps": 173419,
                                                        "memory_holes": 10081,
                                                        "pedersen_builtin_applications": 679,
                                                        "range_check_builtin_applications": 8240,
                                                        "poseidon_builtin_applications": 200
                                                    }
                                                }
                                            ],
                                            "events": [],
                                            "messages": [],
                                            "execution_resources": {
                                                "steps": 174575,
                                                "memory_holes": 10154,
                                                "pedersen_builtin_applications": 680,
                                                "range_check_builtin_applications": 8345,
                                                "poseidon_builtin_applications": 200
                                            }
                                        }
                                    ],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 174698,
                                        "memory_holes": 10158,
                                        "pedersen_builtin_applications": 680,
                                        "range_check_builtin_applications": 8345,
                                        "poseidon_builtin_applications": 200
                                    }
                                },
                                {
                                    "contract_address": "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
                                    "entry_point_selector": "0x4c4fb1ab068f6039d5780c68dd0fa2f8742cceb3426d19667778ca7f3518a9",
                                    "calldata": [],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x5ffbcfeb50d200a0677c48a129a11245a3fc519d1d98d76882d1c9a1b19c6ed",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x6"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 97,
                                        "memory_holes": 7,
                                        "range_check_builtin_applications": 4
                                    }
                                },
                                {
                                    "contract_address": "0x514bd7ee8c97d4286bd481c54aa0793e43edbfb7e1ab9784c4b30469dcf9313",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x33478650b3b71be225cbad55fda8a590022eea17be3212d0ccbf3d364b1e448",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x0",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 100,
                                        "memory_holes": 11,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 3
                                    }
                                },
                                {
                                    "contract_address": "0x453c4c996f1047d9370f824d68145bd5e7ce12d00437140ad02181e1d11dc83",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x3454df602367830febe19a1b36ad737040e66dee66ce944211f6757ef3eb679",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x0",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 133,
                                        "memory_holes": 11,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 3
                                    }
                                },
                                {
                                    "contract_address": "0x5eb6de9c7461b3270d029f00046c8a10d27d4f4a4c931a4ea9769c72ef4edbb",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x386d92966f0908ded021f3959610dc52a605922387e0847df45832c046a79bd",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x0",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 189,
                                        "memory_holes": 13,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 10
                                    }
                                },
                                {
                                    "contract_address": "0x9377fdde350e01e0397820ea83ed3b4f05df30bfb8cf8055d62cafa1b2106a",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x6afa2f21a611f8b4a77ef681a9eb0c7cd6e52aa918e7f8b4b8142b4ca1bde49",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x0",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 235,
                                        "memory_holes": 464,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 10
                                    }
                                },
                                {
                                    "contract_address": "0x7c2e1e733f28daa23e78be3a4f6c724c0ab06af65f6a95b5e0545215f1abc1b",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x6afa2f21a611f8b4a77ef681a9eb0c7cd6e52aa918e7f8b4b8142b4ca1bde49",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0xcbd47b862d90d7cb7",
                                        "0x0"
                                    ],
                                    "calls": [
                                        {
                                            "contract_address": "0x7c2e1e733f28daa23e78be3a4f6c724c0ab06af65f6a95b5e0545215f1abc1b",
                                            "entry_point_selector": "0x3b6e19b5e45b0a514eb39c866cf2a26e61c9bd4e4e64395a88d4b972286f38c",
                                            "calldata": [],
                                            "caller_address": "0x7c2e1e733f28daa23e78be3a4f6c724c0ab06af65f6a95b5e0545215f1abc1b",
                                            "class_hash": "0x6afa2f21a611f8b4a77ef681a9eb0c7cd6e52aa918e7f8b4b8142b4ca1bde49",
                                            "entry_point_type": "EXTERNAL",
                                            "call_type": "CALL",
                                            "result": [
                                                "0xde0c6f79ef3396d",
                                                "0x0"
                                            ],
                                            "calls": [
                                                {
                                                    "contract_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                                    "entry_point_selector": "0x3fe575bac3386ca9be28a0a86c06cdf49a18e1ac1aaa25e56fa95418d72400b",
                                                    "calldata": [
                                                        "0x1258eae3eae5002125bebf062d611a772e8aea3a1879b64a19f363ebd00947"
                                                    ],
                                                    "caller_address": "0x7c2e1e733f28daa23e78be3a4f6c724c0ab06af65f6a95b5e0545215f1abc1b",
                                                    "class_hash": "0x69273566b9fe6cb2fffed3d5a81366c2e62d1d01a16f23bf82ddd8f564bda66",
                                                    "entry_point_type": "EXTERNAL",
                                                    "call_type": "CALL",
                                                    "result": [
                                                        "0xde0c6f79ef3396d",
                                                        "0x0"
                                                    ],
                                                    "calls": [],
                                                    "events": [],
                                                    "messages": [],
                                                    "execution_resources": {
                                                        "steps": 1947,
                                                        "memory_holes": 117,
                                                        "pedersen_builtin_applications": 6,
                                                        "range_check_builtin_applications": 195
                                                    }
                                                }
                                            ],
                                            "events": [],
                                            "messages": [],
                                            "execution_resources": {
                                                "steps": 2196,
                                                "memory_holes": 131,
                                                "pedersen_builtin_applications": 6,
                                                "range_check_builtin_applications": 205
                                            }
                                        }
                                    ],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 2857,
                                        "memory_holes": 265,
                                        "pedersen_builtin_applications": 7,
                                        "range_check_builtin_applications": 262
                                    }
                                },
                                {
                                    "contract_address": "0x40f5a6b7a6d3c472c12ca31ae6250b462c6d35bbdae17bd52f6c6ca065e30cf",
                                    "entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
                                    "calldata": [
                                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x386d92966f0908ded021f3959610dc52a605922387e0847df45832c046a79bd",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x0",
                                        "0x0"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 189,
                                        "memory_holes": 13,
                                        "pedersen_builtin_applications": 1,
                                        "range_check_builtin_applications": 10
                                    }
                                },
                                {
                                    "contract_address": "0x683852789848dea686fcfb66aaebf6477d83b25d8894aae73b15ff19b765bf0",
                                    "entry_point_selector": "0x3296cc786c10cb1de1a21b26a4855077a07e96d5d5b8900379fbf5eb2768184",
                                    "calldata": [
                                        "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d"
                                    ],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x5807986d79d4ba7e8729baaad831399979ac5ef9dd516508e0c27cfaae62620",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x23a6865105400",
                                        "0x0"
                                    ],
                                    "calls": [
                                        {
                                            "contract_address": "0x7b05e8dc9c770b72befcf09599132093cf9e57becb2d1b3e89514e1f9bdf0ab",
                                            "entry_point_selector": "0x3296cc786c10cb1de1a21b26a4855077a07e96d5d5b8900379fbf5eb2768184",
                                            "calldata": [
                                                "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d"
                                            ],
                                            "caller_address": "0x683852789848dea686fcfb66aaebf6477d83b25d8894aae73b15ff19b765bf0",
                                            "class_hash": "0x322e6fc040c1985e5239d79838736a09f9f8cdce5db3336770c8c97f93c3a61",
                                            "entry_point_type": "EXTERNAL",
                                            "call_type": "CALL",
                                            "result": [
                                                "0x23a6865105400",
                                                "0x0"
                                            ],
                                            "calls": [
                                                {
                                                    "contract_address": "0x6714fc78773c0ab8f8d7668ba77da713333473f18da47595249d9b8ade2d8d4",
                                                    "entry_point_selector": "0x1bc9acbad94155b8ff5d7f6fcccf6c81ef1c3787af540c17d288a179e4c0256",
                                                    "calldata": [
                                                        "0x5354524b",
                                                        "0x455448",
                                                        "0x4d454449414e"
                                                    ],
                                                    "caller_address": "0x7b05e8dc9c770b72befcf09599132093cf9e57becb2d1b3e89514e1f9bdf0ab",
                                                    "class_hash": "0x17913e3921aac1eb817d3a9455b97a45220b2660bbb47c01c946f2401bff234",
                                                    "entry_point_type": "EXTERNAL",
                                                    "call_type": "CALL",
                                                    "result": [
                                                        "0xf4fd",
                                                        "0x8",
                                                        "0x65db9c87",
                                                        "0x8"
                                                    ],
                                                    "calls": [
                                                        {
                                                            "contract_address": "0x2a85bd616f912537c50a49a4076db02c00b29b2cdc8a197ce92ed1837fa875b",
                                                            "entry_point_selector": "0x3ceffcfb2dba0d775a368cf80bd2bd1184b754e93cb00a10f87373f32c89e35",
                                                            "calldata": [
                                                                "0x5354524b",
                                                                "0x455448",
                                                                "0x0",
                                                                "0x0",
                                                                "0x1"
                                                            ],
                                                            "caller_address": "0x6714fc78773c0ab8f8d7668ba77da713333473f18da47595249d9b8ade2d8d4",
                                                            "class_hash": "0x25abeffbd83906d362db31c461a2c72b71a9b106d3c29fa054bf2d23949ae26",
                                                            "entry_point_type": "EXTERNAL",
                                                            "call_type": "CALL",
                                                            "result": [
                                                                "0xf4fd",
                                                                "0x8",
                                                                "0x65db9c87",
                                                                "0x8",
                                                                "0x1"
                                                            ],
                                                            "calls": [],
                                                            "events": [],
                                                            "messages": [],
                                                            "execution_resources": {
                                                                "steps": 159317,
                                                                "memory_holes": 9473,
                                                                "pedersen_builtin_applications": 609,
                                                                "range_check_builtin_applications": 7343,
                                                                "poseidon_builtin_applications": 170
                                                            }
                                                        }
                                                    ],
                                                    "events": [],
                                                    "messages": [],
                                                    "execution_resources": {
                                                        "steps": 159747,
                                                        "memory_holes": 9508,
                                                        "pedersen_builtin_applications": 609,
                                                        "range_check_builtin_applications": 7352,
                                                        "poseidon_builtin_applications": 170
                                                    }
                                                }
                                            ],
                                            "events": [],
                                            "messages": [],
                                            "execution_resources": {
                                                "steps": 160901,
                                                "memory_holes": 9582,
                                                "pedersen_builtin_applications": 610,
                                                "range_check_builtin_applications": 7457,
                                                "poseidon_builtin_applications": 170
                                            }
                                        }
                                    ],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 161024,
                                        "memory_holes": 9586,
                                        "pedersen_builtin_applications": 610,
                                        "range_check_builtin_applications": 7457,
                                        "poseidon_builtin_applications": 170
                                    }
                                },
                                {
                                    "contract_address": "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
                                    "entry_point_selector": "0x4c4fb1ab068f6039d5780c68dd0fa2f8742cceb3426d19667778ca7f3518a9",
                                    "calldata": [],
                                    "caller_address": "0x73f6addc9339de9822cab4dac8c9431779c09077f02ba7bc36904ea342dd9eb",
                                    "class_hash": "0x5327164fa21dca89a92e8eae8a5b7ab90f58373e71f0a16d285e5a4abe5a3cf",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x12"
                                    ],
                                    "calls": [],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 97,
                                        "memory_holes": 7,
                                        "range_check_builtin_applications": 4
                                    }
                                }
                            ],
                            "events": [],
                            "messages": [],
                            "execution_resources": {
                                "steps": 539967,
                                "memory_holes": 34283,
                                "pedersen_builtin_applications": 2156,
                                "range_check_builtin_applications": 25922,
                                "poseidon_builtin_applications": 570
                            }
                        },
                        {
                            "contract_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                            "entry_point_selector": "0xefadd704e38a3273c5efbf97bd40a3767a1f0861b4b582a9e92e9c153541f3",
                            "calldata": [
                                "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51"
                            ],
                            "caller_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                            "class_hash": "0x69273566b9fe6cb2fffed3d5a81366c2e62d1d01a16f23bf82ddd8f564bda66",
                            "entry_point_type": "EXTERNAL",
                            "call_type": "CALL",
                            "result": [],
                            "calls": [
                                {
                                    "contract_address": "0x2fc2d4b41cc1f03d185e6681cbd40cced61915d4891517a042658d61cba3b1",
                                    "entry_point_selector": "0x80aa9fdbfaf9615e4afc7f5f722e265daca5ccc655360fa5ccacf9c267936d",
                                    "calldata": [],
                                    "caller_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                    "class_hash": "0x3454df602367830febe19a1b36ad737040e66dee66ce944211f6757ef3eb679",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x1c837be813",
                                        "0x0"
                                    ],
                                    "calls": [
                                        {
                                            "contract_address": "0x2fc2d4b41cc1f03d185e6681cbd40cced61915d4891517a042658d61cba3b1",
                                            "entry_point_selector": "0x37d10bcd2567a053f7a15f91c3c6ce0a88cac7ecfea28d71321fd924fa9878f",
                                            "calldata": [],
                                            "caller_address": "0x2fc2d4b41cc1f03d185e6681cbd40cced61915d4891517a042658d61cba3b1",
                                            "class_hash": "0x3454df602367830febe19a1b36ad737040e66dee66ce944211f6757ef3eb679",
                                            "entry_point_type": "EXTERNAL",
                                            "call_type": "CALL",
                                            "result": [
                                                "0xe0abda244785c71",
                                                "0x0"
                                            ],
                                            "calls": [
                                                {
                                                    "contract_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                                    "entry_point_selector": "0x3fe575bac3386ca9be28a0a86c06cdf49a18e1ac1aaa25e56fa95418d72400b",
                                                    "calldata": [
                                                        "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51"
                                                    ],
                                                    "caller_address": "0x2fc2d4b41cc1f03d185e6681cbd40cced61915d4891517a042658d61cba3b1",
                                                    "class_hash": "0x69273566b9fe6cb2fffed3d5a81366c2e62d1d01a16f23bf82ddd8f564bda66",
                                                    "entry_point_type": "EXTERNAL",
                                                    "call_type": "CALL",
                                                    "result": [
                                                        "0xe0abda244785c71",
                                                        "0x0"
                                                    ],
                                                    "calls": [],
                                                    "events": [],
                                                    "messages": [],
                                                    "execution_resources": {
                                                        "steps": 337,
                                                        "memory_holes": 44,
                                                        "pedersen_builtin_applications": 4,
                                                        "range_check_builtin_applications": 12
                                                    }
                                                }
                                            ],
                                            "events": [],
                                            "messages": [],
                                            "execution_resources": {
                                                "steps": 450,
                                                "memory_holes": 44,
                                                "pedersen_builtin_applications": 4,
                                                "range_check_builtin_applications": 12
                                            }
                                        }
                                    ],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 1258,
                                        "memory_holes": 64,
                                        "pedersen_builtin_applications": 4,
                                        "range_check_builtin_applications": 93
                                    }
                                },
                                {
                                    "contract_address": "0x5dcd26c25d9d8fd9fc860038dcb6e4d835e524eb8a85213a8cda5b7fff845f6",
                                    "entry_point_selector": "0x80aa9fdbfaf9615e4afc7f5f722e265daca5ccc655360fa5ccacf9c267936d",
                                    "calldata": [],
                                    "caller_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                    "class_hash": "0x3454df602367830febe19a1b36ad737040e66dee66ce944211f6757ef3eb679",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x2e8fe70da2b",
                                        "0x0"
                                    ],
                                    "calls": [
                                        {
                                            "contract_address": "0x5dcd26c25d9d8fd9fc860038dcb6e4d835e524eb8a85213a8cda5b7fff845f6",
                                            "entry_point_selector": "0x37d10bcd2567a053f7a15f91c3c6ce0a88cac7ecfea28d71321fd924fa9878f",
                                            "calldata": [],
                                            "caller_address": "0x5dcd26c25d9d8fd9fc860038dcb6e4d835e524eb8a85213a8cda5b7fff845f6",
                                            "class_hash": "0x3454df602367830febe19a1b36ad737040e66dee66ce944211f6757ef3eb679",
                                            "entry_point_type": "EXTERNAL",
                                            "call_type": "CALL",
                                            "result": [
                                                "0xe0abda244785c71",
                                                "0x0"
                                            ],
                                            "calls": [
                                                {
                                                    "contract_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                                    "entry_point_selector": "0x3fe575bac3386ca9be28a0a86c06cdf49a18e1ac1aaa25e56fa95418d72400b",
                                                    "calldata": [
                                                        "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51"
                                                    ],
                                                    "caller_address": "0x5dcd26c25d9d8fd9fc860038dcb6e4d835e524eb8a85213a8cda5b7fff845f6",
                                                    "class_hash": "0x69273566b9fe6cb2fffed3d5a81366c2e62d1d01a16f23bf82ddd8f564bda66",
                                                    "entry_point_type": "EXTERNAL",
                                                    "call_type": "CALL",
                                                    "result": [
                                                        "0xe0abda244785c71",
                                                        "0x0"
                                                    ],
                                                    "calls": [],
                                                    "events": [],
                                                    "messages": [],
                                                    "execution_resources": {
                                                        "steps": 337,
                                                        "memory_holes": 44,
                                                        "pedersen_builtin_applications": 4,
                                                        "range_check_builtin_applications": 12
                                                    }
                                                }
                                            ],
                                            "events": [],
                                            "messages": [],
                                            "execution_resources": {
                                                "steps": 450,
                                                "memory_holes": 44,
                                                "pedersen_builtin_applications": 4,
                                                "range_check_builtin_applications": 12
                                            }
                                        }
                                    ],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 1258,
                                        "memory_holes": 64,
                                        "pedersen_builtin_applications": 4,
                                        "range_check_builtin_applications": 93
                                    }
                                },
                                {
                                    "contract_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                    "entry_point_selector": "0x80aa9fdbfaf9615e4afc7f5f722e265daca5ccc655360fa5ccacf9c267936d",
                                    "calldata": [],
                                    "caller_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                    "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x24d3f6add56",
                                        "0x0"
                                    ],
                                    "calls": [
                                        {
                                            "contract_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                            "entry_point_selector": "0x37d10bcd2567a053f7a15f91c3c6ce0a88cac7ecfea28d71321fd924fa9878f",
                                            "calldata": [],
                                            "caller_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                            "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                                            "entry_point_type": "EXTERNAL",
                                            "call_type": "CALL",
                                            "result": [
                                                "0xe2ebc577af532df",
                                                "0x0"
                                            ],
                                            "calls": [
                                                {
                                                    "contract_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                                    "entry_point_selector": "0x8f8d1f3e5e6660b5e7277188c99295a7663466e468d86b49babaf818526669",
                                                    "calldata": [
                                                        "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51"
                                                    ],
                                                    "caller_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                                    "class_hash": "0x69273566b9fe6cb2fffed3d5a81366c2e62d1d01a16f23bf82ddd8f564bda66",
                                                    "entry_point_type": "EXTERNAL",
                                                    "call_type": "CALL",
                                                    "result": [
                                                        "0xe2ebc577af532df",
                                                        "0x0"
                                                    ],
                                                    "calls": [],
                                                    "events": [],
                                                    "messages": [],
                                                    "execution_resources": {
                                                        "steps": 337,
                                                        "memory_holes": 44,
                                                        "pedersen_builtin_applications": 4,
                                                        "range_check_builtin_applications": 12
                                                    }
                                                }
                                            ],
                                            "events": [],
                                            "messages": [],
                                            "execution_resources": {
                                                "steps": 432,
                                                "memory_holes": 44,
                                                "pedersen_builtin_applications": 4,
                                                "range_check_builtin_applications": 12
                                            }
                                        }
                                    ],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 1316,
                                        "memory_holes": 64,
                                        "pedersen_builtin_applications": 4,
                                        "range_check_builtin_applications": 99
                                    }
                                },
                                {
                                    "contract_address": "0x2fc2d4b41cc1f03d185e6681cbd40cced61915d4891517a042658d61cba3b1",
                                    "entry_point_selector": "0x80aa9fdbfaf9615e4afc7f5f722e265daca5ccc655360fa5ccacf9c267936d",
                                    "calldata": [],
                                    "caller_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                    "class_hash": "0x3454df602367830febe19a1b36ad737040e66dee66ce944211f6757ef3eb679",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x1c837be813",
                                        "0x0"
                                    ],
                                    "calls": [
                                        {
                                            "contract_address": "0x2fc2d4b41cc1f03d185e6681cbd40cced61915d4891517a042658d61cba3b1",
                                            "entry_point_selector": "0x37d10bcd2567a053f7a15f91c3c6ce0a88cac7ecfea28d71321fd924fa9878f",
                                            "calldata": [],
                                            "caller_address": "0x2fc2d4b41cc1f03d185e6681cbd40cced61915d4891517a042658d61cba3b1",
                                            "class_hash": "0x3454df602367830febe19a1b36ad737040e66dee66ce944211f6757ef3eb679",
                                            "entry_point_type": "EXTERNAL",
                                            "call_type": "CALL",
                                            "result": [
                                                "0xe0abda244785c71",
                                                "0x0"
                                            ],
                                            "calls": [
                                                {
                                                    "contract_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                                    "entry_point_selector": "0x3fe575bac3386ca9be28a0a86c06cdf49a18e1ac1aaa25e56fa95418d72400b",
                                                    "calldata": [
                                                        "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51"
                                                    ],
                                                    "caller_address": "0x2fc2d4b41cc1f03d185e6681cbd40cced61915d4891517a042658d61cba3b1",
                                                    "class_hash": "0x69273566b9fe6cb2fffed3d5a81366c2e62d1d01a16f23bf82ddd8f564bda66",
                                                    "entry_point_type": "EXTERNAL",
                                                    "call_type": "CALL",
                                                    "result": [
                                                        "0xe0abda244785c71",
                                                        "0x0"
                                                    ],
                                                    "calls": [],
                                                    "events": [],
                                                    "messages": [],
                                                    "execution_resources": {
                                                        "steps": 337,
                                                        "memory_holes": 44,
                                                        "pedersen_builtin_applications": 4,
                                                        "range_check_builtin_applications": 12
                                                    }
                                                }
                                            ],
                                            "events": [],
                                            "messages": [],
                                            "execution_resources": {
                                                "steps": 450,
                                                "memory_holes": 44,
                                                "pedersen_builtin_applications": 4,
                                                "range_check_builtin_applications": 12
                                            }
                                        }
                                    ],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 1258,
                                        "memory_holes": 64,
                                        "pedersen_builtin_applications": 4,
                                        "range_check_builtin_applications": 93
                                    }
                                },
                                {
                                    "contract_address": "0x5dcd26c25d9d8fd9fc860038dcb6e4d835e524eb8a85213a8cda5b7fff845f6",
                                    "entry_point_selector": "0x80aa9fdbfaf9615e4afc7f5f722e265daca5ccc655360fa5ccacf9c267936d",
                                    "calldata": [],
                                    "caller_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                    "class_hash": "0x3454df602367830febe19a1b36ad737040e66dee66ce944211f6757ef3eb679",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x2e8fe70da2b",
                                        "0x0"
                                    ],
                                    "calls": [
                                        {
                                            "contract_address": "0x5dcd26c25d9d8fd9fc860038dcb6e4d835e524eb8a85213a8cda5b7fff845f6",
                                            "entry_point_selector": "0x37d10bcd2567a053f7a15f91c3c6ce0a88cac7ecfea28d71321fd924fa9878f",
                                            "calldata": [],
                                            "caller_address": "0x5dcd26c25d9d8fd9fc860038dcb6e4d835e524eb8a85213a8cda5b7fff845f6",
                                            "class_hash": "0x3454df602367830febe19a1b36ad737040e66dee66ce944211f6757ef3eb679",
                                            "entry_point_type": "EXTERNAL",
                                            "call_type": "CALL",
                                            "result": [
                                                "0xe0abda244785c71",
                                                "0x0"
                                            ],
                                            "calls": [
                                                {
                                                    "contract_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                                    "entry_point_selector": "0x3fe575bac3386ca9be28a0a86c06cdf49a18e1ac1aaa25e56fa95418d72400b",
                                                    "calldata": [
                                                        "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51"
                                                    ],
                                                    "caller_address": "0x5dcd26c25d9d8fd9fc860038dcb6e4d835e524eb8a85213a8cda5b7fff845f6",
                                                    "class_hash": "0x69273566b9fe6cb2fffed3d5a81366c2e62d1d01a16f23bf82ddd8f564bda66",
                                                    "entry_point_type": "EXTERNAL",
                                                    "call_type": "CALL",
                                                    "result": [
                                                        "0xe0abda244785c71",
                                                        "0x0"
                                                    ],
                                                    "calls": [],
                                                    "events": [],
                                                    "messages": [],
                                                    "execution_resources": {
                                                        "steps": 337,
                                                        "memory_holes": 44,
                                                        "pedersen_builtin_applications": 4,
                                                        "range_check_builtin_applications": 12
                                                    }
                                                }
                                            ],
                                            "events": [],
                                            "messages": [],
                                            "execution_resources": {
                                                "steps": 450,
                                                "memory_holes": 44,
                                                "pedersen_builtin_applications": 4,
                                                "range_check_builtin_applications": 12
                                            }
                                        }
                                    ],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 1258,
                                        "memory_holes": 64,
                                        "pedersen_builtin_applications": 4,
                                        "range_check_builtin_applications": 93
                                    }
                                },
                                {
                                    "contract_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                    "entry_point_selector": "0x80aa9fdbfaf9615e4afc7f5f722e265daca5ccc655360fa5ccacf9c267936d",
                                    "calldata": [],
                                    "caller_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                    "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                                    "entry_point_type": "EXTERNAL",
                                    "call_type": "CALL",
                                    "result": [
                                        "0x24d3f6add56",
                                        "0x0"
                                    ],
                                    "calls": [
                                        {
                                            "contract_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                            "entry_point_selector": "0x37d10bcd2567a053f7a15f91c3c6ce0a88cac7ecfea28d71321fd924fa9878f",
                                            "calldata": [],
                                            "caller_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                            "class_hash": "0xfc88bdc66787a461db2fe106937047e94eaed5bd9f718675b0ef29386888d7",
                                            "entry_point_type": "EXTERNAL",
                                            "call_type": "CALL",
                                            "result": [
                                                "0xe2ebc577af532df",
                                                "0x0"
                                            ],
                                            "calls": [
                                                {
                                                    "contract_address": "0x59a943ca214c10234b9a3b61c558ac20c005127d183b86a99a8f3c60a08b4ff",
                                                    "entry_point_selector": "0x8f8d1f3e5e6660b5e7277188c99295a7663466e468d86b49babaf818526669",
                                                    "calldata": [
                                                        "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51"
                                                    ],
                                                    "caller_address": "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                                    "class_hash": "0x69273566b9fe6cb2fffed3d5a81366c2e62d1d01a16f23bf82ddd8f564bda66",
                                                    "entry_point_type": "EXTERNAL",
                                                    "call_type": "CALL",
                                                    "result": [
                                                        "0xe2ebc577af532df",
                                                        "0x0"
                                                    ],
                                                    "calls": [],
                                                    "events": [],
                                                    "messages": [],
                                                    "execution_resources": {
                                                        "steps": 337,
                                                        "memory_holes": 44,
                                                        "pedersen_builtin_applications": 4,
                                                        "range_check_builtin_applications": 12
                                                    }
                                                }
                                            ],
                                            "events": [],
                                            "messages": [],
                                            "execution_resources": {
                                                "steps": 432,
                                                "memory_holes": 44,
                                                "pedersen_builtin_applications": 4,
                                                "range_check_builtin_applications": 12
                                            }
                                        }
                                    ],
                                    "events": [],
                                    "messages": [],
                                    "execution_resources": {
                                        "steps": 1316,
                                        "memory_holes": 64,
                                        "pedersen_builtin_applications": 4,
                                        "range_check_builtin_applications": 99
                                    }
                                }
                            ],
                            "events": [
                                {
                                    "order": 8,
                                    "keys": [
                                        "0x3f1547f5c752a56ed475433772ec93cab0ef5ff7786632287d7381d30d305ae"
                                    ],
                                    "data": [
                                        "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                        "0x224331d269011ea",
                                        "0x0"
                                    ]
                                },
                                {
                                    "order": 9,
                                    "keys": [
                                        "0x49d3e14a9a5551aa9aa4e7ce97f74cc7357d95f68db2d55fc291f2e07af82d"
                                    ],
                                    "data": [
                                        "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                        "0x31f94ee833553e0",
                                        "0x0"
                                    ]
                                },
                                {
                                    "order": 10,
                                    "keys": [
                                        "0x33db1d611576200c90997bde1f948502469d333e65e87045c250e6efd2e42c7"
                                    ],
                                    "data": [
                                        "0x63d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
                                        "0x224331d269011ea",
                                        "0x0",
                                        "0x31f94ee833553e0",
                                        "0x0",
                                        "0xe0abda244785c71",
                                        "0x0",
                                        "0xe2ebc577af532df",
                                        "0x0"
                                    ]
                                }
                            ],
                            "messages": [],
                            "execution_resources": {
                                "steps": 14220,
                                "memory_holes": 897,
                                "pedersen_builtin_applications": 54,
                                "range_check_builtin_applications": 1118
                            }
                        }
                    ],
                    "events": [
                        {
                            "order": 6,
                            "keys": [
                                "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9"
                            ],
                            "data": [
                                "0x0",
                                "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a",
                                "0xe94b8d6",
                                "0x0"
                            ]
                        },
                        {
                            "order": 7,
                            "keys": [
                                "0x34e55c1cd55f1338241b50d352f0e91c7e4ffad0e4271d64eb347589ebdfd16"
                            ],
                            "data": [
                                "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a",
                                "0xee6b280",
                                "0x0"
                            ]
                        }
                    ],
                    "messages": [],
                    "execution_resources": {
                        "steps": 574909,
                        "memory_holes": 36372,
                        "pedersen_builtin_applications": 2269,
                        "range_check_builtin_applications": 28781,
                        "bitwise_builtin_applications": 2,
                        "poseidon_builtin_applications": 570
                    }
                }
            ],
            "events": [
                {
                    "order": 11,
                    "keys": [
                        "0x1dcde06aabdbca2f80aa51392b345d7549d7757aa855f7e37f5d335ac8243b1",
                        "0x64f7c084d9cba540cba343f3ec1b69a06bd9169c9016e518d06d418003a31fd"
                    ],
                    "data": [
                        "0x1",
                        "0x0"
                    ]
                }
            ],
            "messages": [],
            "execution_resources": {
                "steps": 575981,
                "memory_holes": 36379,
                "pedersen_builtin_applications": 2269,
                "range_check_builtin_applications": 28800,
                "bitwise_builtin_applications": 2,
                "poseidon_builtin_applications": 570
            }
        },
        "fee_transfer_invocation": {
            "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
            "entry_point_selector": "0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e",
            "calldata": [
                "0x1176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8",
                "0x24614a5ca2a80",
                "0x0"
            ],
            "caller_address": "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a",
            "class_hash": "0x5ffbcfeb50d200a0677c48a129a11245a3fc519d1d98d76882d1c9a1b19c6ed",
            "entry_point_type": "EXTERNAL",
            "call_type": "CALL",
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
                        "0x70bb25d9764abbcc56b1da1fda8ffd3c51366dd4c823b8199ffc1540c31a31a",
                        "0x1176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8",
                        "0x24614a5ca2a80",
                        "0x0"
                    ]
                }
            ],
            "messages": [],
            "execution_resources": {
                "steps": 876,
                "memory_holes": 56,
                "pedersen_builtin_applications": 4,
                "range_check_builtin_applications": 27
            }
        }
    },
    "id": 1
}
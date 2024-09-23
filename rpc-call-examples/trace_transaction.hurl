PARAMETERS:
DATA, 32 Bytes - hash of a block.

REQUEST:

curl {{ ETHEREUM RPC }}
-X POST \
-H "Content-Type: application/json" \
-d '{
    "jsonrpc": "2.0",
    "method": "trace_transaction",
    "params": [
        "0x1d37b83cfdcf581b6136afa3081d51d4d775f46a035e0ff856801d3f29bc8ee3"
    ],
    "id": 1
}'

RESULT:

{
    "id": 1,
    "jsonrpc": "2.0",
    "result": [
        {
            "action": {
                "from": "0x675002812d5ac81999d2c6cd1f52f459e99723a2",
                "callType": "call",
                "gas": "0x1e2a48",
                "input": "0x791ac94700000000000000000000000000000000000000000004c3ba39c5e41110000000000000000000000000000000000000000000000000000000032da8610f3595c100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000675002812d5ac81999d2c6cd1f52f459e99723a2000000000000000000000000000000000000000000000000000001920a7c552b0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000b320f9da95888322c499bec44d941cc50391d0bd000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                "to": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
                "value": "0x0"
            },
            "blockHash": "0x01227a3ef2299388d73a85f64490bbb070654e19830be7ae2aed8007edbf5886",
            "blockNumber": 20784912,
            "result": {
                "gasUsed": "0x281a5",
                "output": "0x"
            },
            "subtraces": 7,
            "traceAddress": [],
            "transactionHash": "0x1d37b83cfdcf581b6136afa3081d51d4d775f46a035e0ff856801d3f29bc8ee3",
            "transactionPosition": 161,
            "type": "call"
        },
        {
            "action": {
                "from": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
                "callType": "call",
                "gas": "0x1d9faa",
                "input": "0x23b872dd000000000000000000000000675002812d5ac81999d2c6cd1f52f459e99723a20000000000000000000000003131299ba549173f5c9dd899ffe2d3cd9f9d45ff00000000000000000000000000000000000000000004c3ba39c5e41110000000",
                "to": "0xb320f9da95888322c499bec44d941cc50391d0bd",
                "value": "0x0"
            },
            "blockHash": "0x01227a3ef2299388d73a85f64490bbb070654e19830be7ae2aed8007edbf5886",
            "blockNumber": 20784912,
            "result": {
                "gasUsed": "0x121bc",
                "output": "0x0000000000000000000000000000000000000000000000000000000000000001"
            },
            "subtraces": 0,
            "traceAddress": [
                0
            ],
            "transactionHash": "0x1d37b83cfdcf581b6136afa3081d51d4d775f46a035e0ff856801d3f29bc8ee3",
            "transactionPosition": 161,
            "type": "call"
        },
        {
            "action": {
                "from": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
                "callType": "staticcall",
                "gas": "0x1c7233",
                "input": "0x0902f1ac",
                "to": "0x3131299ba549173f5c9dd899ffe2d3cd9f9d45ff",
                "value": "0x0"
            },
            "blockHash": "0x01227a3ef2299388d73a85f64490bbb070654e19830be7ae2aed8007edbf5886",
            "blockNumber": 20784912,
            "result": {
                "gasUsed": "0x9c8",
                "output": "0x000000000000000000000000000000000000000002e96b501356b71d003a3a10000000000000000000000000000000000000000000000002e54f06e2fd061f030000000000000000000000000000000000000000000000000000000066ec25b3"
            },
            "subtraces": 0,
            "traceAddress": [
                1
            ],
            "transactionHash": "0x1d37b83cfdcf581b6136afa3081d51d4d775f46a035e0ff856801d3f29bc8ee3",
            "transactionPosition": 161,
            "type": "call"
        },
        {
            "action": {
                "from": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
                "callType": "staticcall",
                "gas": "0x1c6694",
                "input": "0x70a082310000000000000000000000003131299ba549173f5c9dd899ffe2d3cd9f9d45ff",
                "to": "0xb320f9da95888322c499bec44d941cc50391d0bd",
                "value": "0x0"
            },
            "blockHash": "0x01227a3ef2299388d73a85f64490bbb070654e19830be7ae2aed8007edbf5886",
            "blockNumber": 20784912,
            "result": {
                "gasUsed": "0x95a",
                "output": "0x000000000000000000000000000000000000000002edf20dca391c939c3a3a10"
            },
            "subtraces": 0,
            "traceAddress": [
                2
            ],
            "transactionHash": "0x1d37b83cfdcf581b6136afa3081d51d4d775f46a035e0ff856801d3f29bc8ee3",
            "transactionPosition": 161,
            "type": "call"
        },
        {
            "action": {
                "from": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
                "callType": "call",
                "gas": "0x1c575f",
                "input": "0x022c0d9f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000475fb15c02c4eb00000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d00000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000",
                "to": "0x3131299ba549173f5c9dd899ffe2d3cd9f9d45ff",
                "value": "0x0"
            },
            "blockHash": "0x01227a3ef2299388d73a85f64490bbb070654e19830be7ae2aed8007edbf5886",
            "blockNumber": 20784912,
            "result": {
                "gasUsed": "0xdbe9",
                "output": "0x"
            },
            "subtraces": 3,
            "traceAddress": [
                3
            ],
            "transactionHash": "0x1d37b83cfdcf581b6136afa3081d51d4d775f46a035e0ff856801d3f29bc8ee3",
            "transactionPosition": 161,
            "type": "call"
        },
        {
            "action": {
                "from": "0x3131299ba549173f5c9dd899ffe2d3cd9f9d45ff",
                "callType": "call",
                "gas": "0x1bb275",
                "input": "0xa9059cbb0000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d0000000000000000000000000000000000000000000000000475fb15c02c4eb0",
                "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                "value": "0x0"
            },
            "blockHash": "0x01227a3ef2299388d73a85f64490bbb070654e19830be7ae2aed8007edbf5886",
            "blockNumber": 20784912,
            "result": {
                "gasUsed": "0x750a",
                "output": "0x0000000000000000000000000000000000000000000000000000000000000001"
            },
            "subtraces": 0,
            "traceAddress": [
                3,
                0
            ],
            "transactionHash": "0x1d37b83cfdcf581b6136afa3081d51d4d775f46a035e0ff856801d3f29bc8ee3",
            "transactionPosition": 161,
            "type": "call"
        },
        {
            "action": {
                "from": "0x3131299ba549173f5c9dd899ffe2d3cd9f9d45ff",
                "callType": "staticcall",
                "gas": "0x1b3ce6",
                "input": "0x70a082310000000000000000000000003131299ba549173f5c9dd899ffe2d3cd9f9d45ff",
                "to": "0xb320f9da95888322c499bec44d941cc50391d0bd",
                "value": "0x0"
            },
            "blockHash": "0x01227a3ef2299388d73a85f64490bbb070654e19830be7ae2aed8007edbf5886",
            "blockNumber": 20784912,
            "result": {
                "gasUsed": "0x95a",
                "output": "0x000000000000000000000000000000000000000002edf20dca391c939c3a3a10"
            },
            "subtraces": 0,
            "traceAddress": [
                3,
                1
            ],
            "transactionHash": "0x1d37b83cfdcf581b6136afa3081d51d4d775f46a035e0ff856801d3f29bc8ee3",
            "transactionPosition": 161,
            "type": "call"
        },
        {
            "action": {
                "from": "0x3131299ba549173f5c9dd899ffe2d3cd9f9d45ff",
                "callType": "staticcall",
                "gas": "0x1b321c",
                "input": "0x70a082310000000000000000000000003131299ba549173f5c9dd899ffe2d3cd9f9d45ff",
                "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                "value": "0x0"
            },
            "blockHash": "0x01227a3ef2299388d73a85f64490bbb070654e19830be7ae2aed8007edbf5886",
            "blockNumber": 20784912,
            "result": {
                "gasUsed": "0x216",
                "output": "0x000000000000000000000000000000000000000000000002e0d90bcd3cd9d053"
            },
            "subtraces": 0,
            "traceAddress": [
                3,
                2
            ],
            "transactionHash": "0x1d37b83cfdcf581b6136afa3081d51d4d775f46a035e0ff856801d3f29bc8ee3",
            "transactionPosition": 161,
            "type": "call"
        },
        {
            "action": {
                "from": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
                "callType": "staticcall",
                "gas": "0x1b7d18",
                "input": "0x70a082310000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d",
                "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                "value": "0x0"
            },
            "blockHash": "0x01227a3ef2299388d73a85f64490bbb070654e19830be7ae2aed8007edbf5886",
            "blockNumber": 20784912,
            "result": {
                "gasUsed": "0x216",
                "output": "0x0000000000000000000000000000000000000000000000000475fb15c02c4eb0"
            },
            "subtraces": 0,
            "traceAddress": [
                4
            ],
            "transactionHash": "0x1d37b83cfdcf581b6136afa3081d51d4d775f46a035e0ff856801d3f29bc8ee3",
            "transactionPosition": 161,
            "type": "call"
        },
        {
            "action": {
                "from": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
                "callType": "call",
                "gas": "0x1b7962",
                "input": "0x2e1a7d4d0000000000000000000000000000000000000000000000000475fb15c02c4eb0",
                "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                "value": "0x0"
            },
            "blockHash": "0x01227a3ef2299388d73a85f64490bbb070654e19830be7ae2aed8007edbf5886",
            "blockNumber": 20784912,
            "result": {
                "gasUsed": "0x2407",
                "output": "0x"
            },
            "subtraces": 1,
            "traceAddress": [
                5
            ],
            "transactionHash": "0x1d37b83cfdcf581b6136afa3081d51d4d775f46a035e0ff856801d3f29bc8ee3",
            "transactionPosition": 161,
            "type": "call"
        },
        {
            "action": {
                "from": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                "callType": "call",
                "gas": "0x8fc",
                "input": "0x",
                "to": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
                "value": "0x475fb15c02c4eb0"
            },
            "blockHash": "0x01227a3ef2299388d73a85f64490bbb070654e19830be7ae2aed8007edbf5886",
            "blockNumber": 20784912,
            "result": {
                "gasUsed": "0x53",
                "output": "0x"
            },
            "subtraces": 0,
            "traceAddress": [
                5,
                0
            ],
            "transactionHash": "0x1d37b83cfdcf581b6136afa3081d51d4d775f46a035e0ff856801d3f29bc8ee3",
            "transactionPosition": 161,
            "type": "call"
        },
        {
            "action": {
                "from": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
                "callType": "call",
                "gas": "0x1b3a93",
                "input": "0x",
                "to": "0x675002812d5ac81999d2c6cd1f52f459e99723a2",
                "value": "0x475fb15c02c4eb0"
            },
            "blockHash": "0x01227a3ef2299388d73a85f64490bbb070654e19830be7ae2aed8007edbf5886",
            "blockNumber": 20784912,
            "result": {
                "gasUsed": "0x0",
                "output": "0x"
            },
            "subtraces": 0,
            "traceAddress": [
                6
            ],
            "transactionHash": "0x1d37b83cfdcf581b6136afa3081d51d4d775f46a035e0ff856801d3f29bc8ee3",
            "transactionPosition": 161,
            "type": "call"
        }
    ]
}
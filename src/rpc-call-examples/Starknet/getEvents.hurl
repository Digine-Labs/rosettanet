REQUEST:

curl {{STARKNET RPC}}
-X POST \
-H "Content-Type: application/json" \
-d '{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "starknet_getEvents",
  "params": [
    {
      "from_block": {"block_number": 550027} {{OR}} 'latest' {{OR}} {"block_hash":"0x025a65200572c8e563cc04b448bcd5b32f7bd105f16e02632d9655afbd53313c"},
      "to_block": {"block_number": 550027},
      "address": "0x06abc0f92c7932d981a423c09c9f399f787096dd069935490b5121678f876e99",
      "chunk_size": 10
    }
  ]
}'

RESULT:

{
    "jsonrpc": "2.0",
    "result": {
        "events": [
            {
                "block_hash": "0x25a65200572c8e563cc04b448bcd5b32f7bd105f16e02632d9655afbd53313c",
                "block_number": 550027,
                "data": [
                    "0x1",
                    "0x0"
                ],
                "from_address": "0x6abc0f92c7932d981a423c09c9f399f787096dd069935490b5121678f876e99",
                "keys": [
                    "0x38f6a5b87c23cee6e7294bcc3302e95019f70f81586ff3cac38581f5ca96381",
                    "0x21e12a85760a4ca72d75e811de6f4d8f63814f0734c66b89cfa2832a8463d82"
                ],
                "transaction_hash": "0x3663a670935d0d571d16023bb7fcf3cc936deadb34e66cb655b8782dff2b4ea"
            },
            {
                "block_hash": "0x25a65200572c8e563cc04b448bcd5b32f7bd105f16e02632d9655afbd53313c",
                "block_number": 550027,
                "data": [
                    "0x816dd0297efc55dc1e7559020a3a825e81ef734b558f03c83325d4da7e6253"
                ],
                "from_address": "0x6abc0f92c7932d981a423c09c9f399f787096dd069935490b5121678f876e99",
                "keys": [
                    "0x2db340e6c609371026731f47050d3976552c89b4fbb012941663841c59d1af3"
                ],
                "transaction_hash": "0x3663a670935d0d571d16023bb7fcf3cc936deadb34e66cb655b8782dff2b4ea"
            }
        ]
    },
    "id": 1
}
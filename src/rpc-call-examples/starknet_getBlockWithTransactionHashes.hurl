PARAMETERS:
block_id  -  Expected one of block_number, block_hash, latest, pending.

REQUEST:

curl {{STARKNET RPC}}
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"starknet_getBlockWithTxHashes","params":[{"block_hash":"0x041b10c45dc3f39372f7b9409261cac9d880c5d75a5bb077d028db20b1bd76c4"}],"id":0}'

RESULT:

{
    "jsonrpc": "2.0",
    "result": {
        "status": "ACCEPTED_ON_L2",
        "block_hash": "0x18ec1a3931bb5a286f801a950e1153bd427d6d3811591cc01e6f074615a1f76",
        "parent_hash": "0x413229e9996b3025feb6b276a33249fb0ff0f92d8aeea284deb35ea4093dea2",
        "block_number": 4503,
        "new_root": "0xc95a878188acf408e285027bd5e7674a88529b8c65ef6c1999b3569aea8bc8",
        "timestamp": 1661246333,
        "sequencer_address": "0x5dcd266a80b8a5f29f04d779c6b166b80150c24f2180a75e82427242dab20a9",
        "transactions": ["0x6a19b22f4fe4018d4d60ff844770a5459534d0a69f850f3c9cdcf70a132df94", "0x5fb5b63f0226ef426c81168d0235269398b63aa145ca6a3c47294caa691cfdc", "0x7af3c8de416f943660ac19ff1b12f552897eabc8316807320cddbeadf9bc01e", "0x2de627287f870f91dfd4e929df03980c994f6ffaa2d1cbf8d0e942fdf0c84d4", "0x7d1439901f2af25627470e18348787cbee190ae08ea3fac2be9fc3b6357a948", "0x119986a68f01623d2193ad1e26338b3dcc1f9a8add4503893e30bde7d6b80d1", "0x19e2e79abfb5495c4d8e7683ea19c918b7c8c2977517de4d232abfc15221d8f", "0x4e72fd133424d979d5ecca4d36481892bb549ddef779f1bc6340f001a682fe3", "0x7a7aa878974390c5546550c45fdcd66bd353063c22cff7f6b98211bb415043f", "0x1d1220e61366b36701332b3b74587443c3d08a3418c2c1fed3db9548b8940ec", "0x5458747fd956625cd857a4d07f51315b3781f9163b5b7987df59ce821a7d6f7", "0x402222e40e37eb6579b2785b53c51ce18e5e45a858f7ba1839ef875aa0f6c7f", "0x3539f55ea7282a543403278bd365f87c5622aa4d497ee56af6cb61ae8ed1d15", "0x68e8e3015ec6377176a944992fa8e28aab4f68dab07c4dde87bc8167c08ebf6", "0x47b3ff195d403d5197a9114055274f12181c56b3095aa6dfa1fa1e0e2ec27f6", "0x465ef3fd70dcc90adee9ae232935a83dd5c41e67c6b6fab6d5dbfe84fbd75c2", 
        ...
        ]
    },
    "id": 0
}
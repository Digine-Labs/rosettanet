/*
    eth response
    {
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "baseFeePerGas": "0x5b7e4936", // Calculate from l1_gas_price
        "blobGasUsed": "0xa0000", // use value like this
        "difficulty": "0x0", // this value ok
        "excessBlobGas": "0x1300000", // use value like this
        "extraData": "0x546974616e2028746974616e6275696c6465722e78797a29", //??
        "gasLimit": "0x223b56f", // maximum gas allowed in this block. Must be higher than 21000
        "gasUsed": "0xef2614", // Sum of gas used in transactions
        "hash": "0xd3ad6e04889631e756c6d3a0bdec82e711311e5425162f81603a098850410815", // block_hash
        "logsBloom": "0xddf9f4006dd134869302a254c431b1d9ebd98ef2984794233f4d226865e6ce4f0db237e5b8df5537c9f75be64e1aafbe8f61dd699e51fab11561b6e8102e81445c64fd1e1bf38eea7b5b41785a52f8f8d86d95bf3566aa306397d4f7bb6e34071c6061498b7a38ae3006e42aa909ac43b23f85423d004dd8dfc665f60fbf63272c67c27914800319a0cc6d7c0bfe59244de9fd7de733364d4c61eee6d3337fe2cb074d62cff178962bda55ff5d81ec5a24c8ce922accd4d9976a8dd23c4ac6d029c2bf66d0af747323667fbac1e07804c7e7274c9620067427cf736a2a0a68c3243ae6c1b3e5c8c888fd9eb8bce1d8d31cbdc955dffeacf4734ba85e2088f7cb",
        "miner": "0x4838b106fce9647bdf1e7877bf73ce8b0bad5f97", // sequencer_address but in eth format
        "mixHash": "0xf89d2f938507b1113a61c12bc04baf572ba97386b7283861edaca8308d77b5a3", // ?? 
        "nonce": "0x0000000000000000", // always zero after pow
        "number": "0x152b000", // block_number
        "parentBeaconBlockRoot": "0xbbc16d42478b2053bf9cc743521a02f655a7a4f2b5e065621b899c90176f2601", // maybe parent_hash again?
        "parentHash": "0x376170780ce72ce9fc7e4570801aeb71fc41f26d87c89a2f50ac4c8fe8cf2b54", // parent_hash
        "receiptsRoot": "0xa7eeeb22a942443628d4ad6f7a4a33d57aab4ea42c1a460b7c0a311129f37415",
        "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347", // ??
        "size": "0x14fa4", // Blocks size in bytes. Random value but non zero will work for sn
        "stateRoot": "0x246f90f698b7b4fbf54106e4fc01de7281072e571c74cdddc8db259b5e2f2814", // new_root
        "timestamp": "0x67efefe7", // timestamp but in hex
        "transactions": [ // If only hashes requests just return like this. Otherwise return full transactions.
            "0x372c6c29975eca2ccbda0adb76deed842014c2917549f3294129959e40dd88e7",
            ...
        ],
        "transactionsRoot": "0xeb565bb82a7fde4c8afbc83a68d2319ab2b27461d42b8748bcef5c8ffadc6b70",
        "uncles": [],
        "withdrawals": [
            ...
        ],
        "withdrawalsRoot": "0x1ef8c90ee7db9bc4929abdb8e6062dbcb7971d7ef02306ba72f0a61872ed493f"
    }
}

SN Response

{
    "jsonrpc": "2.0",
    "result": {
        "status": "ACCEPTED_ON_L1",
        "block_hash": "0x36f7ab48c847372771d60be43c391916e01d5d4608b59b2f403c2760a64fbcf",
        "parent_hash": "0x2fbb21fbcfd14f62c8ff0db0c991fd902f7a0e659bad505a1a5610cf8d4161d",
        "block_number": 1219608,
        "new_root": "0x45c532e1a98e60ee54debb0960531a79e52f472e78521d8bed8fca66669066b",
        "timestamp": 1741691290,
        "sequencer_address": "0x1176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8",
        "l1_gas_price": {
            "price_in_fri": "0x133704bde1d7",
            "price_in_wei": "0x6324675e"
        },
        "l1_data_gas_price": {
            "price_in_fri": "0x1b6a881c813",
            "price_in_wei": "0x8d75271"
        },
        "l1_da_mode": "BLOB",
        "starknet_version": "0.13.3",
        "transactions": [
            ...
        ]
    },
    "id": 1
}
*/

export async function getBlockByNumberHandler() {
    
}
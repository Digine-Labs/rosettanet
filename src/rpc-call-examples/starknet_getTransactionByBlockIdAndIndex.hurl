PARAMETERS:
block_id  -  Expected one of block_number, block_hash, latest, pending.
index — the integer of the index of the transaction within the block.

REQUEST:

curl {{STARKNET RPC}}
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"starknet_getTransactionByBlockIdAndIndex","params": ["latest", 1],"id":1}'

RESULT:

{
    "jsonrpc": "2.0",
    "result": {
        "type": "INVOKE",
        "transaction_hash": "0x5fb5b63f0226ef426c81168d0235269398b63aa145ca6a3c47294caa691cfdc",
        "max_fee": "0x1ff973cafa7fff",
        "version": "0x0",
        "signature": ["0x5a1c0af2b96c461a9753e383107e2bba1849cdf6029ffaa2b97533ada03789f", "0x7261a61b45dcfe48d85fb6a687ed6a888816ba601871679dd32dcb99652de84"],
        "nonce": "0x0",
        "contract_address": "0x7c57808b9cea7130c44aab2f8ca6147b04408943b48c6d8c3c83eb8cfdd8c0b",
        "entry_point_selector": "0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad",
        "calldata": ["0x1", "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7", "0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e", "0x0", "0x3", "0x3", "0x20b55314a52c19b78626a26d48ffd4a9b3e21b45cf3bc7bdf01ea52c4088860", "0x20f7338adef002", "0x0", "0x1457"]
    },
    "id": 1
}
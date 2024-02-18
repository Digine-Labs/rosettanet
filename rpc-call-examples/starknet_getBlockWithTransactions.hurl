PARAMETERS:
block_id  -  Expected one of block_number, block_hash, latest, pending.

REQUEST:

curl {{STARKNET RPC}}
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"starknet_getBlockWithTxs","params":[{"block_hash":"0x041b10c45dc3f39372f7b9409261cac9d880c5d75a5bb077d028db20b1bd76c4"}],"id":0}'

RESULT:

{
    "jsonrpc": "2.0",
    "result": {
        "block_hash": "0x41b10c45dc3f39372f7b9409261cac9d880c5d75a5bb077d028db20b1bd76c4",
        "block_number": 470207,
        "l1_gas_price": {
            "price_in_wei": "0xab3d3c644"
        },
        "new_root": "0x143c3795e04eb3597a0336699ff71419c2a3dee968c0f9306cc90e9413617bc",
        "parent_hash": "0x4f7af745d6a3ee450b7c3e601dd352e4d0ec1f7d47804617506135b4a37a670",
        "sequencer_address": "0x1176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8",
        "starknet_version": "0.12.2",
        "status": "ACCEPTED_ON_L2",
        "timestamp": 1702635071,
        "transactions": [{
            "calldata": ["0xb", "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7", "0x219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c", "0x3", "0x3b554093fb0a7460913be2d5c011cb5ac4333dfcfe6125851bcd3f926a3b558", "0x205466db74c000", "0x0", "0x3b554093fb0a7460913be2d5c011cb5ac4333dfcfe6125851bcd3f926a3b558", "0x1fd12fd4580400368d8953eca1bf472ee233e7e06245d1ef8c176ff12bd3c4", "0x1", "0x434149524f", "0x3b554093fb0a7460913be2d5c011cb5ac4333dfcfe6125851bcd3f926a3b558", "0x1fd12fd4580400368d8953eca1bf472ee233e7e06245d1ef8c176ff12bd3c4", "0x1", "0x434149524f", "0x3b554093fb0a7460913be2d5c011cb5ac4333dfcfe6125851bcd3f926a3b558", "0x1fd12fd4580400368d8953eca1bf472ee233e7e06245d1ef8c176ff12bd3c4", "0x1", "0x434149524f", "0x3b554093fb0a7460913be2d5c011cb5ac4333dfcfe6125851bcd3f926a3b558", "0x1fd12fd4580400368d8953eca1bf472ee233e7e06245d1ef8c176ff12bd3c4", "0x1", "0x434149524f", "0x3b554093fb0a7460913be2d5c011cb5ac4333dfcfe6125851bcd3f926a3b558", "0x1fd12fd4580400368d8953eca1bf472ee233e7e06245d1ef8c176ff12bd3c4", "0x1", "0x434149524f", "0x3b554093fb0a7460913be2d5c011cb5ac4333dfcfe6125851bcd3f926a3b558", "0x1fd12fd4580400368d8953eca1bf472ee233e7e06245d1ef8c176ff12bd3c4", "0x1", "0x434149524f", "0x3b554093fb0a7460913be2d5c011cb5ac4333dfcfe6125851bcd3f926a3b558", "0x1fd12fd4580400368d8953eca1bf472ee233e7e06245d1ef8c176ff12bd3c4", "0x1", "0x434149524f", "0x3b554093fb0a7460913be2d5c011cb5ac4333dfcfe6125851bcd3f926a3b558", "0x1fd12fd4580400368d8953eca1bf472ee233e7e06245d1ef8c176ff12bd3c4", "0x1", "0x434149524f", "0x3b554093fb0a7460913be2d5c011cb5ac4333dfcfe6125851bcd3f926a3b558", "0x1fd12fd4580400368d8953eca1bf472ee233e7e06245d1ef8c176ff12bd3c4", "0x1", "0x434149524f", "0x3b554093fb0a7460913be2d5c011cb5ac4333dfcfe6125851bcd3f926a3b558", "0x1fd12fd4580400368d8953eca1bf472ee233e7e06245d1ef8c176ff12bd3c4", "0x1", "0x434149524f"],
            "max_fee": "0x2386f26fc10000",
            "nonce": "0x3d",
            "sender_address": "0x18d43ec13d5b27c7352162a2b249c2fdf02fb13063b3ff975a3a47fa7bd78d9",
            "signature": ["0x1b72166ae8c0c6756a98ffb2f1c094855b1d2ea2fee645707f0ba709e6119eb", "0x762d0c01dee0625146f617f77fa8168b55a546583782493ac8f2fbd7d4fe9e3"],
            "transaction_hash": "0x42cb3ec5e6a0587ab5d0e688a72758f14ded2e7ab11ac4b317cc9587f889048",
            "type": "INVOKE",
            "version": "0x1"
        }],
    }
}
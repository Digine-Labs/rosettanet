PARAMETERS:
BLOCKCOUNT - Number of blocks in the requested range. Between 1 and 1024 blocks can be requested in a single query. Less than requested may be returned if not all blocks are available.
NEWESTBLOCK - Highest number block of the requested range.
REWARDPERCENTILES - (optional) A monotonically increasing list of percentile values to sample from each block's effective priority fees per gas in ascending order, weighted by the gas used.

REQUEST:

curl {{ ETHEREUM RPC }}
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_feeHistory","params":[4, "latest", [25, 75]],"id":1}'

RESULT:

{
  "id": "1",
  "jsonrpc": "2.0",
  "result": {
    "oldestBlock": 10762137,
    "reward": [
      [
        "0x4a817c7ee",
        "0x4a817c7ee"
      ], [
        "0x773593f0",
        "0x773593f5"
      ], [
        "0x0",
        "0x0"
      ], [
        "0x773593f5",
        "0x773bae75"
      ]
    ],
    "baseFeePerGas": [
      "0x12",
      "0x10",
      "0x10",
      "0xe",
      "0xd"
    ],
    "gasUsedRatio": [
      0.026089875,
      0.406803,
      0,
      0.0866665
    ]
  }
}
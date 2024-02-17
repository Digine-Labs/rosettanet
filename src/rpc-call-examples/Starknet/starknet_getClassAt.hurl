PARAMETERS:
address — the string of the address of the contract.

REQUEST:

curl {{STARKNET RPC}}
-X POST \
-H "Content-Type: application/json" \
-d '
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "starknet_getClassAt",
  "params": [
    {
      "block_number": 385940
    },
    "0x073314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82"
  ]
}
'

RESULT:
{
  "jsonrpc": "2.0",
  "result": {
    "abi": [
      {
        "inputs": [],
        "name": "finalized",
        "outputs": [
          {
            "name": "res",
            "type": "felt"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "data": [
          {
            "name": "new_governor_nominee",
            "type": "felt"
          },
          {
            "name": "nominated_by",
            "type": "felt"
          }
        ],
        "keys": [],
        "name": "governor_nominated",
        "type": "event"
      }...
    ]
  }
  "id": 1
}

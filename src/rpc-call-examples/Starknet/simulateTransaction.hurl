REQUEST:

curl {{STARKNET RPC}}
-X POST \
-H "Content-Type: application/json" \
-d '{
   "jsonrpc": "2.0",
   "method": "starknet_simulateTransaction",
   "params": {
      "transactions": {
         "to": "0xCONTRACT_ADDRESS",
         "data": "0xTRANSACTION_DATA",
         "nonce": "0xNONCE",
         "signature": "0xSIGNATURE"
      },
      "block_id": "latest",
      "simulation_flags": ["flag1", "flag2"]
   },
   "id": 1
}'

RESULT:

{
   "result": [
      {
         "transaction_trace": {
            // Trace details for the transaction
         },
         "fee_estimation": {
            // Fee estimation for the transaction
         }
      }
   ],
   "id": 1
}
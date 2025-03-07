PARAMETERS:
Object - The transaction call object
    from: DATA, 20 Bytes - (optional) The address the transaction is sent from.
    to: DATA, 20 Bytes - The address the transaction is directed to.
    gas: QUANTITY - (optional) Integer of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions. 
    gasPrice: QUANTITY - (optional) Integer of the gasPrice used for each paid gas.
    value: QUANTITY - (optional) Integer of the value sent with this transaction
    data:aa DATA - (optional) Hash of the method signature and encoded parameters. For details see Ethereum Contract ABI (Example: Method ID if balanceOf function)
QUANTITY|TAG - integer block number, or the string "latest", "earliest" or "pending" 

REQUEST:

curl {{ ETHEREUM RPC }}
-X POST \
-H "Content-Type: application/json" \
-d '{
	"jsonrpc":"2.0",
	"method":"eth_call",
	"params":[{
		"from": "",
		"to": "",
		"gas": "",
		"gasPrice": "",
		"value": "",
		"data": ""
	}, "latest"],
	"id":1
}'

RESULT:

{
  "jsonrpc": "2.0",
  "id": 0,
  "result": "0xa1c050"
}
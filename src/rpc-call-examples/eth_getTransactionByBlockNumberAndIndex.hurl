PARAMETERS:
QUANTITY|TAG - a block number, or the string "earliest", "latest" or "pending"
QUANTITY - the transaction index position.

REQUEST:

curl {{ ETHEREUM RPC }}
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["latest", "0x0"],"id":0}'

RESULT:

{
  "jsonrpc": "2.0",
  "id": 0,
  "result": {
    "blockHash": "0xf345d6ac2cb6290489915178fef0b2fc7f5a7312dd06773c77532de6740b2b4d",
    "blockNumber": "0xa1c0ff",
    "from": "0x79c384ac9c32e90f00a214c77caac1392ec8cdea",
    "gas": "0xafbe",
    "gasPrice": "0x1270b01800",
    "hash": "0x61b27f711f58ee3090c0976c7e90d2b7eafeb7b889f0db593234f04f8ce07f22",
    "input": "0xa9059cbb0000000000000000000000004b1a99467a284cc690e3237bc69105956816f7620000000000000000000000000000000000000000000000000000001919617600",
    "nonce": "0xa",
    "to": "0xf9e5af7b42d31d51677c75bbbd37c1986ec79aee",
    "transactionIndex": "0x0",
    "value": "0x0",
    "v": "0x1b",
    "r": "0x2123cdbd1130f726ebed55fd2295239778dd4161495d2733f374d7863fc42ab1",
    "s": "0x1f08fd53ff2c3969b88d5e622561d62a799ae68e36f5142689dbfde44bbe1bed"
  }
}
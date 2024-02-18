PARAMETERS:
DATA, 32 Bytes - hash of a transaction

REQUEST:

curl {{ ETHEREUM RPC }}
-X POST \
-H "Content-Type: application/json" \
-d'{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":0}'

RESULT:
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": {
    "hash": "0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "blockHash": "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber": "0x5daf3b",
    "from": "0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas": "0xc350",
    "gasPrice": "0x4a817c800",
    "input": "0x68656c6c6f21",
    "nonce": "0x15",
    "r": "0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s": "0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c",
    "to": "0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex": "0x41",
    "v": "0x25",
    "value": "0xf3dbb76162000"
  }
}
# Ethereum JSON-RPC Methods in [Infura](https://docs.infura.io/api/networks/ethereum/json-rpc-methods)

## eth_accounts

Returns a list of addresses owned by client

**Parameters :** None

**Returns :** An array of hexadecimals as strings representing the addresses owned by the client.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": []
}
```

## eth_blobBaseFee

Returns the expected base fee for blobs in the next block.

**Parameters :** None

**Returns :** The expected base fee in wei, represented as a hexadecimal.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blobBaseFee","params": [],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x1"
}
```

## eth_blockNumber

Returns the current latest block number.

**Parameters :** None

**Returns :** A hexadecimal of an integer representing the current block number the client is on.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params": [],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x65a8db"
}
```

## eth_call

Executes a new message call immediately without creating a transaction on the blockchain.

**Parameters :**

- `from`: 20 bytes [Required] Address the transaction is sent from.
- `to`: 20 bytes - Address the transaction is directed to.
- `gas`: Hexadecimal value of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions.
- `gasPrice`: Hexadecimal value of the gasPrice used for each paid gas.
- `maxPriorityFeePerGas`: Maximum fee, in Wei, the sender is willing to pay per gas above the base fee. See EIP-1559 transactions.
- `maxFeePerGas`: Maximum total fee (base fee + priority fee), in Wei, the sender is willing to pay per gas. See EIP-1559 transactions.
- `value`: Hexadecimal of the value sent with this transaction.
- `data`: Hash of the method signature and encoded parameters. See Ethereum contract ABI specification.
- `block parameter`: [Required] A hexadecimal block number, or one of the string tags latest, earliest, pending, safe, or finalized. See the default block parameter.

**Returns :** The returned value of the executed contract.

If this call causes the EVM to execute a `REVERT` operation, an error response of the following form is returned, with the revert reason pre-decoded as a string:

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": 3,
    "message": "execution reverted: Dai/insufficient-balance",
    "data": "0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000184461692f696e73756666696369656e742d62616c616e63650000000000000000"
  }
}
```

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
       "jsonrpc":"2.0",
       "method":"eth_call",
       "params": [{
       "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
       "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
       "gas": "0x76c0",
       "gasPrice": "0x9184e72a000",
       "value": "0x9184e72a",
       "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"},
       "latest"],
       "id":1
       }'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x"
}
```

## eth_chainId

Returns the currently configured chain ID, a value used in replay-protected transaction signing as introduced by EIP-155.

**Parameters :** None

**Returns :** A hexadecimal of the current chain ID.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","method":"eth_chainId","params": [],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x1"
}
```

## eth_createAccessList

Creates an EIP-2930 access list that you can include in a transaction.

Use this method to optimize your smart contract interactions. Access lists are a part of Ethereum's EIP-2930, which aims to improve the network's scalability and reduce gas costs by specifying an explicit list of addresses and storage keys that a transaction intends to access.

**Parameters :**

- `Transaction Call Object`:_[Required]_
- - `from`:_[optional]_ 20 bytes Address the transaction is sent from.
- - `to`: 20 bytes - Address the transaction is directed to.
- - `gas`:_[optional]_ Hexadecimal value of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions.
- - `gasPrice`:_[optional]_ Hexadecimal value of the gasPrice used for each paid gas.
- - `maxPriorityFeePerGas`:_[optional]_ Maximum fee, in Wei, the sender is willing to pay per gas above the base fee. See EIP-1559 transactions.
- - `maxFeePerGas`:_[optional]_ Maximum total fee (base fee + priority fee), in Wei, the sender is willing to pay per gas. See EIP-1559 transactions.
- - `value`:_[optional]_ Hexadecimal of the value sent with this transaction.
- - `data`:_[optional]_ Hash of the method signature and encoded parameters. See Ethereum contract ABI specification.
- `block parameter`: _[Required]_ A hexadecimal block number, or one of the string tags latest, earliest, pending, safe, or finalized. See the default block parameter.

**Returns :**

Access list object with the following fields:

- `accessList`: A list of objects with the following fields:
- - `address`: Addresses to be accessed by the transaction.
- - `storageKeys`: Storage keys to be accessed by the transaction.
- `gasUsed`: A hexadecimal string representing the approximate gas cost for the transaction if the access list is included.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"method":"eth_createAccessList",
         "params":[{
             "from": "0xaeA8F8f781326bfE6A7683C2BD48Dd6AA4d3Ba63",
             "data": "0x608060806080608155"},
             "pending"],
             "id":1,
             "jsonrpc":"2.0"
             }'
```

**Response :**

```[json]
{
  "accessList": [
    {
      "address": "0xa02457e5dfd32bda5fc7e1f1b008aa5979568150",
      "storageKeys": [
        "0x0000000000000000000000000000000000000000000000000000000000000081",
      ]
    }
  ]
  "gasUsed": "0x125f8"
}
```

## eth_estimateGas

Executes a new message call immediately without creating a transaction on the blockchain.

**Parameters :**

- `Transaction Call Object`:_[Required]_
- - `from`:_[optional]_ 20 bytes Address the transaction is sent from.
- - `to`: 20 bytes - Address the transaction is directed to.
- - `gas`:_[optional]_ Hexadecimal value of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions.
- - `gasPrice`:_[optional]_ Hexadecimal value of the gasPrice used for each paid gas.
- - `maxPriorityFeePerGas`:_[optional]_ Maximum fee, in Wei, the sender is willing to pay per gas above the base fee. See EIP-1559 transactions.
- - `maxFeePerGas`:_[optional]_ Maximum total fee (base fee + priority fee), in Wei, the sender is willing to pay per gas. See EIP-1559 transactions.
- - `value`:_[optional]_ Hexadecimal of the value sent with this transaction.
- - `data`:_[optional]_ Hash of the method signature and encoded parameters. See Ethereum contract ABI specification.
- - `block parameter`: _[Required]_ A hexadecimal block number, or one of the string tags latest, earliest, pending, safe, or finalized. See the default block parameter.

If no gas limit is specified, geth uses the block gas limit from the pending block as an upper bound. As a result the returned estimate might not be enough to executed the call/transaction when the amount of gas is higher than the pending block gas limit.

**Returns :** A hexadecimal of the estimate of the gas for the given transaction.

If this call causes the EVM to execute a REVERT operation, an error response of the following form is returned, with the revert reason pre-decoded as a string:

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": 3,
    "message": "execution reverted: Dai/insufficient-balance",
    "data": "0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000184461692f696e73756666696369656e742d62616c616e63650000000000000000"
  }
}
```

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
       "jsonrpc":"2.0",
       "method":"eth_estimateGas",
       "params": [{
       "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
       "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
       "gas": "0x76c0",
       "gasPrice": "0x9184e72a000",
       "value": "0x9184e72a",
       "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"},
       "latest"],
       "id":1
       }'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x"
}
```

## eth_feeHistory

Returns historical gas information, allowing you to track trends over time.

**Parameters :**

- `blockCount`: (integer) Number of blocks in the requested range. Between 1 and 1024 blocks can be requested in a single query. If blocks in the specified block range are not available, then only the fee history for available blocks is returned.
- `newestBlock`: (string) Integer representing the highest number block of the requested range, or one of the string tags latest, earliest, or pending.
- `array of integers`: (optional) A monotonically increasing list of percentile values to sample from each block's effective priority fees per gas in ascending order, weighted by gas used.

**Returns :**

- `oldestBlock`: Lowest number block of the returned range expressed as a hexadecimal number.
- `baseFeePerGas`: An array of block base fees per gas, including an extra block value. The extra value is the next block after the newest block in the returned range. Returns zeroes for blocks created before EIP-1559.
- `gasUsedRatio`: An array of block gas used ratios. These are calculated as the ratio of gasUsed and gasLimit.
- `reward`: An array of effective priority fee per gas data points from a single block. All zeroes are returned if the block is empty.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "jsonrpc": "2.0", "method": "eth_feeHistory", "params": ["0x5", "latest", [20,30]] }'
```

**Response :**

```[json]
{
    "jsonrpc": "2.0",
    "result": {
        "baseFeePerGas": [
            "0x3da8e7618",
            "0x3e1ba3b1b",
            "0x3dfd72b90",
            "0x3d64eee76",
            "0x3d4da2da0",
            "0x3ccbcac6b"
        ],
        "gasUsedRatio": [
            0.5290747666666666,
            0.49240453333333334,
            0.4615576,
            0.49407083333333335,
            0.4669053
        ],
        "oldestBlock": "0xfab8ac",
        "reward": [
            [
                "0x59682f00",
                "0x59682f00"
            ],
            [
                "0x59682f00",
                "0x59682f00"
            ],
            [
                "0x3b9aca00",
                "0x59682f00"
            ],
            [
                "0x510b0870",
                "0x59682f00"
            ],
            [
                "0x3b9aca00",
                "0x59682f00"
            ]
        ]
    },
    "id": 0
}
```

## eth_gasPrice

Returns the current gas price in wei.

**Parameters :** None

**Returns :** A hexadecimal equivalent of an integer representing the current gas price in wei.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_gasPrice","params": [],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x6bcc886e7"
}
```

## eth_getBalance

Returns the balance of the account of a given address.

**Parameters :**

- `address`: [Required] A string representing the address (20 bytes) to check for balance.
- `block parameter`: [Required] A hexadecimal block number, or one of the string tags latest, earliest, pending, safe, or finalized. See the default block parameter.

**Returns :** A hexadecimal of the current balance in the account at the given address. The balance is in wei.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getBalance",
      "params": ["0xc94770007dda54cF92009BFF0dE90c06F603a09f",
      "latest"],
      "id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x7c2562030800"
}
```

## eth_getBlockByHash

Returns information about a block whose hash is in the request.

**Parameters :**

- `hash`: (string) [Required] A string representing the hash (32 bytes) of a block.
- `transaction details flag`: (boolean) [Required] If set to true, returns the full transaction objects, if false returns only the hashes of the transactions.

**Returns :** A block object matching the hash in the request, or null when no block was found. The matched block contains the following keys and their values:

- `difficulty`: A hexadecimal of the difficulty for this block.
- `extraData`: The "extra data" field of this block.
- `gasLimit`: Maximum gas allowed in this block.
- `gasUsed`: Total used gas by all transactions in this block.
- `hash`: 32 bytes. The hash of the block. Null when the returned block is the pending block.
- `logsBloom`: 256 bytes. The bloom filter for the logs of the block. Null when the returned block is the pending block.
- `miner`: 20 bytes. The address of the beneficiary to whom the mining rewards were given.
- `nonce`: 8 bytes. The hash of the generated proof-of-work. Null when the returned block is the pending block.
- `number`: The block number. Null when the returned block is the pending block.
- `parentHash`: 32 bytes. The hash of the parent block.
- `receiptsRoot`: 32 bytes. The root of the receipts trie of the block.
- `sha3Uncles`: 32 bytes. The SHA3 of the uncles data in the block.
- `size`: A hexadecimal of the size of this block in bytes.
- `stateRoot`: 32 bytes. The root of the final state trie of the block.
- `timestamp`: Unix timestamp for when the block was collated.
- `totalDifficulty`: A hexadecimal of the total difficulty of the chain until this block.
- `transactions`: [Array] An array of transaction objects, or 32 bytes transaction hashes depending on the last given parameter.
- `transactionsRoot`: 32 bytes. The root of the transaction trie of the block.
- `uncles`: [Array] An Array of uncle hashes.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params": ["0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35",false],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "difficulty": "0xbfabcdbd93dda",
    "extraData": "0x737061726b706f6f6c2d636e2d6e6f64652d3132",
    "gasLimit": "0x79f39e",
    "gasUsed": "0x79ccd3",
    "hash": "0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35",
    "logsBloom": "0x4848112002a2020aaa0812180045840210020005281600c80104264300080008000491220144461026015300100000128005018401002090a824a4150015410020140400d808440106689b29d0280b1005200007480ca950b15b010908814e01911000054202a020b05880b914642a0000300003010044044082075290283516be82504082003008c4d8d14462a8800c2990c88002a030140180036c220205201860402001014040180002006860810ec0a1100a14144148408118608200060461821802c081000042d0810104a8004510020211c088200420822a082040e10104c00d010064004c122692020c408a1aa2348020445403814002c800888208b1",
    "miner": "0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c",
    "mixHash": "0x3d1fdd16f15aeab72e7db1013b9f034ee33641d92f71c0736beab4e67d34c7a7",
    "nonce": "0x4db7a1c01d8a8072",
    "number": "0x5bad55",
    "parentHash": "0x61a8ad530a8a43e3583f8ec163f773ad370329b2375d66433eb82f005e1d6202",
    "receiptsRoot": "0x5eced534b3d84d3d732ddbc714f5fd51d98a941b28182b6efe6df3a0fe90004b",
    "sha3Uncles": "0x8a562e7634774d3e3a36698ac4915e37fc84a2cd0044cb84fa5d80263d2af4f6",
    "size": "0x41c7",
    "stateRoot": "0xf5208fffa2ba5a3f3a2f64ebd5ca3d098978bedd75f335f56b705d8715ee2305",
    "timestamp": "0x5b541449",
    "totalDifficulty": "0x12ac11391a2f3872fcd",
    "transactions": [
      "0x8784d99762bccd03b2086eabccee0d77f14d05463281e121a62abfebcf0d2d5f",
      "0x311be6a9b58748717ac0f70eb801d29973661aaf1365960d159e4ec4f4aa2d7f",
      "0xe42b0256058b7cad8a14b136a0364acda0b4c36f5b02dea7e69bfd82cef252a2",
      "0x4eb05376055c6456ed883fc843bc43df1dcf739c321ba431d518aecd7f98ca11",
      "0x994dd9e72b212b7dc5fd0466ab75adf7d391cf4f206a65b7ad2a1fd032bb06d7",
      "0xf6feecbb9ab0ac58591a4bc287059b1133089c499517e91a274e6a1f5e7dce53",
      "0x7e537d687a5525259480440c6ea2e1a8469cd98906eaff8597f3d2a44422ff97",
      "0xa762220e92bed6d77a2c19ffc60dad77d71bd5028c5230c896ab4b9552a39b50",
      "0xf1fa677edda7e5add8e794732c7554cd5459a5c12781dc71de73c7937dfb2775",
      "0x241d89f7888fbcfadfd415ee967882fec6fdd67c07ca8a00f2ca4c910a84c7dd"
    ],
    "transactionsRoot": "0xf98631e290e88f58a46b7032f025969039aa9b5696498efc76baf436fa69b262",
    "uncles": [
      "0x824cce7c7c2ec6874b9fa9a9a898eb5f27cbaf3991dfa81084c3af60d1db618c"
    ]
  }
}
```

## eth_getBlockByNumber

Returns information about a block by hash.

**Parameters :**

- `block parameter`: [Required] A hexadecimal block number, or one of the string tags latest, earliest, pending, safe, or finalized. See the default block parameter.
- `show transaction details flag`: (boolean) [Required] If set to true, returns the full transaction objects. If false returns only the hashes of the transactions.

**Returns :** A block object, or null when no block was found. The returned block object contains the following keys and their values:

- `difficulty`: A hexadecimal of the difficulty for this block.
- `extraData`: The "extra data" field of this block.
- `gasLimit`: Maximum gas allowed in this block.
- `gasUsed`: Total used gas by all transactions in this block.
- `hash`: 32 bytes. The hash of the block. Null when the returned block is the pending block.
- `logsBloom`: 256 bytes. The bloom filter for the logs of the block. Null when the returned block is the pending block.
- `miner`: 20 bytes. The address of the beneficiary to whom the mining rewards were given.
- `nonce`: 8 bytes. The hash of the generated proof-of-work. Null when the returned block is the pending block.
- `number`: The block number. Null when the returned block is the pending block.
- `parentHash`: 32 bytes. The hash of the parent block.
- `receiptsRoot`: 32 bytes. The root of the receipts trie of the block.
- `sha3Uncles`: 32 bytes. The SHA3 of the uncles data in the block.
- `size`: A hexadecimal of the size of this block in bytes.
- `stateRoot`: 32 bytes. The root of the final state trie of the block.
- `timestamp`: Unix timestamp for when the block was collated.
- `totalDifficulty`: A hexadecimal of the total difficulty of the chain until this block.
- `transactions`: [Array] An array of transaction objects, or 32 bytes transaction hashes depending on the last given parameter.
- `transactionsRoot`: 32 bytes. The root of the transaction trie of the block.
- `uncles`: [Array] An Array of uncle hashes.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x5BAD55",false],"id":1}'
```

**Response :**

```[json]
{
   "id" : 1,
   "jsonrpc" : "2.0",
   "result" : {
      "difficulty" : "0xbfabcdbd93dda",
      "extraData" : "0x737061726b706f6f6c2d636e2d6e6f64652d3132",
      "gasLimit" : "0x79f39e",
      "gasUsed" : "0x79ccd3",
      "hash" : "0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35",
      "logsBloom" : "0x4848112002a2020aaa0812180045840210020005281600c80104264300080008000491220144461026015300100000128005018401002090a824a4150015410020140400d808440106689b29d0280b1005200007480ca950b15b010908814e01911000054202a020b05880b914642a0000300003010044044082075290283516be82504082003008c4d8d14462a8800c2990c88002a030140180036c220205201860402001014040180002006860810ec0a1100a14144148408118608200060461821802c081000042d0810104a8004510020211c088200420822a082040e10104c00d010064004c122692020c408a1aa2348020445403814002c800888208b1",
      "miner" : "0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c",
      "mixHash" : "0x3d1fdd16f15aeab72e7db1013b9f034ee33641d92f71c0736beab4e67d34c7a7",
      "nonce" : "0x4db7a1c01d8a8072",
      "number" : "0x5bad55",
      "parentHash" : "0x61a8ad530a8a43e3583f8ec163f773ad370329b2375d66433eb82f005e1d6202",
      "receiptsRoot" : "0x5eced534b3d84d3d732ddbc714f5fd51d98a941b28182b6efe6df3a0fe90004b",
      "sha3Uncles" : "0x8a562e7634774d3e3a36698ac4915e37fc84a2cd0044cb84fa5d80263d2af4f6",
      "size" : "0x41c7",
      "stateRoot" : "0xf5208fffa2ba5a3f3a2f64ebd5ca3d098978bedd75f335f56b705d8715ee2305",
      "timestamp" : "0x5b541449",
      "totalDifficulty" : "0x12ac11391a2f3872fcd",
      "transactions" : [
         "0x8784d99762bccd03b2086eabccee0d77f14d05463281e121a62abfebcf0d2d5f",
         "0x311be6a9b58748717ac0f70eb801d29973661aaf1365960d159e4ec4f4aa2d7f",
         "0xe42b0256058b7cad8a14b136a0364acda0b4c36f5b02dea7e69bfd82cef252a2",
         "0x4eb05376055c6456ed883fc843bc43df1dcf739c321ba431d518aecd7f98ca11",
         "0x994dd9e72b212b7dc5fd0466ab75adf7d391cf4f206a65b7ad2a1fd032bb06d7",
         ...
         "0xf1cd627c97746bc75727c2f0efa2d0dc66cca1b36d8e45d897e18a9b19af2f60",
         "0x241d89f7888fbcfadfd415ee967882fec6fdd67c07ca8a00f2ca4c910a84c7dd"
      ],
      "transactionsRoot" : "0xf98631e290e88f58a46b7032f025969039aa9b5696498efc76baf436fa69b262",
      "uncles" : [
         "0x824cce7c7c2ec6874b9fa9a9a898eb5f27cbaf3991dfa81084c3af60d1db618c"
      ]
   }
}
```

## eth_getBlockReceipts

Returns all transaction receipts for a given block, the amount of gas used, and any event logs that might have been produced by a smart contract during the transaction.

**Parameters :**

- `blockNumber`:[Required] Hexadecimal or decimal integer representing a block number, or one of the string tags:

`latest`
`earliest`
`pending`
`finalized`
`safe`

**Returns :** result: object Block object or null when there is no corresponding block.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","method":"eth_getBlockReceipts","params":["latest"],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "blockHash": "0x19514ce955c65e4dd2cd41f435a75a46a08535b8fc16bc660f8092b32590b182",
      "blockNumber": "0x6f55",
      "contractAddress": null,
      "cumulativeGasUsed": "0x18c36",
      "from": "0x22896bfc68814bfd855b1a167255ee497006e730",
      "gasUsed": "0x18c36",
      "effectiveGasPrice": "0x9502f907",
      "logs": [
        {
          "address": "0xfd584430cafa2f451b4e2ebcf3986a21fff04350",
          "topics": [
            "0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d",
            "0x4be29e0e4eb91f98f709d98803cba271592782e293b84a625e025cbb40197ba8",
            "0x000000000000000000000000835281a2563db4ebf1b626172e085dc406bfc7d2",
            "0x00000000000000000000000022896bfc68814bfd855b1a167255ee497006e730"
          ],
          "data": "0x",
          "blockNumber": "0x6f55",
          "transactionHash": "0x4a481e4649da999d92db0585c36cba94c18a33747e95dc235330e6c737c6f975",
          "transactionIndex": "0x0",
          "blockHash": "0x19514ce955c65e4dd2cd41f435a75a46a08535b8fc16bc660f8092b32590b182",
          "logIndex": "0x0",
          "removed": false
        }
      ],
      "logsBloom": "0x00000004000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000080020000000000000200010000000000000000000001000000800000000000000000000000000000000000000000000000000000100100000000000000000000008000000000000000000000000000000002000000000000000000000",
      "status": "0x1",
      "to": "0xfd584430cafa2f451b4e2ebcf3986a21fff04350",
      "transactionHash": "0x4a481e4649da999d92db0585c36cba94c18a33747e95dc235330e6c737c6f975",
      "transactionIndex": "0x0",
      "type": "0x0"
    },
    {
      "blockHash": "0x19514ce955c65e4dd2cd41f435a75a46a08535b8fc16bc660f8092b32590b182",
      "blockNumber": "0x6f55",
      "contractAddress": null,
      "cumulativeGasUsed": "0x1de3e",
      "from": "0x712e3a792c974b3e3dbe41229ad4290791c75a82",
      "gasUsed": "0x5208",
      "effectiveGasPrice": "0x9502f907",
      "logs": [],
      "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "status": "0x1",
      "to": "0xd42e2b1c14d02f1df5369a9827cb8e6f3f75f338",
      "transactionHash": "0xefb83b4e3f1c317e8da0f8e2fbb2fe964f34ee184466032aeecac79f20eacaf6",
      "transactionIndex": "0x1",
      "type": "0x2"
    }
  ]
}
```

## eth_getBlockTransactionCountByHash

Returns the number of transactions in the block with the given block hash.

**Parameters :**

- `block hash`:[Required] A string representing the hash (32 bytes) of a block.

**Returns :**

- `block transaction count`: A hexadecimal equivalent of the integer representing the number of transactions in the block.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params": ["0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35"],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x50"
}
```

## eth_getBlockTransactionCountByNumber

Returns the number of transactions in the block with the given block hash.

**Parameters :**

- `blockNumber`:[Required] Hexadecimal or decimal integer representing a block number, or one of the string tags:

`latest`
`earliest`
`pending`
`finalized`
`safe`

**Returns :**

- `block transaction count`: A hexadecimal equivalent of the integer representing the number of transactions in the block.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params": ["latest"],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0xa0"
}
```

## eth_getCode

Returns the compiled byte code of a smart contract, if any, at a given address.

**Parameters :**

- `address`: [Required] A string representing the address (20 bytes) of the smart contract, from which the compiled byte code will be obtained.
- `blockNumber`:[Required] Hexadecimal or decimal integer representing a block number, or one of the string tags:

`latest`
`earliest`
`pending`
`finalized`
`safe`

**Returns :**

The compiled byte code of the smart contract at the given address.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getCode","params": ["0x06012c8cf97bead5deae237070f9587f8e7a266d", "0x65a8db"],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x60606040..."
}
```

## eth_getLogs

Returns an array of all the logs matching the given filter object. See also the below Constraints section.

**Parameters :**

- `address`: [optional] A string representing the address (20 bytes) of the smart contract, from which the compiled byte code will be obtained.
- `fromBlock`:[optional] Hexadecimal or decimal integer representing a block number, or one of the string tags:`latest`,`earliest`,`pending`,`finalized`,`safe`
- `toBlock`:[optional] Hexadecimal or decimal integer representing a block number, or one of the string tags:`latest`,`earliest`,`pending`,`finalized`,`safe`
- `topics`: [optional] Array of 32 bytes DATA topics. Topics are order-dependent.
- `blockhash`: [optional] Restricts the logs returned to the single block referenced in the 32-byte hash blockHash. Using blockHash is equivalent to setting fromBlock and toBlock to the block number referenced in the blockHash. If blockHash is present in in the filter criteria, then neither fromBlock nor toBlock are allowed.

**Returns :**

`log objects`: An array of log objects, or an empty array if nothing has changed since last poll. Log objects contain the following keys and their values:

- `removed`: (boolean) true when the log was removed, due to a chain reorganization. false if it's a valid log.
- `logIndex`: Hexadecimal of the log index position in the block. Null when it is a pending log.
- `transactionIndex`: Hexadecimal of the transactions index position from which the log created. Null when it is a pending log.
- `transactionHash`: 32 bytes. Hash of the transactions from which this log was created. Null when it is a pending log.
- `blockHash`: 32 bytes. Hash of the block where this log was in. Null when it is a pending log.
- `blockNumber`: Block number where this log was in. Null when it is a pending log.
- `address`: 20 bytes. Address from which this log originated.
- `data`: Contains one or more 32-bytes non-indexed arguments of the log.
- `topics`: An array of 0 to 4 indexed log arguments, each 32 bytes. In solidity the first topic is the hash of the signature of the event (e.g. Deposit(address,bytes32,uint256)), except when you declared the event with the anonymous specifier.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"blockHash": "0x7c5a35e9cb3e8ae0e221ab470abae9d446c3a5626ce6689fc777dcffcab52c70", "topics":["0x241ea03ca20251805084d27d4440371c34a0b85ff108f6bb5611248f73818b80"]}],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "address": "0x1a94fce7ef36bc90959e206ba569a12afbc91ca1",
      "blockHash": "0x7c5a35e9cb3e8ae0e221ab470abae9d446c3a5626ce6689fc777dcffcab52c70",
      "blockNumber": "0x5c29fb",
      "data": "0x0000000000000000000000003e3310720058c51f0de456e273c626cdd35065700000000000000000000000000000000000000000000000000000000000003185000000000000000000000000000000000000000000000000000000000000318200000000000000000000000000000000000000000000000000000000005c2a23",
      "logIndex": "0x1d",
      "removed": false,
      "topics": [
        "0x241ea03ca20251805084d27d4440371c34a0b85ff108f6bb5611248f73818b80"
      ],
      "transactionHash": "0x3dc91b98249fa9f2c5c37486a2427a3a7825be240c1c84961dfb3063d9c04d50",
      "transactionIndex": "0x1d"
    },
    {
      "address": "0x06012c8cf97bead5deae237070f9587f8e7a266d",
      "blockHash": "0x7c5a35e9cb3e8ae0e221ab470abae9d446c3a5626ce6689fc777dcffcab52c70",
      "blockNumber": "0x5c29fb",
      "data": "0x00000000000000000000000077ea137625739598666ded665953d26b3d8e374400000000000000000000000000000000000000000000000000000000000749ff00000000000000000000000000000000000000000000000000000000000a749d00000000000000000000000000000000000000000000000000000000005c2a0f",
      "logIndex": "0x57",
      "removed": false,
      "topics": [
        "0x241ea03ca20251805084d27d4440371c34a0b85ff108f6bb5611248f73818b80"
      ],
      "transactionHash": "0x788b1442414cb9c9a36dba2abe250763161a6f6395788a2e808f1b34e92beec1",
      "transactionIndex": "0x54"
    }
  ]
}
```

**Constraints :**

The following constraints apply:

To prevent queries from consuming too many resources, eth_getLogs requests are currently limited by three constraints:

- A maximum of 5,000 parameters in a single request
- A maximum of 10,000 results can be returned by a single query
- Query duration must not exceed 10 seconds

If a query returns too many results or exceeds the max query duration, one of the following errors is returned:

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32005,
    "message": "query returned more than 10000 results"
  }
}
```

or

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32005,
    "message": "query timeout exceeded"
  }
}
```

If this happens:

- Limit your query to a smaller number of blocks using fromBlock and toBlock.
- If querying for commonly used topics, consider limiting to a single smart contract address.

## eth_getProof

Returns the compiled byte code of a smart contract, if any, at a given address.

**Parameters :**

- `address`: A string representing the address (20 bytes) of the smart contract, from which the compiled byte code will be obtained.
- `storageKeys`: An array of 32-byte storage keys to be proofed and included.
- `blockParameter`: Hexadecimal or decimal integer representing a block number, or one of the string tags:`latest`,`earliest`,`pending`,`finalized`,`safe`

**Returns :**

- `balance`: Hexadecimal of the current balance in wei.
- `codeHash`: The 32-byte hash of the code of the account.
- `nonce`: The nonce of the account.
- `storageHash`: 32 bytes. The SHA3 of the StorageRoot. All storage will deliver a Merkle proof starting with this rootHash.
- `accountProof`: An array of RLP-serialized MerkleTree-Nodes, starting with the stateRoot-Node, following the path of the SHA3 (address) as key.
- `storageProof`: An array of storage-entries as requested. Each entry is an object with these properties:
- - `key`: The requested storage key.
- - `value`: The storage value.
- - `proof`: An array of RLP-serialized MerkleTree-Nodes, starting with the storageHash-Node, following the path of the SHA3 (key) as path.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0","method": "eth_getProof","id": 1,"params": ["0x7F0d15C7FAae65896648C8273B6d7E43f58Fa842", ["0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"], "latest"]}'
```

**Response :**

```[json]
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "accountProof": [
      "0xf90211a...0701bc80",
      "0xf90211a...0d832380",
      "0xf90211a...5fb20c80",
      "0xf90211a...0675b80",
      "0xf90151a0...ca08080"
    ],
    "address" : "0x7f0d15c7faae65896648c8273b6d7e43f58fa842",
    "balance" : "0x0",
    "codeHash" : "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
    "nonce" : "0x0",
    "storageHash" : "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "storageProof" : [
        {
          "key" : "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
          "proof" : [],
          "value" : "0x0"
        }
    ]
  }
}
```

## eth_getStorageAt

Returns the value from a storage position at a given address.

**Parameters :**

- `address`: [Required] A string representing the address (20 bytes) of the smart contract, from which the compiled byte code will be obtained.
- `storage position`: [Required] A hexadecimal code of the position in the storage
- `blockParameter`:[Required] Hexadecimal or decimal integer representing a block number, or one of the string tags:`latest`,`earliest`,`pending`,`finalized`,`safe`

**Returns :**

- `storage value`: A hexadecimal equivalent of the integer indicating the value of the storage position at the provided address.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getStorageAt","params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "0x65a8db"],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

## eth_getTransactionByBlockHashAndIndex

Returns information about a transaction given block hash and transaction index position.

**Parameters :**

- `block hash`: [Required] A string representing the hash (32 bytes) of a block.
- `transaction index position`: [Required] A hexadecimal of the integer representing the position in the block.

**Returns :**

A transaction object, or null when no transaction was found. The transaction object will consist of the following keys and their values:

- `accessList`: [optional] A list of addresses and storage keys accessed by the transaction. See access list transactions.
- `blockHash`: 32 bytes. A hash of the block including this transaction. null when it's pending.
- `blockNumber`: The number of the block including this transaction. null when it's pending.
- `chainID`: [optional] chain ID specifying the network. Returned only for EIP-1559 transactions.
- `from`: 20 bytes. The address of the sender.
- `to`: 20 bytes. The address of the receiver. null when it's a contract creation transaction.
- `gas`: Gas provided by the sender.
- `gasPrice`: Gas price provided by the sender in Wei.
- `hash`: 32 bytes. The hash of the transaction.
- `input`: The data sent along with the transaction.
- `maxPriorityFeePerGas`: [optional] Maximum fee, in Wei, the sender is willing to pay per gas above the base fee. See EIP-1559 transactions.
- `maxFeePerGas`: [optional] Maximum total fee (base fee + priority fee), in Wei, the sender is willing to pay per gas. See EIP-1559 transactions.
- `nonce`: The number of transactions made by the sender prior to this one.
- `v`: The ECDSA recovery ID.
- `r`: 32 bytes. The ECDSA signature r.
- `s`: 32 bytes. The ECDSA signature s.
- `transactionIndex`: The transaction's index position in the block, in hexadecimal. null when it's pending.
- `type`: The transaction type.
- `value`: The value transferred in Wei.
- `yParity`: [optional] Parity (0x0 for even, 0x1 for odd) of the y-value of a secp256k1 signature.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params": ["0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35","0x0"],"id":1}'
```

**Response :**

```[json]
{
   "id" : 1,
   "jsonrpc" : "2.0",
   "result":{
      "accessList":[],
      "blockHash":"0xfdc2fb4ce6356fef28fda948d675182d5759d0c885ec9a4b7fff604a8167a118",
      "blockNumber":"0x11dd3de",
      "chainId":"0x1",
      "from":"0x1f9090aae28b8a3dceadf281b0f12828e676c326","gas":"0x565f","gasPrice":"0x6f4d3132b",
      "hash":"0x24ea08c3b1bc777a23d0373dd3f8a980455c7817d814c5f34df5a3e3caf5c9a1",
      "input":"0x",
      "maxFeePerGas":"0x6f4d3132b",
      "maxPriorityFeePerGas":"0x0",
      "nonce":"0x63dbc",
      "r":"0xd38fcf50bab3898938058cd0337e655d0fdc302b57807da83f59b27035055ed5",
      "s":"0x300ae498fe06a5fa65ebb69fc2bd99a3fbbf991543ff3dce2c45c3b43c5113fd",
      "to":"0x388c818ca8b9251b393131c08a736a67ccb19297",
      "transactionIndex":"0xa2",
      "type":"0x2",
      "v":"0x1",
      "value":"0x2e463634a25a9a2",
      "yParity":"0x1"
   }
}
```

## eth_getTransactionByBlockNumberAndIndex

Returns information about a transaction given block number and transaction index position.

**Parameters :**

- `block hash`: [Required] A string representing the hash (32 bytes) of a block.
- `transaction index position`: [Required] A hexadecimal of the integer representing the position in the block.

**Returns :**

A transaction object, or null when no transaction was found. The transaction object will consist of the following keys and their values:

- `accessList`: [optional] A list of addresses and storage keys accessed by the transaction. See access list transactions.
- `blockHash`: 32 bytes. A hash of the block including this transaction. null when it's pending.
- `blockNumber`: The number of the block including this transaction. null when it's pending.
- `chainID`: [optional] chain ID specifying the network. Returned only for EIP-1559 transactions.
- `from`: 20 bytes. The address of the sender.
- `to`: 20 bytes. The address of the receiver. null when it's a contract creation transaction.
- `gas`: Gas provided by the sender.
- `gasPrice`: Gas price provided by the sender in Wei.
- `hash`: 32 bytes. The hash of the transaction.
- `input`: The data sent along with the transaction.
- `maxPriorityFeePerGas`: [optional] Maximum fee, in Wei, the sender is willing to pay per gas above the base fee. See EIP-1559 transactions.
- `maxFeePerGas`: [optional] Maximum total fee (base fee + priority fee), in Wei, the sender is willing to pay per gas. See EIP-1559 transactions.
- `nonce`: The number of transactions made by the sender prior to this one.
- `v`: The ECDSA recovery ID.
- `r`: 32 bytes. The ECDSA signature r.
- `s`: 32 bytes. The ECDSA signature s.
- `transactionIndex`: The transaction's index position in the block, in hexadecimal. null when it's pending.
- `type`: The transaction type.
- `value`: The value transferred in Wei.
- `yParity`: [optional] Parity (0x0 for even, 0x1 for odd) of the y-value of a secp256k1 signature.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params": ["0x5BAD55","0x0"],"id":1}'
```

**Response :**

```[json]
{
   "id" : 1,
   "jsonrpc" : "2.0",
   "result" : {
      "accessList":[],
      "blockHash":"0x1682216b3a937e57aeb8c7fcf64a8851ac9a5dd2407f7a76e01aad1ccc0aee19",
      "blockNumber":"0x11dca94",
      "chainId":"0x1",
      "from":"0x1f9090aae28b8a3dceadf281b0f12828e676c326",
      "gas":"0x565f",
      "gasPrice":"0xef8230501",
      "hash":"0x140fc3229057d6a484227cbcae16331f586310f68f2095dbc75b3af53d4874bd",
      "input":"0x",
      "maxFeePerGas":"0xef8230501",
      "maxPriorityFeePerGas":"0x0",
      "nonce":"0x63b1f",
      "r":"0x483a889fdbe4bcebd02fcef8b0644dd710de2b2b2f36f4762b90738016e5c639",
      "s":"0x39efb4a71072e6585223e9e77e63920fa65f3de5091d510667782d4cd34ce0a4",
      "to":"0x388c818ca8b9251b393131c08a736a67ccb19297",
      "transactionIndex":"0xa4",
      "type":"0x2",
      "v":"0x1",
      "value":"0x12ff2241f48fc83",
      "yParity":"0x1"
   }
}
```

## eth_getTransactionByHash

Returns information about a transaction for a given hash.

**Parameters :**

- `transaction hash`: [Required] A string representing the hash (32 bytes) of a transaction.

**Returns :**

A transaction object, or null when no transaction was found. The transaction object will consist of the following keys and their values:

- `accessList`: [optional] A list of addresses and storage keys accessed by the transaction. See access list transactions.
- `blockHash`: 32 bytes. A hash of the block including this transaction. null when it's pending.
- `blockNumber`: The number of the block including this transaction. null when it's pending.
- `chainID`: [optional] chain ID specifying the network. Returned only for EIP-1559 transactions.
- `from`: 20 bytes. The address of the sender.
- `to`: 20 bytes. The address of the receiver. null when it's a contract creation transaction.
- `gas`: Gas provided by the sender.
- `gasPrice`: Gas price provided by the sender in Wei.
- `hash`: 32 bytes. The hash of the transaction.
- `input`: The data sent along with the transaction.
- `maxPriorityFeePerGas`: [optional] Maximum fee, in Wei, the sender is willing to pay per gas above the base fee. See EIP-1559 transactions.
- `maxFeePerGas`: [optional] Maximum total fee (base fee + priority fee), in Wei, the sender is willing to pay per gas. See EIP-1559 transactions.
- `nonce`: The number of transactions made by the sender prior to this one.
- `v`: The ECDSA recovery ID.
- `r`: 32 bytes. The ECDSA signature r.
- `s`: 32 bytes. The ECDSA signature s.
- `transactionIndex`: The transaction's index position in the block, in hexadecimal. null when it's pending.
- `type`: The transaction type.
- `value`: The value transferred in Wei.
- `yParity`: [optional] Parity (0x0 for even, 0x1 for odd) of the y-value of a secp256k1 signature.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params": ["0xbb3a336e3f823ec18197f1e13ee875700f08f03e2cab75f0d0b118dabb44cba0"],"id":1}'
```

**Response :**

```[json]
{
    "id":1,
    "jsonrpc":"2.0",
    "result":{
      "accessList":[],
      "blockHash":"0x0155db99111f10086bad292d3bd0be9472aff9cf0f33d7d35f2db4814ffad0f6",
      "blockNumber":"0x112418d",
      "chainId":"0x1",
      "from":"0xe2a467bfe1e1bedcdf1343d3a45f60c50e988696",
      "gas":"0x3c546",
      "gasPrice":"0x20706def53",
      "hash":"0xce0aadd04968e21f569167570011abc8bc17de49d4ae3aed9476de9e03facff9",
      "input":"0xb6f9de9500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000e2a467bfe1e1bedcdf1343d3a45f60c50e9886960000000000000000000000000000000000000000000000000000000064e54a3b0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000de15b9919539113a1930d3eed5088cd10338abb5",
      "maxFeePerGas":"0x22b05d8efd",
      "maxPriorityFeePerGas":"0x1bf08eb000",
      "nonce":"0x12c",
      "r":"0xa07fd6c16e169f0e54b394235b3a8201101bb9d0eba9c8ae52dbdf556a363388",
      "s":"0x36f5da9310b87fefbe9260c3c05ec6cbefc426f1ff3b3a41ea21b5533a787dfc",
      "to":"0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
      "transactionIndex":"0x0",
      "type":"0x2",
      "v":"0x1",
      "value":"0x2c68af0bb140000",
      "yParity":"0x1"
   }
}
```

## eth_getTransactionCount

Returns the number of transactions sent from an address.

**Parameters :**

- `address`: [Required] A string representing the address (20 bytes) of the smart contract, from which the compiled byte code will be obtained.
- `blockParameter`: Hexadecimal or decimal integer representing a block number, or one of the string tags:`latest`,`earliest`,`pending`,`finalized`,`safe`

**Returns :**

- `transaction count`: A hexadecimal equivalent of the integer representing the number of transactions sent from the given address.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params": ["0xc94770007dda54cF92009BFF0dE90c06F603a09f","0x5bad55"],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x1a"
}
```

## eth_getTransactionReceipt

Returns the receipt of a transaction given transaction hash. Note that the receipt is not available for pending transactions.

**Parameters :**

- `transaction hash`: [Required] A string representing the hash (32 bytes) of a transaction.

**Returns :**

A transaction receipt object, or null when no receipt was found. The transaction receipt object will contain the following keys and their values:

- `blockHash`: 32 bytes. Hash of the block including this transaction.
- `blockNumber`: Block number including this transaction.
- `contractAddress`: 20 bytes. The contract address created if the transaction was a contract creation, otherwise null.
- `cumulativeGasUsed`: The total amount of gas used when this transaction was executed in the block.
- `effectiveGasPrice`: The actual value per gas deducted from the sender's account. Before EIP-1559, equal to the gas price.
- `from`: 20 bytes. The address of the sender.
- `gasUsed`: The amount of gas used by this specific transaction alone.
- `logs`: (Array) An array of log objects generated by this transaction.
- `logsBloom`: 256 bytes. Bloom filter for light clients to quickly retrieve related logs.
- One of the following:
- - `root`: 32 bytes of post-transaction stateroot (pre-Byzantium)
- - `status`: Either 1 (success) or 0 (failure)
- `to`: 20 bytes. The address of the receiver. null when the transaction is a contract creation transaction.
- `transactionHash`: 32 bytes. The hash of the transaction.
- `transactionIndex`: Hexadecimal of the transaction's index position in the block.
- `type`: the transaction type.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params": ["0xbb3a336e3f823ec18197f1e13ee875700f08f03e2cab75f0d0b118dabb44cba0"],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":"0x0a79eca9f5ca58a1d5d5030a0fabfdd8e815b8b77a9f223f74d59aa39596e1c7",
    "blockNumber":"0x11e5883",
    "contractAddress":null,
    "cumulativeGasUsed":"0xc5f3e7",
    "effectiveGasPrice":"0xa45b9a444",
    "from":"0x690b9a9e9aa1c9db991c7721a92d351db4fac990",
    "gasUsed":"0x565f",
    "logs": [
      {
        "address":"0x388c818ca8b9251b393131c08a736a67ccb19297",
        "blockHash":"0x0a79eca9f5ca58a1d5d5030a0fabfdd8e815b8b77a9f223f74d59aa39596e1c7",
        "blockNumber":"0x11e5883",
        "data":"0x00000000000000000000000000000000000000000000000011b6b79503fb875d",
        "logIndex":"0x187",
        "removed":false,
        "topics": [
          "0x27f12abfe35860a9a927b465bb3d4a9c23c8428174b83f278fe45ed7b4da2662"
        ],
        "transactionHash":"0x7114b4da1a6ed391d5d781447ed443733dcf2b508c515b81c17379dea8a3c9af",
        "transactionIndex":"0x76"
      }
    ],
    "logsBloom":"0x00000000000000000000000000000000000100004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000",
    "status":"0x1",
    "to":"0x388c818ca8b9251b393131c08a736a67ccb19297",
    "transactionHash":"0x7114b4da1a6ed391d5d781447ed443733dcf2b508c515b81c17379dea8a3c9af",
    "transactionIndex":"0x76",
    "type":"0x2"
  }
}
```

## eth_getUncleByBlockHashAndIndex

Returns information about a uncle of a block given the block hash and the uncle index position.

**Parameters :**

- `blockHash`: [Required] A string representing the hash (32 bytes) of a block.
- `uncle index position`: [Required] A hexadecimal equivalent of the integer indicating the uncle's index position.

**Returns :**

A block object, or null when no block was found. The block object returned will consist of the following keys and their values:

- `number`: The block number. Null when the returned block is the pending block.
- `hash`: 32 bytes. Hash of the block. Null when its pending block.
- `parentHash`: 32 bytes. Hash of the parent block.
- `nonce`: 8 bytes. Hash of the generated proof-of-work. Null when the returned block is the pending block.
- `sha3Uncles`: 32 bytes. The SHA3 of the uncles data in the block.
- `logsBloom`: 256 bytes. The Bloom filter for the logs of the block. Null when the returned block is the pending block.
- `transactionsRoot`: 32 bytes. The root of the transaction trie of the block.
- `stateRoot`: 32 bytes. The root of the final state trie of the block.
- `receiptsRoot`: 32 bytes. The root of the receipts trie of the block.
- `miner`: 20 bytes. The address of the beneficiary to whom the mining rewards were given.
- `difficulty`: The hexadecimal of the difficulty for this block.
- `totalDifficulty`: The hexadecimal of the total difficulty of the chain until this block.
- `extraData`: The "extra data" field of this block.
- `size`: The hexadecimal of the size of this block in bytes.
- `gasLimit`: Maximum gas allowed in this block.
- `gasUsed`: Total used gas by all transactions in this block.
- `timestamp`: The unix timestamp for when the block was collated.
- `uncles`: (Array). An array of uncle hashes.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params": ["0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35","0x0"],"id":1}'
```

**Response :**

```[json]
{
   "id" : 1,
   "jsonrpc" : "2.0",
   "result" : {
     "difficulty": "0x57f117f5c",
     "extraData": "0x476574682f76312e302e302f77696e646f77732f676f312e342e32",
     "gasLimit": "0x1388",
     "gasUsed": "0x0",
     "hash": "0x932bdf904546a2287a2c9b2ede37925f698a7657484b172d4e5184f80bdd464d",
     "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
     "miner": "0x5bf5e9cf9b456d6591073513de7fd69a9bef04bc",
     "mixHash": "0x4500aa4ee2b3044a155252e35273770edeb2ab6f8cb19ca8e732771484462169",
     "nonce": "0x24732773618192ac",
     "number": "0x299",
     "parentHash": "0xa779859b1ee558258b7008bbabff272280136c5dd3eb3ea3bfa8f6ae03bf91e5",
     "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
     "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
     "size": "0x21d",
     "stateRoot": "0x2604fbf5183f5360da249b51f1b9f1e0f315d2ff3ffa1a4143ff221ad9ca1fec",
     "timestamp": "0x55ba4827",
     "totalDifficulty": null,
     "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
     "uncles": []
   }
}
```

## eth_getUncleByBlockNumberAndIndex

Returns the compiled byte code of a smart contract, if any, at a given address.

**Parameters :**

- `blockParameter`: Hexadecimal or decimal integer representing a block number, or one of the string tags:`latest`,`earliest`,`pending`,`finalized`,`safe`
- `uncle index position`: [Required] A hexadecimal equivalent of the integer indicating the uncle's index position.

**Returns :**

A block object, or null when no block was found. The block object returned will consist of the following keys and their values:

- `number`: The block number. Null when the returned block is the pending block.
- `hash`: 32 bytes. Hash of the block. Null when its pending block.
- `parentHash`: 32 bytes. Hash of the parent block.
- `nonce`: 8 bytes. Hash of the generated proof-of-work. Null when the returned block is the pending block.
- `sha3Uncles`: 32 bytes. The SHA3 of the uncles data in the block.
- `logsBloom`: 256 bytes. The Bloom filter for the logs of the block. Null when the returned block is the pending block.
- `transactionsRoot`: 32 bytes. The root of the transaction trie of the block.
- `stateRoot`: 32 bytes. The root of the final state trie of the block.
- `receiptsRoot`: 32 bytes. The root of the receipts trie of the block.
- `miner`: 20 bytes. The address of the beneficiary to whom the mining rewards were given.
- `difficulty`: The hexadecimal of the difficulty for this block.
- `totalDifficulty`: The hexadecimal of the total difficulty of the chain until this block.
- `extraData`: The "extra data" field of this block.
- `size`: The hexadecimal of the size of this block in bytes.
- `gasLimit`: Maximum gas allowed in this block.
- `gasUsed`: Total used gas by all transactions in this block.
- `timestamp`: The unix timestamp for when the block was collated.
- `uncles`: (Array). An array of uncle hashes.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params": ["0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35","0x0"],"id":1}'
```

**Response :**

```[json]
{
   "id" : 1,
   "jsonrpc" : "2.0",
   "result" : {
     "difficulty": "0x57f117f5c",
     "extraData": "0x476574682f76312e302e302f77696e646f77732f676f312e342e32",
     "gasLimit": "0x1388",
     "gasUsed": "0x0",
     "hash": "0x932bdf904546a2287a2c9b2ede37925f698a7657484b172d4e5184f80bdd464d",
     "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
     "miner": "0x5bf5e9cf9b456d6591073513de7fd69a9bef04bc",
     "mixHash": "0x4500aa4ee2b3044a155252e35273770edeb2ab6f8cb19ca8e732771484462169",
     "nonce": "0x24732773618192ac",
     "number": "0x299",
     "parentHash": "0xa779859b1ee558258b7008bbabff272280136c5dd3eb3ea3bfa8f6ae03bf91e5",
     "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
     "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
     "size": "0x21d",
     "stateRoot": "0x2604fbf5183f5360da249b51f1b9f1e0f315d2ff3ffa1a4143ff221ad9ca1fec",
     "timestamp": "0x55ba4827",
     "totalDifficulty": null,
     "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
     "uncles": []
   }
}
```

## eth_getUncleCountByBlockHash

Returns the number of uncles in a block from a block matching the given block hash.

**Parameters :**

- `block hash`: [Required] A string representing the hash (32 bytes) of a block.

**Returns :**

- `block uncle count`: A hexadecimal equivalent of the integer representing the number of uncles in the block.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params": ["0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35"],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x1"
}
```

## eth_getUncleCountByBlockNumber

Returns the number of uncles in a block from a block matching the given block number.

**Parameters :**

- `blockParameter`: Hexadecimal or decimal integer representing a block number, or one of the string tags:`latest`,`earliest`,`pending`,`finalized`,`safe`

**Returns :**

- `block uncle count`: A hexadecimal equivalent of the integer representing the number of uncles in the block.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params": ["0x5bad55"],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x1"
}
```

## eth_getWork

Returns the hash of the current block, the seedHash, and the boundary condition to be met ("target").

**Parameters :**

None

**Returns :**

An array with the following properties:

- Current block header pow-hash (32 bytes).
- The seed hash used for the DAG (32 bytes).
- The boundary condition ("target") (32 bytes), 2^256 / difficulty.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getWork","params": [],"id":1}'
```

**Response :**

> While Infura will allow this method, eth_getWork will not actually return mining work.

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32000,
    "message": "no mining work available yet"
  }
}
```

## eth_hashrate

Returns the number of hashes per second that the node is mining with. Only applicable when the node is mining.

**Parameters :**

None

**Returns :**

- `hashrate`: A hexadecimal equivalent of an integer representing the number of hashes per second.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_hashrate","params": [],"id":1}'
```

**Response :**

> Infura will always return a 0x0 mining hash rate.

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x0"
}
```

## eth_maxPriorityFeePerGas

Returns an estimate of how much priority fee, in wei, you need to be included in a block.

**Parameters :**

None

**Returns :**

`result`: A hexadecimal value of the priority fee, in wei, needed to be included in a block.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_maxPriorityFeePerGas","params": [],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x55d4a80"
}
```

## eth_mining

Returns true if client is actively mining new blocks.

**Parameters :**

None
**Returns :**

`is mining flag`: A boolean indicating if the client is mining.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_mining","params": [],"id":1}'
```

**Response :**

> Infura will always return false in response to eth_mining.

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": false
}
```

## eth_protocolVersion

Returns the current Ethereum protocol version.

**Parameters :**

None
**Returns :**

``protocol version`: A hexadecimal indicating the current Ethereum protocol version.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_protocolVersion","params": [],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x41"
}
```

## eth_sendRawTransaction

Submits a pre-signed transaction for broadcast to the Ethereum network.

**Parameters :**

`transaction data`: [Required] The signed transaction data.
**Returns :**

`transaction hash`: 32 bytes. The transaction hash, or the zero hash if the transaction is not yet available. Use `eth_getTransactionReceipt` to get the contract address, after the transaction was mined, when you created a contract.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params": ["0xf869018203e882520894f17f52151ebef6c7334fad080c5704d77216b732881bc16d674ec80000801ba02da1c48b670996dcb1f447ef9ef00b33033c48a4fe938f420bec3e56bfd24071a062e0aa78a81bf0290afbc3a9d8e9a068e6d74caa66c5e0fa8a46deaae96b0833"],"id":1}'
```

**Response :**

```[json]
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

**Error Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": 3,
    "message": "execution reverted: Dai/insufficient-balance",
    "data": "0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000184461692f696e73756666696369656e742d62616c616e63650000000000000000"
  }
}
```

## eth_sendTransaction

:::warning
:warning: The eth_sendTransaction JSON-RPC method is not supported because Infura doesn't store the user's private key required to sign the transaction. Use eth_sendRawTransaction instead.
:::

You can use web3.eth.sendTransaction, which in turn signs the transaction locally using the private key of the account, and sends the transaction via web3.eth.sendSignedTransaction, which is a wrapper for eth_sendRawTransaction.

## eth_sign

:::warning
:warning: The eth_sign JSON-RPC method is not supported because Infura doesn't store the user's private key required for the signature.
:::

For more information about the method refer to the official Ethereum wiki.

## eth_submitWork

Used for submitting a proof-of-work solution.

**Parameters :**

A work array array with the following properties:

- 8 bytes: The nonce found (64 bits)
- 32 bytes: The header's pow-hash (256 bits)
- 32 bytes: The mix digest (256 bits)

**Returns :**

- `is valid flag`: (boolean): Returns true if the provided solution is valid, otherwise false.
  **Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_submitWork","params": ["0x0000000000000001","0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef","0xD1FE5700000000000000000000000000D1FE5700000000000000000000000000"],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": false
}
```

## eth_syncing

Returns an object with data about the sync status or false.

**Parameters :**

None.

**Returns :**

- `sync status`: (boolean) Returns false only when not syncing.
- `sync blocks`:
- - `startingBlock`: A hexadecimal equivalent the integer indicating the block at which the import started (will only be reset after the sync reaches the head).
- - `currentBlock`: A hexadecimal equivalent the integer indicating the current block, same as eth_blockNumber.
- - `highestBlock`: A hexadecimal equivalent the integer indicating the highest block.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_syncing","params": [],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": false
}
```

## eth_getFilterChanges

Polling method for a filter, which returns an array of logs which occurred since last poll. Filter must be created by calling either eth_newFilter or eth_newBlockFilter.

**Parameters :**

- `filter ID`: A string denoting the filter ID.
  **Returns :**

- log object array: (array) An array of log objects, or an empty array if nothing has changed since last poll.
- For filters created with eth_newBlockFilter the return values are block hashes (32 bytes), e.g. ["0x3454645634534..."].
- For filters created with eth_newFilter the logs are objects with the following params:
- - `address`: 20 bytes. Address from which this log originated.
- - `blockHash`: 32 bytes. The hash of the block where this log was in. Null when it is a pending log.
- - `blockNumber`: The block number where this log was in. Null when it is a pending log.
- - `data`: DATA. Contains the non-indexed arguments of the log.
- - `logIndex`: A hexadecimal of the log index position in the block. Null when it is a pending log.
- - `removed`: true when the log was removed, due to a chain reorganization. false if it is a valid log.
- - `topics`: Array of DATA. An array of 0 to 4 32-bytes DATA of indexed log arguments. In Solidity the first topic is the hash of the signature of the event (e.g. Deposit(address,bytes32,uint256)), except when you declared the event with the anonymous specifier.
- - `transactionHash`: 32 bytes. A hash of the transactions from which this log was created. Null when it is a pending log.
- - `transactionIndex`: A hexadecimal of the transactions index position from which this log was created. Null when it is a pending log.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x10ff0bfbedb01f0dbd4106d14eb719ec38b6eb5b821c"],"id":1}'
```

**Response :**

```[json]
{
    "jsonrpc": "2.0",
    "id": 73,
    "result": [{
        "address": "0xb5a5f22694352c15b00323844ad545abb2b11028",
        "blockHash": "0x99e8663c7b6d8bba3c7627a17d774238eae3e793dee30008debb2699666657de",
        "blockNumber": "0x5d12ab",
        "data": "0x0000000000000000000000000000000000000000000000a247d7a2955b61d000",
        "logIndex": "0x0",
        "removed": false,
        "topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "0x000000000000000000000000bdc0afe57b8e9468aa95396da2ab2063e595f37e", "0x0000000000000000000000007503e090dc2b64a88f034fb45e247cbd82b8741e"],
        "transactionHash": "0xa74c2432c9cf7dbb875a385a2411fd8f13ca9ec12216864b1a1ead3c99de99cd",
        "transactionIndex": "0x3"
    },
    ],
}
```

## eth_getFilterLogs

Returns an array of all logs matching filter with given filter ID.

**Parameters :**

A filter object with the fillowing keys and their values:

- `fromBlock`: [optional, default: latest] A hexadecimal block number, or latest for the last mined block. The pending option is not currently supported. See the default block parameter.
- `toBlock`: [optional, default: latest] A hexadecimal block number, or latest for the last mined block. See the default block parameter.
- `address`: [optional] (20 bytes). Contract address or a list of addresses from which logs should originate.
- `topics`: [optional] An array of 32 bytes DATA topics. Topics are order-dependent. Each topic can also be an array of DATA with or options.
- `blockHash`: [optional] With the addition of EIP-234, blockHash restricts the logs returned to the single block with the 32-byte hash blockHash. Using blockHash is equivalent to fromBlock = toBlock = the block number with hash blockHash. If blockHash is present in the filter criteria, then neither fromBlock nor toBlock are allowed.
  **Returns :**

- `log object array`: (array) An array of log objects that match filter. For an array of logs that occurred since the last poll, use eth_getFilterChanges. Log objects contain the following keys and their values:
- - `address`: 20 bytes. Address from which this log originated.
- - `blockHash`: 32 bytes. The hash of the block where this log was in. Null when it is a pending log.
- - `blockNumber`: The block number where this log was in. Null when it is a pending log.
- - `data`: DATA. Contains the non-indexed arguments of the log.
- - `logIndex`: A hexadecimal of the log index position in the block. Null when it is a pending log.
- - `removed`: true when the log was removed, due to a chain reorganization. false if it is a valid log.
- - `topics`: Array of DATA. An array of 0 to 4 32-bytes DATA of indexed log arguments. In Solidity the first topic is the hash of the signature of the event (e.g. Deposit(address,bytes32,uint256)), except when you declared the event with the anonymous specifier.
- - `transactionHash`: 32 bytes. A hash of the transactions from which this log was created. Null when it is a pending log.
- - `transactionIndex`: A hexadecimal of the transactions index position from which this log was created. Null when it is a pending log.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x10ff0bfbedb01f0dbd4106d14eb719ec38b6eb5b821c"],"id":1}'
```

**Response :**

```[json]
{
    "jsonrpc": "2.0",
    "id": 73,
    "result": [{
        "address": "0xb5a5f22694352c15b00323844ad545abb2b11028",
        "blockHash": "0x99e8663c7b6d8bba3c7627a17d774238eae3e793dee30008debb2699666657de",
        "blockNumber": "0x5d12ab",
        "data": "0x0000000000000000000000000000000000000000000000a247d7a2955b61d000",
        "logIndex": "0x0",
        "removed": false,
        "topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "0x000000000000000000000000bdc0afe57b8e9468aa95396da2ab2063e595f37e", "0x0000000000000000000000007503e090dc2b64a88f034fb45e247cbd82b8741e"],
        "transactionHash": "0xa74c2432c9cf7dbb875a385a2411fd8f13ca9ec12216864b1a1ead3c99de99cd",
        "transactionIndex": "0x3"
    }
}
```

## eth_newBlockFilter

Creates a filter in the node, to notify when a new block arrives. To check if the state has changed, call eth_getFilterChanges.

:::info
Filter IDs will be valid for up to fifteen minutes, and can polled by any connection using the same YOUR-API-KEY.
:::

**Parameters :**

None.
**Returns :**

`filter ID`: A hexadecimal denoting the newly created filter ID

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x8144114ddff0b3be57ad6a848ee4fe4a44cdda667055"
}
```

## eth_newFilter

Creates a filter object based on the given filter options, to notify when the state changes (logs). To check if the state has changed, call eth_getFilterChanges.

:::info
Filter IDs will be valid for up to fifteen minutes, and can polled by any connection using the same YOUR-API-KEY.
:::

**Parameters :**

A filter object with the fillowing keys and their values:

- `address`: [optional] A contract address or a list of addresses from which logs should originate.
- `fromBlock`: [optional, default is latest] A hexadecimal block number, or one of the string tags latest, earliest, pending, safe, or finalized. See the default block parameter.
- `toBlock`: [optional, default is latest] A hexadecimal block number, or one of the string tags latest, earliest, pending, safe, or finalized. See the default block parameter.
- `topics`: [optional] An array of 32 bytes DATA topics. Topics are order-dependent.

**Specifying topic filters**

Topics are order-dependent. A transaction with a log with topics [A, B] will be matched by the following topic filters:

- []: Anything.
- [A]: A in the first position, and anything after.
- [null, B]: Anything in first position AND B in second position, and anything after.
- [A, B]: A in the first position AND B in second position, and anything after.
- [[A, B], [A, B]]: (A OR B) in first position AND (A OR B) in second position, and anything after.

**Returns :**
`filter ID`: A hexadecimal denoting the newly created filter ID.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"]}],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x10ff114de54f0bfdbd7855f8a1dd7317e6500495a24f"
}
```

## eth_newPendingTransactionFilter

:::warning
The eth_newPendingTransactionFilter JSON-RPC method is not supported by Infura.
:::

## eth_uninstallFilter

Uninstalls a filter with given ID. This method should always be called when watching is no longer needed. Additionally, filters time out when they aren't requested with eth_getFilterChanges for a period of time.

**Parameters :**

`filter ID`: A string denoting the ID of the filter to be uninstalled.

**Returns :**

`uninstalled flag`: (boolean) true if the filter was successfully uninstalled, otherwise false.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0x10ff0bfba9472c87932c56632eef8f5cc70910e8e71d"],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

## net_listening

Returns true if client is actively listening for network connections.

**Parameters :**

None

**Returns :**

`listening flag`: (boolean) Indicating whether the client is actively listening for network connections.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"net_listening","params": [],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

## net_peerCount

Returns the number of peers currently connected to the client.

**Parameters :**

None

**Returns :**

`peer count`: A hexadecimal of the number of connected peers.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"net_peerCount","params": [],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x64"
}
```

## net_version

Returns the number of peers currently connected to the client.

**Parameters :**

None

**Returns :**

`network ID`: A string representing the current network ID.
**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"net_version","params": [],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "1"
}
```

## eth_subscribe

Creates a new subscription for particular events. The node returns a subscription ID. For each event that matches the subscription, a notification with relevant data is sent together with the subscription ID.

**Parameters :**

Specify one of the following subscription events:

- `newHeads`: Subscribing to this returns a notification each time a new header is appended to the chain, including chain reorganizations. In a chain reorganization, the subscription emits all new headers for the new chain. Therefore the subscription can emit multiple headers at the same height.
- `logs`: Returns logs that are included in new imported blocks and match the given filter criteria. In case of a chain reorganization, previously sent logs that are on the old chain are resent with the removed property set to true. Logs from transactions that ended up in the new chain are emitted. Therefore a subscription can emit logs for the same transaction multiple times. This parameter has the following fields:
- - `address`: (optional) Either an address or an array of addresses. Only logs that are created from these addresses are returned.
- - `topics`: (optional) Only logs that match these specified topics are returned.
    :::info
    We strongly recommend specifying a filter (address or topics or both) when subscribing to the logs event.
    :::
- `newPendingTransactions`: Returns the hash for all transactions that are added to the pending state and are signed with a key that's available in the node. When a transaction that was previously part of the canonical chain isn't part of the new canonical chain after a reorganization, it's emitted again.

**Returns :**

`subscription ID`: The ID of the newly created subscription on the node.

:::info
Subscription methods are available for WebSocket connections only.
:::

**Request :**

**newHeads**

```[json]
wscat -c wss://mainnet.infura.io/ws/v3/YOUR-API-KEY -x '{"jsonrpc":"2.0", "id": 1, "method": "eth_subscribe", "params": ["newHeads"]}'
```

**logs**

```[json]
wscat -c wss://mainnet.infura.io/ws/v3/YOUR-API-KEY -x '{"jsonrpc":"2.0", "id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd", "topics":["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}'
```

**newPendingTransactions**

```[json]
wscat -c wss://mainnet.infura.io/ws/v3/YOUR-API-KEY -x '{"jsonrpc":"2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}'
```

**Response :**

**New sub**

```[json]
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x9cef478923ff08bf67fde6c64013158d"
}
```

**newHeads subs**

```[json]
{
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "difficulty": "0x15d9223a23aa",
      "extraData": "0xd983010305844765746887676f312e342e328777696e646f7773",
      "gasLimit": "0x47e7c4",
      "gasUsed": "0x38658",
      "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "miner": "0xf8b483dba2c3b7176a3da549ad41a48bb3121069",
      "nonce": "0x084149998194cc5f",
      "number": "0x1348c9",
      "parentHash": "0x7736fab79e05dc611604d22470dadad26f56fe494421b5b333de816ce1f25701",
      "receiptRoot": "0x2fab35823ad00c7bb388595cb46652fe7886e00660a01e867824d3dceb1c8d36",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "stateRoot": "0xb3346685172db67de536d8765c43c31009d0eb3bd9c501c9be3229203f15f378",
      "timestamp": "0x56ffeff8",
      "transactionsRoot": "0x0167ffa60e3ebc0b080cdb95f7c0087dd6c0e61413140e39d94d3468d7c9689f"
    },
    "subscription": "0x9ce59a13059e417087c02d3236a0b1cc"
  }
}
```

**logs subs**

```[json]
{
  "jsonrpc":"2.0",
  "method":"eth_subscription",
  "params": {
    "subscription":"0x4a8a4c0517381924f9838102c5a4dcb7",
    "result": {
      "address":"0x8320fe7702b96808f7bbc0d4a888ed1468216cfd","blockHash":"0x61cdb2a09ab99abf791d474f20c2ea89bf8de2923a2d42bb49944c8c993cbf04",
      "blockNumber":"0x29e87","data":"0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003",
      "logIndex":"0x0",
      "topics":["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"],"transactionHash":"0xe044554a0a55067caafd07f8020ab9f2af60bdfe337e395ecd84b4877a3d1ab4",
      "transactionIndex":"0x0"
    }
  }
}
```

**newPendingTransactions subs**

```[json]
{
  "jsonrpc":"2.0",
  "method":"eth_subscription",
  "params":{
    "subscription":"0xc3b33aa549fb9a60e95d21862596617c",
    "result":"0xd6fdc5cc41a9959e922f30cb772a9aef46f4daea279307bc5f7024edc4ccd7fa"
  }
}
```

## eth_unsubscribe

Cancel subscriptions by calling this method with the subscription ID. It returns a boolean indicating that the subscription was canceled successfully.

**Parameters :**

`subscription ID`: The ID of the subscription you want to unsubscribe.

**Returns :**

`unsubscribed flag`: (boolean) True if the subscription is canceled successfully.

:::info
Subscription methods are available for WebSocket connections only.
:::

**Request :**

```[json]
wscat -c wss://mainnet.infura.io/ws/v3/YOUR-API-KEY -x '{"jsonrpc":"2.0", "id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'
```

**Response :**

```[json]
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": true
}
```

## trace_block

Get trace information about all the transactions in a given block. This can be useful for debugging purposes or for analyzing the behavior of a blockchain.

**Parameters :**

- `blockParameter`: Hexadecimal or decimal integer representing a block number, or one of the string tags:`latest`,`earliest`,`pending`,`finalized`,`safe`

**Returns :**

A list of calls to other contracts containing one object per call, in transaction execution order.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"trace_block","params":["0x6"],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "result": [
    {
      "action": {
        "callType": "call",
        "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
        "gas": "0xffad82",
        "input": "0x0000000000000000000000000000000000000999",
        "to": "0x0020000000000000000000000000000000000000",
        "value": "0x0"
      },
      "blockHash": "0x71512d31e18f828cef069a87bc2c7514a8ca334f9ee72625efdf5cc2d43768dd",
      "blockNumber": 6,
      "result": {
        "gasUsed": "0x7536",
        "output": "0x"
      },
      "subtraces": 1,
      "traceAddress": [],
      "transactionHash": "0x91eeabc671e2dd2b1c8ddebb46ba59e8cb3e7d189f80bcc868a9787728c6e59e",
      "transactionPosition": 0,
      "type": "call"
    },
    {
      "action": {
        "address": "0x0020000000000000000000000000000000000000",
        "balance": "0x300",
        "refundAddress": "0x0000000000000999000000000000000000000000"
      },
      "blockHash": "0x71512d31e18f828cef069a87bc2c7514a8ca334f9ee72625efdf5cc2d43768dd",
      "blockNumber": 6,
      "result": null,
      "subtraces": 0,
      "traceAddress": [0],
      "transactionHash": "0x91eeabc671e2dd2b1c8ddebb46ba59e8cb3e7d189f80bcc868a9787728c6e59e",
      "transactionPosition": 0,
      "type": "suicide"
    },
    {
      "action": {
        "author": "0x0000000000000000000000000000000000000000",
        "rewardType": "block",
        "value": "0x1bc16d674ec80000"
      },
      "blockHash": "0x71512d31e18f828cef069a87bc2c7514a8ca334f9ee72625efdf5cc2d43768dd",
      "blockNumber": 6,
      "result": null,
      "subtraces": 0,
      "traceAddress": [],
      "transactionHash": null,
      "transactionPosition": null,
      "type": "reward"
    }
  ],
  "id": 1
}
```

## trace_call

Executes the given call and returns a number of possible traces for it. Use this API to retrieve detailed information about the transaction execution, including state changes and logs generated during the process.

**Parameters :**

- `Transaction Call Object`:_[Required]_
- - `from`:_[optional]_ 20 bytes Address the transaction is sent from.
- - `to`: 20 bytes - Address the transaction is directed to.
- - `gas`:_[optional]_ Hexadecimal value of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions.
- - `gasPrice`:_[optional]_ Hexadecimal value of the gasPrice used for each paid gas.
- - `maxPriorityFeePerGas`:_[optional]_ Maximum fee, in Wei, the sender is willing to pay per gas above the base fee. See EIP-1559 transactions.
- - `maxFeePerGas`:_[optional]_ Maximum total fee (base fee + priority fee), in Wei, the sender is willing to pay per gas. See EIP-1559 transactions.
- - `value`:_[optional]_ Hexadecimal of the value sent with this transaction.
- - `data`:_[optional]_ Hash of the method signature and encoded parameters. See Ethereum contract ABI specification.
- `block parameter`: _[Required]_ A hexadecimal block number, or one of the string tags latest, earliest, pending, safe, or finalized. See the default block parameter.
- `options`: A list of tracing options. Tracing options are trace and stateDiff.

**Returns :**

`result`: A trace object that includes the trace and stateDiff.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"trace_call","params":[{"from":"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73","to":"0x0010000000000000000000000000000000000000","gas":"0xfffff2","gasPrice":"0xef","value":"0x0","data":"0x0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002","nonce":"0x0"},["trace"],"latest"],"id":1}'
```

**Response :**

```[json]
{
    "jsonrpc": "2.0",
    "result": {
      "output" : "0x",
      "stateDiff" : null,
      "trace" : [ {
        "action" : {
          "callType" : "call",
          "from" : "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
          "gas" : "0xffabba",
          "input" : "0x0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002",
          "to" : "0x0010000000000000000000000000000000000000",
          "value" : "0x0"
      },
      "result" : {
        "gasUsed" : "0x9c58",
        "output" : "0x"
      },
      "subtraces" : 0,
      "traceAddress" : [ ],
      "type" : "call"
    } ],
    "vmTrace" : null
    },
"id" : 2
}
```

## trace_callMany

Performs multiple call-traces on top of the same block. You can analyze the interactions between different transactions and contracts.

**Parameters :**

- `blockParameter`: Hexadecimal or decimal integer representing a block number, or one of the string tags:`latest`,`earliest`,`pending`,`finalized`,`safe`
- `options`: A list of tracing options. Tracing options are trace and stateDiff.

**Returns :**

`result`: A trace object that includes the trace and stateDiff.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"trace_callMany","params":[[[{"from":"0x407d73d8a49eeb85d32cf465507dd71d507100c1","to":"0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b","value":"0x186a0"},["trace"]],[{"from":"0x407d73d8a49eeb85d32cf465507dd71d507100c1","to":"0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b","value":"0x186a0"},["trace"]]],"latest"],"latest"],"id":1}
```

**Response :**

```[json]
{
    "jsonrpc": "2.0",
    "result": [
      {
      "output" : "0x",
      "stateDiff" : null,
      "trace" : [ {
        "action" : {
          "callType" : "call",
          "from" : "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
          "gas" : "0x1dcd12f8",
          "input" : "0x",
          "to" : "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
          "value" : "0x186a0"
      },
      "result" : {
        "gasUsed" : "0x0",
        "output" : "0x"
      },
      "subtraces" : 0,
      "traceAddress" : [ ],
      "type" : "call"
    } ],
    "vmTrace" : null
    },
    {
      "output" : "0x",
      "stateDiff" : null,
      "trace" : [ {
        "action" : {
          "callType" : "call",
          "from" : "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
          "gas" : "0x1dcd12f8",
          "input" : "0x",
          "to" : "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
          "value" : "0x186a0"
      },
      "result" : {
        "gasUsed" : "0x0",
        "output" : "0x"
      },
      "subtraces" : 0,
      "traceAddress" : [ ],
      "type" : "call"
    } ],
    "vmTrace" : null
    },
  ],
"id" : 1
}
```

## trace_filter

Returns traces matching the specified filter. The response is limited to 10000 traces per response.

**Parameters :**

- `filter object` [Required] with the following keys and their values:
- - `fromBlock`: [optional] Trace starts at this block.
- - `toBlock`: [optional] Trace stops at this block.
- - `fromAddress`: [optional] Include only traces sent from this address.
- - `toAddress`: [optional] Include only traces with this destination address.
- - `after`: [optional] The offset trace number.
- - `count`: [optional] Number of traces to display in a batch.
    **Returns :**

A trace list that matches the supplied filter.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"trace_filter","params":[{"fromBlock":"0x1","toBlock":"0x21","after":2,"count":2,"fromAddress":["0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"]}],"id":415}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "result": [
    {
      "action": {
        "callType": "call",
        "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
        "gas": "0xffad82",
        "input": "0x0000000000000000000000000000000000000999",
        "to": "0x0020000000000000000000000000000000000000",
        "value": "0x0"
      },
      "blockHash": "0xcd5d9c7acdcbd3fb4b24a39e05a38e32235751bb0c9e4f1aa16dc598a2c2a9e4",
      "blockNumber": 6,
      "result": {
        "gasUsed": "0x7536",
        "output": "0x"
      },
      "subtraces": 1,
      "traceAddress": [],
      "transactionHash": "0x91eeabc671e2dd2b1c8ddebb46ba59e8cb3e7d189f80bcc868a9787728c6e59e",
      "transactionPosition": 0,
      "type": "call"
    },
    {
      "action": {
        "callType": "call",
        "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
        "gas": "0xffad52",
        "input": "0xf000000000000000000000000000000000000000000000000000000000000001",
        "to": "0x0030000000000000000000000000000000000000",
        "value": "0x0"
      },
      "blockHash": "0xeed85fe57db751442c826cfe4fdf43b10a5c2bc8b6fd3a8ccced48eb3fb35885",
      "blockNumber": 7,
      "result": {
        "gasUsed": "0x1b",
        "output": "0xf000000000000000000000000000000000000000000000000000000000000002"
      },
      "subtraces": 0,
      "traceAddress": [],
      "transactionHash": "0x47f4d445ea1812cb1ddd3464ab23d2bfc6ed408a8a9db1c497f94e8e06e85286",
      "transactionPosition": 0,
      "type": "call"
    }
  ],
  "id": 415
}
```

## trace_transaction

Provides transaction processing of type trace for the specified transaction. Use this API to improve smart contract performance by analyzing its internal transactions and execution steps. You can use this information to identify bottlenecks and optimize the contract for better performance.

**Parameters :**

transaction hash: [Required] The transaction hash

**Returns :**

A list of traces in the order called by the transaction.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "trace_transaction","params": ["0x4c253746668dca6ac3f7b9bc18248b558a95b5fc881d140872c2dff984d344a7"],"id": 1}'
```

**Response :**

```[json]
{
    "jsonrpc": "2.0",
    "result": [
      {
        "action": {
          "callType": "call",
          "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
          "gas": "0xffad82",
          "input": "0x0000000000000000000000000000000000000999",
          "to": "0x0020000000000000000000000000000000000000",
          "value": "0x0"
        },
        "blockHash": "0x71512d31e18f828cef069a87bc2c7514a8ca334f9ee72625efdf5cc2d43768dd",
        "blockNumber": 6,
        "result": {
          "gasUsed": "0x7536",
          "output": "0x"
        },
        "subtraces": 1,
        "traceAddress": [],
        "transactionHash": "0x91eeabc671e2dd2b1c8ddebb46ba59e8cb3e7d189f80bcc868a9787728c6e59e",
        "transactionPosition": 0,
        "type": "call"
      },
}
```

## web3_clientVersion

Returns the current client version

**Parameters :**

None
**Returns :**

A string representing the current client version.

**Request :**

```[json]
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"web3_clientVersion","params": [],"id":1}'
```

**Response :**

```[json]
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "Geth/v1.11.6-omnibus-f83e1598/linux-.mdx64/go1.20.3"
}
```

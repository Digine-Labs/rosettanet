import { getBlockByHashHandler } from '../../../src/rpc/calls/getBlockByHash'
import { RPCResponse } from '../../../src/types/types'

describe('Test getBlockByHash request testnet', () => {
  it('returns all the block information with only transaction hashes if parameter false is implemented', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBlockByHash',
      params: [
        '0x01806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
        false,
      ],
      id: 0,
    }

    const starkResult: RPCResponse = <RPCResponse>(
      await getBlockByHashHandler(request)
    )

    expect(typeof starkResult.result).toBe('object')
    expect(starkResult).toMatchObject({
      jsonrpc: '2.0',
      id: 0,
      result: {
        difficulty: '0x0',
        extraData: '0x0',
        gasLimit: '0x0',
        gasUsed: '0x0',
        hash: '0x1806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
        logsBloom: '0x0',
        miner: '0x0',
        mixHash: '0x0',
        nonce: '0x0',
        number: '0xe9fc9',
        parentHash:
          '0x6ed2c563ffe9f831f053a8edbba87f5c9c00f895503ef80a172e4ed9edc9ddb',
        receiptsRoot: '0x0',
        sha3Uncles: '0x0',
        size: '0x0',
        stateRoot:
          '0x0x16b4a0c83c5b3cdc438bec14a4ebeb85086372edfd73daba7b1532a781a10d8',
        timestamp: '0x65e39a78',
        totalDifficulty: '0x0',
        transactions: [
          '0x6a9fa5cb10c3dd43a87b7062b3c16b8a01df86d0f14d7ee8c47fa24aac76eaf',
          '0xf5c6b482bf9f61b4eba3b59dcf720186b5744fc18bb42330abf92a679bb4fa',
          '0x5da9d4d4ea7aee2c95cebbe5bc99be05ef7ffeec28a979b896ad78fdc90c471',
          '0x2ea9f93ebb3359930ab0577de46917ab69485a5f0b551202bb4d857cb883f5d',
          '0x18c80bc0704f6ce2fa867f945e7ee946545e3fcccffb992628c88aec40791cf',
          '0x5cf23b2cb06cffed5c038784ce079b1d2dd60452b907de30a0773a311847571',
          '0x2ad1232dd46e4085ac5c4c87a5d3b9c675f6cc706a4056076062d2cc2c444',
          '0x3d6ad199f5386be2ac6c4171613d5f17ae758528a7c8bd012de295344d52103',
          '0x2171466a3ce50ec3af5a277aafec745dd45429f4373f6dcea9c2b8df816cd2a',
          '0x221ba0007888676217040b9f246396990d21b5a734564700bdaad34a1a2006a',
          '0x19aa30709312a2a10334f5db1211caa18ee7f995c3f290fc1056b03ef93ab8a',
          '0x68d3e804e28be848154d335cd42d23a720b5729198b293e90cecbc08a3abd1e',
          '0x1d5ee8210c8b5343f2ece34ad17cbee0f92f4b88c1559079f211f4c3914b7a3',
          '0x554df166dde9d871777ce25d87f673eb98451876f53b57ab3031c1ee88c1a46',
          '0x7abfee514fb31fab751c1182c7f9716c35a4c15ed840f541ef566b6a782d667',
          '0x7777a144a3b8cdc2250b3162feaa2ccb6c37b3ce57028afe9cbfcc9812ba17',
        ],
        transactionsRoot: '0x0',
        uncles: [],
      },
    })
  })

  it('returns all the block information with full transaction objects if parameter true is implemented', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBlockByHash',
      params: [
        '0x01806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
        true,
      ],
      id: 0,
    }

    const starkResult: RPCResponse = <RPCResponse>(
      await getBlockByHashHandler(request)
    )

    expect(typeof starkResult.result).toBe('object')
    expect(starkResult).toMatchObject({
      jsonrpc: '2.0',
      id: 0,
      result: {
        difficulty: '0x0',
        extraData: '0x0',
        gasLimit: '0x0',
        gasUsed: '0x0',
        hash: '0x1806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
        logsBloom: '0x0',
        miner: '0x0',
        mixHash: '0x0',
        nonce: '0x0',
        number: '0xe9fc9',
        parentHash:
          '0x6ed2c563ffe9f831f053a8edbba87f5c9c00f895503ef80a172e4ed9edc9ddb',
        receiptsRoot: '0x0',
        sha3Uncles: '0x0',
        size: '0x0',
        stateRoot:
          '0x0x16b4a0c83c5b3cdc438bec14a4ebeb85086372edfd73daba7b1532a781a10d8',
        timestamp: '0x65e39a78',
        totalDifficulty: '0x0',
        transactions: [
          {
            accessList: [],
            blockHash:
              '0x1806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
            blockNumber: '0xe9fc9',
            chainId: '0x0',
            from: '0x35acd6dd6c5045d18ca6d0192af46b335a5402c02d41f46e4e77ea2c951d9a3',
            gas: '0x0',
            gasPrice: '0x0x3b9aca07',
            hash: '0x6a9fa5cb10c3dd43a87b7062b3c16b8a01df86d0f14d7ee8c47fa24aac76eaf',
            input:
              '0x0x10x6359ed638df79b82f2f9dbf92abbcb41b57f9dd91ead86b1c85d2dee192c0x2d7cf5d5a324a320f9f37804b1615a533fde487400b41af80f13f7ac55813250x40xe6be6c9bfbddce52affac06decbe6c3a9ced5bca0x20x267fae0a82cf69f7fcb7e531401aa0269c275ce6e72e37a771c7078b4f9dcfa0x4e7e3252d2f9973de9496d84e1e50a449c1bb31d2568abdced5ee7e3b5f480c',
            maxFeePerGas: '0x0',
            maxPriorityFeePerGas: '0x0',
            nonce: '0x1bbcf',
            r: '0xa6834ced59c95813873d2160ef7bc74c0b5265c6351a6fb75a1a0dea4b4a5b',
            s: '0x46061e018de79cbd5f0e2dbf796e4f454091e066df74b033fc4fa14ec9c3c5b',
            to: '0x0',
            transactionIndex: '0x0',
            type: 'INVOKE',
            v: '0x1b',
            value: '0x0',
          },
          {
            accessList: [],
            blockHash:
              '0x1806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
            blockNumber: '0xe9fc9',
            chainId: '0x0',
            from: '0x4f5bef0c43e565a77d83743272d99c082c92f06d405b1ffbc064ddff4ad84e2',
            gas: '0x0',
            gasPrice: '0x0x3b9aca07',
            hash: '0xf5c6b482bf9f61b4eba3b59dcf720186b5744fc18bb42330abf92a679bb4fa',
            input:
              '0x0x10x64bc29b6a58a30f119b4e0a8cd0a637f27207991e4d92433b2b23ae16e1002d0x3a08f483ebe6c7533061acfc5f7c1746482621d16cff4c2c35824dec4181fa60x10x3e7',
            maxFeePerGas: '0x24d86f62d3c',
            maxPriorityFeePerGas: '0x0',
            nonce: '0x23e',
            r: '0x6e6362ad696e481834a8056ffb2ad487798f223c41f57525031e82f07cf6e28',
            s: '0x14e5cddd2ea3e7a741b51f0069e9743d208b3a1baee4e8e1b41861919c57f37',
            to: '0x0',
            transactionIndex: '0x1',
            type: 'INVOKE',
            v: '0x1b',
            value: '0x0',
          },
          {
            accessList: [],
            blockHash:
              '0x1806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
            blockNumber: '0xe9fc9',
            chainId: '0x0',
            from: '0x7497c28ff075311aee91ccbeca905698a0931077dc0556fafa7577910b4362f',
            gas: '0x0',
            gasPrice: '0x0x3b9aca07',
            hash: '0x5da9d4d4ea7aee2c95cebbe5bc99be05ef7ffeec28a979b896ad78fdc90c471',
            input:
              '0x0x10x4c1337d55351eac9a0b74f3b8f0d3928e2bb781e5084686a892e66d49d510d0x34c4c150632e67baf44fc50e9a685184d72a822510a26a66f72058b5e7b28920x0',
            maxFeePerGas: '0x9184e72a000',
            maxPriorityFeePerGas: '0x0',
            nonce: '0x11d',
            r: '0x33c21de8050c98f869c30fcf725cb78891c95c2b825d6b776c91d0415ad17ce',
            s: '0x27fde752541931c319833a359c63d25abcc5b28b7ec54b8d99ec6107c581bc4',
            to: '0x0',
            transactionIndex: '0x2',
            type: 'INVOKE',
            v: '0x1b',
            value: '0x0',
          },
          {
            accessList: [],
            blockHash:
              '0x1806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
            blockNumber: '0xe9fc9',
            chainId: '0x0',
            from: '0x530146fbcf73e8a379de52c530ee47a105d163947bc0f6a37c42bd02ba9dfc3',
            gas: '0x0',
            gasPrice: '0x0x3b9aca07',
            hash: '0x2ea9f93ebb3359930ab0577de46917ab69485a5f0b551202bb4d857cb883f5d',
            input:
              '0x0x10x4c1337d55351eac9a0b74f3b8f0d3928e2bb781e5084686a892e66d49d510d0x34c4c150632e67baf44fc50e9a685184d72a822510a26a66f72058b5e7b28920x0',
            maxFeePerGas: '0x9184e72a000',
            maxPriorityFeePerGas: '0x0',
            nonce: '0xd5',
            r: '0x22b9a981ce9f6bcca99f9c1a0e52d45e998e2924e249643b9b95ec7b256b129',
            s: '0x6c0bb18b41df39672ba0c9784fbdc32394699d8f36e0a066687918f65118cad',
            to: '0x0',
            transactionIndex: '0x3',
            type: 'INVOKE',
            v: '0x1b',
            value: '0x0',
          },
          {
            accessList: [],
            blockHash:
              '0x1806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
            blockNumber: '0xe9fc9',
            chainId: '0x0',
            from: '0x38292279e3ab2b65dd6976b28446b75c70f1a09ed93c908d78a617c54d6aae6',
            gas: '0x0',
            gasPrice: '0x0x3b9aca07',
            hash: '0x18c80bc0704f6ce2fa867f945e7ee946545e3fcccffb992628c88aec40791cf',
            input:
              '0x0x10x4c1337d55351eac9a0b74f3b8f0d3928e2bb781e5084686a892e66d49d510d0x34c4c150632e67baf44fc50e9a685184d72a822510a26a66f72058b5e7b28920x0',
            maxFeePerGas: '0x9184e72a000',
            maxPriorityFeePerGas: '0x0',
            nonce: '0xea',
            r: '0x443e52e60200ae255ee4ac89d8c7920a8af662c038807e59bf0ed596b80edba',
            s: '0x5f00a11735bd9cee8270d5bf692d91f13986d5ce078825cc9f80c544b661cb0',
            to: '0x0',
            transactionIndex: '0x4',
            type: 'INVOKE',
            v: '0x1b',
            value: '0x0',
          },
          {
            accessList: [],
            blockHash:
              '0x1806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
            blockNumber: '0xe9fc9',
            chainId: '0x0',
            from: '0xcfba1db79cde88f0be3b613a0f57248fb38765f7110fe52d29cd289ff2b931',
            gas: '0x0',
            gasPrice: '0x0x3b9aca07',
            hash: '0x5cf23b2cb06cffed5c038784ce079b1d2dd60452b907de30a0773a311847571',
            input:
              '0x0x10x4c1337d55351eac9a0b74f3b8f0d3928e2bb781e5084686a892e66d49d510d0x34c4c150632e67baf44fc50e9a685184d72a822510a26a66f72058b5e7b28920x0',
            maxFeePerGas: '0x9184e72a000',
            maxPriorityFeePerGas: '0x0',
            nonce: '0x109',
            r: '0x1f4dcc75f5874ba03698f8ec48310d946e72ccbc6b5e63e6857d5a467e8ca97',
            s: '0x25d52220d727220af738fd09bac1062175236a7417ab1d7e91ef8fd10f521f0',
            to: '0x0',
            transactionIndex: '0x5',
            type: 'INVOKE',
            v: '0x1b',
            value: '0x0',
          },
          {
            accessList: [],
            blockHash:
              '0x1806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
            blockNumber: '0xe9fc9',
            chainId: '0x0',
            from: '0x7e9d2492a9e968bb086c4bd3ddd57569de84a1444cb2143bed2f57cdc0a0f21',
            gas: '0x0',
            gasPrice: '0x0x3b9aca07',
            hash: '0x2ad1232dd46e4085ac5c4c87a5d3b9c675f6cc706a4056076062d2cc2c444',
            input:
              '0x0x10x4c1337d55351eac9a0b74f3b8f0d3928e2bb781e5084686a892e66d49d510d0x34c4c150632e67baf44fc50e9a685184d72a822510a26a66f72058b5e7b28920x00x00x0',
            maxFeePerGas: '0x9184e72a000',
            maxPriorityFeePerGas: '0x0',
            nonce: '0xe02',
            r: '0x9d5dcea3727d748dc439412aa35c31ccf4be169f2bd8bf732bd28e11d4b0e4',
            s: '0x376d9b807d77f950f69fdb5f884020c70e96b9079eea1a73d529b87bde264e3',
            to: '0x0',
            transactionIndex: '0x6',
            type: 'INVOKE',
            v: '0x1b',
            value: '0x0',
          },
          {
            accessList: [],
            blockHash:
              '0x1806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
            blockNumber: '0xe9fc9',
            chainId: '0x0',
            from: '0x35acd6dd6c5045d18ca6d0192af46b335a5402c02d41f46e4e77ea2c951d9a3',
            gas: '0x0',
            gasPrice: '0x0x3b9aca07',
            hash: '0x3d6ad199f5386be2ac6c4171613d5f17ae758528a7c8bd012de295344d52103',
            input:
              '0x0x20x4d0b88ace5705bb7825f91ee95557d906600b7e7762f5615e6a4f407185a43a0x169f135eddda5ab51886052d777a57f2ea9c162d713691b5e04a6d4ed71d47f0x50x772164c9d6179a89e7f1167f099219f47d752304b16ed01f081b6e0b45c93c30x23700466eb74175a47bbd60c2d7c088cec42add54d14c60af9c2bce4ff55da60x20x71dc0bf2a4109c3b3d1c76754e514a3d07ffaea174545f936d3a99639e9eaf30x381ae8b15009b18aad53cdc66c39004df46a8e34d2795f8b1db5e7efb5e14fb0x47ad6a25df680763e5663bd0eba3d2bfd18b24b1e8f6bd36b71c37433c63ed00x19a35a6e95cb7a3318dbb244f20975a1cd8587cc6b5259f15f61d7beb7ee43b0x20x4d0b88ace5705bb7825f91ee95557d906600b7e7762f5615e6a4f407185a43a0x1e3de9c0f358d6f9fad9173adbea059e37891624bac8198b863471daa96ecfe',
            maxFeePerGas: '0x0',
            maxPriorityFeePerGas: '0x0',
            nonce: '0x1bbd0',
            r: '0x23e5273dbfc353c7d597a563433eaf798ce5e71cb114264c8ebb4df7fa7daca',
            s: '0x49fd2439c75bd7561b91d05092ece074cf1ecfd347b44ffdee1d7590981b144',
            to: '0x0',
            transactionIndex: '0x7',
            type: 'INVOKE',
            v: '0x1b',
            value: '0x0',
          },
          {
            accessList: [],
            blockHash:
              '0x1806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
            blockNumber: '0xe9fc9',
            chainId: '0x0',
            from: '0x264cd871a4b5a6b441eb2862b3785e01c4cb82a133e3a65a01827bb8df4b871',
            gas: '0x0',
            gasPrice: '0x0x3b9aca07',
            hash: '0x2171466a3ce50ec3af5a277aafec745dd45429f4373f6dcea9c2b8df816cd2a',
            input:
              '0x0x10x6df335982dddce41008e4c03f2546fa27276567b5274c7d0c1262f3c2b5d1670x3d0bcca55c118f88a08e0fcc06f43906c0c174feb52ebc83f0fa28a1f59ed670x390x80x00x65e39ae10x464c4f574445534b0x464c4f574445534b0x5a304829d9f0x4254432f5553440x00x00x65e39ae10x464c4f574445534b0x464c4f574445534b0x4f5fdb3edb0x4554482f5553440x00x00x65e39ae10x464c4f574445534b0x464c4f574445534b0x5a2e8c6ec7e0x574254432f5553440x00x00x65e39ae10x464c4f574445534b0x464c4f574445534b0x5f5712f0x574254432f4254430x00x00x65e39ae10x464c4f574445534b0x464c4f574445534b0x532fbcb42340x4254432f4555520x00x00x65e39ae10x464c4f574445534b0x464c4f574445534b0xf46340x555344542f5553440x00x00x65e39ae10x464c4f574445534b0x464c4f574445534b0x5f5cd780x555344432f5553440x00x00x65e39ae10x464c4f574445534b0x464c4f574445534b0xf40e40x4441492f5553440x0',
            maxFeePerGas: '0x16345785d8a0000',
            maxPriorityFeePerGas: '0x0',
            nonce: '0x1a474',
            r: '0x71fd3acd7622fbc31323c394c080d47c8a721eca9ee38eb1d6318f25697c3cb',
            s: '0x6c2c12f4faf69f8d492050e411c715823007290fc9c8ae28c2898edc7d280a7',
            to: '0x0',
            transactionIndex: '0x8',
            type: 'INVOKE',
            v: '0x1b',
            value: '0x0',
          },
          {
            accessList: [],
            blockHash:
              '0x1806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
            blockNumber: '0xe9fc9',
            chainId: '0x0',
            from: '0x264cd871a4b5a6b441eb2862b3785e01c4cb82a133e3a65a01827bb8df4b871',
            gas: '0x0',
            gasPrice: '0x0x3b9aca07',
            hash: '0x221ba0007888676217040b9f246396990d21b5a734564700bdaad34a1a2006a',
            input:
              '0x0x10x6df335982dddce41008e4c03f2546fa27276567b5274c7d0c1262f3c2b5d1670x3d0bcca55c118f88a08e0fcc06f43906c0c174feb52ebc83f0fa28a1f59ed670x210x40x10x65e39ae10x464c4f574445534b0x464c4f574445534b0x5a4ff33fd740x4254432f5553440x00x00x10x65e39ae10x464c4f574445534b0x464c4f574445534b0x4f7175af8f0x4554482f5553440x00x00x10x65e39ae10x464c4f574445534b0x464c4f574445534b0xe6dd0e9b00x4254432f555344540x00x00x10x65e39ae10x464c4f574445534b0x464c4f574445534b0xcb2144380x4554482f555344540x00x0',
            maxFeePerGas: '0x16345785d8a0000',
            maxPriorityFeePerGas: '0x0',
            nonce: '0x1a475',
            r: '0x5e27bd466c42abaf5ad5a2eed3c159d083459fa0e7eaa4429d9cbf4cb753042',
            s: '0x6fc8baf9d46bfebd8f3699e5fcb45a541de7cd6234589a57e769be87efbccb6',
            to: '0x0',
            transactionIndex: '0x9',
            type: 'INVOKE',
            v: '0x1b',
            value: '0x0',
          },
          {
            accessList: [],
            blockHash:
              '0x1806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
            blockNumber: '0xe9fc9',
            chainId: '0x0',
            from: '0x35acd6dd6c5045d18ca6d0192af46b335a5402c02d41f46e4e77ea2c951d9a3',
            gas: '0x0',
            gasPrice: '0x0x3b9aca07',
            hash: '0x19aa30709312a2a10334f5db1211caa18ee7f995c3f290fc1056b03ef93ab8a',
            input:
              '0x0x10x3fe8e4571772bbe0065e271686bd655efd1365a5d6858981e582f82f2c103130x27a4a7332e590dd789019a6d125ff2aacd358e453090978cbf81f0d85e4c0450x20x1cc81abbbc64da50c299277f1356eb93e5eecd5e0036d09de78e9f4c5c926180x5e8d28e69c9a51b02337c0d41413a3ec9b2fbb003b16d7deee3f8dacc24b3d',
            maxFeePerGas: '0x0',
            maxPriorityFeePerGas: '0x0',
            nonce: '0x1bbd1',
            r: '0x786037009f3980115f61a0f630e83715589357222894274f42b9e8e625bc64a',
            s: '0xb95220e52c8323dedd670770d71008eaac72ce97e3b3afa352f0a175222115',
            to: '0x0',
            transactionIndex: '0xa',
            type: 'INVOKE',
            v: '0x1b',
            value: '0x0',
          },
          {
            accessList: [],
            blockHash:
              '0x1806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
            blockNumber: '0xe9fc9',
            chainId: '0x0',
            from: '0x553678d1e057d988cdc46740f09cb6d0fbf51315be55f32b15cee2a137e6896',
            gas: '0x0',
            gasPrice: '0x0x3b9aca07',
            hash: '0x68d3e804e28be848154d335cd42d23a720b5729198b293e90cecbc08a3abd1e',
            input:
              '0x0x20x27d11831d1a104c63210944ee137375f8b0a2adcfa085453827cda2991454ca0x219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c0x30x40ac8baf878c1bd7815e12c381c3ca827d7364501412bd9fc08c9aa8d6d0a00xd09dc3000x00x40ac8baf878c1bd7815e12c381c3ca827d7364501412bd9fc08c9aa8d6d0a00x362acb9e27bcd54519790b02949bf0e726a9a358cf911861c7b891a3cac28900x70x5d22cffa8d9538876d2b553e97c6067d34de78949c146d9d7e37b054403a5360x3782dace9d9000000x00x27d11831d1a104c63210944ee137375f8b0a2adcfa085453827cda2991454ca0xd09dc3000x00x553678d1e057d988cdc46740f09cb6d0fbf51315be55f32b15cee2a137e6896',
            maxFeePerGas: '0x4c326f5f35d8',
            maxPriorityFeePerGas: '0x0',
            nonce: '0x7',
            r: '0x1',
            s: '0x9c9045abcfd6da1a28dc70493ceb147b8f5972f86d62af26aac7bbde579729',
            to: '0x0',
            transactionIndex: '0xb',
            type: 'INVOKE',
            v: '0x1b',
            value: '0x0',
          },
          {
            accessList: [],
            blockHash:
              '0x1806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
            blockNumber: '0xe9fc9',
            chainId: '0x0',
            from: '0x641805d0186ac15797749dbce7c1d5205c1a36db2f2f29d1fb9b1dbbf338085',
            gas: '0x0',
            gasPrice: '0x0x3b9aca07',
            hash: '0x1d5ee8210c8b5343f2ece34ad17cbee0f92f4b88c1559079f211f4c3914b7a3',
            input:
              '0x0x10x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc70x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e0x30x350fed0c56d39fe87535b47844d226694ce89e140x38d7ea4c680000x0',
            maxFeePerGas: '0x3d130b224c3',
            maxPriorityFeePerGas: '0x0',
            nonce: '0x720',
            r: '0x74e445304ccd137ac70c74764062e3b3042bc4198f1e816965357a00ac9c51a',
            s: '0x536705c0b8e7901d4afe26fba7500be4b373e2d94edd9dcea4b1d5dbcfe1b65',
            to: '0x0',
            transactionIndex: '0xc',
            type: 'INVOKE',
            v: '0x1b',
            value: '0x0',
          },
          {
            accessList: [],
            blockHash:
              '0x1806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
            blockNumber: '0xe9fc9',
            chainId: '0x0',
            from: '0x774bf19fa19ce3bd40020e0816401eb795096b769f8ba56870df338a42cb295',
            gas: '0x0',
            gasPrice: '0x0x3b9aca07',
            hash: '0x554df166dde9d871777ce25d87f673eb98451876f53b57ab3031c1ee88c1a46',
            input:
              '0x0x10x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e0x30x774bf19fa19ce3bd40020e0816401eb795096b769f8ba56870df338a42cb2950x10x0',
            maxFeePerGas: '0x0',
            maxPriorityFeePerGas: '0x0',
            nonce: '0x44',
            r: '0x280fe3f84ab27732e4d3051ee2c38d219bf7d9146e2fbd0b32d76d3f6861f7',
            s: '0x3978e9b9272ee0637d43235498169c71fb974e13a0ff8ae641ec37510d124d9',
            to: '0x0',
            transactionIndex: '0xd',
            type: 'INVOKE',
            v: '0x1b',
            value: '0x0',
          },
          {
            accessList: [],
            blockHash:
              '0x1806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
            blockNumber: '0xe9fc9',
            chainId: '0x0',
            from: '0x662da9070d9d6cc161436b8e14f562579813f5e074728ba24c1659df7021c68',
            gas: '0x0',
            gasPrice: '0x0x3b9aca07',
            hash: '0x7abfee514fb31fab751c1182c7f9716c35a4c15ed840f541ef566b6a782d667',
            input:
              '0x0x10x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e0x30x662da9070d9d6cc161436b8e14f562579813f5e074728ba24c1659df7021c680x10x0',
            maxFeePerGas: '0x0',
            maxPriorityFeePerGas: '0x0',
            nonce: '0x54',
            r: '0x2a076a5e06aff428f0721bc5609331cf57da57e30253b3a6b23906dc06de0c',
            s: '0x3b9a4a2473a6c84c47943749ac1722b74f35bf31168d6e3b96eea86a450986e',
            to: '0x0',
            transactionIndex: '0xe',
            type: 'INVOKE',
            v: '0x1b',
            value: '0x0',
          },
          {
            accessList: [],
            blockHash:
              '0x1806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
            blockNumber: '0xe9fc9',
            chainId: '0x0',
            from: '0x35acd6dd6c5045d18ca6d0192af46b335a5402c02d41f46e4e77ea2c951d9a3',
            gas: '0x0',
            gasPrice: '0x0x3b9aca07',
            hash: '0x7777a144a3b8cdc2250b3162feaa2ccb6c37b3ce57028afe9cbfcc9812ba17',
            input:
              '0x0x20x4d0b88ace5705bb7825f91ee95557d906600b7e7762f5615e6a4f407185a43a0x3d7905601c217734671143d457f0db37f7f8883112abd34b92c4abfeafde0c30x20x4559b52d79a3c358d96af8cfc6e8a372ceebb87545f08e872fa76e3d471f2f60x24ebd50bff3d34c37bb26ec37c0157685fb7717c8e36b590f223ae7ac8e9cac0x4d0b88ace5705bb7825f91ee95557d906600b7e7762f5615e6a4f407185a43a0x2913ee03e5e3308c41e308bd391ea4faac9b9cb5062c76a6b3ab4f65397e1060xa0x70x34a10728870f03f7ddad737626686083cbd18bc088e73e0c99975ed489854e20xbfc02119842d0e9a0cedea34d5f6a987291679a60790bde7b4bc257c3e6fea0xbabac91d96917009f186bb4ce9f0b3e9fab3ee1e1e99f9ab9255fb4abc1e4f0x4af9eb3b8b9d48bb93f1e84226df0d85e565098982eff98e01e06103b80368f0x7fe665e6184c95bf7424d5e2dd78780c1ae39cf92a2bd10131c4f9e7970b89c0x7967eb74342f322a09ed024b73a0f53f82c2f6667ca6e913a0f74a7148449b80x3e9dd33f89a0079fd32af6cd990b2c64ba053b827eb4ade54e8841050f6c4960x10x5e02f2376b699937a7c209e67a0a6ed1c3b32ecf7a12e188a6be561f9936abb',
            maxFeePerGas: '0x0',
            maxPriorityFeePerGas: '0x0',
            nonce: '0x1bbd2',
            r: '0x1dd4b8677e1530a3ddc1b27eca1e3820c2aabc27a70e47cc5ffe3af9d77aa03',
            s: '0x5763392b5d401cc7207c032a2fa5330d17f2d002c309b917d68b84adb309452',
            to: '0x0',
            transactionIndex: '0xf',
            type: 'INVOKE',
            v: '0x1b',
            value: '0x0',
          },
        ],
        transactionsRoot: '0x0',
        uncles: [],
      },
    })
  })

  it('returns an RPC error if the number of parameters is not 2', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBlockByHash',
      params: [
        '0x01806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
      ],
      id: 0,
    }

    const starkResult: RPCResponse = <RPCResponse>(
      await getBlockByHashHandler(request)
    )
    expect(starkResult).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'two params are expected',
    })
  })

  it('returns an RPC error if the block hash is invalid', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBlockByHash',
      params: [
        '0xZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
        false,
      ],
      id: 0,
    }

    const starkResult: RPCResponse = <RPCResponse>(
      await getBlockByHashHandler(request)
    )
    expect(starkResult).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid block hash',
    })
  })

  it('returns an RPC error if the second parameter is not a boolean', async () => {
    const request = {
      jsonrpc: '2.0',
      method: 'eth_getBlockByHash',
      params: [
        '0x01806b8ff9e7ff189a563a07c7d18fbf5e30e4300dd4febb2779f5d56bfeef93',
        'false',
      ],
      id: 0,
    }

    const starkResult: RPCResponse = <RPCResponse>(
      await getBlockByHashHandler(request)
    )
    expect(starkResult).toMatchObject({
      code: 7979,
      message: 'Starknet RPC error',
      data: 'Invalid parameter type',
    })
  })
})

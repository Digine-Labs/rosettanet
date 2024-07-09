import {
  RPCError,
  RPCResponse,
  RPCRequest,
  StarknetFunction,
  EthereumSlot,
} from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { validateEthAddress } from '../../utils/validations'
import {
  convertEthereumCalldataToParameters,
  convertUint256s,
  getCalldataByteSize,
  getFunctionSelectorFromCalldata,
} from '../../utils/calldata'
import { matchStarknetFunctionWithEthereumSelector } from '../../utils/match'
import {
  generateEthereumFunctionSignature,
  getContractsMethods,
} from '../../utils/starknet'
import { getSnAddressFromEthAddress } from '../../utils/wrapper'
import { snKeccak } from '../../utils/sn_keccak'
import { getSnSlotCount } from '../../utils/converters/typeConverters'
import { writeLog } from '../../logger'

interface ParameterObject {
  from?: string
  to: string
  gas?: string
  gasPrice?: string
  value?: string
  data?: string
}

export async function estimateGasHandler(
  call: RPCRequest,
): Promise<RPCResponse | RPCError> {
  const network = 'testnet'
  const method = 'starknet_estimateFee'

  const parameters: ParameterObject = call.params[0] as ParameterObject

  const ethFromAddress = parameters.from as string
  const ethToAddress = parameters.to as string

  if (parameters.from && !validateEthAddress(parameters.from)) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'from field is not valid eth address',
    }
  }

  if (!validateEthAddress(ethToAddress)) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'to field is not valid eth address',
    }
  }

  const snFromAddress = await getSnAddressFromEthAddress(ethFromAddress)
  const snToAddress = await getSnAddressFromEthAddress(ethToAddress)

  if (snFromAddress === '0x0') {
    return {
      code: 7979,
      message: 'Starknet RPC Error',
      data: 'from field is not in lens contract',
    }
  }

  if (snToAddress === '0x0') {
    return {
      code: 7979,
      message: 'Starknet RPC Error',
      data: 'to field is not in lens contract',
    }
  }

  const getSnNonce: RPCResponse | string = await callStarknet(network, {
    jsonrpc: call.jsonrpc,
    method: 'starknet_getNonce',
    params: ['latest', snFromAddress],
    id: call.id,
  })

  if (typeof getSnNonce === 'string') {
    return {
      code: 7979,
      message: 'Starknet RPC error, getNonce',
      data: getSnNonce,
    }
  }

  const snNonce = getSnNonce.result

  //  1) For calculating only native token transfer fee

  if (
    parameters.value &&
    parameters.value.length > 0 &&
    parameters.data == '0x'
  ) {
    const response: RPCResponse | string = await callStarknet(network, {
      jsonrpc: call.jsonrpc,
      method: method,
      params: {
        request: [
          {
            type: 'INVOKE',
            max_fee: '0x28ed6103d0000',
            version: '0x1',
            signature: ['0x0', '0x0'],
            sender_address: snFromAddress,
            calldata: [
              '0x1',
              '0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
              '0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e',
              '0x3',
              snToAddress,
              parameters.value,
              '0x0',
            ],
            nonce: snNonce,
          },
        ],
        simulation_flags: ['SKIP_VALIDATE'],
        block_id: 'latest',
      },
      id: call.id,
    })

    writeLog(0, snFromAddress)
    writeLog(0, snToAddress)
    writeLog(0, parameters.value)

    if (typeof response === 'string') {
      return {
        code: 7979,
        message: 'Starknet RPC error',
        data: response,
      }
    }

    if (
      response.error &&
      response.error.message === 'Transaction execution error'
    ) {
      return {
        jsonrpc: '2.0',
        id: call.id,
        data: 'Transaction Execution Error',
        result: '0x28ed6103d0000',
      }
    }

    return {
      jsonrpc: '2.0',
      id: call.id,
      result: response.result,
    }
  } else {
    //  2) For calculating requests with "data"
    //  Read function selector & match with starknet contract function
    //    1) First get eth function signature
    //    2) Convert to address to starknet address
    //    3) Read starknet address ABI and get all accessible function names
    //    4) Convert all accesible function parameter types into ethereum data types
    //    5) Calculate ethereum function signatures
    //    6) Try to match signatures to find which function to call on starknet
    const functionSelector: string =
      typeof parameters.data === 'string'
        ? getFunctionSelectorFromCalldata(parameters.data)
        : '0x0'

    if (functionSelector === '0x0') {
      return {
        code: 7979,
        message: 'Starknet RPC error',
        data: 'function call zero.',
      }
    }

    const starknetCallableMethods: Array<StarknetFunction> =
      await getContractsMethods(snToAddress)

    const starknetFunctionsEthereumFormat = starknetCallableMethods.map(fn =>
      generateEthereumFunctionSignature(fn.name, fn.inputs),
    )

    const targetStarknetFunction = matchStarknetFunctionWithEthereumSelector(
      starknetFunctionsEthereumFormat,
      functionSelector,
    )

    if (typeof targetStarknetFunction === 'undefined') {
      return {
        code: 7979,
        message: 'Starknet RPC error',
        data: 'target function not found',
      }
    }

    const starknetSelector = snKeccak(targetStarknetFunction.split('(')[0])

    const targetStarknetFunctionAsStarknetFunction:
      | StarknetFunction
      | undefined = starknetCallableMethods.find(
      x => x.name === targetStarknetFunction.split('(')[0],
    )

    let sumOfSlotCount = 0

    if (
      starknetCallableMethods.length > 0 &&
      targetStarknetFunctionAsStarknetFunction &&
      targetStarknetFunctionAsStarknetFunction.inputs
    ) {
      const snFunctionParameterLength =
        targetStarknetFunctionAsStarknetFunction.inputs.length

      for (let i = 0; i < snFunctionParameterLength; i++) {
        if (targetStarknetFunctionAsStarknetFunction.inputs[i]) {
          const slotCount = getSnSlotCount(
            targetStarknetFunctionAsStarknetFunction.inputs[i].type,
          )
          sumOfSlotCount += slotCount
        }
      }
    }

    const hexedSumOfSlotCount = '0x' + sumOfSlotCount.toString(16)

    const calldataSlotsize: Array<EthereumSlot> = getCalldataByteSize(
      targetStarknetFunction,
    )
    const splittedData: Array<string> =
      await convertEthereumCalldataToParameters(
        targetStarknetFunction,
        calldataSlotsize,
        parameters.data,
      )

    const starknetCallData: Array<string> = convertUint256s(splittedData).map(
      i => `0x${i}`,
    )

    //TODO GET SENDER_ADDRESS VERSION, CALL STARKNET ACCORDINGLY

    //version 1

    const response: RPCResponse | string = await callStarknet(network, {
      jsonrpc: call.jsonrpc,
      method: method,
      params: {
        request: [
          {
            type: 'INVOKE',
            max_fee: '0x28ed6103d0000',
            version: '0x1',
            signature: ['0x0', '0x0'],
            sender_address: snFromAddress,
            calldata: [
              '0x1',
              snToAddress,
              starknetSelector,
              hexedSumOfSlotCount,
              ...starknetCallData,
            ],
            nonce: snNonce,
          },
        ],
        simulation_flags: ['SKIP_VALIDATE'],
        block_id: 'latest',
      },
      id: call.id,
    })

    if (typeof response === 'string') {
      return {
        code: 7979,
        message: 'Starknet RPC error',
        data: response,
      }
    }

    if (
      response.error &&
      response.error.message === 'Transaction execution error'
    ) {
      return {
        jsonrpc: '2.0',
        id: call.id,
        data: 'Transaction Execution Error',
        result: '0x28ed6103d0000',
      }
    }

    return {
      jsonrpc: '2.0',
      id: call.id,
      result: response.result,
    }
  }
  //version 3, not every contract is upgraded. It can cause error

  // const response: RPCResponse | string = await callStarknet(network, {
  //   jsonrpc: call.jsonrpc,
  //   method: method,
  //   params: {
  //     request: [
  //       {
  //         type: 'INVOKE',
  //         sender_address: snFromAddress,
  //         calldata: [
  //           '0x1',
  //           snToAddress,
  //           starknetSelector,
  //           hexedSumOfSlotCount,
  //           ...starknetCallData,
  //         ],
  //         version: '0x100000000000000000000000000000003',
  //         signature: ['0x0', '0x0'],
  //         resource_bounds: {
  //           l2_gas: {
  //             max_amount: '0x0',
  //             max_price_per_unit: '0x0',
  //           },
  //           l1_gas: {
  //             max_amount: '0x0',
  //             max_price_per_unit: '0x0',
  //           },
  //         },
  //         nonce: snNonce,
  //         tip: '0x0',
  //         paymaster_data: [],
  //         nonce_data_availability_mode: 'L1',
  //         fee_data_availability_mode: 'L1',
  //         account_deployment_data: [],
  //       },
  //     ],
  //     block_id: 'latest',
  //     simulation_flags: ['SKIP_VALIDATE'],
  //   },
  //   id: call.id,
  // })
}

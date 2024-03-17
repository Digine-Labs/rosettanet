import { RPCError, RPCRequest, RPCResponse } from '../../types/types'
import { callStarknet } from '../../utils/callHelper'
import { validateEthAddress } from '../../utils/validations'
import { getSnAddressFromEthAddress } from '../../utils/wrapper'
import { U256toUint256 } from '../../utils/converters/integer'

export async function getBalanceHandler(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  // TODO: dynamic network from env?
  const network = 'testnet'
  const method = 'starknet_call'
  const functionSelector =
    '0x035a73cd311a05d46deda634c5ee045db92f811b4e74bca4437fcb5302b7af33' //balance_of function selector
  const strkTokenAddress =
    '0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D'

  if (request.params.length == 0) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'params should not be empty',
    }
  }

  const ethAddress = request.params[0] as string
  if (!validateEthAddress(ethAddress)) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'invalid eth address',
    }
  }

  const snAddress = await getSnAddressFromEthAddress(ethAddress)

  const starknet_params = {
    jsonrpc: request.jsonrpc,
    method: method,
    params: [
      {
        contract_address: strkTokenAddress,
        entry_point_selector: functionSelector,
        calldata: [snAddress],
      },
      'latest',
    ],
    id: request.id,
  }
  const response: RPCResponse | string = await callStarknet(
    network,
    starknet_params,
  )

  if (typeof response === 'string') {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: response,
    }
  }

  //Handles the Balance conversion
  response.result = U256toUint256(response.result as string[])

  return {
    jsonrpc: '2.0',
    id: 1,
    result: response.result,
  }
}

export async function getBalanceHandlerSnResponse(
  request: RPCRequest,
): Promise<RPCResponse | RPCError> {
  const network = 'testnet'
  const method = 'starknet_call'
  const functionSelector =
    '0x035a73cd311a05d46deda634c5ee045db92f811b4e74bca4437fcb5302b7af33' //balance_of function selector
  const strkTokenAddress =
    '0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D'

  if (request.params.length == 0) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'params should not be empty',
    }
  }

  const ethAddress = request.params[0] as string
  if (!validateEthAddress(ethAddress)) {
    return {
      code: 7979,
      message: 'Starknet RPC error',
      data: 'invalid eth address',
    }
  }

  const snAddress = await getSnAddressFromEthAddress(ethAddress)

  const starknet_params = {
    jsonrpc: request.jsonrpc,
    method: method,
    params: [
      {
        // TODO: read network from env
        contract_address: strkTokenAddress,
        entry_point_selector: functionSelector,
        calldata: [snAddress],
      },
      'latest',
    ],
    id: request.id,
  }

  // do not need to handle the response, just return the callStarknet
  return (await callStarknet(network, starknet_params)) as RPCResponse
}

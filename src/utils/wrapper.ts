import { callStarknet } from './callHelper'
import { RPCRequest, RPCResponse, StarknetRPCError, GasCost } from '../types/types'
import { getConfigurationProperty } from './configReader'
import { isStarknetRPCError } from '../types/typeGuards'
import { writeLog } from '../logger'
import { addHexPrefix } from './padding'
import { BnToU256 } from './converters/integer'

const SELECTORS = {
  get_sn_address_from_eth_address:
    '0x3e5d65a345b3857ca9d72edca702b8e56c1923c118867752345f710d595b3cf',
  get_eth_address_from_sn_address:
    '0x1d5cede02897d15d9053653ef3e41f52394e444218efdfdec3dfaf529dcf5dd',
  precalculate_starknet_account:
    '0x25356d5707a314336daf6636019fcd414e2403787a6dfb3eacc0c8450b341c8',
  get_sn_address_with_fallback:
    '0x0137486de5a7278d659b176b17233ababeb35d63c9c605c7da04d8a7f1978067',
}

// Returns registered address in starknet address format
// ethAddress: Valid ethereum address
// Returns starknet address, if error returns 0
export async function getEthAddressFromSnAddress(
  snAddress: string,
): Promise<string | StarknetRPCError> {
  const rosettanetContract = getConfigurationProperty('rosettanet')
  const request: RPCRequest = {
    jsonrpc: '2.0',
    method: 'starknet_call',
    params: [
      {
        contract_address: rosettanetContract,
        entry_point_selector: SELECTORS.get_eth_address_from_sn_address,
        calldata: [snAddress],
      },
      'latest',
    ],
    id: 1,
  }
  const response: RPCResponse | StarknetRPCError = await callStarknet(request)

  if (isStarknetRPCError(response)) {
    return response
  }

  if (Array.isArray(response.result) && response.result.length == 1) {
    return response.result[0]
  } else {
    return <StarknetRPCError>{
      code: -32700,
      message:
        'Reading ethereum address from Rosettanet contract fails. Starknet rpc resulted with different type then expected.',
    }
  }
}

export async function getSnAddressWithFallback(
  ethAddress: string,
): Promise<string | StarknetRPCError> {
  const rosettanetContract = getConfigurationProperty('rosettanet')
  const request: RPCRequest = {
    jsonrpc: '2.0',
    method: 'starknet_call',
    params: [
      {
        contract_address: rosettanetContract,
        entry_point_selector: SELECTORS.get_sn_address_with_fallback,
        calldata: [ethAddress],
      },
      'latest',
    ],
    id: 1,
  }
  const response: RPCResponse | StarknetRPCError = await callStarknet(request)

  if (isStarknetRPCError(response)) {
    return response
  }

  if (Array.isArray(response.result) && response.result.length == 1) {
    const address = response.result[0]

    return address
  } else {
    return <StarknetRPCError>{
      code: -32500,
      message:
        'Reading starknet address from Rosettanet contract fails. Starknet rpc resulted with different type then expected.',
    }
  }
}

export async function precalculateStarknetAccountAddress(
  ethAddress: string,
): Promise<string | StarknetRPCError> {
  const rosettanetContract = getConfigurationProperty('rosettanet')
  const request: RPCRequest = {
    jsonrpc: '2.0',
    method: 'starknet_call',
    params: [
      {
        contract_address: rosettanetContract,
        entry_point_selector: SELECTORS.precalculate_starknet_account,
        calldata: [ethAddress],
      },
      'latest',
    ],
    id: 1,
  }
  const response: RPCResponse | StarknetRPCError = await callStarknet(request)

  if (isStarknetRPCError(response)) {
    // This returns full object not only error part??? Check it
    return response
  }

  if (Array.isArray(response.result) && response.result.length == 1) {
    const address = response.result[0]

    if (address === '0x0') {
      return <StarknetRPCError>{
        code: -32700,
        message: 'Target not registered on registry.',
      }
    }
    return response.result[0]
  } else {
    return <StarknetRPCError>{
      code: -32500,
      message:
        'Reading starknet address from Rosettanet contract fails. Starknet rpc resulted with different type then expected.',
    }
  }
}

export async function getSnAddressFromEthAddress(
  ethAddress: string,
): Promise<string | StarknetRPCError> {
  const rosettanetContract = getConfigurationProperty('rosettanet')
  const request: RPCRequest = {
    jsonrpc: '2.0',
    method: 'starknet_call',
    params: [
      {
        contract_address: rosettanetContract,
        entry_point_selector: SELECTORS.get_sn_address_from_eth_address,
        calldata: [ethAddress],
      },
      'latest',
    ],
    id: 1,
  }
  const response: RPCResponse | StarknetRPCError = await callStarknet(request)

  if (isStarknetRPCError(response)) {
    return response
  }

  if (Array.isArray(response.result) && response.result.length == 1) {
    const address = response.result[0]

    if (address === '0x0') {
      return <StarknetRPCError>{
        code: -32700,
        message: 'Target not registered on registry.',
      }
    }
    return response.result[0]
  } else {
    return <StarknetRPCError>{
      code: -32500,
      message:
        'Reading starknet address from Rosettanet contract fails. Starknet rpc resulted with different type then expected.',
    }
  }
}

export async function estimateExecutionFee(sender: string, calldata: string[], nonce: string, value: bigint): Promise<GasCost> {
  const DEFAULT_EXECUTION_FEE: GasCost = {
    l1_data: 256,
    l1: 0,
    l2: 13698786
  }; // TODO: @Bora daha duzgun bi execution fee yaz buraya
  const estimateFeeCall = {
    jsonrpc: '2.0',
    method: 'starknet_estimateFee',
    params: {
      request: [{
        type: 'INVOKE',
        version: '0x3',
        sender_address: sender,
        calldata: calldata,
        signature: ["0x0", "0x0", "0x0", "0x0", "0x1c", ...BnToU256(value)],
        nonce: addHexPrefix(nonce),
        tip: '0x0',
        paymaster_data: [],
        account_deployment_data: [],
        nonce_data_availability_mode: 'L1',
        fee_data_availability_mode: 'L1',
        resource_bounds: {
          l1_gas: {
            max_amount: '0x0',
            max_price_per_unit: '0x0',
          },
          l2_gas: {
            max_amount: '0x0',
            max_price_per_unit: '0x0',
          },
          l1_data_gas: {
            max_amount: '0x0',
            max_price_per_unit: '0x0',
          },
        },
      }],
      simulation_flags: ['SKIP_VALIDATE'],
      block_id: 'latest'
    },
    id: 124
  };

  const executionFeeResult: RPCResponse | StarknetRPCError = await callStarknet(estimateFeeCall);

  if (isStarknetRPCError(executionFeeResult)) {
    writeLog(2, 'Error at starknet call on estimateFee @ wrapper.ts. Returning default.');
    return DEFAULT_EXECUTION_FEE;
  }

  const fees = executionFeeResult.result[0];

  if (!fees || typeof fees.l1_data_gas_consumed !== 'string' || typeof fees.l1_gas_consumed !== 'string' || typeof fees.l2_gas_consumed !== 'string') {
    writeLog(2, 'Error at starknet result estimateFee @ wrapper.ts. Returning default.');
    return DEFAULT_EXECUTION_FEE;
  }

  return <GasCost>{
    l1_data: Number(BigInt(fees.l1_data_gas_consumed)),
    l1: Number(BigInt(fees.l1_gas_consumed)),
    l2: Number(BigInt(fees.l2_gas_consumed)),
  }
}

export async function mockValidateCost(caller: string, calldata: string[]): Promise<GasCost> {
  const feeEstimator = getConfigurationProperty('validateFeeEstimator');
  const DEFAULT_VALIDATION_FEE: GasCost = {
    l1_data: 256,
    l1: 0,
    l2: 30698786
  };

  const estimateFeeCall = {
    jsonrpc: '2.0',
    method: 'starknet_estimateFee',
    params: {
      request: [{
        type: 'INVOKE',
        version: '0x3',
        sender_address: feeEstimator,
        calldata: [caller, ...calldata],
        signature: ["0x0", "0x0", "0x0", "0x0", "0x1c", "0x1", "0x0"],
        nonce: "0x0",
        tip: '0x0',
        paymaster_data: [],
        account_deployment_data: [],
        nonce_data_availability_mode: 'L1',
        fee_data_availability_mode: 'L1',
        resource_bounds: {
          l1_gas: {
            max_amount: '0x0',
            max_price_per_unit: '0x0',
          },
          l2_gas: {
            max_amount: '0x0',
            max_price_per_unit: '0x0',
          },
          l1_data_gas: {
            max_amount: '0x0',
            max_price_per_unit: '0x0',
          },
        },
      }],
      simulation_flags: ['SKIP_VALIDATE'],
      block_id: 'latest'
    },
    id: 123
  };

  const validationFeeResult: RPCResponse | StarknetRPCError = await callStarknet(estimateFeeCall);

  if (isStarknetRPCError(validationFeeResult)) {
    writeLog(2, 'Error at starknet call on mockValidateCost. Returning default.');
    return DEFAULT_VALIDATION_FEE;
  }

  const fees = validationFeeResult.result[0];

  if (!fees || typeof fees.l1_data_gas_consumed !== 'string' || typeof fees.l1_gas_consumed !== 'string' || typeof fees.l2_gas_consumed !== 'string') {
    writeLog(2, 'Error at starknet result validation on mockValidateCost. Returning default.');
    return DEFAULT_VALIDATION_FEE;
  }

  const l1_data = Math.ceil(Number(BigInt(fees.l1_data_gas_consumed)) * 2.4);
  const l1 = Math.ceil(Number(BigInt(fees.l1_gas_consumed)) * 2.0);
  const l2 = Math.ceil(Number(BigInt(fees.l2_gas_consumed)) * 2.4);

  return <GasCost>{
    l1_data: l1_data >= DEFAULT_VALIDATION_FEE.l1_data ? l1_data : DEFAULT_VALIDATION_FEE.l1_data,
    l1: l1 >= DEFAULT_VALIDATION_FEE.l1 ? l1 : DEFAULT_VALIDATION_FEE.l1,
    l2: l2 >= DEFAULT_VALIDATION_FEE.l2 ? l2 : DEFAULT_VALIDATION_FEE.l2,
  }
}

/*
{
    "jsonrpc": "2.0",
    "method": "starknet_estimateFee",
    "params": {
      "request": [{
        "type":"INVOKE",
        "version": "0x3",
        "sender_address": "0x03eaf353b4e78e3c4daaf0bbf81a58171be1bbe13924a4ac07522ae60bdcd85e",
        "calldata": [
            "0x6db5b367ec2cf3ede5a493706bb84a2a6f138429b84ba20ec5d0ebbceb7d7a",
            "0x2",
            "0x0000000000000000000000004645415455524553",
            "0xb",
            "0x16f3de10bb60",
            "0x16f3de10bb60",
            "0x0",
            "0x5208",
            "0x0",
            "0x0",
            "0x1b",
            "0x76971d7f",
            "0x00000000000000000000000000000000",
            "0x00000000000000000000000000000020",
            "0x00000000000000000000000000000000",
            "0x00000000000000000000000000000001",
            "0x00000000000000000000000000000000",
            "0x00000000000000000000000000000020",
            "0x00494a72a742b7880725a965ee487d93",
            "0x7fa6d08a94ba4eb9e29dd0663bc653a2",
            "0x014b9c006653b96dd1312a62b5921c46",
            "0x5d08352de1546550f0ed804fcc0ef9e9",
            "0x00000000000000000000000000000000",
            "0x00000000000000000000000000000060",
            "0x00000000000000000000000000000000",
            "0x00000000000000000000000000000006",
            "0x00f962408dec6bd3020593ec425c97bc",
            "0x1fb345834a8388356ef51c653a1e7073",
            "0x00000000000000000000000000000000",
            "0x00000000000000000000000064656465",
            "0x00000000000000000000000000000000",
            "0x00000000000000000000000065646564",
            "0x00000000000000000000000000000000",
            "0x00000000000000000000000000023323",
            "0x00000000000000000000000000000000",
            "0x00000000000000000000000000000000",
            "0x00000000000000000000000000000000",
            "0x00000000000000000000000000313131"
        ],
        "signature": ["0x0","0x0","0x0","0x0","0x1c","0x1","0x0"],
        "nonce": "0x123",
        "tip": "0x0",
        "paymaster_data": [],
        "account_deployment_data": [],
        "nonce_data_availability_mode": "L1",
        "fee_data_availability_mode": "L1",
        "resource_bounds": {
          "l1_gas": {
            "max_amount": "0x0",
            "max_price_per_unit": "0x0"
          },
          "l2_gas": {
            "max_amount": "0x0",
            "max_price_per_unit": "0x0"
          },
          "l1_data_gas": {
            "max_amount": "0x0",
            "max_price_per_unit": "0x0"
          }
        }
      }],
      "simulation_flags": ["SKIP_VALIDATE"],
      "block_id": "latest"
    },
    "id": 123
  }
*/
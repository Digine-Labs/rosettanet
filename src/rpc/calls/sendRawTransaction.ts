import { Transaction } from "ethers";
import { RPCError, RPCRequest, RPCResponse, SignedRawTransaction, StarknetRPCError, ValidationError } from "../../types/types";
import { validateRawTransaction } from "../../utils/validations";
import { isAccountDeployResult, isPrepareCalldataError, isSignedRawTransaction, isStarknetRPCError } from "../../types/typeGuards";
import { AccountDeployError, AccountDeployResult, deployRosettanetAccount, getRosettaAccountAddress, RosettanetAccountResult } from "../../utils/rosettanet";
import { callStarknet } from "../../utils/callHelper";
import { prepareRosettanetCalldataFinal, prepareStarknetInvokeTransaction } from "../../utils/transaction";

export async function sendRawTransactionHandler(request: RPCRequest): Promise<RPCResponse | RPCError>  {
    if (request.params.length != 1) {
        return {
          jsonrpc: request.jsonrpc,
          id: request.id,
          error: {
            code: -32602,
            message: 'Invalid argument, Parameter should length 1.',
          },
        }
      }
    
      if (typeof request.params[0] !== 'string') {
        return {
          jsonrpc: request.jsonrpc,
          id: request.id,
          error: {
            code: -32602,
            message: 'Invalid argument type, parameter should be string.',
          },
        }
      }

      const rawTxn: string = request.params[0]
      const tx = Transaction.from(rawTxn)

      console.log(tx.toJSON())

      const signedValidRawTransaction: SignedRawTransaction | ValidationError =
      validateRawTransaction(tx)

      if (!isSignedRawTransaction(signedValidRawTransaction)) {
        return {
          jsonrpc: request.jsonrpc,
          id: request.id,
          error: {
            code: -32603,
            message: signedValidRawTransaction.message,
          },
        }
      }

      const deployedAccountAddress: RosettanetAccountResult =
      await getRosettaAccountAddress(signedValidRawTransaction.from)
      console.log(deployedAccountAddress)
      if (!deployedAccountAddress.isDeployed) {
        // This means account is not registered on rosettanet registry. Lets deploy the address
        const accountDeployResult: AccountDeployResult | AccountDeployError =
          await deployRosettanetAccount(signedValidRawTransaction)
        if (!isAccountDeployResult(accountDeployResult)) {
          return {
            jsonrpc: request.jsonrpc,
            id: request.id,
            error: {
              code: -32003,
              message:
                'Error at account deployment : ' + accountDeployResult.message,
            },
          }
        }
    
        // eslint-disable-next-line no-console
        console.log(`Account Deployed ${accountDeployResult.contractAddress}`)
    
        return <RPCResponse>{
          jsonrpc: request.jsonrpc,
          id: request.id,
          result: accountDeployResult.transactionHash,
        }
      }

      const starknetAccountAddress = deployedAccountAddress.contractAddress;

      const rosettanetCalldata = prepareRosettanetCalldataFinal(signedValidRawTransaction);

      if (isPrepareCalldataError(rosettanetCalldata)) {
        return <RPCError>{
          jsonrpc: request.jsonrpc,
          id: request.id,
          error: {
            code: -32708,
            message: rosettanetCalldata.message,
          },
        }
      }

      const invokeTx = prepareStarknetInvokeTransaction(
        starknetAccountAddress,
        rosettanetCalldata,
        signedValidRawTransaction.signature.arrayified,
        signedValidRawTransaction,
      )

      console.log(JSON.stringify(invokeTx))

      return await broadcastTransaction(request, invokeTx)
}

async function broadcastTransaction(
    request: RPCRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: any,
  ): Promise<RPCResponse | RPCError> {
    const response: RPCResponse | StarknetRPCError = await callStarknet(<
      RPCRequest
    >{
      jsonrpc: request.jsonrpc,
      id: request.id,
      params: params,
      method: 'starknet_addInvokeTransaction',
    })
    if (isStarknetRPCError(response)) {
      if (response.code == 55) {
        return <RPCError>{
          jsonrpc: request.jsonrpc,
          id: request.id,
          error: {
            message: 'Transaction rejected',
            code: -32003,
          },
        }
      }
      return <RPCError>{
        jsonrpc: request.jsonrpc,
        id: request.id,
        error: {
          message: response.message,
          code: -32003,
        },
      }
    }
  
    const transactionHash = response.result.transaction_hash
    if (typeof transactionHash === 'string') {
      return <RPCResponse>{
        jsonrpc: request.jsonrpc,
        id: request.id,
        result: transactionHash,
      }
    }
    return response
  }
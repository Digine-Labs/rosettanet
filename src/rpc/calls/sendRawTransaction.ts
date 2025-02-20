import { Transaction } from "ethers"
import { EVMDecodeError, EVMDecodeResult, PrepareCalldataError, RPCError, RPCRequest, RPCResponse, SignedRawTransaction, StarknetRPCError, ValidationError } from "../../types/types"
import { validateRawTransaction } from "../../utils/validations"
import { isAccountDeployResult, isEVMDecodeError, isPrepareCalldataError, isSignedRawTransaction, isStarknetRPCError } from "../../types/typeGuards"
import { AccountDeployError, AccountDeployResult, deployRosettanetAccount, getRosettaAccountAddress, RosettanetAccountResult } from "../../utils/rosettanet"
import { decodeMulticallCalldata, getFunctionSelectorFromCalldata } from "../../utils/calldata"
import { prepareRosettanetCalldata, prepareStarknetInvokeTransaction } from "../../utils/transaction"
import { StarknetInvokeTransaction } from "../../types/transactions.types"
import { callStarknet } from "../../utils/callHelper"

export async function sendRawTransactionHandler(
    request: RPCRequest,
  ): Promise<RPCResponse | RPCError> {
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
    
      // eslint-disable-next-line no-console
      console.log(tx.toJSON())
      const signedValidRawTransaction: SignedRawTransaction | ValidationError  = validateRawTransaction(tx);

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

      const deployedAccountAddress: RosettanetAccountResult = await getRosettaAccountAddress(signedValidRawTransaction.from)
      if (!deployedAccountAddress.isDeployed) {
        // This means account is not registered on rosettanet registry. Lets deploy the address
        const accountDeployResult: AccountDeployResult | AccountDeployError = await deployRosettanetAccount(signedValidRawTransaction)
        if(!isAccountDeployResult(accountDeployResult)) {
          return {
            jsonrpc: request.jsonrpc,
            id: request.id,
            error: {
              code: -32003,
              message: 'Error at account deployment : ' + accountDeployResult.message,
            },
          }
        }
    
        // eslint-disable-next-line no-console
        console.log(`Account Deployed ${accountDeployResult.contractAddress}`)
    
        return <RPCResponse> {
          jsonrpc: request.jsonrpc,
          id: request.id,
          result: accountDeployResult.transactionHash
        }
      }

      const starknetAccountAddress = deployedAccountAddress.contractAddress;

      const targetFunctionSelector: string | null = getFunctionSelectorFromCalldata(signedValidRawTransaction.data);

      if(targetFunctionSelector === null) {
        // From now only supported strk transfer if target is not self
        const rosettanetCalldata: Array<string> | PrepareCalldataError = prepareRosettanetCalldata (signedValidRawTransaction,[],[]);
        
        if(isPrepareCalldataError(rosettanetCalldata)) {
          return <RPCError> {
            jsonrpc: request.jsonrpc,
            id: request.id,
            error: {
              code: -32708,
              message: rosettanetCalldata.message,
            }
          }
        }
    
        const invokeTransaction: StarknetInvokeTransaction =
        prepareStarknetInvokeTransaction(
          starknetAccountAddress,
          rosettanetCalldata,
          signedValidRawTransaction.signature.arrayified,
          signedValidRawTransaction
        )
        return await broadcastTransaction(request, invokeTransaction);
      }

      if(tx.from === tx.to) {
        return broadcastInternalTransaction(request, starknetAccountAddress, signedValidRawTransaction, targetFunctionSelector);
      }

      return <RPCError> {
        jsonrpc: request.jsonrpc,
        id: request.id,
        error: {
          code: -32003,
          message: 'Unimplemented feature',
        }
      }
  }

  async function broadcastInternalTransaction(request: RPCRequest, from: string,  tx: SignedRawTransaction, selector: string): Promise<RPCResponse | RPCError> {

    if(selector === '0x76971d7f') {
      // Multicall
      const ethCalldata = tx.data.slice(10)
      const decodedMulticallCalldata: EVMDecodeResult | EVMDecodeError = decodeMulticallCalldata(ethCalldata, selector) // datadan selector cikart selector ayri gonder
      if(isEVMDecodeError(decodedMulticallCalldata)) {
        return {
          jsonrpc: request.jsonrpc,
          id: request.id,
          error: {
            code: decodedMulticallCalldata.code,
            message: decodedMulticallCalldata.message,
          },
        }
      }
      const rosettanetCalldata: Array<string> | PrepareCalldataError = prepareRosettanetCalldata(tx, decodedMulticallCalldata.calldata, decodedMulticallCalldata.directives);
  
      if(isPrepareCalldataError(rosettanetCalldata)) {
        return <RPCError> {
          jsonrpc: request.jsonrpc,
          id: request.id,
          error: {
            code: -32708,
            message: rosettanetCalldata.message,
          }
        }
      }
      const invokeTx = prepareStarknetInvokeTransaction(from, rosettanetCalldata, tx.signature.arrayified, tx)
  
      const response = await broadcastTransaction(request, invokeTx);
      return response
    } else if(selector === '0x74d0bb9d') {
      // Upgrade
      const rosettanetCalldata: Array<string> | PrepareCalldataError = prepareRosettanetCalldata(tx, ['0x74d0bb9d'],[]);
      
      if(isPrepareCalldataError(rosettanetCalldata)) {
        return <RPCError> {
          jsonrpc: request.jsonrpc,
          id: request.id,
          error: {
            code: -32708,
            message: rosettanetCalldata.message,
          }
        }
      }
      const invokeTx = prepareStarknetInvokeTransaction(from, rosettanetCalldata, tx.signature.arrayified, tx)
  
      return broadcastTransaction(request, invokeTx);
    } else {
      return <RPCError> {
        jsonrpc: request.jsonrpc,
        id: request.id,
        error: {
          message: 'Feature function selector not found',
          code: -32003
        }
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function broadcastTransaction(request: RPCRequest, params: any): Promise<RPCResponse | RPCError> {
    const response : RPCResponse | StarknetRPCError = await callStarknet(<RPCRequest>{
      jsonrpc: request.jsonrpc,
      id: request.id,
      params: params,
      method: 'starknet_addInvokeTransaction'
    });
    if(isStarknetRPCError(response)) {
      if(response.code == 55) {
        return <RPCError> {
          jsonrpc: request.jsonrpc,
          id: request.id,
          error: {
            message: 'Transaction rejected',
            code: -32003
          }
        }
      }
      return <RPCError> {
        jsonrpc: request.jsonrpc,
        id: request.id,
        error: {
          message: response.message,
          code: -32003
        }
      }
    }
  
    const transactionHash = response.result.transaction_hash;
    if(typeof transactionHash === 'string') {
      return <RPCResponse> {
        jsonrpc: request.jsonrpc,
        id: request.id,
        result: transactionHash
      }
    }
    return response
  }
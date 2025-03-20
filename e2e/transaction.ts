import path from 'path';
import { Account } from 'starknet';
import { loadContractJson } from './utils';

export async function declareContract(account: Account, contractName: string): Promise<string> {
  const pt = path.resolve(__dirname, `../contracts/target/dev/rosettacontracts_${contractName}.contract_class.json`);
  const compiledCasm = path.resolve(__dirname, `../contracts/target/dev/rosettacontracts_${contractName}.compiled_contract_class.json`);

  const contractData = await loadContractJson(pt); 
  const compiledCasmData = await loadContractJson(compiledCasm);

  const tx = await account.declare({
    contract: contractData,
    casm: compiledCasmData
  });

  return tx.class_hash;
}

export async function deployContract(account: Account, classHash: string, ctorArgs: string[], salt?: string) {
  const tx = await account.deploy({
    classHash: classHash,
    constructorCalldata: ctorArgs,
    salt: salt
  })

  return tx.contract_address[0];
}
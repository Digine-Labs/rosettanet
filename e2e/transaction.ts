/* eslint-disable no-console */
import { promises as fs } from 'fs';
import path from 'path';
import { Account, RpcProvider, hash } from 'starknet';

export async function declareContract(privkey: string, address: string, contractName: string) {
    const pt = path.resolve(__dirname, `../contracts/target/dev/rosettacontracts_${contractName}.contract_class.json`);
    const compiledCasm = path.resolve(__dirname, `../contracts/target/dev/rosettacontracts_${contractName}.compiled_contract_class.json`);

    const contractData = await loadContractJson(pt); 
    const compiledCasmData = await loadContractJson(compiledCasm);

    const contractClassHash = hash.computeContractClassHash(contractData);

    const declarer = new Account(new RpcProvider({nodeUrl: 'http://127.0.0.1:6050', specVersion: '0.7.0'}), address, privkey)

    const tx = await declarer.declare({
      contract: contractData,
      casm: compiledCasmData
    });
    console.log(tx.class_hash)
    return;
}

async function loadContractJson(path:string) {
    try {
      const data = await fs.readFile(path, 'utf-8');
      const contractData = JSON.parse(data);
      //console.log(contractData);
      return contractData;
    } catch (error) {
      console.error('Error reading JSON file:', error);
      throw error;
    }
}
/* eslint-disable no-console */
import { promises as fs } from 'fs';
import path from 'path';

export async function declareContract(contractName: string) {
    const pt = path.resolve(__dirname, `../contracts/target/dev/rosettacontracts_${contractName}.contract_class.json`);

    const contractData = await loadContractJson(pt); 
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
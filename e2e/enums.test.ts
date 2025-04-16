import { test } from '@jest/globals';
import EVMTypesEnum, { createCairoEnumCalldata, testCreateCairoEnumCalldata } from './enums';

test.only('createCairoEnumCalldata should return correct calldata for EVMTypes enum', async () => {
  const uint256Calldata = createCairoEnumCalldata('Uint256', '0x123');
  console.log('Uint256 calldata:', uint256Calldata);
  
  const addressCalldata = createCairoEnumCalldata('Address', '0x1234567890123456789012345678901234567890');
  console.log('Address calldata:', addressCalldata);
  
  const boolCalldata = createCairoEnumCalldata('Bool', true);
  console.log('Bool calldata:', boolCalldata);
  
  const stringCalldata = createCairoEnumCalldata('String', 'test string');
  console.log('String calldata:', stringCalldata);
  
  const testResults = testCreateCairoEnumCalldata();
  console.log('Test results:', JSON.stringify(testResults, null, 2));
  
  console.log('EVMTypesEnum structure:', Object.keys(EVMTypesEnum).filter(
    key => typeof EVMTypesEnum[key as keyof typeof EVMTypesEnum] !== 'function'
  ));
});

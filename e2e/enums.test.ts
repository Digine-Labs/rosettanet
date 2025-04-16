import { test, expect } from '@jest/globals';
import EVMTypesEnum, { createCairoEnumCalldata, testCreateCairoEnumCalldata } from './enums';

test.only('createCairoEnumCalldata should return correct calldata for EVMTypes enum', async () => {
  const uint256Calldata = createCairoEnumCalldata('Uint256', '0x123');
  expect(uint256Calldata[0]).toBe(EVMTypesEnum.Uint256);
  expect(uint256Calldata[1]).toBe('0x123');
  
  const addressCalldata = createCairoEnumCalldata('Address', '0x1234567890123456789012345678901234567890');
  expect(addressCalldata[0]).toBe(EVMTypesEnum.Address);
  expect(addressCalldata[1]).toBe('0x1234567890123456789012345678901234567890');
  
  const boolCalldata = createCairoEnumCalldata('Bool', true);
  expect(boolCalldata[0]).toBe(EVMTypesEnum.Bool);
  expect(boolCalldata[1]).toBe(true);
  
  const stringCalldata = createCairoEnumCalldata('String', 'test string');
  expect(stringCalldata[0]).toBe(EVMTypesEnum.String);
  expect(stringCalldata[1]).toBe('test string');
  
  const testResults = testCreateCairoEnumCalldata();
  expect(testResults.length).toBe(4);
  expect(testResults[0].type).toBe('Uint256');
  expect(testResults[0].calldata[0]).toBe(EVMTypesEnum.Uint256);
});

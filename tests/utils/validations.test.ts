import {
  validateEthAddress,
  validateSnAddress,
  validateBlockNumber,
  validateEthEstimateGasParameters,
  validateValue,
  validateHexString,
} from '../../src/utils/validations'

describe('Test Address validations', () => {
  //
  //Testcases for ethereum address validations
  //
  it('return true if the ethereum address is valid', async () => {
    const result = validateEthAddress(
      '0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    )
    expect(result).toBe(true)
  })
  it('return false if length is either greater or less of ethereum address', async () => {
    const result = validateEthAddress(
      '0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc77',
    )
    expect(result).toBe(false)
  })
  it('Returns true if the zero address', async () => {
    const result = validateEthAddress(
      '0x0000000000000000000000000000000000000000',
    )
    expect(result).toBe(true)
  })
  it('returns false if ethereum address with characters outside the hexadecimal set', async () => {
    const result = validateEthAddress(
      '0x123g567890abcdef1234567890abcdef12345678',
    )
    expect(result).toBe(false)
  })
  it('retuns false if the empty string is passed instead of ethereum address', async () => {
    const result = validateEthAddress(' ')
    expect(result).toBe(false)
  })
  it('returns true if the address entered in capital letters', async () => {
    const result = validateEthAddress(
      '0XD3FCC84644DDD6B96F7C741B1562B82F9E004DC7',
    )
    expect(result).toBe(true)
  })
  //
  //Testcases fot the starknet address validations
  //
  it('return true if the starknet address is valid', async () => {
    const result = validateSnAddress(
      '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    )
    expect(result).toBe(true)
  })
  it('return false if length is  greater than starknet address', async () => {
    const result = validateSnAddress(
      '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e0004e4e4e4e',
    )
    expect(result).toBe(false)
  })
  it('Returns true if the zero address', async () => {
    const result = validateSnAddress(
      '0x0000000000000000000000000000000000000000000000000000000000',
    )
    expect(result).toBe(true)
  })
  it('returns false if starknet address with characters outside the hexadecimal set', async () => {
    const result = validateSnAddress(
      '0x123g567890abcdef1234567890abcdef1234567812312312312eddcdff',
    )
    expect(result).toBe(false)
  })
  it('retuns false if the empty string is passed instead of starknet address', async () => {
    const result = validateSnAddress('')
    expect(result).toBe(false)
  })
  it('return false if block number is a number but string', async () => {
    const result = validateBlockNumber('123')
    expect(result).toBe(false)
  })
  it('return true if block number is a hex number as string', async () => {
    const result = validateBlockNumber('0x123')
    expect(result).toBe(true)
  })
  it('return false if block number is a number not string', async () => {
    const result = validateBlockNumber(123)
    expect(result).toBe(false)
  }),
    it('return false if block number is a negative number', async () => {
      const result = validateBlockNumber(-123)
      expect(result).toBe(false)
    })
  it('return false if block number is a decimal number', async () => {
    const result = validateBlockNumber(123.123)
    expect(result).toBe(false)
  })
})

describe('Validate block number', () => {
  it('should return false if block number is a valid number', () => {
    const result = validateBlockNumber(999)

    expect(result).toBe(false)
  })

  it("should return true if block number is the string 'latest'", () => {
    const result = validateBlockNumber('latest')

    expect(result).toBe(true)
  })

  it("should return true if block number is the string 'pending'", () => {
    const result = validateBlockNumber('pending')

    expect(result).toBe(true)
  })

  it('should return false if block number is less than 0', () => {
    const result = validateBlockNumber(-1)

    expect(result).toBe(false)
  })

  it("should return false if block number is a string other than 'latest' and 'pending'", () => {
    const result = validateBlockNumber('finalized')

    expect(result).toBe(false)
  })
})

describe('validateEthEstimateGasParameters', () => {
  test('should return true for valid parameters', () => {
    const parameters = {
      from: '0x5825aa76d2CF03cB9E6204C0F374D1fD57464C0c',
      data: '0x76971d7f00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002004718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d0219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000307df59df7981e414f056959a263b3efcc28bd48ed066853771ceb18aebdb27f10000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000000000000',
      to: '0x0000000000000000000000004645415455524553',
      value: '0x0',
      type: '0x2',
    }

    const result = validateEthEstimateGasParameters(parameters)
    expect(result).toBe(true)
  })
  test('should return false for invalid parameters', () => {
    const parameters = {
      from: '0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
      to: '0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc6',
      value: 'invalid_value',
      data: '0x1234',
    }
    const result = validateEthEstimateGasParameters(parameters)
    expect(result).toBe(false)
  })
  test('should return true for unknown fields', () => {
    const parameters = {
      to: '0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc6',
      value: '0x1',
      data: '0x1234',
      unknownField: 'some_value',
      foo: 'bar',
    }
    const result = validateEthEstimateGasParameters(parameters)
    expect(result).toBe(true)
  })
  test('should return true with no fields', () => {
    const parameters = {}
    const result = validateEthEstimateGasParameters(parameters)
    expect(result).toBe(true)
  })
  test('should return true for valid parameter object with all fields', () => {
    const validParams = {
      type: '0x2',
      nonce: '0x1a',
      to: '0x742d35cc6672c0532925a3b8d84c3c6c48fd0630',
      from: '0x742d35cc6672c0532925a3b8d84c3c6c48fd0630',
      value: '0xff',
      data: '0xa9059cbb',
      gasPrice: '0x3b9aca00',
      maxFeePerGas: '0x3b9aca00',
      maxPriorityFeePerGas: '0x77359400',
    }

    expect(validateEthEstimateGasParameters(validParams)).toBe(true)
  })

  test('should return true for minimal valid parameter object', () => {
    const minimalParams = {
      to: '0x742d35cc6672c0532925a3b8d84c3c6c48fd0630',
    }

    expect(validateEthEstimateGasParameters(minimalParams)).toBe(true)
  })

  test('should return true when optional fields are undefined', () => {
    const paramsWithUndefined = {
      to: '0x742d35cc6672c0532925a3b8d84c3c6c48fd0630',
      type: undefined,
      nonce: undefined,
      from: undefined,
      value: undefined,
      data: undefined,
      gasPrice: undefined,
      maxFeePerGas: undefined,
      maxPriorityFeePerGas: undefined,
    }

    expect(validateEthEstimateGasParameters(paramsWithUndefined)).toBe(true)
  })

  test('should return true when optional fields are null', () => {
    const paramsWithNull = {
      to: '0x742d35cc6672c0532925a3b8d84c3c6c48fd0630',
      type: null,
      nonce: null,
      from: null,
      value: null,
      data: null,
      gasPrice: null,
      maxFeePerGas: null,
      maxPriorityFeePerGas: null,
    }

    expect(validateEthEstimateGasParameters(paramsWithNull)).toBe(true)
  })

  test('should return false for non-object types', () => {
    const invalidTypes = [
      'string',
      123,
      true,
      false,
      null,
      undefined,
      Symbol('test'),
      () => {},
    ]

    invalidTypes.forEach(value => {
      expect(validateEthEstimateGasParameters(value)).toBe(false)
    })
  })

  test('should return false for arrays', () => {
    const arrayParams = ['0x742d35cc6672c0532925a3b8d84c3c6c48fd0630', '0x1']
    expect(validateEthEstimateGasParameters(arrayParams)).toBe(false)
  })

  test('should return false for invalid type field', () => {
    const invalidTypeParams = [
      { type: 'invalid' },
      { type: '0x' },
      { type: '0x123' }, // too long
      { type: '0xgg' }, // invalid hex
      { type: 123 }, // not string
      { type: '' },
    ]

    invalidTypeParams.forEach(params => {
      expect(validateEthEstimateGasParameters(params)).toBe(false)
    })
  })

  test('should return true for valid type field', () => {
    const validTypeParams = [
      { type: '0x0' },
      { type: '0x1' },
      { type: '0x2' },
      { type: '0xa' },
      { type: '0xf' },
      { type: '0x10' },
      { type: '0xff' },
    ]

    validTypeParams.forEach(params => {
      expect(validateEthEstimateGasParameters(params)).toBe(true)
    })
  })

  test('should return false for invalid nonce field', () => {
    const invalidNonceParams = [
      { nonce: 'invalid' },
      { nonce: '0x' },
      { nonce: '0xgg' }, // invalid hex
      { nonce: 123 }, // not string
      { nonce: '' },
    ]

    invalidNonceParams.forEach(params => {
      expect(validateEthEstimateGasParameters(params)).toBe(false)
    })
  })

  test('should return true for valid nonce field', () => {
    const validNonceParams = [
      { nonce: '0x1' },
      { nonce: '0xa' },
      { nonce: '0xff' },
      { nonce: '0x1a2b' },
    ]

    validNonceParams.forEach(params => {
      expect(validateEthEstimateGasParameters(params)).toBe(true)
    })
  })

  test('should return false for invalid to field', () => {
    const invalidToParams = [
      { to: 'invalid' },
      { to: '0x123' }, // too short
      { to: '0x742d35cc6672c0532925a3b8d84c3c6c48fd063012345' }, // too long
      { to: '742d35cc6672c0532925a3b8d84c3c6c48fd0630' }, // no 0x prefix
      { to: '0xgg2d35cc6672c0532925a3b8d84c3c6c48fd0630' }, // invalid hex
      { to: 123 }, // not string
      { to: '' },
    ]

    invalidToParams.forEach(params => {
      expect(validateEthEstimateGasParameters(params)).toBe(false)
    })
  })

  test('should return true for valid to field', () => {
    const validToParams = [
      { to: '0x742d35cc6672c0532925a3b8d84c3c6c48fd0630' },
      { to: '0x0000000000000000000000000000000000000000' },
      { to: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF' },
    ]

    validToParams.forEach(params => {
      expect(validateEthEstimateGasParameters(params)).toBe(true)
    })
  })

  test('should return false for invalid from field', () => {
    const invalidFromParams = [
      { from: 'invalid' },
      { from: '0x123' }, // too short
      { from: '742d35cc6672c0532925a3b8d84c3c6c48fd0630' }, // no 0x prefix
      { from: 123 }, // not string
    ]

    invalidFromParams.forEach(params => {
      expect(validateEthEstimateGasParameters(params)).toBe(false)
    })
  })

  test('should return false for invalid value field', () => {
    const invalidValueParams = [
      { value: 'invalid' },
      { value: '0x' },
      { value: '0xgg' }, // invalid hex
      { value: 123 }, // not string
      { value: '' },
      { value: '0x0a' }, // starts with 0
    ]

    invalidValueParams.forEach(params => {
      expect(validateEthEstimateGasParameters(params)).toBe(false)
    })
  })

  test('should return true for valid value field', () => {
    const validValueParams = [
      { value: '0x1' },
      { value: '0xa' },
      { value: '0xff' },
      { value: '0x1a2b3c4d' },
    ]

    validValueParams.forEach(params => {
      expect(validateEthEstimateGasParameters(params)).toBe(true)
    })
  })

  test('should return false for invalid data field', () => {
    const invalidDataParams = [
      { data: 'invalid' },
      { data: 'a9059cbb' }, // no 0x prefix
      { data: '0xgg' }, // invalid hex
      { data: 123 }, // not string
    ]

    invalidDataParams.forEach(params => {
      expect(validateEthEstimateGasParameters(params)).toBe(false)
    })
  })

  test('should return true for valid data field', () => {
    const validDataParams = [
      { data: '0x' }, // empty data is valid
      { data: '0xa9059cbb' },
      {
        data: '0xa9059cbb0000000000000000000000008b4ee3f7a16ed6b793bd7907f87778ac11624c27',
      },
      { data: '0x0' },
      { data: '0x1234567890abcdef' },
    ]

    validDataParams.forEach(params => {
      expect(validateEthEstimateGasParameters(params)).toBe(true)
    })
  })

  test('should return false for invalid gasPrice field', () => {
    const invalidGasPriceParams = [
      { gasPrice: 'invalid' },
      { gasPrice: '0x' },
      { gasPrice: 123 }, // not string
      { gasPrice: '0x0a' }, // starts with 0
    ]

    invalidGasPriceParams.forEach(params => {
      expect(validateEthEstimateGasParameters(params)).toBe(false)
    })
  })

  test('should return false for invalid maxFeePerGas field', () => {
    const invalidMaxFeeParams = [
      { maxFeePerGas: 'invalid' },
      { maxFeePerGas: '0x' },
      { maxFeePerGas: 123 }, // not string
      { maxFeePerGas: '0x0a' }, // starts with 0
    ]

    invalidMaxFeeParams.forEach(params => {
      expect(validateEthEstimateGasParameters(params)).toBe(false)
    })
  })

  test('should return false for invalid maxPriorityFeePerGas field', () => {
    const invalidMaxPriorityParams = [
      { maxPriorityFeePerGas: 'invalid' },
      { maxPriorityFeePerGas: '0x' },
      { maxPriorityFeePerGas: 123 }, // not string
      { maxPriorityFeePerGas: '0x0a' }, // starts with 0
    ]

    invalidMaxPriorityParams.forEach(params => {
      expect(validateEthEstimateGasParameters(params)).toBe(false)
    })
  })

  test('should return true for valid gas-related fields', () => {
    const validGasParams = [
      { gasPrice: '0x1' },
      { gasPrice: '0xa' },
      { gasPrice: '0x3b9aca00' },
      { maxFeePerGas: '0x1' },
      { maxFeePerGas: '0x3b9aca00' },
      { maxPriorityFeePerGas: '0x1' },
      { maxPriorityFeePerGas: '0x77359400' },
    ]

    validGasParams.forEach(params => {
      expect(validateEthEstimateGasParameters(params)).toBe(true)
    })
  })

  test('should return true for object with extra unknown fields', () => {
    const paramsWithExtra = {
      to: '0x742d35cc6672c0532925a3b8d84c3c6c48fd0630',
      unknownField: 'some value',
      anotherField: 123,
    }

    expect(validateEthEstimateGasParameters(paramsWithExtra)).toBe(true)
  })

  describe('validateValue', () => {
    test('should return false for undefined value', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = validateValue(undefined as any)
      expect(result).toBe(false)
    })

    test('should return false for null value', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = validateValue(null as any)
      expect(result).toBe(false)
    })

    test('should throw error for invalid hex string', () => {
      expect(() => validateValue('invalid')).toThrow('Invalid hex string input')
    })

    test('should throw error for hex string without 0x prefix', () => {
      expect(() => validateValue('ff')).toThrow('Invalid hex string input')
    })

    test('should return false for valid hex value smaller than max uint256', () => {
      const result = validateValue('0x1')
      expect(result).toBe(false)
    })

    test('should return false for max uint256 value', () => {
      const result = validateValue(
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      )
      expect(result).toBe(false)
    })

    test('should return true for value greater than max uint256', () => {
      const result = validateValue(
        '0x10000000000000000000000000000000000000000000000000000000000000000',
      )
      expect(result).toBe(true)
    })

    test('should return false for zero value', () => {
      const result = validateValue('0x0')
      expect(result).toBe(false)
    })

    test('should return false for small hex values', () => {
      const result = validateValue('0xff')
      expect(result).toBe(false)
    })

    test('should handle large valid hex strings correctly', () => {
      const largeValue = '0x' + 'f'.repeat(65) // One character longer than max uint256
      const result = validateValue(largeValue)
      expect(result).toBe(true)
    })

    describe('validateHexString', () => {
      test('should return true for valid hex strings with 0x prefix', () => {
        const validHexStrings = [
          '0x0',
          '0x1',
          '0xa',
          '0xf',
          '0x123',
          '0xabc',
          '0xABC',
          '0x123abc',
          '0xABC123',
          '0x0123456789abcdefABCDEF',
          '0xff',
          '0xFF',
          '0x1234567890abcdef',
        ]

        validHexStrings.forEach(hex => {
          expect(validateHexString(hex)).toBe(true)
        })
      })

      test('should return false for strings without 0x prefix', () => {
        const invalidHexStrings = ['123', 'abc', 'ff', '0', '1234567890abcdef']

        invalidHexStrings.forEach(hex => {
          expect(validateHexString(hex)).toBe(false)
        })
      })

      test('should return false for strings with only 0x prefix', () => {
        expect(validateHexString('0x')).toBe(false)
      })

      test('should return false for strings with invalid hex characters', () => {
        const invalidHexStrings = [
          '0xg',
          '0x123g',
          '0xz',
          '0x123z456',
          '0x!@#',
          '0x 123',
          '0x123 456',
        ]

        invalidHexStrings.forEach(hex => {
          expect(validateHexString(hex)).toBe(false)
        })
      })

      test('should return false for non-string types', () => {
        const nonStringValues = [
          123,
          0x123,
          true,
          false,
          null,
          undefined,
          {},
          [],
          Symbol('test'),
          () => {},
        ]

        nonStringValues.forEach(value => {
          expect(validateHexString(value)).toBe(false)
        })
      })

      test('should return false for empty string', () => {
        expect(validateHexString('')).toBe(false)
      })

      test('should return false for strings with wrong prefix', () => {
        const wrongPrefixStrings = ['x123', '0X123', '0y123', '00x123']

        wrongPrefixStrings.forEach(hex => {
          expect(validateHexString(hex)).toBe(false)
        })
      })

      test('should handle case sensitivity correctly', () => {
        expect(validateHexString('0xabcDEF123')).toBe(true)
        expect(validateHexString('0xABCdef123')).toBe(true)
        expect(validateHexString('0x0123456789abcdefABCDEF')).toBe(true)
      })
    })
  })
})

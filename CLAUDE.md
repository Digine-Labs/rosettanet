# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rosettanet is an Ethereum-to-Starknet RPC middleware that translates Ethereum JSON-RPC requests into Starknet RPC calls and formats responses back to Ethereum format. This enables users to interact with Starknet using existing EVM wallets (MetaMask, etc.) and libraries (ethers, web3.js).

**Key Concept**: Rosettanet is NOT a Starknet node—it's a translation layer that requires a working Starknet node connection.

## Essential Commands

### Development
```bash
npm run start:dev          # Start with nodemon hot reload
npm start                  # Direct start without hot reload
```

### Testing
```bash
npm test                   # Run all unit tests with Jest
npm run test:watch         # Run tests in watch mode
npm run test:utils         # Watch tests for utilities
npm run test:converters    # Watch tests for converters
npm run test:e2e           # Run end-to-end tests (starts Starknet devnet)
npm run test:e2e:specific  # Run specific e2e tests
```

### Code Quality
```bash
npm run lint               # Run ESLint
npm run format             # Format code with Prettier
npm run clean              # Clean dist directory
```

### Development with Logging
```bash
npm run start:console-logging        # Enable console logging
npm run start:file-logging           # Log to file
npm run start:dev:console-sniff      # Console logging with request sniffer
npm run start:dev:file-sniff         # File logging with request sniffer
npm run start:dev:console-error-sniffer  # Log errors only to console
```

## Architecture

### Core Components

**[src/index.ts](src/index.ts)** - Entry point that:
1. Initializes configuration from `config.json`
2. Syncs initial block number and gas price
3. Starts background sync processes
4. Starts Express server

**[src/server.ts](src/server.ts)** - Express server that:
- Handles JSON-RPC 2.0 requests (POST only)
- Supports both single and batch requests
- Parses `text/plain` and missing Content-Type headers
- Routes to appropriate RPC handlers

**[src/rpc/calls.ts](src/rpc/calls.ts)** - Central RPC router:
- Maps Ethereum RPC method names to handlers (e.g., `eth_chainId`, `eth_getBalance`)
- Handles special `starknet_*` methods directly (early exit)
- Returns JSON-RPC 2.0 compliant responses/errors
- All RPC implementations are in `src/rpc/calls/*.ts`

**[src/cache/](src/cache/)** - Background sync system:
- `blockNumber.ts` - Syncs Starknet block height every 10 seconds
- `gasPrice.ts` - Syncs gas prices every 10 seconds
- Used to provide faster responses for common queries

### Translation Layer

**[src/utils/rosettanet.ts](src/utils/rosettanet.ts)** - Rosettanet account operations:
- `getRosettaAccountAddress()` - Precalculates Starknet account address from Ethereum address
- `deployRosettanetAccount()` - Deploys Cairo account contract that verifies Ethereum signatures
- `getRosettanetAccountNonce()` - Fetches nonce from deployed account
- `parseRosettanetRawCalldata()` - Decodes transaction data from Cairo calldata format

**[src/utils/converters/](src/utils/converters/)** - Data format converters:
- `integer.ts` - Converts between Ethereum and Starknet number formats (U256 ↔ Uint256)
- `abiFormatter.ts` - Transforms ABIs between formats

**[src/utils/](src/utils/)** - Core utilities:
- `calldata.ts` - Constructs Cairo calldata from Ethereum transaction data
- `transaction.ts` - Transaction format conversions
- `signature.ts` - Signature handling and validation
- `gas.ts` - Gas estimation and resource bound calculations
- `resourceBounds.ts` - Converts gas limits to Starknet v3 resource bounds
- `starknet.ts` - Starknet-specific utilities
- `wrapper.ts` - Response formatting helpers
- `callHelper.ts` - Makes RPC calls to underlying Starknet node

## Configuration

**[config.json](config.json)** - Runtime configuration:
- `port`, `host` - Server settings
- `rpcUrls` - Starknet RPC endpoints (array for fallback)
- `chainId` - Ethereum-style chain ID (e.g., `0x52535453`)
- `accountClass` - Cairo account contract class hash
- `rosettanet` - Rosettanet factory contract address
- `ethAddress`, `strkAddress` - Token contract addresses
- `validateFeeEstimator` - Contract for fee estimation
- `logging` - Configure logging behavior (active, sniffer, output type, severity)

**[config.test.json](config.test.json)** - Test environment configuration

## Testing

**Unit Tests** ([tests/](tests/)):
- Use Jest with ts-jest preset
- Setup file: `tests/setup.ts`
- Test utilities in `tests/utils/`
- Converters tested in `tests/utils/converters/`

**E2E Tests** ([e2e/](e2e/)):
- Require Starknet devnet running on port 6050
- Script `scripts/e2e_tests.sh` starts devnet, runs tests, cleans up
- Use Jest with custom config: `e2e/jest.config.ts`
- Include account registration, deployment, and transaction flow tests

## Key Patterns

### Adding a New RPC Method

1. Create handler in `src/rpc/calls/<methodName>.ts`:
```typescript
export async function myMethodHandler(request: RPCRequest): Promise<RPCResponse | RPCError> {
  // Parse params
  // Call Starknet via callHelper
  // Transform response to Ethereum format
  // Return RPCResponse or RPCError
}
```

2. Register in `src/rpc/calls.ts`:
```typescript
import { myMethodHandler } from './calls/myMethod'
Methods.set('eth_myMethod', {
  method: 'eth_myMethod',
  handler: myMethodHandler,
})
```

### Calling Starknet RPC

Use `callStarknet()` from `src/utils/callHelper.ts`:
```typescript
const response: RPCResponse | StarknetRPCError = await callStarknet({
  jsonrpc: '2.0',
  method: 'starknet_call',
  params: [...],
  id: 1,
})

if (isStarknetRPCError(response)) {
  // Handle error
}
```

### Type Guards

Always use type guards from `src/types/typeGuards.ts`:
- `isRPCResponse()`, `isRPCError()` - Check response types
- `isStarknetRPCError()` - Check Starknet errors
- `isSignedRawTransaction()` - Validate transaction format

## Important Notes

- Rosettanet uses **Cairo account contracts** that verify Ethereum signatures on Starknet
- Transaction flow: Ethereum transaction → Rosettanet calldata → Cairo account → Starknet execution
- Block numbers and gas prices are cached—use `getCachedBlockNumber()` and `getCachedGasPrice()` for performance
- Logger (`src/logger.ts`) supports console/file output and request sniffing—check severity levels (0=info, 1=warning, 2=error)
- Starknet uses resource bounds (v3 transactions) instead of simple gas limits—see `getDeploymentResourceBounds()` and `getResourceBounds()`
- Configuration is loaded once at startup via `initConfig()` and accessed via `getConfigurationProperty()`

## Documentation

- [docs/Infura_JSON_RPC_methods.md](docs/Infura_JSON_RPC_methods.md) - Ethereum JSON-RPC method reference
- [docs/architecture.png](docs/architecture.png) - High-level architecture diagram
- [README.md](README.md) - Project overview and contributor information

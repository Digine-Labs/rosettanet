import axios from 'axios'
import { getDevAccount, getEthStrkHolderAccount, sendERC20FromSnAccount, SERVER } from '../utils'
import { registerContractIfNotRegistered } from '../registry/rosettanet'
import { ETH_ADDRESS, SN_ADDRESS_TEST_1 } from '../constants'
import { encodeCalldata } from '../calldata'
import { getAddress } from '../registers'
/*
Parameters

Object - The transaction call object
from: DATA, 20 Bytes - (optional) The address the transaction is sent from.
to: DATA, 20 Bytes - The address the transaction is directed to.
gas: QUANTITY - (optional) Integer of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions.
gasPrice: QUANTITY - (optional) Integer of the gasPrice used for each paid gas
value: QUANTITY - (optional) Integer of the value sent with this transaction
input: DATA - (optional) Hash of the method signature and encoded parameters. For details see Ethereum Contract ABI in the Solidity documentation(opens in a new tab).
QUANTITY|TAG - integer block number, or the string "latest", "earliest", "pending", "safe" or "finalized", see the default block parameter
*/
describe('eth_call RPC method', () => {
    test.only('Should return ETH balance of the account in EVM format. Input in input prop', async () => {
        const testAccount = await getAddress('TEST1');
        const ethToken = await getAddress('ETH');

        const calldata = encodeCalldata('balanceOf(address)', [testAccount.ethereum])

        const response = await axios.post(SERVER, {
            jsonrpc: '2.0',
            method: 'eth_call',
            params: [{to: ethToken.ethereum, input: calldata}, 'latest'],
            id: 1,
        })
        
        expect(response.status).toBe(200)
        expect(response.data.result).toBeDefined()
        expect(response.data.result).toBe('0x00000000000000000000000000000000000000000000000000053184796409f4')
        expect(response.data.jsonrpc).toBe('2.0')
        expect(response.data.id).toBe(1)
    }, 30000)

    test.only('Should return ETH balance of the account in EVM format. Input in data prop', async () => {
        const testAccount = await getAddress('TEST1');
        const ethToken = await getAddress('ETH');

        const calldata = encodeCalldata('balanceOf(address)', [testAccount.ethereum])
        const response = await axios.post(SERVER, {
            jsonrpc: '2.0',
            method: 'eth_call',
            params: [{to: ethToken.ethereum, data: calldata}, 'latest'],
            id: 1,
        })
        
        expect(response.status).toBe(200)
        expect(response.data.result).toBeDefined()
        expect(response.data.result).toBe('0x00000000000000000000000000000000000000000000000000053184796409f4')
        expect(response.data.jsonrpc).toBe('2.0')
        expect(response.data.id).toBe(1)
    }, 30000)

    test.only('no input field. must return 0x', async () => {
        const ethToken = await getAddress('ETH');
        const response = await axios.post(SERVER, {
            jsonrpc: '2.0',
            method: 'eth_call',
            params: [{to: ethToken.ethereum}, 'latest'],
            id: 1,
        })
        
        expect(response.status).toBe(200)
        expect(response.data.result).toBeDefined()
        expect(response.data.result).toBe('0x')
        expect(response.data.jsonrpc).toBe('2.0')
        expect(response.data.id).toBe(1)
    }, 30000)
    // TODO: add test cases with using some params optional and some not
})
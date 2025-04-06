import { getDevAccount, sendStrksFromSnAccount, SERVER } from '../utils'
import { precalculateStarknetAddress, registerContractIfNotRegistered } from '../registry/rosettanet'
import { ethers } from 'ethers';
import { ETH_ADDRESS, STRK_ADDRESS } from '../constants';

const snAddress =
  '0x06419f7dea356b74bc1443bd1600ab3831b7808d1ef897789facfad11a172da7'
describe('Using ethers.js with Rosettanet RPC', () => {
    test.only('Retrive balance of the account', async () => {
        const ethAddress = await registerContractIfNotRegistered(
            getDevAccount(),
            snAddress,
          );
        const provider = new ethers.JsonRpcProvider(SERVER);
        const balanceWei = await provider.getBalance(ethAddress);
  
        // Convert balance to Ether string
        const balanceEther = ethers.formatEther(balanceWei);
        expect(balanceEther).toBe("249.210533684940172681")
    }, 30000)

    test.only('Retrive eth balance using erc20 contract', async () => {
        const ethAddress = await registerContractIfNotRegistered(
            getDevAccount(),
            snAddress,
          );
        const ethTokenAddress = await registerContractIfNotRegistered(getDevAccount(), ETH_ADDRESS);
        const provider = new ethers.JsonRpcProvider(SERVER);
        const ERC20_ABI = [
            'function balanceOf(address owner) view returns (uint256)',
            'function decimals() view returns (uint8)'
          ];
        const tokenContract = new ethers.Contract(ethTokenAddress, ERC20_ABI, provider);
        
        // Get balance
        const balance = await tokenContract.balanceOf(ethAddress);
        
        // Get token decimals
        const decimals = await tokenContract.decimals();
        expect(balance).toBe(BigInt(1461819925596660))
        expect(decimals).toBe(BigInt(18))
    }, 30000)

    test.only('Sends simple STRK transfer transaction. This may deploy account contract initially.', async () => {
        const provider = new ethers.JsonRpcProvider(SERVER);

        // Fund initial address first
        const devAcc = getDevAccount();
        const precalculatedSnAddress = await precalculateStarknetAddress('0xAE97807Cf37BeF18e8347aD7B47658d6d96c503D');
        await sendStrksFromSnAccount(devAcc, precalculatedSnAddress, '100000000000000000000') // sends 100 strk


        const privateKey = '0x9979f9c93cbca19e905a21ce4d6ee9233948bcfe67d95c11de664ebe4b78c505'; // 0xAE97807Cf37BeF18e8347aD7B47658d6d96c503D
        const wallet = new ethers.Wallet(privateKey, provider);


        const toAddress = '0x8b4ee3F7a16ed6b793BD7907f87778AC11624c27';

        const tx = await wallet.sendTransaction({
            to: toAddress,
            value: ethers.parseEther('1.0')  // 1 STRK
          });
        
          console.log('Transaction sent! Hash:', tx.hash);
        
          // Wait for the transaction to be mined
          await tx.wait();

          const ERC20_ABI = [
            'function balanceOf(address owner) view returns (uint256)',
            'function decimals() view returns (uint8)'
          ];
          const strkTokenAddress = await registerContractIfNotRegistered(getDevAccount(), STRK_ADDRESS);
        const strkContract = new ethers.Contract(strkTokenAddress, ERC20_ABI, provider);

        const balance = await strkContract.balanceOf(toAddress);

        expect(balance).toBe(ethers.parseEther('1.0'))
        
    })

    test.only('ERC20 transfer transaction. This may deploy account contract initially.', async () => {
        
    })

    test.only('ERC20 transfer transaction. From already deployed account contract.', async () => {
        
    })

    test.only('Multicall transaction that transfers erc20 to two different accounts', async () => {
        
    })
})
import { Wallet } from 'ethers';

const PRIVATE_KEY = '0x72dd28749115344b785e66ec88f439471e10895693b6d659aaa8264f30272212'
// const ETH_ADDRESS = '0x188669dbc25577B33d3eEFe1030bB7134bbaeC2A';

export function getTestAccount(): Wallet {
    const signer = new Wallet(PRIVATE_KEY);

    return signer;
}
/* eslint-disable @typescript-eslint/no-unused-vars */

const CONTRACT_ADDRESS = {
    "goerli" : "0x0491e3b69bea8f0a8a65e37425d10ebc91f889b7bddc9fcb26886cd0518111b4",
    "mainnet": ""
}
export async function getEthAddressFromSnAddress(
  ethAddress: string,
): Promise<string> {
  // TODO: Will returns value directly from contract
  // Will be completed https://github.com/keep-starknet-strange/rosettanet/issues/28
  return '0'
}

export async function getSnAddressFromEthAddress(
  snAddress: string,
): Promise<string> {
  // TODO: Will returns value directly from contract
  // Will be completed https://github.com/keep-starknet-strange/rosettanet/issues/28
  return '0'
}

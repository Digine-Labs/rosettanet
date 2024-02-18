export const mainnetRpc = [
  'https://free-rpc.nethermind.io/mainnet-juno',
  'https://starknet-mainnet.public.blastapi.io',
  'https://rpc.starknet.lava.build',
  'https://starknet.drpc.org',
]
export const testnetRpc = [
  'https://free-rpc.nethermind.io/goerli-juno',
  'https://starknet-testnet.public.blastapi.io',
  'https://rpc.starknet-testnet.lava.build',
  'https://starknet-testnet.drpc.org',
]

export const getRpc = (network?: string): string => {
  //TODO: NETWORK STRING TO TYPE

  if (network === 'testnet') {
    const rpc = testnetRpc[Math.floor(Math.random() * testnetRpc.length)]
    return rpc
  }

  const rpc = mainnetRpc[Math.floor(Math.random() * mainnetRpc.length)]
  return rpc
}

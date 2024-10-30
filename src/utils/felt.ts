// Returns array of hexdecimal strings splitted into specified chunksize.
export function convertHexChunkIntoFeltArray(chunk: string): Array<string> {
  const chunkSize = 62 // Reduce to 62 if it can be higher than felt252 limit
  let hex = chunk
  if (chunk.indexOf('0x') > -1) {
    hex = chunk.slice(2)
  }

  const chunks: Array<string> = []

  for (let i = 0; i < hex.length; i += chunkSize) {
    chunks.push(`0x${hex.slice(i, i + chunkSize)}`)
  }

  return chunks
}

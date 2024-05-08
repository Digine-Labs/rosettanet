export function getFunctionSelectorFromCalldata(calldata: string): string {
  // 0xa9059cbb
  if (calldata.length < 10) {
    return '0x0' // empty calldata
  }

  return calldata.substring(0, 9)
}

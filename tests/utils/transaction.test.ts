import { prepareRosettanetCalldata } from '../../src/utils/transaction'

describe('Test preparing rosettanet calldata', () => {
  it('Prepares calldata with empty input', async () => {
    const to = ``
    const nonce = ``
    const max_priority_fee_per_gas = ``
    const max_fee_per_gas = ``
    const gas_limit = ``
    const value = ``
    const input: Array<string> = []
    const directives: Array<boolean> = []

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const calldata = prepareRosettanetCalldata(
      to,
      nonce,
      max_priority_fee_per_gas,
      max_fee_per_gas,
      gas_limit,
      value,
      input,
      directives,
    )
  })
})

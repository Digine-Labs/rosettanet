import { initConfig } from "../../src/utils/configReader";
import { getAccountNonce } from "../../src/utils/starknet";

  describe('Get account nonce', () => {
    it('Get deployed address nonce', async () => {
        await initConfig('config.json')
        const snAddress = '0x04c378d2c1c1c4cbfa9e9b046af6dcadab2c77f8b2669bf197f4321d4d59a554';
        await getAccountNonce(snAddress)

    })

    it('Get non-deployed address nonce', async () => {
        await initConfig('config.json')
        const snAddress = '0x04c378d2c1c1c4cbfa9e9b046af6dcadab2c77f8b2669bf197f4321d4d59a444';
        const result = await getAccountNonce(snAddress)
        expect(result).toBe('0x0');
    })

    it('Get nonce zero address', async () => {
        await initConfig('config.json')
        const snAddress = '0x0';
        const result = await getAccountNonce(snAddress)

        expect(result).toBe('0x0');
    })
  })
  
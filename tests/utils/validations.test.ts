import { validateEthAddress, validateSnAddress } from "../../src/utils/validations"

describe("Test Address validations", ()=>{
    it("return true if the ethereum address is valid", async () => {
       const result= validateEthAddress("0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc7")
       expect(result).toBe(true)
    })
    it("return false if length is either greater or less of ethereum address" , async()=>{
        const result=validateEthAddress("0xd3fcc84644ddd6b96f7c741b1562b82f9e004dc77")
        expect(result).toBe(false)
    })
    it("Returns true if the zero address",async()=>{
        const result=validateEthAddress("0x0000000000000000000000000000000000000000")
        expect(result).toBe(true)
    })
    it("returns false if ethereum address with characters outside the hexadecimal set", async()=>{
        const result=validateEthAddress("0x123g567890abcdef1234567890abcdef12345678")
        expect(result).toBe(false)
    })
    it("retuns false if the empty string is passed instead of ethereum address",async()=>{
        const result=validateEthAddress(" ")
        expect(result).toBe(false)
    })
    it("return true if the starknet address is valid", async () => {
        const result= validateSnAddress("0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7")
        expect(result).toBe(true)
     })
     it("return false if length is  greater than starknet address" , async()=>{
         const result=validateSnAddress("0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e0004e4e4e4e")
         expect(result).toBe(false)
     })
     it("Returns true if the zero address",async()=>{
         const result=validateSnAddress("0x0000000000000000000000000000000000000000000000000000000000")
         expect(result).toBe(true)
     })
     it("returns false if starknet address with characters outside the hexadecimal set", async()=>{
         const result=validateSnAddress("0x123g567890abcdef1234567890abcdef1234567812312312312eddcdff")
         expect(result).toBe(false)
     })
     it("retuns false if the empty string is passed instead of starknet address",async()=>{
         const result=validateSnAddress(" ")
         expect(result).toBe(false)
     })

})
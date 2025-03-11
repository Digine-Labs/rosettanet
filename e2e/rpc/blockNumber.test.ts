import axios from "axios";
import { SERVER } from "../utils";


    test.only("get chain id", async () => {
        const response = await axios.post(SERVER, {
            jsonrpc: "2.0",
            method: "eth_blockNumber",
            params: [],
            id: 1,
        });
        expect(response.status).toBe(200);
        expect(response.data.result).not.toBeUndefined();
        expect(response.data.result).toBe("0x129c19")
        return;
    }, 30000)




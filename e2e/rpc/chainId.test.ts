import axios from "axios";
import { SERVER } from "../utils";

    test.only("get chain id", async () => {
        const response = await axios.post(SERVER, {
            jsonrpc: "2.0",
            method: "eth_chainId",
            params: [],
            id: 1,
        });
        expect(response.status).toBe(200);
        expect(response.data.result).not.toBeUndefined();
        expect(response.data.result).toBe("0x52535453")
    }, 30000)




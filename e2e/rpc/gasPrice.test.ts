import axios from "axios";
import { SERVER } from "../utils";

test.only("gas price", async () => {
    // Todo: wait to sync first.
    const response = await axios.post(SERVER, {
        jsonrpc: "2.0",
        method: "eth_gasPrice",
        params: [],
        id: 1,
    });
    expect(response.status).toBe(200);
    expect(response.data.result).not.toBeUndefined();
    expect(response.data.result).toBe("0x52535453")
}, 30000)




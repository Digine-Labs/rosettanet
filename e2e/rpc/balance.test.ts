
import axios from "axios";
import { SERVER } from "../utils";

const snAddress = "0x06419f7dea356b74bc1443bd1600ab3831b7808d1ef897789facfad11a172da7"

test.only("balance request in array", async () => {
    // todo: deploy first
    const response = await axios.post(SERVER, {
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [snAddress, "latest"],
        id: 1,
    });
    //expect(response.status).toBe(200);
    //expect(response.data.result).toBe("0x199c82cc00")
}, 30000)



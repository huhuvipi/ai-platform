import { NetworkClient } from "./network_client";
import { NetworkEndpoint } from "./network_endpoint";
import { SummarizeRequest,SummarizeResponse } from "../models/dtos";

 export class NetworkServices {
    constructor() {
        this.networkClient = new NetworkClient();
    }

    async summarize(request) {
        console.log('NetworkServices.summarize request:', request);
        const endpoint = NetworkEndpoint.post('v1/summarize', request);
        const responseJson = await this.networkClient.request(endpoint);
        return new SummarizeResponse(responseJson);
    }
}
export default NetworkServices;
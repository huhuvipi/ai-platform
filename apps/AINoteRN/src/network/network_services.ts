import { NetworkClient } from "./network_client";
import { HttpMethod, NetworkEndpoint } from "./network_enpoint";
import { SummarizeRequest,SummarizeResponse } from "../models/dtos";

export  class NetworkServices {
    constructor(
    private readonly apiClient: NetworkClient = new NetworkClient(),
  ) {}

  async summarize(request: SummarizeRequest): Promise<SummarizeResponse> {
    return (this.apiClient as any).request<SummarizeResponse>(
      new NetworkEndpoint(
        "v1/summarize",
        HttpMethod.POST,
        {},
        {},
        request
      )
    );
  }
}
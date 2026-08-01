import {NetworkConfig, NetworkEnvironment} from '../network/network_config';
import { NetworkEndpoint } from './network_enpoint';
import {NetworkException} from './network_exception';

export class NetworkClient {
    
     async request<T>(endpoint: NetworkEndpoint): Promise<T> {
        const url = `${NetworkConfig.baseUrl()}/${endpoint.path}`;
        this.logRequest(endpoint.path, endpoint.method, endpoint.body);
        const options: RequestInit = {
            method: endpoint.method,
            headers: {...NetworkConfig.defaultHeaders(), ...endpoint.headers},
            body: endpoint.body ? JSON.stringify(endpoint.body) : undefined,
        };

        try {
            const controller = new AbortController();

      const timeout = setTimeout(() => {
        controller.abort();
      }, NetworkConfig.receiveTimeout);
      
            const response = await fetch(url, {...options, signal: controller.signal});

            clearTimeout(timeout);

            const responseBody = await response.json();

            if (!response.ok) {
                throw NetworkException.fromResponse(response.status, responseBody);
            }
            this.logResponse(endpoint.path, endpoint.method, responseBody);
            return responseBody as T;
        } catch (error) {
            if (error instanceof NetworkException) {
                throw error;
            }
            throw NetworkException.networkExceptionFromError(error);
        }
    }

    logRequest(endpoint: string, method: string, body?: any) {
        if (NetworkConfig.environment !== NetworkEnvironment.dev) {
            return;
        }
        console.log(`➡️ API Request: ${method} ${endpoint}`);
        if (body) {
            console.log(`➡️ API Request Body: ${JSON.stringify(body)}`);
        }
    }

    logResponse(endpoint: string, method: string, response: any) {
        console.log(`✅ API Response from ${method} ${endpoint}: ${JSON.stringify(response)}`);
    }
}
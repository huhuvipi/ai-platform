'use client';
import {NetworkConfig} from './network_config';
import { NetworkException } from './network_exception';
import { logger } from '../../utils/logger';

export class NetworkClient {
    async request(endpoint) {
        const url = `${NetworkConfig[NetworkConfig.environment].baseUrl}${endpoint.path}`;
        const headers = {
            ...NetworkConfig.defaultHeaders(),
            ...endpoint.headers,
        };

        const options = {
            method: endpoint.method,
            headers: headers,
            body: endpoint.body ? JSON.stringify(endpoint.body) : null,
        };

        logger.log('➡️ URL:', url);
        logger.log('➡️ header:', options.headers);
        logger.log('➡️ body:', options.body);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => 
                controller.abort(), 
                NetworkConfig.connectTimeout
            );
            options.signal = controller.signal;

            const response = await fetch(url, options);
            
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw NetworkException.fromResonse(response.status, await response.text());
            }
            logger.log('➡️ status:', response.status);
            const json = await response.json();
            logger.log('⬅️ raw response:', json);
            return json;
        } catch (error) {
            logger.error('❌ Network error:', error);
            if (error instanceof NetworkException) {
                throw error;
            } else {
                throw new NetworkException(NetworkExceptionType.NETWORK_ERROR, error.message);
            }
        }
    }
}

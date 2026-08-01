import {Platform} from 'react-native';

export enum NetworkEnvironment {
    dev,
    prod ,
}

export class NetworkConfig {
    static environment: NetworkEnvironment = NetworkEnvironment.dev;
    static baseUrl() : string {
        return this.environment === NetworkEnvironment.prod ? this.proBaseUrl : this.devBaseUrl();
    }
    static devBaseUrl() : string {
        return Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
    }
    static proBaseUrl : string =  'https://api.example.com';

    static readonly connectTimeout = 15000;
    static readonly receiveTimeout = 30000;

    static defaultHeaders(): Record<string, string> {
        return {
            'Content-Type': 'application/json',
        };
    }
}
export const NetworkEnvironment = {
    dev: 'dev',
    staging: 'staging',
    prod: 'prod',
};


export const NetworkConfig = {
    connectTimeout: 15000,
    receiveTimeout: 30000,
    environment: NetworkEnvironment.dev,
    defaultHeaders() {
        return {
            'Content-Type': 'application/json',
        };
    },

    [NetworkEnvironment.dev]: {
        baseUrl: 'http://localhost:3000/',
    },
    [NetworkEnvironment.staging]: {
        baseUrl: 'https://staging.example.com/',
    },
    [NetworkEnvironment.prod]: {
        baseUrl: 'https://api.example.com',
    },

};  
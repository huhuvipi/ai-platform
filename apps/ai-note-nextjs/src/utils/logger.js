import { NetworkEnvironment } from "./../networkings/core/network_config";
export const logger = {
    log: (message, ...optionalParams) => {
        if (NetworkEnvironment.dev) {
            console.log(message, ...optionalParams);
        }
    },
    error: (message, ...optionalParams) => {
        if (NetworkEnvironment.dev) {
            console.error(message, ...optionalParams);
        }
    },
    warn: (message, ...optionalParams) => {
        if (NetworkEnvironment.dev) {
            console.warn(message, ...optionalParams);
        }
    }
};
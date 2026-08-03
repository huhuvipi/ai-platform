export const NetworkExceptionType = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST: 'BAD_REQUEST',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};


export  class NetworkException extends Error {
    type = NetworkExceptionType.UNKNOWN_ERROR;
    constructor(type, message) {
        super(message);
        this.type = type;
    }

    static fromResonse(status, message) {
        const type = NetworkException.mapStatusToType(status);
        const errorMessage = message || NetworkException.getDefaultMessage(type);
        switch (type) {
            case NetworkExceptionType.NETWORK_ERROR:
                return new NetworkException(NetworkExceptionType.NETWORK_ERROR, errorMessage);
            case NetworkExceptionType.TIMEOUT_ERROR:
                return new NetworkException(NetworkExceptionType.TIMEOUT_ERROR, errorMessage);
            case NetworkExceptionType.UNAUTHORIZED:
                return new NetworkException(NetworkExceptionType.UNAUTHORIZED, errorMessage);
            case NetworkExceptionType.FORBIDDEN:
                return new NetworkException(NetworkExceptionType.FORBIDDEN, errorMessage);
            case NetworkExceptionType.NOT_FOUND:
                return new NetworkException(NetworkExceptionType.NOT_FOUND, errorMessage);
            case NetworkExceptionType.INTERNAL_SERVER_ERROR:
                return new NetworkException(NetworkExceptionType.INTERNAL_SERVER_ERROR, errorMessage);
            case NetworkExceptionType.BAD_REQUEST:
                return new NetworkException(NetworkExceptionType.BAD_REQUEST, errorMessage);
            default:
                return new NetworkException(NetworkExceptionType.UNKNOWN_ERROR, errorMessage);
        }
    }

    static mapStatusToType(status) {
        switch (status) {
            case 400:
                return NetworkExceptionType.BAD_REQUEST;
            case 401:
                return NetworkExceptionType.UNAUTHORIZED;           
            case 403:
                return NetworkExceptionType.FORBIDDEN;
            case 404:
                return NetworkExceptionType.NOT_FOUND;
            case 500:
                return NetworkExceptionType.INTERNAL_SERVER_ERROR;
            default:
                return NetworkExceptionType.UNKNOWN_ERROR;
        }
    }

    static getDefaultMessage(type) {
        switch (type) {
            case NetworkExceptionType.NETWORK_ERROR:
                return 'Network error occurred. Please check your internet connection.';
            case NetworkExceptionType.TIMEOUT_ERROR:
                return 'Request timed out. Please try again later.';
            case NetworkExceptionType.UNAUTHORIZED:
                return 'Unauthorized access. Please check your credentials.';
            case NetworkExceptionType.FORBIDDEN:
                return 'Access forbidden. You do not have permission to access this resource.';
            case NetworkExceptionType.NOT_FOUND:
                return 'Resource not found. The requested resource could not be found.';
            case NetworkExceptionType.INTERNAL_SERVER_ERROR:
                return 'Internal server error occurred. Please try again later.';
            case NetworkExceptionType.BAD_REQUEST:
                return 'Bad request. Please check the request parameters.';
            default:
                return 'An unknown error occurred. Please try again later.';
        }
    }  
    
    static fromError(error) {
        if (error instanceof NetworkException) {
            return error;
        } else {
            return new NetworkException(NetworkExceptionType.UNKNOWN_ERROR, error.message);
        }
    }
            
}

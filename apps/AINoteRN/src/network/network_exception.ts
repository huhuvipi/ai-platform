
enum NetworkExceptionType {
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  timeout,
  server,
  decode,
  unknown,
}

export class NetworkException extends Error {
  type: NetworkExceptionType;

  constructor(type: NetworkExceptionType, message: string) {
    super(message);
    this.type = type;
  }

  static fromResponse(status: number, body: any): NetworkException {
    const message = body?.error ?? body?.message ?? `Request failed with status ${status}`;
;
    switch (status) {
      case 400:
        return new NetworkException(NetworkExceptionType.badRequest, message);
      case 401:
        return new NetworkException(NetworkExceptionType.unauthorized, message);
      case 403:
        return new NetworkException(NetworkExceptionType.forbidden, message);
      case 404:
        return new NetworkException(NetworkExceptionType.notFound, message);
      case 408:
        return new NetworkException(NetworkExceptionType.timeout, message);
      case 500:
        return new NetworkException(NetworkExceptionType.server, message);
      default:
        return new NetworkException(NetworkExceptionType.unknown, message);
    }
  }
  static networkExceptionFromError(error: any): NetworkException {
    if (error.response) {
      return NetworkException.fromResponse(error.response.status, error.response.data);
    } else if (error.request) {
      return new NetworkException(NetworkExceptionType.timeout, "Request timed out");
    } else {
      return new NetworkException(NetworkExceptionType.unknown, error.message);
    }
  }
}
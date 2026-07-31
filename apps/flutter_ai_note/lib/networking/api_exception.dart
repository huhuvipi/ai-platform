enum NetworkErrorType {
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  timeout,
  server,
  decode,
  unknown,
}

class ApiException implements Exception {
  final NetworkErrorType type;
  final String message;

  ApiException(this.type, [this.message = '']);

  String get userMessage {
    switch (type) {
      case NetworkErrorType.badRequest:
        return 'Invalid request';
      case NetworkErrorType.unauthorized:
        return 'Unauthorized access';
      case NetworkErrorType.forbidden:
        return 'Forbidden';
      case NetworkErrorType.notFound:
        return 'Resource not found';
      case NetworkErrorType.timeout:
        return 'Request timed out';
      case NetworkErrorType.server:
        return 'Server error';
      case NetworkErrorType.decode:
        return 'Unable to decode response';
      case NetworkErrorType.unknown:
        return 'Unknown error';
    }
  }

  @override
  String toString() => 'ApiException(type: $type, message: $message)';
}

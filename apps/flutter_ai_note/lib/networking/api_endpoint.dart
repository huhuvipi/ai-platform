enum HttpMethod { get, post, put, patch, delete }

extension HttpMethodValue on HttpMethod {
  String get value {
    switch (this) {
      case HttpMethod.get:
        return 'GET';
      case HttpMethod.post:
        return 'POST';
      case HttpMethod.put:
        return 'PUT';
      case HttpMethod.patch:
        return 'PATCH';
      case HttpMethod.delete:
        return 'DELETE';
    }
  }
}

class ApiEndpoint {
  final String path;
  final HttpMethod method;
  final Map<String, dynamic>? queryParameters;
  final Map<String, dynamic>? headers;
  final dynamic body;

  const ApiEndpoint({
    required this.path,
    required this.method,
    this.queryParameters,
    this.headers,
    this.body,
  });

  factory ApiEndpoint.get(
    String path, {
    Map<String, dynamic>? queryParameters,
    Map<String, dynamic>? headers,
  }) {
    return ApiEndpoint(
      path: path,
      method: HttpMethod.get,
      queryParameters: queryParameters,
      headers: headers,
    );
  }

  factory ApiEndpoint.post(
    String path, {
    dynamic body,
    Map<String, dynamic>? queryParameters,
    Map<String, dynamic>? headers,
  }) {
    return ApiEndpoint(
      path: path,
      method: HttpMethod.post,
      body: body,
      queryParameters: queryParameters,
      headers: headers,
    );
  }

  factory ApiEndpoint.put(
    String path, {
    dynamic body,
    Map<String, dynamic>? queryParameters,
    Map<String, dynamic>? headers,
  }) {
    return ApiEndpoint(
      path: path,
      method: HttpMethod.put,
      body: body,
      queryParameters: queryParameters,
      headers: headers,
    );
  }

  factory ApiEndpoint.patch(
    String path, {
    dynamic body,
    Map<String, dynamic>? queryParameters,
    Map<String, dynamic>? headers,
  }) {
    return ApiEndpoint(
      path: path,
      method: HttpMethod.patch,
      body: body,
      queryParameters: queryParameters,
      headers: headers,
    );
  }

  factory ApiEndpoint.delete(
    String path, {
    dynamic body,
    Map<String, dynamic>? queryParameters,
    Map<String, dynamic>? headers,
  }) {
    return ApiEndpoint(
      path: path,
      method: HttpMethod.delete,
      body: body,
      queryParameters: queryParameters,
      headers: headers,
    );
  }
}

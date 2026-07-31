import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';

import 'api_endpoint.dart';
import 'api_exception.dart';

class ApiClient {
  final Dio _dio;

  ApiClient(this._dio);

  ApiClient.withBaseUrl(String baseUrl)
      : _dio = Dio(BaseOptions(
          baseUrl: baseUrl,
          connectTimeout: const Duration(seconds: 15),
          receiveTimeout: const Duration(seconds: 15),
          responseType: ResponseType.json,
        ));

  Future<T> request<T>(ApiEndpoint endpoint, T Function(Map<String, dynamic>) parser) async {
    try {
      _logRequest(endpoint);

      final response = await _dio.request(
        endpoint.path,
        data: endpoint.body,
        queryParameters: endpoint.queryParameters,
        options: Options(
          method: endpoint.method.value,
          headers: endpoint.headers,
          responseType: ResponseType.json,
        ),
      );

      _logResponse(response);

      final statusCode = response.statusCode ?? 0;
      if (statusCode >= 200 && statusCode < 300) {
        final data = response.data;
        if (data is Map<String, dynamic>) {
          return parser(data);
        }

        if (data is String && data.isNotEmpty) {
          final decoded = json.decode(data);
          if (decoded is Map<String, dynamic>) {
            return parser(decoded);
          }
        }

        throw ApiException(NetworkErrorType.decode, 'Unexpected response format');
      }

      throw _mapStatusCodeToException(statusCode, response.statusMessage);
    } on DioException catch (error) {
      throw _mapDioException(error);
    } catch (error) {
      throw ApiException(NetworkErrorType.unknown, error.toString());
    }
  }

  void _logRequest(ApiEndpoint endpoint) {
    if (!kDebugMode) return;

    final baseUrl = _dio.options.baseUrl;
    final path = endpoint.path;
    final uri = Uri.parse(baseUrl).resolve(path);
    final fullUri = endpoint.queryParameters != null && endpoint.queryParameters!.isNotEmpty
        ? uri.replace(queryParameters: endpoint.queryParameters)
        : uri;

    print('➡️ API Request: ${endpoint.method.value} $fullUri');
    if (endpoint.headers != null && endpoint.headers!.isNotEmpty) {
      print('   headers: ${endpoint.headers}');
    }
    if (endpoint.body != null) {
      final bodyString = endpoint.body is String ? endpoint.body : json.encode(endpoint.body);
      print('   body: $bodyString');
    }
  }

  void _logResponse(Response response) {
    if (!kDebugMode) return;

    final statusCode = response.statusCode;
    final fullUri = response.requestOptions.uri;
    print('✅ API Response: ${response.requestOptions.method} $fullUri -> $statusCode');
    if (response.data != null) {
      try {
        final dataString = response.data is String ? response.data : json.encode(response.data);
        print('   response: $dataString');
      } catch (_) {
        print('   response: <non-serializable payload>');
      }
    }
  }

  ApiException _mapStatusCodeToException(int statusCode, String? message) {
    switch (statusCode) {
      case 400:
        return ApiException(NetworkErrorType.badRequest, message ?? 'Bad request');
      case 401:
        return ApiException(NetworkErrorType.unauthorized, message ?? 'Unauthorized');
      case 403:
        return ApiException(NetworkErrorType.forbidden, message ?? 'Forbidden');
      case 404:
        return ApiException(NetworkErrorType.notFound, message ?? 'Resource not found');
      case 408:
        return ApiException(NetworkErrorType.timeout, message ?? 'Request timed out');
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
        return ApiException(NetworkErrorType.server, message ?? 'Server error');
      default:
        return ApiException(NetworkErrorType.unknown, message ?? 'Unexpected status code');
    }
  }

  ApiException _mapDioException(DioException exception) {
    switch (exception.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
      case DioExceptionType.transformTimeout:
        return ApiException(NetworkErrorType.timeout, exception.message ?? 'Request timed out');
      case DioExceptionType.badResponse:
        final statusCode = exception.response?.statusCode ?? 0;
        return _mapStatusCodeToException(statusCode, exception.message);
      case DioExceptionType.cancel:
        return ApiException(NetworkErrorType.unknown, 'Request cancelled');
      case DioExceptionType.connectionError:
      case DioExceptionType.badCertificate:
      case DioExceptionType.unknown:
        return ApiException(NetworkErrorType.unknown, exception.message ?? 'Network error');
    }
  }
}
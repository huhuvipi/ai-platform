import 'dart:io';
import 'api_client.dart';
import '../models/summarize_request.dart';
import '../models/summarize_response.dart';
import 'api_endpoint.dart';
import 'api_exception.dart';

class AINoteService  {
  final ApiClient apiClient;

  AINoteService({required this.apiClient});

  Future<SummarizeResponse> summarize(SummarizeRequest request) async {
    final endpoint = ApiEndpoint(
      path: '/v1/summarize',
      method: HttpMethod.post,
      body: request.toJson(),
    );

    return apiClient.request(endpoint, SummarizeResponse.fromJson);
  }
}
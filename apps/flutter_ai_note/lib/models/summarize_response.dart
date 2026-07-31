class SummarizeResponse {
  final String language;
  final String result;
  final String provider;

  SummarizeResponse({
    required this.language,
    required this.result,
    required this.provider,
  });

  factory SummarizeResponse.fromJson(Map<String, dynamic> json) {
    return SummarizeResponse(
      language: json['language'] as String,
      result: json['result'] as String,
      provider: json['provider'] as String,
    );
  }
}
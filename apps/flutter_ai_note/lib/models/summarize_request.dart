class SummarizeRequest {
  final String provider;
  final String text;
  final String language;

  SummarizeRequest({
    this.provider = 'gemini',
    required this.text,
    required this.language,
  });

  Map<String, dynamic> toJson() {
    return {
      'provider': provider,
      'text': text,
      'language': language,
    };
  }
}
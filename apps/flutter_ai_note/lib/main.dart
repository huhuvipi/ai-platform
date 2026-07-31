import 'package:flutter/material.dart';

import 'networking/ai_note_service.dart';
import 'networking/api_client.dart';
import 'networking/api_exception.dart';
import 'networking/network_config.dart';
import 'models/summarize_request.dart';

void main() {
  NetworkConfig.setEnvironment(NetworkEnvironment.dev);
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final apiClient = ApiClient.withBaseUrl(NetworkConfig.baseUrl);
    final aiNoteService = AINoteService(apiClient:apiClient);

    return MaterialApp(
      title: 'AI Note',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: MyHomePage(
        title: 'AI Note',
        aiNoteService: aiNoteService,
      ),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title, required this.aiNoteService});

  final String title;
  final AINoteService aiNoteService;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final TextEditingController _textController = TextEditingController();
  String _summary = '';
  bool _isLoading = false;

  Future<void> _summarizeText() async {
    setState(() {
      _isLoading = true;
      _summary = '';
    });

    final request = SummarizeRequest(
      provider: 'gemini',
      text: _textController.text,
      language: 'en',
    );

    try {
      final response = await widget.aiNoteService.summarize(request);
      setState(() {
        _summary = response.result;
      });
    } catch (error) {
      setState(() {
        if (error is ApiException) {
          _summary = error.userMessage;
        } else {
          _summary = error.toString();
        }
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _textController,
              maxLines: 4,
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Text to summarize',
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _isLoading ? null : _summarizeText,
              child: _isLoading
                  ? const SizedBox(
                      height: 20,
                      width: 20,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : const Text('Summarize'),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: SingleChildScrollView(
                child: Text(
                  _summary.isEmpty ? 'Result will appear here.' : _summary,
                  style: Theme.of(context).textTheme.bodyLarge,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
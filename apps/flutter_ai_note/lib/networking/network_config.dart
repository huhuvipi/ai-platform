import 'dart:io' show Platform;

enum NetworkEnvironment {
  dev,
  prod,
}

class NetworkConfig {
  static NetworkEnvironment environment = NetworkEnvironment.dev;

  static void setEnvironment(NetworkEnvironment env) {
    environment = env;
  }

  static bool get isDev => environment == NetworkEnvironment.dev;
  static bool get isProd => environment == NetworkEnvironment.prod;

  static String get baseUrl {
    if (isProd) {
      return _prodBaseUrl;
    }
    return _devBaseUrl;
  }

  static String get _devBaseUrl {
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:3000';
    }

    if (Platform.isIOS || Platform.isMacOS) {
      return 'http://127.0.0.1:3000';
    }

    if (Platform.isWindows || Platform.isLinux) {
      return 'http://127.0.0.1:3000';
    }

    return 'http://127.0.0.1:3000';
  }

  static const String _prodBaseUrl = 'https://api.example.com';

  static const Duration connectTimeout = Duration(seconds: 15);
  static const Duration receiveTimeout = Duration(seconds: 15);
}

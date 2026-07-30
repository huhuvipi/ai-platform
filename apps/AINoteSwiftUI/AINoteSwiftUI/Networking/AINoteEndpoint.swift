//
//  AINoteEndpoint.swift
//  AINoteSwiftUI
//
//  Created by Vinh Huynh on 30/7/26.
//

import Foundation

enum Environment: String {
    case local
    case development
    case staging
    case production

    var baseUrl: URL {
        switch self {
        case .local:
            return URL(string: "http://localhost:3000")!
        case .development:
            return URL(string: "https://dev-api.example.com")!
        case .staging:
            return URL(string: "https://staging-api.example.com")!
        case .production:
            return URL(string: "https://api.example.com")!
        }
    }
}

struct AppEnvironment {
    static var current: Environment = {
        if let rawValue = Bundle.main.object(forInfoDictionaryKey: "APP_ENVIRONMENT") as? String,
           let env = Environment(rawValue: rawValue.lowercased()) {
            return env
        }

        #if DEBUG
        return .local
        #else
        return .production
        #endif
    }()

    static func setEnvironment(_ environment: Environment) {
        self.current = environment
    }
}

enum AINoteEndpoint {
    case summarize(provider: String, text: String)
}

extension AINoteEndpoint: Endpoint {
    var baseUrl: URL {
        return AppEnvironment.current.baseUrl
    }
    
    var isEncoded: Bool {
        switch self {
        default:
            return false
        }
    }
    
    var version: String {
        switch self {
        default:
            return "v1"
        }
    }
    
    var subPath: String {
        switch self {
        case .summarize:
            return "summarize"
        }
    }
    
    var path: String {
        return "\(version)/\(subPath)"
    }
    
    var method: RequestMethod {
        switch self {
        case .summarize:
            return .post
        }
    }
    
    var header: [String : String]? {
        let defaultHeader: [String: String] = [
            "Accept": "application/json",
            "Content-Type": "application/json"
        ]
        switch self {
        default:
            return defaultHeader
        }
    }
    
    var query: [String : Any]? {
        switch self {
        default:
            return nil
        }
    }
    
    var body: Any? {
        switch self {
        case .summarize(let provider, let text):
            return ["provider": provider, "text": text]
        }
    }
}


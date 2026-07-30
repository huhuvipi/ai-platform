//
//  Convertible.swift
//  PhotoEase
//
//  Created by Vinh Huynh on 28/2/25.
//

import Foundation

public typealias RouterInput<T> = (body: T?, query: [String: String]?, pathVariables: [String]?, headers: [String: String]?)
public typealias StaticRouterInput = (body: [String: String]?, query: [String: String]?, pathVariables: [String]?, headers: [String: String]?)

public enum RequestType: Int {
    case json
    case formData
}

public extension RequestType {
    var requestHeaders: [String: String] {
        var headers = [String: String]()
        switch self {
        case .json:
            headers["Content-Type"] = "application/json"
            headers["Accept"] = "application/json"
        case .formData:
            headers["Content-type"] = "multipart/form-data"
            headers["Accept"] = "application/json"
        }
        return headers
    }
}

public protocol Convertible {

    func urlRequest<T: Codable>(with url: URL, path: String, method: RequestMethod, requestType: RequestType, input: RouterInput<T>?) throws -> URLRequest
}

public extension Convertible {

    func urlRequest<T: Codable>(with url: URL, path: String, method: RequestMethod, requestType: RequestType = .json, input: RouterInput<T>?) throws -> URLRequest {

        let url = try constructAPIUrl(with: url, path: path, input: input)
        var urlRequest = URLRequest(url: url)

        urlRequest.httpMethod = method.rawValue

        let requestTypeHeaders = requestType.requestHeaders
        for (key, value) in requestTypeHeaders {
            urlRequest.setValue(value, forHTTPHeaderField: key)
        }

        if let parameters = input?.body {
            urlRequest.httpBody = Data()
            do {
                let encoder = JSONEncoder()
                encoder.dateEncodingStrategy = .millisecondsSince1970
                urlRequest.httpBody = try encoder.encode(parameters)
            } catch {
                throw error
            }
        }

        return urlRequest
    }

    private func constructAPIUrl<T: Codable>(with url: URL, path: String, input: RouterInput<T>?) throws -> URL {

        guard let `input` = input else { return url.appendingPathComponent(path) }

        var constructedURL = url.appendingPathComponent(path)

        if let pathVariables = input.pathVariables {
            for pathVariable in pathVariables {
                constructedURL.appendPathComponent(pathVariable)
            }
        }

        if let query = input.query {
            var components = URLComponents(string: constructedURL.absoluteString)!
            var queryItems = [URLQueryItem]()
            for (key, value) in query {
                let item = URLQueryItem(name: key, value: value)
                queryItems.append(item)
            }
            components.queryItems = queryItems
            return components.url!
        }

        return constructedURL
    }
}

struct NetworkHelper {
    func constructAPIUrl(with url: URL, path: String, input: (body: [String: String], query: [String: String], pathVariables: [String], headers: [String: String])) throws -> URL {

        var constructedURL = url.appendingPathComponent(path)

        for pathVariable in input.pathVariables {
            constructedURL.appendPathComponent(pathVariable)
        }

        var components = URLComponents(string: constructedURL.absoluteString)!
        var queryItems = [URLQueryItem]()
        for (key, value) in input.query {
            let item = URLQueryItem(name: key, value: value)
            queryItems.append(item)
        }
        components.queryItems = queryItems
        return components.url!
    }
}

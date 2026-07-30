//
//  HTTPClient.swift
//  PhotoEase
//
//  Created by Vinh Huynh on 28/2/25.
//

import Foundation

protocol HTTPClient {
    func sendRequest<T: Decodable>(endpoint: Endpoint, responseModel: T.Type) async -> Result<T, RequestError>
}

extension HTTPClient {
    
    //MARK: - Send Request
    
    func sendRequest<T: Decodable>(endpoint: Endpoint, responseModel: T.Type) async -> Result<T, RequestError> {
        
        guard var urlComponents = URLComponents(url: endpoint.baseUrl.appendingPathComponent(endpoint.path), resolvingAgainstBaseURL: false) else {
            return .failure(.invalidURL)
        }
        
        if let query = endpoint.query, endpoint.isEncoded {
            urlComponents.percentEncodedQueryItems = query.map { URLQueryItem(name: $0.key, value: "\($0.value )") }
        } else if let query = endpoint.query {
            urlComponents.queryItems = query.map { URLQueryItem(name: $0.key, value: "\($0.value )") }
        }
        guard let url = urlComponents.url else {
            return .failure(.invalidURL)
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = endpoint.method.rawValue
        request.allHTTPHeaderFields = endpoint.header
        request.timeoutInterval = 120
        if let body = endpoint.body {
            request.httpBody = try? JSONSerialization.data(withJSONObject: body, options: [])
        }
        
        do {
            
#if DEBUG
            print("➡️ URL: \(request.url!)")
            print("➡️ body: \(String(decoding: request.httpBody ?? Data(), as: UTF8.self))")
#endif
            
            let (data, response) = try await URLSession.shared.data(for: request, delegate: nil)
            
            guard let response = response as? HTTPURLResponse else {
                return .failure(.noResponse)
            }
            
#if DEBUG
            print("➡️ status code: \(response.statusCode)")
            
            if let json = try? JSONSerialization.jsonObject(with: data, options: .mutableContainers),
               let jsonData = try? JSONSerialization.data(withJSONObject: json, options: .prettyPrinted) {
                print("✅ JSON String: \(String(decoding: jsonData, as: UTF8.self))")
                
                do{
                    let output = try JSONSerialization.jsonObject(with: jsonData, options: []) as? [String : Any]
                    print("🌴 from data object: \(String(describing: output?["message"]))")
                }
                catch {
                    print (error)
                }
            } else {
                print("json data malformed")
            }
#endif
            
            switch response.statusCode {
            case 200...299:
                do {
                    //Special case of PDF
                    if let invoiceUrl = request.url?.absoluteString {
                        if invoiceUrl.contains("/Reports/PrepareDownload") {
                            return .success(String(decoding: data, as: UTF8.self) as! T)
                        }
                    }
                    if let invoiceUrl = request.url?.absoluteString {
                        if invoiceUrl.contains("/Reports/Download") {
                            return .success(data as! T)
                        }
                    }
                    
                    if let json = try? JSONSerialization.jsonObject(with: data, options: .mutableContainers) as? [String: Any] {
                        if let result = json["result"] as? String, result == "fail" {
                            if let message = json["message"] as? String {
                                return .failure(.serverError(message: message))
                            } else  {
                                return .failure(.decode)
                            }
                        }
                        
                        if let dataObject = json["data"] as? String,
                           let json = try? JSONSerialization.jsonObject(with: dataObject.data(using: .utf8)! , options: .mutableContainers),
                           let jsonData = try? JSONSerialization.data(withJSONObject: json, options: .prettyPrinted),
                           let decodedResponse = try? JSONDecoder().decode(responseModel, from: jsonData) {
                            return .success(decodedResponse)
                        }
                    }
                    
                    let decodedResponse = try JSONDecoder().decode(responseModel, from: data)
                    return .success(decodedResponse)
                }
                catch let DecodingError.dataCorrupted(context){
                    print(context)
                    return .failure(.decode)
                } catch let DecodingError.keyNotFound(key, context) {
                    print("Key '\(key)' not found:", context.debugDescription)
                    print("codingPath:", context.codingPath)
                    return .failure(.decode)
                } catch let DecodingError.valueNotFound(value, context) {
                    print("Value '\(value)' not found:", context.debugDescription)
                    print("codingPath:", context.codingPath)
                    return .failure(.decode)
                } catch let DecodingError.typeMismatch(type, context)  {
                    print("Type '\(type)' mismatch:", context.debugDescription)
                    print("codingPath:", context.codingPath)
                    return .failure(.decode)
                } catch {
                    print("error: ", error)
                    //throw error
                    return .failure(.decode)
                }
            case 400:
                return .failure(.badRequest)
            case 401:
                return .failure(.unauthorized)
            case 403:
                return .failure(.forbidden)
            case 404:
                return .failure(.dataNotFound)
            case 412:
                return .failure(.incorrectOTP)
            case 500...502:
                return .failure(.unexpectedStatusCode)
            default:
                return .failure(.unexpectedStatusCode)
            }
        } catch (let error) {
            print(error.localizedDescription)
            return .failure(.unknown)
        }
        
    }
    
}

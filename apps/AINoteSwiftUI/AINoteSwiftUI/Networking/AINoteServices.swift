//
//  AINoteServices.swift
//  AINoteSwiftUI
//
//  Created by Vinh Huynh on 30/7/26.
//

protocol AINoteServiceable {
    func summarize(text: String) async throws -> String
}

struct AINoteServices: HTTPClient, AINoteServiceable {
    func summarize(text: String) async throws -> String {
        let result = await sendRequest(endpoint: AINoteEndpoint.summarize(provider: "gemini", text: text), responseModel: SummarizeResponse.self)
        switch result {
        case .success(let response):
            return response.result
        case .failure(let error):
            throw error
        }
    }
}

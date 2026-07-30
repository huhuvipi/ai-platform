//
//  AINoteServices.swift
//  AINoteSwiftUI
//
//  Created by Vinh Huynh on 30/7/26.
//

import Foundation

protocol AINoteServiceable {
    func summarize(text: String) async throws -> String
}

struct AINoteServices: HTTPClient, AINoteServiceable {
    private var deviceLanguage: String {
        let preferred = Locale.preferredLanguages.first ?? Locale.current.identifier
        let code = preferred.split(separator: "-").first.map(String.init) ?? Locale.current.language.languageCode?.identifier ?? "vi"
        return Locale.current.localizedString(forLanguageCode: code) ?? "Vietnamese"
    }

    func summarize(text: String) async throws -> String {
        let language = deviceLanguage
        let result = await sendRequest(endpoint: AINoteEndpoint.summarize(provider: "gemini", text: text, language: language), responseModel: SummarizeResponse.self)
        switch result {
        case .success(let response):
            return response.result
        case .failure(let error):
            throw error
        }
    }
}

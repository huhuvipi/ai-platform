import Foundation

struct SummarizeRequest: Encodable {
    let provider: String
    let text: String
    let language: String
}

struct SummarizeResponse: Decodable {
    let provider: String
    let result: String
}


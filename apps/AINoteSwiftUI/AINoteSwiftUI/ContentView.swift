//
//  ContentView.swift
//  AINoteSwiftUI
//
//  Created by Vinh Huynh on 30/7/26.
//

import SwiftUI
import SwiftData

import SwiftUI

struct ContentView: View {

    @State private var note = ""
    @State private var result = ""
    @State private var isLoading = false
    @State private var errorMessage = ""

    var body: some View {

        NavigationStack {

            VStack(spacing: 16) {

                TextEditor(text: $note)
                    .frame(height: 220)
                    .padding(8)
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(Color.gray.opacity(0.3))
                    )

                Button {
                    Task {
                        await summarize()
                    }
                } label: {
                    HStack {
                        if isLoading {
                            ProgressView()
                                .tint(.white)
                        }
                        Text(isLoading ? "Đang xử lý..." : "Tóm tắt bằng AI")
                    }
                    .frame(maxWidth: .infinity)
                }
                .buttonStyle(.borderedProminent)
                .disabled(note.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty || isLoading)

                ScrollView {
                    VStack(alignment: .leading, spacing: 8) {

                        if !result.isEmpty {
                            Text("Kết quả")
                                .font(.headline)

                            Text(result)
                        }

                        if !errorMessage.isEmpty {
                            Text(errorMessage)
                                .foregroundColor(.red)
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding()
                }

                Spacer()
            }
            .padding()
            .navigationTitle("AI Note")
        }
    }

    @MainActor
    private func summarize() async {
        let services = AINoteServices()
        isLoading = true
        result = ""
        errorMessage = ""

        do {
            result = try await services.summarize(text: note)
        } catch {
            errorMessage = error.localizedDescription
        }

        isLoading = false
    }
}

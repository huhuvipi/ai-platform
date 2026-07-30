package com.example.ainodeandroid.network

import android.util.Log

class AINoteRepository(private val api: AINoteApi = RetrofitClient.api) {
    companion object {
        private const val TAG = "AINoteRepository"
    }

    suspend fun summarize(text: String, provider: String = "gemini", language: String = "Vietnamese"): Result<String> {
        return try {
            val response = api.summarize(SummarizeRequest(provider = provider, text = text, language = language))
            Log.d(TAG, "summarize request provider=$provider language=$language text=${text.take(100)}...")
            Log.d(TAG, "summarize response=$response")
            val result = response.result ?: ""
            Result.success(result)
        } catch (error: Exception) {
            Log.e(TAG, "summarize failed", error)
            Result.failure(error)
        }
    }
}

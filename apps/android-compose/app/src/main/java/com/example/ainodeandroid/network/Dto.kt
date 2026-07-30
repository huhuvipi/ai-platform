package com.example.ainodeandroid.network

import kotlinx.serialization.Serializable

@Serializable
data class SummarizeRequest(
    val provider: String = "gemini",
    val text: String,
    val language: String = "Vietnamese"
)

@Serializable
data class SummarizeResponse(
    val provider: String? = null,
    val language: String? = null,
    val result: String? = null
)

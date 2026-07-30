package com.example.ainodeandroid.network

import retrofit2.http.Body
import retrofit2.http.POST

interface AINoteApi {
    @POST("v1/summarize")
    suspend fun summarize(@Body request: SummarizeRequest): SummarizeResponse
}

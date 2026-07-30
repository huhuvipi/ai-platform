package com.example.ainodeandroid

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.example.ainodeandroid.ui.theme.AINodeAndroidTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            AINodeAndroidTheme {
                MainScreen(onLanguageRequired = { detectDeviceLanguage() })
            }
        }
    }

    private fun detectDeviceLanguage(): String {
        val code = java.util.Locale.getDefault().language
        val display = java.util.Locale(code).getDisplayLanguage(java.util.Locale.ENGLISH)
        return if (display.isNullOrBlank()) "Vietnamese" else display
    }
}

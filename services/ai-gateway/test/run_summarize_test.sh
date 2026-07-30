#!/usr/bin/env bash
set -euo pipefail

# Simple integration test for /v1/summarize
HOST=${HOST:-http://localhost:3000}

RESPONSE=$(curl -sS -X POST "$HOST/v1/summarize" -H "Content-Type: application/json" -d '{"provider":"openai","text":"Test summarization for integration."}')

echo "Response: $RESPONSE"

if echo "$RESPONSE" | grep -q "MOCK SUMMARY"; then
  echo "OK: mock summary returned"
  exit 0
else
  echo "FAIL: expected MOCK SUMMARY in response"
  exit 2
fi

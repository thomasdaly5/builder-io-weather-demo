#!/bin/bash

# Test OpenWeatherMap API key from .env file
# Usage: bash test-api.sh

echo "🔍 Testing OpenWeatherMap API key..."

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found!"
    echo "💡 Create a .env file with: VITE_OPENWEATHER_API_KEY=your_api_key"
    exit 1
fi

# Read API key from .env file
API_KEY=$(grep "VITE_OPENWEATHER_API_KEY=" .env | cut -d'=' -f2 | tr -d ' "'"'"'')

# Check if API key is set
if [ -z "$API_KEY" ] || [ "$API_KEY" = "your_api_key_here" ] || [ "$API_KEY" = "PASTE_YOUR_API_KEY_HERE" ]; then
    echo "❌ API key not set in .env file"
    echo "📝 Current value: $API_KEY"
    echo "💡 Edit .env and set: VITE_OPENWEATHER_API_KEY=your_actual_api_key"
    exit 1
fi

# Check API key length
if [ ${#API_KEY} -ne 32 ]; then
    echo "⚠️  Warning: API key length is ${#API_KEY}, should be 32 characters"
    echo "📝 Current key: ${API_KEY:0:8}..."
fi

echo "📝 Testing API key: ${API_KEY:0:8}..."

# Test API call
echo "🌐 Making test API call..."
RESPONSE=$(curl -s "https://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=$API_KEY&units=imperial")

# Check if response contains error
if echo "$RESPONSE" | grep -q '"cod":401'; then
    echo "❌ API key is invalid!"
    echo "🔍 Error details:"
    echo "$RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4
    echo ""
    echo "💡 Solutions:"
    echo "   1. Check if your API key is correct"
    echo "   2. Wait 10 minutes after signup for activation"
    echo "   3. Verify your account at OpenWeatherMap"
    echo "   4. Visit: https://openweathermap.org/faq#error401"
    exit 1
elif echo "$RESPONSE" | grep -q '"cod":200'; then
    echo "✅ API key is working!"
    CITY=$(echo "$RESPONSE" | grep -o '"name":"[^"]*"' | cut -d'"' -f4)
    TEMP=$(echo "$RESPONSE" | grep -o '"temp":[0-9.]*' | cut -d':' -f2)
    DESCRIPTION=$(echo "$RESPONSE" | grep -o '"description":"[^"]*"' | cut -d'"' -f4)
    
    echo "🌤️  Test location: $CITY"
    echo "🌡️  Temperature: ${TEMP}°F"
    echo "☁️  Conditions: $DESCRIPTION"
    echo ""
    echo "🎉 Your weather app should now work with real data!"
else
    echo "❓ Unexpected response:"
    echo "$RESPONSE"
fi

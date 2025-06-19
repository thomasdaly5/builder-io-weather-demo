// Simple script to test your OpenWeatherMap API key
// Run this with: node test-api-key.js

const fs = require("fs");

// Read .env file
let apiKey = "";
try {
  const envContent = fs.readFileSync(".env", "utf8");
  const match = envContent.match(/VITE_OPENWEATHER_API_KEY=(.+)/);
  if (match) {
    apiKey = match[1].trim();
  }
} catch (error) {
  console.log("❌ Could not read .env file");
  process.exit(1);
}

console.log("🔍 Checking your API key...");
console.log(
  `📝 API Key: ${apiKey ? apiKey.substring(0, 8) + "..." : "NOT FOUND"}`,
);

if (
  !apiKey ||
  apiKey === "PASTE_YOUR_API_KEY_HERE" ||
  apiKey === "your_api_key_here"
) {
  console.log("❌ API key not set in .env file");
  console.log(
    "📋 Please edit .env and replace PASTE_YOUR_API_KEY_HERE with your actual API key",
  );
  process.exit(1);
}

if (apiKey.length !== 32) {
  console.log(
    `⚠️  Warning: API key length is ${apiKey.length}, should be 32 characters`,
  );
}

// Test the API key
async function testApiKey() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}`,
    );
    const data = await response.json();

    if (response.ok) {
      console.log("✅ API key is working!");
      console.log(
        `🌤️  Test location: ${data.name}, Temperature: ${Math.round(((data.main.temp - 273.15) * 9) / 5 + 32)}°F`,
      );
    } else {
      console.log("❌ API key test failed:");
      console.log(`   Error: ${data.message}`);

      if (data.cod === 401) {
        console.log("💡 Solutions:");
        console.log("   1. Check if your API key is correct");
        console.log("   2. Wait 10 minutes after signup for activation");
        console.log("   3. Verify your account at OpenWeatherMap");
      }
    }
  } catch (error) {
    console.log("❌ Network error:", error.message);
  }
}

testApiKey();

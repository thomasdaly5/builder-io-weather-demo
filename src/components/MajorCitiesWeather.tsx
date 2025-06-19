import React from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import ColumnLayout from "@cloudscape-design/components/column-layout";
import Spinner from "@cloudscape-design/components/spinner";
import Badge from "@cloudscape-design/components/badge";
import { weatherService, demoWeatherData } from "@/lib/weather";
import { WeatherData } from "@/types/weather";

interface CityInfo {
  name: string;
  zipCode: string;
  emoji: string;
  region: string;
}

const MAJOR_CITIES: CityInfo[] = [
  { name: "New York", zipCode: "10001", emoji: "🗽", region: "Northeast" },
  { name: "Miami", zipCode: "33101", emoji: "🌴", region: "Southeast" },
  { name: "Chicago", zipCode: "60601", emoji: "🏙️", region: "Midwest" },
  { name: "Dallas", zipCode: "75201", emoji: "🤠", region: "Southwest" },
  { name: "San Jose", zipCode: "95101", emoji: "🌉", region: "West Coast" },
];

const getWeatherEmoji = (condition: string, temp: number): string => {
  const lowerCondition = condition.toLowerCase();

  if (lowerCondition.includes("clear")) {
    return temp > 80 ? "☀️" : "🌤️";
  }
  if (lowerCondition.includes("cloud")) {
    return lowerCondition.includes("partly") ? "⛅" : "☁️";
  }
  if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) {
    return "🌧️";
  }
  if (lowerCondition.includes("thunder") || lowerCondition.includes("storm")) {
    return "⛈️";
  }
  if (lowerCondition.includes("snow")) {
    return "❄️";
  }
  if (lowerCondition.includes("fog") || lowerCondition.includes("mist")) {
    return "🌫️";
  }
  if (lowerCondition.includes("wind")) {
    return "💨";
  }

  // Default based on temperature
  if (temp > 85) return "🔥";
  if (temp > 75) return "☀️";
  if (temp > 65) return "🌤️";
  if (temp > 50) return "⛅";
  if (temp > 32) return "🌧️";
  return "❄️";
};

const getTemperatureColor = (temp: number): string => {
  if (temp >= 85) return "text-cloudscape-red-500";
  if (temp >= 70) return "text-cloudscape-orange-500";
  if (temp >= 50) return "text-cloudscape-blue-500";
  return "text-cloudscape-blue-600";
};

interface CityWeatherCardProps {
  city: CityInfo;
}

const CityWeatherCard: React.FC<CityWeatherCardProps> = ({ city }) => {
  const {
    data: weatherData,
    isLoading,
    isError,
  } = useQuery<WeatherData>({
    queryKey: ["major-city-weather", city.zipCode],
    queryFn: async () => {
      // Check if we have a valid API key
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      if (
        !apiKey ||
        apiKey === "demo_key" ||
        apiKey === "PASTE_YOUR_API_KEY_HERE"
      ) {
        // Return demo data with city-specific variations
        const temps = {
          "10001": 68,
          "33101": 84,
          "60601": 55,
          "75201": 78,
          "95101": 72,
        };
        const conditions = {
          "10001": "cloudy",
          "33101": "clear sky",
          "60601": "light rain",
          "75201": "partly cloudy",
          "95101": "clear sky",
        };

        return {
          ...demoWeatherData,
          name: city.name,
          main: {
            ...demoWeatherData.main,
            temp: temps[city.zipCode as keyof typeof temps] || 70,
          },
          weather: [
            {
              ...demoWeatherData.weather[0],
              description:
                conditions[city.zipCode as keyof typeof conditions] ||
                "clear sky",
            },
          ],
        };
      }

      return weatherService.getCurrentWeatherByZip(city.zipCode);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="cloudscape-card p-6 h-32 flex items-center justify-center">
        <div className="text-center space-y-2">
          <Spinner size="normal" />
          <p className="text-cloudscape-body-s text-muted-foreground">
            Loading {city.name}...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !weatherData) {
    return (
      <div className="cloudscape-card p-6 h-32 flex items-center justify-center">
        <div className="text-center space-y-2">
          <span className="text-2xl">🌐</span>
          <p className="text-cloudscape-body-s text-muted-foreground">
            {city.name}
          </p>
          <p className="text-cloudscape-body-s text-destructive">
            Unable to load
          </p>
        </div>
      </div>
    );
  }

  const temp = Math.round(weatherData.main.temp);
  const condition = weatherData.weather[0].description;
  const weatherEmoji = getWeatherEmoji(condition, temp);
  const humidity = weatherData.main.humidity;

  return (
    <div className="cloudscape-card p-6 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="space-y-4">
        {/* City Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{city.emoji}</span>
            <div>
              <h3 className="text-cloudscape-heading-s font-semibold">
                {city.name}
              </h3>
              <Badge color="blue">{city.region}</Badge>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-light ${getTemperatureColor(temp)}`}>
              {temp}°F
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{weatherEmoji}</span>
            <div>
              <p className="text-cloudscape-body-s text-foreground capitalize">
                {condition}
              </p>
              <p className="text-cloudscape-body-s text-muted-foreground">
                Humidity: {humidity}%
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-cloudscape-body-s text-muted-foreground">
              Feels like
            </p>
            <p className="text-cloudscape-body-s font-medium">
              {Math.round(weatherData.main.feels_like)}°F
            </p>
          </div>
        </div>

        {/* Hover Effect Indicator */}
        <div className="pt-2 border-t border-border/50">
          <p className="text-cloudscape-body-s text-muted-foreground group-hover:text-accent transition-colors">
            Live weather data
          </p>
        </div>
      </div>
    </div>
  );
};

export const MajorCitiesWeather: React.FC = () => {
  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Current weather conditions in major US cities"
        >
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🌎</span>
            <span className="text-cloudscape-heading-m">
              Weather Around the US
            </span>
          </div>
        </Header>
      }
    >
      <ColumnLayout columns={5} variant="default">
        {MAJOR_CITIES.map((city) => (
          <CityWeatherCard key={city.zipCode} city={city} />
        ))}
      </ColumnLayout>

      <div className="mt-6 pt-4 border-t border-border/30">
        <div className="text-center">
          <p className="text-cloudscape-body-s text-muted-foreground">
            <span className="inline-flex items-center space-x-1">
              <span>🔄</span>
              <span>Updates every 10 minutes</span>
            </span>
            <span className="mx-2">•</span>
            <span className="inline-flex items-center space-x-1">
              <span>🌡️</span>
              <span>Real-time temperature data</span>
            </span>
          </p>
        </div>
      </div>
    </Container>
  );
};

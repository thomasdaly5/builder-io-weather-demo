import React from "react";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import ColumnLayout from "@cloudscape-design/components/column-layout";
import Badge from "@cloudscape-design/components/badge";
import Button from "@cloudscape-design/components/button";
import {
  Thermometer,
  Wind,
  Droplets,
  Eye,
  Sunrise,
  Sunset,
  Gauge,
  Cloud,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { WeatherData } from "@/types/weather";
import { weatherService } from "@/lib/weather";

interface WeatherDisplayProps {
  weatherData: WeatherData;
  onRefresh: () => void;
  onLocationChange: () => void;
  isRefreshing?: boolean;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  onRefresh,
  onLocationChange,
  isRefreshing = false,
}) => {
  const currentCondition = weatherData.weather[0];
  const temp = Math.round(weatherData.main.temp);
  const feelsLike = Math.round(weatherData.main.feels_like);
  const humidity = weatherData.main.humidity;
  const windSpeed = Math.round(weatherData.wind.speed);
  const windDirection = weatherService.getWindDirection(weatherData.wind.deg);
  const pressure = weatherData.main.pressure;
  const visibility = Math.round(weatherData.visibility / 1000);

  const sunrise = weatherService.formatTime(weatherData.sys.sunrise);
  const sunset = weatherService.formatTime(weatherData.sys.sunset);

  const getTemperatureColor = (temp: number): string => {
    if (temp >= 85) return "text-cloudscape-red-500";
    if (temp >= 70) return "text-cloudscape-orange-500";
    if (temp >= 50) return "text-cloudscape-blue-500";
    return "text-cloudscape-blue-600";
  };

  const getHumidityBadgeColor = (humidity: number): string => {
    if (humidity >= 70) return "blue";
    if (humidity >= 40) return "green";
    return "red";
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header with location and controls */}
      <Container
        header={
          <Header
            variant="h1"
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button
                  iconName="refresh"
                  onClick={onRefresh}
                  loading={isRefreshing}
                  variant="icon"
                  ariaLabel="Refresh weather data"
                />
                <Button onClick={onLocationChange} variant="normal">
                  Change Location
                </Button>
              </SpaceBetween>
            }
          >
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6 text-cloudscape-blue-500" />
              <div>
                <span className="text-cloudscape-heading-l">
                  {weatherData.name}, {weatherData.sys.country}
                </span>
                <p className="text-cloudscape-body-s text-muted-foreground mt-1">
                  Last updated: {weatherService.formatTime(weatherData.dt)}
                </p>
              </div>
            </div>
          </Header>
        }
      >
        {/* Current Weather Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Temperature Display */}
          <div className="lg:col-span-2">
            <div className="text-center lg:text-left space-y-4">
              <div className="flex items-center justify-center lg:justify-start space-x-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={weatherService.getWeatherIconUrl(
                      currentCondition.icon,
                    )}
                    alt={currentCondition.description}
                    className="w-24 h-24"
                  />
                  <div>
                    <div
                      className={`text-6xl font-light ${getTemperatureColor(temp)}`}
                    >
                      {temp}°
                    </div>
                    <div className="text-cloudscape-body-m text-muted-foreground">
                      Feels like {feelsLike}°F
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-cloudscape-heading-m text-foreground capitalize">
                  {currentCondition.description}
                </h2>
                <div className="flex items-center justify-center lg:justify-start space-x-4 text-cloudscape-body-s text-muted-foreground">
                  <span>High: {Math.round(weatherData.main.temp_max)}°F</span>
                  <span>•</span>
                  <span>Low: {Math.round(weatherData.main.temp_min)}°F</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <Droplets className="h-5 w-5 text-cloudscape-blue-500 mx-auto mb-2" />
                <div className="text-cloudscape-body-s text-muted-foreground">
                  Humidity
                </div>
                <div className="text-cloudscape-heading-s">{humidity}%</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <Wind className="h-5 w-5 text-cloudscape-blue-500 mx-auto mb-2" />
                <div className="text-cloudscape-body-s text-muted-foreground">
                  Wind
                </div>
                <div className="text-cloudscape-heading-s">
                  {windSpeed} mph {windDirection}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Detailed Weather Information */}
      <Container
        header={
          <Header variant="h2">
            <span className="text-cloudscape-heading-m">
              Detailed Conditions
            </span>
          </Header>
        }
      >
        <ColumnLayout columns={4} variant="text-grid">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Thermometer className="h-4 w-4 text-cloudscape-blue-500" />
              <span className="text-cloudscape-body-s text-muted-foreground">
                Feels Like
              </span>
            </div>
            <div className="text-cloudscape-heading-s">{feelsLike}°F</div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Droplets className="h-4 w-4 text-cloudscape-blue-500" />
              <span className="text-cloudscape-body-s text-muted-foreground">
                Humidity
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-cloudscape-heading-s">{humidity}%</span>
              <Badge color={getHumidityBadgeColor(humidity)}>
                {humidity >= 70 ? "High" : humidity >= 40 ? "Normal" : "Low"}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Wind className="h-4 w-4 text-cloudscape-blue-500" />
              <span className="text-cloudscape-body-s text-muted-foreground">
                Wind
              </span>
            </div>
            <div className="text-cloudscape-heading-s">
              {windSpeed} mph {windDirection}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Gauge className="h-4 w-4 text-cloudscape-blue-500" />
              <span className="text-cloudscape-body-s text-muted-foreground">
                Pressure
              </span>
            </div>
            <div className="text-cloudscape-heading-s">{pressure} hPa</div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-cloudscape-blue-500" />
              <span className="text-cloudscape-body-s text-muted-foreground">
                Visibility
              </span>
            </div>
            <div className="text-cloudscape-heading-s">{visibility} km</div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Cloud className="h-4 w-4 text-cloudscape-blue-500" />
              <span className="text-cloudscape-body-s text-muted-foreground">
                Cloudiness
              </span>
            </div>
            <div className="text-cloudscape-heading-s">
              {weatherData.clouds.all}%
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Sunrise className="h-4 w-4 text-cloudscape-orange-500" />
              <span className="text-cloudscape-body-s text-muted-foreground">
                Sunrise
              </span>
            </div>
            <div className="text-cloudscape-heading-s">{sunrise}</div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Sunset className="h-4 w-4 text-cloudscape-orange-600" />
              <span className="text-cloudscape-body-s text-muted-foreground">
                Sunset
              </span>
            </div>
            <div className="text-cloudscape-heading-s">{sunset}</div>
          </div>
        </ColumnLayout>
      </Container>
    </div>
  );
};

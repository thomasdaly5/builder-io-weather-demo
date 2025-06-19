import React, { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import AppLayout from "@cloudscape-design/components/app-layout";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Alert from "@cloudscape-design/components/alert";
import Spinner from "@cloudscape-design/components/spinner";
import { LocationInput } from "@/components/LocationInput";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { weatherService, demoWeatherData } from "@/lib/weather";
import { WeatherData } from "@/types/weather";

const WeatherDashboard: React.FC = () => {
  const [zipCode, setZipCode] = useState<string>("");
  const [showLocationInput, setShowLocationInput] = useState(true);

  const {
    data: weatherData,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery<WeatherData>({
    queryKey: ["weather", zipCode],
    queryFn: async () => {
      if (!zipCode) throw new Error("No ZIP code provided");

      // Check if we have a valid API key
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      if (!apiKey || apiKey === "demo_key") {
        // Return demo data when no API key is available
        console.warn(
          "No OpenWeatherMap API key found. Using demo data. To get real weather data, sign up at https://openweathermap.org/api and set VITE_OPENWEATHER_API_KEY in your environment variables.",
        );
        return {
          ...demoWeatherData,
          name: `Demo Location (${zipCode})`,
        };
      }

      return weatherService.getCurrentWeatherByZip(zipCode);
    },
    enabled: !!zipCode,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleLocationSubmit = useCallback((newZipCode: string) => {
    setZipCode(newZipCode);
    setShowLocationInput(false);
  }, []);

  const handleLocationChange = useCallback(() => {
    setShowLocationInput(true);
    setZipCode("");
  }, []);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (showLocationInput || !zipCode) {
    return (
      <AppLayout
        navigationHide
        toolsHide
        content={
          <ContentLayout
            header={
              <Header
                variant="h1"
                description="Get real-time weather information for any US location"
              >
                Weather Dashboard
              </Header>
            }
          >
            <div className="min-h-[60vh] flex items-center justify-center">
              <LocationInput
                onLocationSubmit={handleLocationSubmit}
                isLoading={isLoading}
                error={
                  isError && error instanceof Error ? error.message : undefined
                }
              />
            </div>
          </ContentLayout>
        }
      />
    );
  }

  if (isLoading && !weatherData) {
    return (
      <AppLayout
        navigationHide
        toolsHide
        content={
          <ContentLayout>
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="text-center space-y-4">
                <Spinner size="large" />
                <div>
                  <h2 className="text-cloudscape-heading-m text-foreground">
                    Loading Weather Data
                  </h2>
                  <p className="text-cloudscape-body-m text-muted-foreground mt-2">
                    Getting current conditions for ZIP code {zipCode}...
                  </p>
                </div>
              </div>
            </div>
          </ContentLayout>
        }
      />
    );
  }

  if (isError && !weatherData) {
    return (
      <AppLayout
        navigationHide
        toolsHide
        content={
          <ContentLayout>
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="w-full max-w-lg">
                <SpaceBetween direction="vertical" size="l">
                  <Alert
                    statusIconAriaLabel="Error"
                    type="error"
                    header="Unable to Load Weather Data"
                    dismissible
                    onDismiss={handleLocationChange}
                  >
                    {error instanceof Error
                      ? error.message
                      : "An unexpected error occurred while fetching weather data"}
                  </Alert>
                  <LocationInput
                    onLocationSubmit={handleLocationSubmit}
                    isLoading={isLoading}
                    error={error instanceof Error ? error.message : undefined}
                  />
                </SpaceBetween>
              </div>
            </div>
          </ContentLayout>
        }
      />
    );
  }

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout>
          <div className="space-y-6">
            {/* API Key Warning */}
            {(!import.meta.env.VITE_OPENWEATHER_API_KEY ||
              import.meta.env.VITE_OPENWEATHER_API_KEY === "demo_key") && (
              <Alert
                statusIconAriaLabel="Info"
                type="info"
                header="Demo Mode"
                dismissible
              >
                You're viewing demo weather data. To get real weather
                information, sign up for a free API key at{" "}
                <a
                  href="https://openweathermap.org/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cloudscape-blue-500 hover:underline"
                >
                  OpenWeatherMap
                </a>{" "}
                and set the <code>VITE_OPENWEATHER_API_KEY</code> environment
                variable.
              </Alert>
            )}

            {weatherData && (
              <WeatherDisplay
                weatherData={weatherData}
                onRefresh={handleRefresh}
                onLocationChange={handleLocationChange}
                isRefreshing={isRefetching}
              />
            )}
          </div>
        </ContentLayout>
      }
    />
  );
};

export default WeatherDashboard;

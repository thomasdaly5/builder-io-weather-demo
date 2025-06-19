import React, { useState } from "react";
import Button from "@cloudscape-design/components/button";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import SpaceBetween from "@cloudscape-design/components/space-between";
import { MapPin, Search } from "lucide-react";
import { MajorCitiesWeather } from "./MajorCitiesWeather";

interface LocationInputProps {
  onLocationSubmit: (zipCode: string) => void;
  isLoading?: boolean;
  error?: string;
}

export const LocationInput: React.FC<LocationInputProps> = ({
  onLocationSubmit,
  isLoading = false,
  error,
}) => {
  const [zipCode, setZipCode] = useState("");
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (isValidZipCode(zipCode)) {
      onLocationSubmit(zipCode.trim());
    }
  };

  const handleInputChange = (value: string) => {
    setZipCode(value);
    if (touched && !isValidZipCode(value)) {
      setTouched(false);
    }
  };

  const isValidZipCode = (zip: string): boolean => {
    return /^\d{5}(-\d{4})?$/.test(zip.trim());
  };

  const getValidationMessage = (): string => {
    if (!touched || !zipCode) return "";
    if (!isValidZipCode(zipCode)) {
      return "Please enter a valid US ZIP code (e.g., 12345 or 12345-6789)";
    }
    return "";
  };

  return (
    <div className="w-full space-y-8">
      {/* Location Input Form */}
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <SpaceBetween direction="vertical" size="m">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-cloudscape-blue-50 p-4 dark:bg-cloudscape-blue-900/20">
                  <MapPin className="h-8 w-8 text-cloudscape-blue-500" />
                </div>
              </div>
              <div>
                <h1 className="text-cloudscape-heading-l text-foreground mb-2">
                  Local Weather Dashboard
                </h1>
                <p className="text-cloudscape-body-m text-muted-foreground">
                  Enter your US ZIP code to get current weather conditions and
                  forecast
                </p>
              </div>
            </div>

            <FormField
              label="ZIP Code"
              description="Enter a valid US ZIP code (5 digits or 5+4 format)"
              errorText={error || getValidationMessage()}
            >
              <Input
                value={zipCode}
                onChange={({ detail }) => handleInputChange(detail.value)}
                placeholder="Enter ZIP code (e.g., 90210)"
                type="text"
                inputMode="numeric"
                pattern="[0-9-]*"
                maxLength={10}
                disabled={isLoading}
                onBlur={() => setTouched(true)}
                autoFocus
              />
            </FormField>

            <Button
              variant="primary"
              iconName="search"
              onClick={handleSubmit}
              disabled={!zipCode || isLoading || !isValidZipCode(zipCode)}
              loading={isLoading}
              fullWidth
            >
              {isLoading ? "Getting Weather..." : "Get Weather"}
            </Button>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-destructive text-cloudscape-body-s">
                  <div className="rounded-full bg-destructive/20 p-1">
                    <span className="block w-3 h-3 text-xs">!</span>
                  </div>
                  <span>{error}</span>
                </div>
              </div>
            )}

            <div className="text-center">
              <p className="text-cloudscape-body-s text-muted-foreground">
                Powered by OpenWeatherMap API
              </p>
            </div>
          </SpaceBetween>
        </form>
      </div>

      {/* Major Cities Weather Display */}
      <div className="w-full">
        <MajorCitiesWeather />
      </div>
    </div>
  );
};

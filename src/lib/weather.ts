import {
  WeatherData,
  WeatherForecast,
  LocationData,
  WeatherError,
} from "@/types/weather";

// Using OpenWeatherMap API - users can sign up for a free API key
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "demo_key";
const BASE_URL = "https://api.openweathermap.org";

export class WeatherService {
  private static instance: WeatherService;
  private apiKey: string;

  private constructor(apiKey: string = API_KEY) {
    this.apiKey = apiKey;
  }

  public static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  private async fetchWithErrorHandling<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorData: WeatherError = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`,
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(
        "An unexpected error occurred while fetching weather data",
      );
    }
  }

  public async getLocationByZipCode(zipCode: string): Promise<LocationData> {
    if (!this.isValidUSZipCode(zipCode)) {
      throw new Error(
        "Please enter a valid US ZIP code (5 digits or 5+4 format)",
      );
    }

    const url = `${BASE_URL}/geo/1.0/zip?zip=${zipCode},US&appid=${this.apiKey}`;

    try {
      const data = await this.fetchWithErrorHandling<LocationData>(url);
      return data;
    } catch (error) {
      if (error instanceof Error && error.message.includes("not found")) {
        throw new Error("ZIP code not found. Please check and try again.");
      }
      throw error;
    }
  }

  public async getCurrentWeather(
    lat: number,
    lon: number,
  ): Promise<WeatherData> {
    const url = `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=imperial`;
    return this.fetchWithErrorHandling<WeatherData>(url);
  }

  public async getCurrentWeatherByZip(zipCode: string): Promise<WeatherData> {
    const location = await this.getLocationByZipCode(zipCode);
    return this.getCurrentWeather(location.lat, location.lon);
  }

  public async getForecast(lat: number, lon: number): Promise<WeatherForecast> {
    const url = `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=imperial`;
    return this.fetchWithErrorHandling<WeatherForecast>(url);
  }

  public async getForecastByZip(zipCode: string): Promise<WeatherForecast> {
    const location = await this.getLocationByZipCode(zipCode);
    return this.getForecast(location.lat, location.lon);
  }

  private isValidUSZipCode(zipCode: string): boolean {
    // Matches 5-digit ZIP codes or 5+4 format (e.g., 12345 or 12345-6789)
    const zipPattern = /^\d{5}(-\d{4})?$/;
    return zipPattern.test(zipCode.trim());
  }

  public getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  public formatTemperature(temp: number): string {
    return `${Math.round(temp)}°F`;
  }

  public formatTime(timestamp: number): string {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(timestamp * 1000));
  }

  public formatDate(timestamp: number): string {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(new Date(timestamp * 1000));
  }

  public getWindDirection(degrees: number): string {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }
}

// Demo data for when API key is not available
export const demoWeatherData: WeatherData = {
  coord: { lon: -122.08, lat: 37.39 },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  base: "stations",
  main: {
    temp: 72.5,
    feels_like: 75.2,
    temp_min: 68.0,
    temp_max: 78.0,
    pressure: 1013,
    humidity: 65,
  },
  visibility: 10000,
  wind: {
    speed: 8.5,
    deg: 230,
  },
  clouds: {
    all: 5,
  },
  dt: Date.now() / 1000,
  sys: {
    country: "US",
    sunrise: 1635765432,
    sunset: 1635806832,
  },
  timezone: -28800,
  id: 5375480,
  name: "Mountain View",
  cod: 200,
};

export const weatherService = WeatherService.getInstance();


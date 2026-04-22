import.meta.env;

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export interface Weather {
    city: string;
    tempC: number;
    description: string;
    humidity: number;
    windSpeed: number;
    icon: number;
}

type WeatherError =
    | "CITY_NOT_FOUND"
    | "NETWORK_ERROR"
    | "WEATHER_NOT_FOUND";

type AccuWeatherResponse = {
    Temperature: {
        Metric: { Value: number };
    };
    WeatherIcon: number,
    WeatherText: string;
    RelativeHumidity: number;
    Wind: {
        Speed: {
            Metric: { Value: number };
        };
    };
};

type Location = {
    key: string;
    name: string;
};

class WeatherServiceError extends Error {
    constructor(public code: WeatherError) {
        super(code);
    }
}

export async function getWeatherByCity(city: string): Promise<Weather> {
    const location = await getLocationKey(city);
    const weatherData = await getCurrentWeather(location.key);
    return transformWeatherData(location.name, weatherData);
}

async function getLocationKey(city: string): Promise<Location> {
    const encodedCity = encodeURIComponent(city.trim());
    
    const response = await fetch(
        `${BASE_URL}/locations/v1/cities/search?q=${encodedCity}&apikey=${API_KEY}`
    );

    if (!response.ok) {
        throw new WeatherServiceError("NETWORK_ERROR");
    }

    const data = await response.json();
    console.log("LOCATION RESPONSE:", data);

    if (!data || data.length === 0) {
        throw new WeatherServiceError("CITY_NOT_FOUND");
    }

    return {
        key: data[0].Key,
        name: data[0].LocalizedName
    };
}

async function getCurrentWeather(location: string): Promise<AccuWeatherResponse> {
    const response = await fetch(
        `${BASE_URL}/currentconditions/v1/${location}?apikey=${API_KEY}`
    );

    if (!response.ok) {
        throw new WeatherServiceError("NETWORK_ERROR");
    }

    const data = await response.json();
    console.log("WEATHER RESPONSE:", data);

    if (!data || data.length === 0) {
        throw new WeatherServiceError("WEATHER_NOT_FOUND");
    }

    return data[0];
}

function transformWeatherData(city: string, data: AccuWeatherResponse): Weather {
    const temp = data?.Temperature?.Metric?.Value;

    if (temp == null) {
        throw new WeatherServiceError("WEATHER_NOT_FOUND");
    }
    return {
        city,
        tempC: data.Temperature.Metric.Value,
        description: data.WeatherText,
        humidity: data.RelativeHumidity ?? 0,
        windSpeed: data.Wind?.Speed?.Metric?.Value ?? 0,
        icon: data.WeatherIcon ?? 0,
    };
}
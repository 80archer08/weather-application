export interface Weather {
    city: string;
    tempC: number;
    description: string;
    humidity: number;
    windSpeed: number;
}

export async function getWeatherByCity(city: string): Promise<Weather> {
    const locationKey = await getLocationKey(city);
    const weatherData = await getCurrentWeather(locationKey);
    return transformWeatherData(city, weatherData);
}

async function getLocationKey(city: string): Promise<string> {
    const response = await fetch(
        `${BASE_URL}/locations/v1/cities/search?q=${city}&apikey=${API_KEY}`
    );

    if (!response.ok) {
        throw new Error("NETWORK_ERROR");
    }

    const data = await response.json();

    if (!data || data.length === 0) {
        throw new Error("CITY_NOT_FOUND");
    }

    return data[0].Key;
}

async function getCurrentWeather(locationKey: string): Promise<any> {
    const response = await fetch(
        `${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}`
    );

    if (!response.ok) {
        throw new Error("NETWORK_ERROR");
    }

    const data = await response.json();

    if (!data || data.length === 0) {
        throw new Error("WEATHER_NOT_FOUND");
    }

    return data[0];
}

function transformWeatherData(city: string, data: any): Weather {
    return {
        city,
        tempC: data.Temperature.Metric.Value,
        description: data.WeatherText,
        humidity: data.RelativeHumidity,
        windSpeed: data.Wind.Speed.Metric.Value,
    };
}
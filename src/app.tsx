import { getWeatherByCity } from "./services/weatherService";
import type { Weather } from "./services/weatherService";
import { useState } from 'react';

function App() {
    const [city, setCity] = useState<string>("");
    const [weather, setWeather] = useState<Weather | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [unit, setUnit] = useState<"C" | "F">("C");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = async () => {
        if (!city.trim()) {
            setError("Please enter a city.");
            return;
        }
        // Implementing loading state, clearing previous errors, calling the service, success handling, error handling, finally block
        try {
            setLoading(true);

            setError(null);

            const data = await getWeatherByCity(city);

            setWeather(data);
        } catch (err) {
            console.error("CAUGHT ERROR:", err);
            if (err instanceof Error) {
                switch (err.message) {
                    case "CITY_NOT_FOUND":
                        setError("City not found. Try a more specific name.");
                        break;
                    case "NETWORK_ERROR":
                        setError("Error fetching weather data. Please try again.");
                        break;
                    case "WEATHER_NOT_FOUND":
                        setError("Weather data unavailable.");
                        break;
                    default:
                        setError("Something went wrong.");
                }
            } else {
                setError("Unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    const displayTemp =
        weather &&
        (unit === "C"
        ? weather.tempC
        : (weather.tempC * 9) / 5 + 32);

    return (
        <div>
            <h1>Weather App</h1>

            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />

            <button onClick={handleSearch} disabled={loading}>
                {loading ? "Loading..." : "Search"}
            </button>

            <button onClick={() => setUnit(unit === "C" ? "F" : "C")}>
                Toggle °{unit === "C" ? "F" : "C"}
            </button>

            {error && <p>{error}</p>}

            {weather && (
                <div>
                <h2>{weather.city}</h2>
                <p>
                    Temperature: {displayTemp?.toFixed(1)}°{unit}
                </p>
                <p>{weather.description}</p>
                <p>Humidity: {weather.humidity}%</p>
                <p>Wind Speed: {weather.windSpeed} km/h</p>
                </div>
            )}
        </div>
    );
}

export default App;



        
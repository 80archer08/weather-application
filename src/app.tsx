import SearchBar from "./components/searchBar";
import WeatherCard from "./components/weatherCard";
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
            //console.error("CAUGHT ERROR:", err);
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

    return (
        <div>
            <h1>Weather App</h1>

            <SearchBar
                city={city}
                setCity={setCity}
                onSearch={handleSearch}
                loading={loading}
            />

            {error && <p>{error}</p>}

            {weather && (
                <WeatherCard
                    weather={weather}
                    unit={unit}
                    onToggleUnit={() => setUnit(unit === "C" ? "F" : "C")}
                />
            )}
        </div>
    );
}

export default App;



        
import type { Weather } from "../services/weatherService"

type WeatherCardProps = {
    weather: Weather;
    unit: "C" | "F";
    onToggleUnit: () => void;
};

function WeatherCard({ weather, unit, onToggleUnit }: WeatherCardProps) {
    const displayTemp =
        unit === "C"
            ? weather.tempC
            : (weather.tempC * 9) / 5 + 32;
    
    return (
        <div>
            <h2>{weather.city}</h2>

            <p>
                Temperature: {displayTemp.toFixed(1)}°{unit}
            </p>

            <p>{weather.description}</p>

            <p>Humidity: {weather.humidity}%</p>

            <p>Wind Speed: {weather.windSpeed} km/h</p>

            <button onClick={onToggleUnit}>
                Toggle °{unit === "C" ? "F" : "C"}
            </button>
        </div>
    );
}

export default WeatherCard;
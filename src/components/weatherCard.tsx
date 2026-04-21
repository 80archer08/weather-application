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
    
    const getWeatherImage = (icon: number) => {
        if (icon >= 1 && icon <= 5) return "/images/sunny.png";
        if (icon >= 6 && icon <= 11) return "/images/cloudy.png";
        if (icon >=12 && icon <= 18) return "/images/rain.png";
        if (icon >= 19 && icon <= 29) return "/images/snow.png";
        return "/images/default.png";
    };
    
    return (
        <div>
            <h2>{weather.city}</h2>

            <img
                src={getWeatherImage(weather.icon)}
                alt={weather.description}
                style={{ width: "100px" }}
            />

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
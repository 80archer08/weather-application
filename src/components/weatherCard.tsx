import type { Weather } from "../services/weatherService"

type WeatherCardProps = {
    weather: Weather;
    unit: "C" | "F";
    onToggleUnit: () => void;
    timeFormat: "12h" | "24h";
    onToggleTimeFormat: () => void;
};

function WeatherCard({ weather, unit, timeFormat, onToggleUnit, onToggleTimeFormat }: WeatherCardProps) {
    const displayTemp =
        unit === "C"
            ? weather.tempC
            : (weather.tempC * 9) / 5 + 32;
    
    // Idea is to take epochSeconds and convert it to either 24-hour time or 12-hour time
    // If 12-hour time, it would display AM if original value was under midpoint, PM if over.
    const formatTime = (epoch: number, format: "12h" | "24h", timeZone: string) => {
        const date = new Date(epoch * 1000); // s -> ms
        /*
        if (format === "24h") {
            return date.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });
        }
        */
        return new Intl.DateTimeFormat(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: format === "12h",
            timeZone: timeZone,
        }).format(date);
    }
    
    const getCurrentTime = (format: "12h" | "24h") => {
        const now = new Date();

        return now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: format === "12h",
        });
    };        


    const getWeatherImage = (icon: number) => {
    const padded = icon.toString().padStart(2, "0");
    return `/icons/weather/${padded}.png`;
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

            <p>
                Last Updated Time: {" "}{formatTime(weather.timeEpoch, timeFormat, weather.timeZone)}
            </p>

            <button onClick={onToggleTimeFormat}>
                Toggle {timeFormat === "12h" ? "24h" : "12h"}
            </button>
        </div>
    );
}

export default WeatherCard;
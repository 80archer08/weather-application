import { describe, it, expect, vi, beforeEach } from "vitest";
import { getWeatherByCity } from "./weatherService";

// Mocking global fetch
globalThis.fetch = vi.fn();

describe("weatherService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns formatted weather data on success", async () => {
    (globalThis.fetch as any)
      // Location API
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ Key: "123", LocalizedName: "London" }],
      })
      // Weather API
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          {
            WeatherText: "Sunny",
            WeatherIcon: 1,
            Temperature: { Metric: { Value: 20 } },
            RelativeHumidity: 50,
            Wind: { Speed: { Metric: { Value: 10 } } },
          },
        ],
      });

    const result = await getWeatherByCity("London");

    expect(result.city).toBe("London");
    expect(result.tempC).toBe(20);
    expect(result.description).toBe("Sunny");
    expect(result.humidity).toBe(50);
    expect(result.windSpeed).toBe(10);
  });

  it("throws CITY_NOT_FOUND when no location results", async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    await expect(getWeatherByCity("InvalidCity"))
      .rejects.toThrow("CITY_NOT_FOUND");
  });

  it("throws NETWORK_ERROR when response is not ok", async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: false,
    });

    await expect(getWeatherByCity("London"))
      .rejects.toThrow("NETWORK_ERROR");
  });

  it("handles missing wind data safely", async () => {
    (globalThis.fetch as any)
      // Location API
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ Key: "123", LocalizedName: "London" }],
      })
      // Weather API (no Wind)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          {
            WeatherText: "Cloudy",
            WeatherIcon: 6,
            Temperature: { Metric: { Value: 15 } },
            RelativeHumidity: 60,
          },
        ],
      });

    const result = await getWeatherByCity("London");

    expect(result.windSpeed).toBe(0);
  });

  it("throws WEATHER_NOT_FOUND if temperature is missing", async () => {
    (globalThis.fetch as any)
      // Location API
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ Key: "123", LocalizedName: "London" }],
      })
      // Weather API (missing temperature)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{}],
      });

    await expect(getWeatherByCity("London"))
      .rejects.toThrow("WEATHER_NOT_FOUND");
  });
});
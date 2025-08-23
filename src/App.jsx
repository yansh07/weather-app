import React, { useState, useEffect } from "react";
import Hero from "./Components/Hero";
import WeatherSearch from "./Components/Search";
import Temper from "./Components/Temper";
import "./index.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 🔴 error state
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API;

  // Fetch weather by city name
  const fetchWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
      setLoading(true);
      setError(null); // clear old errors
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        setError(data.message || "City not found");
        setWeatherData(null);
      }
    } catch (error) {
      setError("Failed to fetch weather data");
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    try {
      setLoading(true);
      setError(null); // clear old errors
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        setError(data.message || "Unable to fetch location weather");
        setWeatherData(null);
      }
    } catch (error) {
      setError("Failed to fetch location weather");
      console.error("Error fetching weather by coords:", error);
    } finally {
      setLoading(false);
    }
  };

  // On mount -> ask location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          console.warn("Location denied. Showing Delhi weather.");
          fetchWeather("Delhi");
        }
      );
    } else {
      console.warn("Geolocation not supported. Showing Delhi weather.");
      fetchWeather("Delhi");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative z-10 min-h-screen overflow-x-hidden text-white bg-glassy">
      <Hero />
      <WeatherSearch onSearch={fetchWeather} />

      {/* 🔴 Error Message */}
      {error && (
        <div className="flex justify-center mt-5">
          <div className="px-4 py-2 text-red-200 rounded-lg shadow-md bg-red-800/70">
            ⚠️ {error}
          </div>
        </div>
      )}

      {/* Weather Data or Loader */}
      {loading && !error ? (
        <div className="flex justify-center mt-10 text-lg font-semibold text-gray-300">
          Fetching weather data...
        </div>
      ) : (
        <Temper weatherData={weatherData} />
      )}
    </div>
  );
}

export default App;

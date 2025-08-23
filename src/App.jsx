import React, { useState, useEffect } from "react";
import Hero from "./Components/Hero";
import WeatherSearch from "./Components/Search";
import Temper from "./Components/Temper";
import "./index.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API;

  // Function to get dynamic background class based on weather
  const getWeatherBackgroundClass = (weatherData) => {
    if (!weatherData) return 'bg-glassy';
    
    const condition = weatherData.weather[0].main.toLowerCase();
    
    switch (condition) {
      case 'clear':
        return 'weather-sunny';
      case 'rain':
      case 'drizzle':
        return 'weather-rainy';
      case 'clouds':
        return 'weather-cloudy';
      case 'snow':
        return 'weather-snowy';
      default:
        return 'bg-glassy';
    }
  };

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch current weather
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const weatherData = await weatherRes.json();

      if (weatherData.cod !== 200) {
        throw new Error(weatherData.message || "City not found.");
      }
      setWeatherData(weatherData);

      // Fetch forecast weather
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastData = await forecastRes.json();
      
      if (forecastData.cod !== "200") {
        throw new Error(forecastData.message || "Forecast not found.");
      }
      setForecastData(forecastData);

    } catch (err) {
      console.error("Error fetching weather:", err);
      setError(err.message || "Unable to fetch weather data.");
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const weatherData = await weatherRes.json();
      
      if (weatherData.cod !== 200) {
        throw new Error(weatherData.message || "Unable to fetch location weather");
      }
      setWeatherData(weatherData);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const forecastData = await forecastRes.json();

      if (forecastData.cod !== "200") {
        throw new Error(forecastData.message || "Forecast not available for this location.");
      }
      setForecastData(forecastData);

    } catch (error) {
      setError(error.message || "Failed to fetch weather data.");
      setWeatherData(null);
      setForecastData(null);
      console.error("Error fetching weather by coords:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.warn("Location denied. Showing Delhi weather.", err);
          fetchWeather("Delhi");
        }
      );
    } else {
      console.warn("Geolocation not supported. Showing Delhi weather.");
      fetchWeather("Delhi");
    }
  }, []);

  // Scroll animation observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.scroll-animate');
    elementsToAnimate.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [weatherData]);

  return (
    <div className={`weather-container relative z-10 min-h-screen overflow-x-hidden text-white transition-all duration-1000 ${getWeatherBackgroundClass(weatherData)}`}>
      <div className="scroll-animate">
        <Hero />
      </div>
      
      <div className="scroll-animate">
        <WeatherSearch onSearch={fetchWeather} />
      </div>

      {error && (
        <div className="flex justify-center mt-5 scroll-animate">
          <div className="px-6 py-3 text-red-200 border shadow-lg rounded-2xl bg-red-800/20 backdrop-blur-md border-red-400/30 animate-fade-in-up">
            ⚠️ {error}
          </div>
        </div>
      )}

      {loading && !error ? (
        <div className="flex justify-center mt-10 text-lg font-semibold text-gray-300 scroll-animate">
          <div className="animate-pulse-slow">Fetching weather data...</div>
        </div>
      ) : (
        weatherData && (
          <>
            <Temper weatherData={weatherData} forecastData={forecastData} />
            <div className="flex justify-center mt-8 mb-4 text-xs text-gray-400 scroll-animate">
              <p>Data provided by <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer" className="underline transition-colors duration-300 hover:text-gray-300">OpenWeather</a></p>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default App;
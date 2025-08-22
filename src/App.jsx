import React, { useState } from "react";
import Hero from "./Components/Hero";
import WeatherSearch from "./Components/Search";
import Temper from "./Components/Temper";
import "./index.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (city) => {
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <div className="relative z-10 min-h-screen overflow-x-hidden text-white bg-glassy">
      {/*Header */}
      <Hero />

      {/* Search */}
      <WeatherSearch onSearch={fetchWeather} />

      {/* Weather Data */}
      <Temper weatherData={weatherData} />
    </div>
  );
}

export default App;

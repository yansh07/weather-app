import React, { useState } from "react";
import Hero from "./Hero";
import dayjs from "dayjs";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const now = dayjs();

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
    <div className="text-white">
      <Hero onSearch={fetchWeather} />
      <div className="px-8 text-gray-300/90 text-md font-heading ">
        <div>{now.format("dddd")}</div>
        <div>{now.format("DD MMM, YYYY  h:mm A")}</div>
      </div>
      {weatherData && (
        <div className="p-6">
          <h2 className="text-2xl font-bold">{weatherData.name}</h2>
          <p>🌡 Temp: {weatherData.main.temp} °C</p>
          <p>💨 Wind: {weatherData.wind.speed} m/s</p>
          <p>💧 Humidity: {weatherData.main.humidity}%</p>
          <p>📊 Pressure: {weatherData.main.pressure} hPa</p>
          <p>⛅ Condition: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;

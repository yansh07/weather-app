function Temper({ weatherData }) {
  if (!weatherData) return null;

  return (
    <div className="p-8 text-white">
      <h2 className="text-2xl font-bold">{weatherData.name}</h2>
      <p>🌡 Temp: {weatherData.main.temp} °C</p>
      <p>💨 Wind: {weatherData.wind.speed} m/s</p>
      <p>💧 Humidity: {weatherData.main.humidity}%</p>
      <p>📊 Pressure: {weatherData.main.pressure} hPa</p>
      <p>⛅ Condition: {weatherData.weather[0].description}</p>
    </div>
  );
}

export default Temper;

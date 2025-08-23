import React from "react";

function Forecast({ forecastData }) {
  if (!forecastData) return null;

  // Din ke hisaab se group karna (daily average le lo ya sirf 12:00 pm entry)
  const daily = forecastData.list.filter(item =>
    item.dt_txt.includes("12:00:00")
  );

  return (
    <div className="px-4 mt-8">
      <h2 className="mb-4 text-2xl font-bold text-center">5-Day Forecast</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {daily.map((day, idx) => (
          <div
            key={idx}
            className="p-4 text-center rounded-xl bg-white/10 backdrop-blur-lg"
          >
            <p className="mb-2 font-semibold">
              {new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </p>
            <img
              alt={day.weather[0].description}
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              className="mx-auto"
            />
            <p className="text-lg font-bold">
              {Math.round(day.main.temp)}°C
            </p>
            <p className="text-sm text-gray-200 capitalize">
              {day.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;

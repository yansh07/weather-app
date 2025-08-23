import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Eye, Wind, Droplets, Gauge } from 'lucide-react';

function Temper({ weatherData, forecastData }) {
  if (!weatherData) return null;

  // Function to get background gradient and weather icon based on weather condition
  const getWeatherStyle = (condition) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('clear') || conditionLower.includes('sun')) {
      return {
        gradient: 'from-blue-400 via-blue-500 to-blue-600',
        bgImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        icon: <Sun className="w-16 h-16 text-yellow-300 drop-shadow-lg" />,
        overlay: 'bg-gradient-to-br from-yellow-400/20 via-orange-400/10 to-blue-500/30'
      };
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return {
        gradient: 'from-gray-600 via-gray-700 to-gray-800',
        bgImage: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&h=600&fit=crop',
        icon: <CloudRain className="w-16 h-16 text-blue-300 drop-shadow-lg" />,
        overlay: 'bg-gradient-to-br from-blue-600/30 via-gray-500/20 to-gray-800/40'
      };
    } else if (conditionLower.includes('cloud')) {
      return {
        gradient: 'from-gray-500 via-gray-600 to-gray-700',
        bgImage: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=800&h=600&fit=crop',
        icon: <Cloud className="w-16 h-16 text-gray-300 drop-shadow-lg" />,
        overlay: 'bg-gradient-to-br from-gray-400/20 via-gray-600/30 to-gray-800/40'
      };
    } else if (conditionLower.includes('snow')) {
      return {
        gradient: 'from-blue-300 via-blue-400 to-blue-500',
        bgImage: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=800&h=600&fit=crop',
        icon: <CloudSnow className="w-16 h-16 text-blue-200 drop-shadow-lg" />,
        overlay: 'bg-gradient-to-br from-blue-200/30 via-white/20 to-blue-400/40'
      };
    } else {
      // Default case
      return {
        gradient: 'from-blue-500 via-purple-500 to-indigo-600',
        bgImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        icon: <Eye className="w-16 h-16 text-white drop-shadow-lg" />,
        overlay: 'bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-indigo-600/40'
      };
    }
  };

  const weatherStyle = getWeatherStyle(weatherData.weather[0].description);

  return (
    <div className="flex flex-col items-center justify-center p-4 mt-3 md:mt-2 sm:p-6 lg:p-8 lg:-mt-2 xl:mt-2 animate-fade-in-up">
      {/* Main Weather Card */}
      <div className="relative w-full max-w-md group sm:max-w-lg lg:max-w-xl xl:max-w-2xl animate-scale-in">
        {/* Animated Border */}
        <div className="absolute transition duration-1000 -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-3xl blur-sm opacity-60 group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
        
        {/* Glassmorphism Container */}
        <div className="relative p-1 border shadow-2xl bg-white/10 backdrop-blur-xl rounded-3xl border-white/20">
          {/* Inner Weather Card */}
          <div 
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${weatherStyle.gradient} min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}
            style={{
              backgroundImage: `url(${weatherStyle.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'multiply'
            }}
          >
            {/* Dynamic Overlay */}
            <div className={`absolute inset-0 ${weatherStyle.overlay} backdrop-blur-[1px]`}></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full p-6 sm:p-8 lg:p-10">
              {/* Header Section */}
              <div className="flex items-start justify-between mb-6 animate-slide-in-left">
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl lg:text-4xl drop-shadow-lg animate-text-glow">
                    {weatherData.name}
                  </h2>
                  <p className="text-sm font-medium capitalize text-white/80 sm:text-base">
                    {weatherData.weather[0].description}
                  </p>
                </div>
                <div className="animate-float">
                  {weatherStyle.icon}
                </div>
              </div>

              {/* Temperature Display */}
              <div className="mb-8 text-center animate-slide-in-up">
                <div className="mb-2 text-6xl font-thin text-white sm:text-7xl lg:text-8xl drop-shadow-2xl animate-pulse-slow">
                  {Math.round(weatherData.main.temp)}°
                </div>
                <div className="text-sm text-white/70 sm:text-base">
                  Feels like {Math.round(weatherData.main.feels_like)}°C
                </div>
              </div>

              {/* Weather Details Grid */}
              <div className="grid grid-cols-2 gap-4 mt-auto delay-200 sm:gap-6 animate-slide-in-up">
                {[
                  { icon: Wind, label: 'Wind', value: `${weatherData.wind.speed} m/s` },
                  { icon: Droplets, label: 'Humidity', value: `${weatherData.main.humidity}%` },
                  { icon: Gauge, label: 'Pressure', value: `${weatherData.main.pressure} hPa` },
                  { icon: Eye, label: 'Visibility', value: weatherData.visibility ? `${(weatherData.visibility / 1000).toFixed(1)} km` : 'N/A' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 transition-all duration-300 border weather-detail-card bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 hover:scale-105 hover:shadow-lg border-white/10">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
                      <div>
                        <div className="text-xs text-white/70 sm:text-sm">{item.label}</div>
                        <div className="text-sm font-semibold text-white sm:text-base">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Min/Max Temperature */}
              <div className="flex items-center justify-between pt-4 mt-6 delay-300 border-t border-white/20 animate-slide-in-up">
                <div className="text-center">
                  <div className="text-xs text-white/70 sm:text-sm">Min</div>
                  <div className="text-lg font-semibold text-white sm:text-xl">
                    {Math.round(weatherData.main.temp_min)}°
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-white/70 sm:text-sm">Max</div>
                  <div className="text-lg font-semibold text-white sm:text-xl">
                    {Math.round(weatherData.main.temp_max)}°
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Animation Elements */}
            <div className="absolute w-2 h-2 rounded-full top-10 right-10 bg-white/30 animate-ping"></div>
            <div className="absolute w-1 h-1 rounded-full bottom-20 left-10 bg-white/40 animate-pulse"></div>
            <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce delay-1000"></div>
            <div className="absolute w-1 h-1 delay-500 rounded-full top-1/2 right-1/4 bg-white/30 animate-ping"></div>
          </div>
        </div>
      </div>
      
      {/* 5-Day Forecast Section */}
      {forecastData && (
        <div className="w-full max-w-md mt-8 sm:max-w-lg lg:max-w-xl xl:max-w-2xl animate-slide-in-up delay-400">
          <div className="relative">
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 border bg-white/5 backdrop-blur-xl rounded-2xl border-white/10"></div>
            
            <div className="relative p-6">
              <h3 className="mb-6 text-xl font-bold text-center text-white sm:text-2xl drop-shadow-lg animate-text-glow">
                5-Day Forecast
              </h3>
              
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {forecastData.list
                  .filter(item => item.dt_txt.includes("12:00:00"))
                  .map((day, idx) => (
                    <div
                      key={idx}
                      className="p-3 text-center transition-all duration-300 border forecast-card bg-white/10 backdrop-blur-lg rounded-2xl hover:bg-white/20 hover:scale-105 hover:shadow-lg sm:p-4 border-white/10 animate-slide-in-up"
                      style={{ animationDelay: `${idx * 100 + 500}ms` }}
                    >
                      <p className="mb-2 text-xs font-semibold text-white sm:text-sm">
                        {new Date(day.dt_txt).toLocaleDateString("en-US", {
                          weekday: "short",
                          day: "numeric",
                        })}
                      </p>
                      <div className="flex justify-center mb-2">
                        <img
                          alt={day.weather[0].description}
                          src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                          className="w-8 h-8 mx-auto sm:w-10 sm:h-10 animate-float"
                          style={{ animationDelay: `${idx * 200}ms` }}
                        />
                      </div>
                      <p className="text-sm font-bold text-white sm:text-base">
                        {Math.round(day.main.temp)}°
                      </p>
                      <p className="text-xs capitalize text-white/70 sm:text-sm">
                        {day.weather[0].description}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Credit Section */}
      <div className='mt-8 text-sm transition-all duration-300 text-white/70 xl:text-lg hover:underline hover:text-white animate-fade-in delay-600'>
        <a href="https://github.com/yansh07" target="_blank" rel="noopener noreferrer" className="hover:text-gradient">
          Made with 🤍 by Priyanshu
        </a>
      </div>
    </div>
  );
}

export default Temper;
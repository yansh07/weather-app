import { useState } from "react";

export default function WeatherSearch({ onSearch }) {
  const [city, setCity] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && city.trim() !== "") {
      onSearch(city); // parent will call API
      setCity(""); // input clear
    }
  };

  return (
    <div className="flex justify-center w-full mt-2 xl:mt-6">
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        className="text-white font-semibold p-2 border border-gray-300 rounded-lg shadow-sm w-[340px] md:w-[520px] lg:w-[570px] xl:w-[670px] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent placeholder:text-white backdrop-blur-xl"
      />
    </div>
  );
}

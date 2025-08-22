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
    <div className="flex justify-center w-full mt-5">
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        className="p-2 border border-gray-300 rounded-lg shadow-sm w-80 md:w-96 lg:w-[580px] xl:w-[900px] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200/90 placeholder:text-black"
      />
    </div>
  );
}

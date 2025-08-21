import React, {useState} from "react";

function Hero({onSearch}) {
  const [showInput, setShowInput] = useState(false);
  const [city, setCity] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && city.trim() !== "") {
      onSearch(city); //parent will call api
      setShowInput(false); //close input after search
      setCity(""); //clear input
    }
  };
  return (
    <div className="flex flex-row items-center gap-16 p-8">
      {/* Brand */}
      <h1 className="text-5xl font-bold text-transparent font-heading bg-gradient-to-r from-green-500 via-slate-600 to-white/70 bg-clip-text">
        NIMBUS
      </h1>

      {/* Search Section */}
      <div className="relative flex items-center">
        {showInput ? (
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter city name..."
            className="px-3 py-1 text-white border rounded-lg bg-white/10 focus:outline-none border-white/30"
            autoFocus
          />
        ) : (
          <i
            className="text-3xl cursor-pointer fa-solid fa-magnifying-glass-location text-white/70"
            onClick={() => setShowInput(true)}
          ></i>
        )}
      </div>
    </div>
  );
}

export default Hero;

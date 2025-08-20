import React from "react";

function Hero() {
  return (
    <div className="flex flex-row gap-16 p-8 mb-4">
      <h1 className="text-5xl font-bold text-transparent font-heading bg-gradient-to-r from-green-500 via-slate-600 to-white/70 bg-clip-text">
        NIMBUS
      </h1>

      <div className="object-cover pl-2 pr-2 card">
        <i class="fa-solid fa-magnifying-glass-location text-white/70 text-3xl mt-1"></i>
      </div>
    </div>
  );
}

export default Hero;

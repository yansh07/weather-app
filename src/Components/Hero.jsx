import dayjs from "dayjs";


function Hero() {
  
  const now = dayjs();

  return (
    <div className="flex flex-row items-center gap-16 p-2 px-8 md:gap-32 md:px-8 lg:px-32 xl:gap-44 xl:ml-10 xl:px-60 lg:gap-48">

      <h1 className="text-lg font-bold text-transparent font-heading md:text-2xl xl:text-4xl md:px-24 md:pt-4 bg-gradient-to-r from-orange-400 via-yellow-400 to-white/70 bg-clip-text">
        NIMBUS
      </h1>
      <div className="flex gap-3 px-2 text-xs md:text-sm md:pt-4 xl:text-lg xl:px-8 text-gray-300/90 font-heading">
        <div>{now.format("dddd")}</div>
        <div>{now.format("DD MMM,  h:mm A")}</div>
      </div>
    </div>
  );
}

export default Hero;

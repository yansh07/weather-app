import dayjs from "dayjs";

function Hero() {
  
  const now = dayjs();

  return (
    <div className="flex flex-row items-center gap-16 p-2 px-4 md:gap-40 lg:px-36 xl:gap-96 xl:ml-10">

      <h1 className="text-lg font-bold text-transparent font-heading md:text-2xl xl:text-4xl md:px-20 md:pt-4 bg-gradient-to-r from-orange-400 via-yellow-400 to-white/70 bg-clip-text">
        NIMBUS
      </h1>
      <div className="flex gap-3 px-2 text-xs md:text-sm md:pt-4 md:px-6 xl:text-lg xl:px-94 text-gray-300/90 font-heading">
        <div>{now.format("dddd")}</div>
        <div>{now.format("DD MMM, YYYY  h:mm A")}</div>
      </div>
      
    </div>
  );
}

export default Hero;

import Search from "./Components/Search";
import Temper from "./Components/Temper";
import Forecast from "./Components/Forecast";

function Home({ weatherData }) {
  return (
    <div className="relative z-10 flex flex-col min-h-screen bg-glassy">
      {/* Main content */}
      <div className="flex flex-col items-center flex-grow">
        <Temper weatherData={weatherData} />
        <Search />
      </div>
    </div>
  );
}

export default Home;

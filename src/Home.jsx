import Hero from "./Components/Hero";
import Day from "./Components/Day";
import Temper from "./Components/Temper";

function Home() {
  return (
    <div className='relative z-10 min-h-screen overflow-x-hidden bg-glassy'>
      <Hero />
      <Day />
      <Temper />
    </div>
  )
}

export default Home
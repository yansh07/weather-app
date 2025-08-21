import Search from "./Components/Search";
import Temper from "./Components/Temper";

function Home() {
  return (
    <div className='relative z-10 min-h-screen overflow-x-hidden bg-glassy'>
      <Temper />
      <Search />
    </div>
  )
}

export default Home
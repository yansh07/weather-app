import { Route, Routes } from 'react-router-dom';
import './index.css'
import Home from './Home';

function App() {
  return (
    <div className='relative'>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
export default App

// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': 'YOUR_API_KEY_HERE',
//     'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
//   }
// };

// async function fetchCities(query) {
//   const res = await fetch(
//     `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5&sort=-population`,
//     options
//   );
//   const data = await res.json();
//   return data.data; // array of cities
// }

// // Example usage
// fetchCities("del").then(cities => console.log(cities));

import { useEffect, useState } from 'react'
import '../styles/App.scss'
import axios from 'axios'

function App() {
  const loadSize = 15;
  const [load, setLoad] = useState(loadSize);
  const [offset, setOffset] = useState(0);
  // const [pokeData, setPokeData] = useState([]);

  const loadData = async () => {
    await axios.get('https://pokeapi.co/api/v2/pokemon/', {
      params: {
        limit: load,
        offset: offset,
      }
    })
      .then((response) => {
        console.log("loadData");
        setLoad((prevLoad) => prevLoad += loadSize)
        setOffset((prevOffset) => prevOffset += loadSize);
        console.log(response);
        response.data.results.forEach((element:object) => {
          console.log(element);
        });
    })
      .catch((error) => {
        console.log("Unable to fetch data.");
        console.log(error);
      })
  }

  useEffect(() => {
    console.log("useEffect");
    axios.get('https://pokeapi.co/api/v2/pokemon/', {
      params: {
        limit: load,
        offset: offset,
      }
    })
      .then((response) => {
        response.data.results.forEach((element:object) => {
          console.log(element);
          setLoad((prevLoad) => prevLoad++);
          setOffset((prevOffset) => prevOffset++);
        });
    })
      .catch((error) => {
        console.log("Unable to fetch data.");
        console.log(error);
      })
  }, [])

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
       */}
      <div className="w-full h-full flex flex-row justify-center items-baseline gap-x-4">
        <div className='bg-red-500 max-h-content'>{ load }</div>
        <button onClick={ () => loadData() }> hello </button>
        <a>Link sample</a>

      </div>
    </>
  )
}

export default App

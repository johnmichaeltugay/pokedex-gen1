import { useEffect } from 'react'
import '../styles/App.scss'
import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
  const loadSize = 15;
  const loadSizeCacheName = 'loadSize';
  const offsetSizeCacheName = 'offsetSize';
  const [load, setLoad] = useLocalStorage(loadSizeCacheName, loadSize);
  const [offset, setOffset] = useLocalStorage(offsetSizeCacheName, 0);
  // const [pokeData, setPokeData] = useState([]);

  const setNewNumberLimit = (dataFunction: number, setDataFunction, localStorageName:string) => {
    setDataFunction((prevData: number) => prevData += loadSize);
    localStorage.setItem(localStorageName, dataFunction);
  }

  const loadData = async () => {
    await axios.get('https://pokeapi.co/api/v2/pokemon/', {
      params: {
        limit: load,
        offset: offset,
      }
    })
      .then((response) => {
        console.log("loadData");
        setNewNumberLimit(load, setLoad, loadSizeCacheName);
        setNewNumberLimit(offset, setOffset, offsetSizeCacheName);
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
    localStorage.setItem('loadSize', JSON.stringify(load));
    axios.get('https://pokeapi.co/api/v2/pokemon/', {
      params: {
        limit: load,
        offset: offset,
      }
    })
      .then((response) => {
        console.log("useEffect");
        setNewNumberLimit(load, setLoad, loadSizeCacheName);
        setNewNumberLimit(offset, setOffset, offsetSizeCacheName);
        response.data.results.forEach((element:object) => {
          console.log(element);
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

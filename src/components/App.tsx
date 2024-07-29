import { useEffect, useState } from 'react'
import '../styles/App.scss'
import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
  const loadSize = 15;
  const loadSizeCacheName = 'loadSize';
  const offsetSizeCacheName = 'offsetSize';
  // const pokeDataCacheName = 'pokeData';
  const [load, setLoad] = useLocalStorage(loadSizeCacheName, loadSize);
  const [offset, setOffset] = useLocalStorage(offsetSizeCacheName, 0);
  // const [pokeData, setPokeData] = useLocalStorage(pokeDataCacheName, []);
  

  const setNewNumberLimit = (dataFunction: number, localStorageName:string) => {
    localStorage.setItem(localStorageName, JSON.stringify(dataFunction));
  }

  const loadData = async () => {
    await axios.get('https://pokeapi.co/api/v2/pokemon/', {
      params: {
        limit: load,
        offset: offset,
      }
    })
      .then((response) => {
        setLoad((prevLoad: number) => prevLoad += loadSize);
        setOffset((prevOffset: number) => prevOffset += loadSize);
        setNewNumberLimit(load, loadSizeCacheName);
        setNewNumberLimit(offset, offsetSizeCacheName);
        console.log('loadData', response);
        response.data.results.forEach((element:object) => {
          console.log(typeof element);
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
        console.log('useEffect', response);
        // response.data.results.forEach((element:object) => {
          // setPokeData((prevPokeData:Array<object>) => [...prevPokeData, element]);
        // });
        setLoad((prevLoad: number) => prevLoad += loadSize);
        setOffset((prevOffset: number) => prevOffset += loadSize);
        setNewNumberLimit(load, loadSizeCacheName);
        setNewNumberLimit(offset, offsetSizeCacheName);
        console.log("pokeData", pokeData);
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

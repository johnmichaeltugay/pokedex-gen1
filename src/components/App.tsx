/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import '../styles/App.scss'
import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage';
import PokemonRoster from './PokemonRoster';
import { pokedexDataForm, PokemonRosterContext } from '../contexts/PokemonRosterContext';

interface pokemonInitialDataForm {
  url: string;
}
interface rawPokemonTypeDataForm {
  type: {
    name: string;
  }
}

function App() {
  const loadSize = 15;
  const loadSizeCacheName = 'loadSize';
  const offsetSizeCacheName = 'offsetSize';
  const pokeDataCacheName = 'pokemonData';
  const [load, setLoad] = useLocalStorage(loadSizeCacheName, loadSize);
  const [offset, setOffset] = useLocalStorage(offsetSizeCacheName, 0);
  const [pokemonData, setPokemonData] = useLocalStorage(pokeDataCacheName, []);
  const [networkError, setNetworkError] = useState(false);
  const [cutoffError, setCutoffError] = useState(false);

  const rawDataSynthesizer = (pokemonRoster: pokemonInitialDataForm[]) => {
    for (const pokeLink of pokemonRoster) {
      axios.get(pokeLink.url).then((response) => {
        console.log(response);
        const pokemonTypes = response.data.types.map((typeData: rawPokemonTypeDataForm) => typeData.type.name);
        const loadedPokemon = pokemonData.map((pokemon: pokedexDataForm) => { return pokemon.id });
        console.log("check if", response.data.id, 'is in', loadedPokemon);
        if (!loadedPokemon.includes(response.data.id)) {
          setPokemonData((prevPokemonData: pokedexDataForm[]) => [...prevPokemonData, {
            id: response.data.id,
            weight: response.data.weight,
            height: response.data.height,
            order: response.data.order,
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            types: pokemonTypes,
            isCaught: false,
            catchDate: null,
            nickname: null,
          }]);
        }
        setCutoffError(() => false);
      })
        .catch((error) => {
          console.log("subsequentPokemonDataError: ", error);
          setCutoffError(() => true);
      })
    }
  }

  const loadData = () => {
    axios.get('https://pokeapi.co/api/v2/pokemon/', {
      params: {
        limit: load,
        offset: offset,
      }
    })
      .then((response) => {
        rawDataSynthesizer(response.data.results);
        setNetworkError(() => false);
      })
      .catch((error) => {
        console.log("initialPokemonDataError: ", error);
        setNetworkError(() => true);
      })
  }

  useEffect(() => {
    console.log('check loading status -', pokemonData.length)
    if (pokemonData.length === load) {
      setLoad((prevLoad: number) => prevLoad += loadSize);
      setOffset((prevOffset: number) => prevOffset += loadSize);
    }
  }, [pokemonData]);

  // INITIAL LOAD OF FIRST POKEMON
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="w-screen max-w-screen-md">
      <div className="bg-red-400 h-[8vh] sticky top-0 z-[100]">
        <h1 className='text-4xl'>Pok&#233;dex</h1>
      </div>
      <PokemonRosterContext.Provider value={pokemonData}>
        <PokemonRoster />
      </PokemonRosterContext.Provider>
      <div className="w-full flex flex-row justify-center items-baseline gap-x-4 sticky bottom-0 z-[100]">
        <div className='bg-red-500 max-h-content'>{ load }</div>
        <button onClick={ () => loadData() }> hello </button>
        <a>Link sample</a>
        <div className='bg-teal-500'>{cutoffError}</div>
        <div className='bg-teal-500'>{networkError}</div>
      </div>
    </div>
  )
}

export default App

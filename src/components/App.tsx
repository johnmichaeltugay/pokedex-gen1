/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import '../styles/App.scss'
import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage';
import { pokedexDataForm } from '../contexts/PokemonRosterContext';
import PokemonItem from './PokemonItem';
import gridIcon from '../assets/grid_view_icon.svg';
import listIcon from '../assets/list_view_icon.svg';

interface pokemonInitialDataForm {
  url: string;
}
interface rawPokemonTypeDataForm {
  type: {
    name: string;
  }
}

function App() {
  const loadSize = 18;
  const loadSizeCacheName = 'loadSize';
  const offsetSizeCacheName = 'offsetSize';
  const pokeDataCacheName = 'pokemonData';
  const listTypeCacheName = 'listType'
  const [load, setLoad] = useLocalStorage(loadSizeCacheName, loadSize);
  const [offset, setOffset] = useLocalStorage(offsetSizeCacheName, 0);
  const [pokemonData, setPokemonData] = useLocalStorage(pokeDataCacheName, []);
  const [listType, setListType] = useLocalStorage(listTypeCacheName, 3);
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
      <div className="pokedex-case pokedex-bg h-[12vh] md:h-[15vh] sticky top-0 z-[100] flex items-center">
        <h1 className='text-2xl noto-sans-800 ps-4'>Pok&#233;dex</h1>
      </div>
      <div className={"grid gap-4 md:gap-8 pt-6 " + (listType === 3 ? 'grid-cols-3' : 'grid-cols-1')}>
            {pokemonData?.map((item: pokedexDataForm) => (
                <PokemonItem key={item.id} itemData={item}></PokemonItem>
            ))}
        </div>
      <div className="pokedex-bg w-full h-[8vh] flex flex-row justify-end items-center gap-x-4 sticky bottom-0 z-[100]">
        <div className='rounded-lg flex items-center me-4 relative'>
          {setListType} {networkError} {cutoffError}
          <div className={'rounded-full w-10 h-10 aspect-square bg-white bg-opacity-25 transition ease-in-out absolute ' + (listType === 3 ? 'left-0' : 'right-0')}></div>
          <img className='rounded-full w-10 p-1' onClick={() => setListType(() => 3)} src={gridIcon} />
          <img className='rounded-full w-10 p-1' onClick={() => setListType(() => 1)} src={listIcon} />
        </div>
      </div>
    </div>
  )
}

export default App

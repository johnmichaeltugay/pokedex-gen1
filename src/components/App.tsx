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
  name: string;
  url: string;
}

interface rawPokemonTypeDataForm {
  type: {
    name: string;
  }
}

interface pokemonAssetsForm {
  name: number;
  image: string;
  height: number;
  weight: number;
  types: string[];
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
  const [initIsLoading, setInitIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  // Cache pokemon assets
  const initPokedexData = async (initPokemonData: pokemonInitialDataForm) => {
    const pokemonAssetsCache = localStorage.getItem(initPokemonData.name);
    let pokemonId = 0;
    if (!pokemonAssetsCache) {
      const pokemonAssetsData = await axios.get(initPokemonData.url)
        .then((response) => {
          pokemonId = response.data.id;
          return {
            name: initPokemonData.name,
            image: response.data.sprites.other.dream_world.front_default,
            height: response.data.height,
            weight: response.data.weight,
            types: response.data.types.map((typeData: rawPokemonTypeDataForm) => typeData.type.name),
          }
        })
        .catch(() => {
          pokemonId = 0
          return {
            image: '',
            name: '',
            height: 0,
            weight: 0,
            types: [],
          }
        });
      localStorage.setItem(pokemonId.toString(), JSON.stringify(pokemonAssetsData));
    }
    else pokemonId = JSON.parse(pokemonAssetsCache).id;
    return pokemonId;
  };

  // Load additional pokemon entries
  const loadData = () => {
    axios.get('https://pokeapi.co/api/v2/pokemon/', {
      params: {
        limit: load,
        offset: offset,
      }
    })
      .then((response) => {
        response.data.results.forEach(async(item: pokemonInitialDataForm) => {
          const pokemonId = await initPokedexData(item);
          console.log('check if', pokemonId, 'is at', pokemonData);
          if (typeof pokemonId === 'number' && !(pokemonData.includes(pokemonId))) {
            setPokemonData((prevPokemonData: number[]) => {
              const newData = [...new Set(prevPokemonData)];
              newData.push(pokemonId);
              return [...new Set(newData)].sort((a, b) => a - b);
            });
            console.log("pokemon - ", typeof pokemonId, pokemonId, " - found");
          }
        })
        
      })
      .catch((error) => {
        setLoadingError(() => error);
      })
      .finally(() => {
        console.log("run")
        setInitIsLoading(() => false);

      })
  }

  useEffect(() => {
    console.log('check if all data has been loaded:', pokemonData.length, '===', load);
    if (pokemonData.length === load) {
      setLoad((prevLoad: number) => prevLoad += loadSize);
      setOffset((prevOffset: number) => prevOffset += loadSize);
    }
    return (() => {
      console.log('rearrange pokemonData');
    })
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
      <div className={"grid gap-4 md:gap-8 pt-6 px-8 transition ease-in-out " + (listType === 3 ? 'grid-cols-3' : 'grid-cols-1')}>
          {pokemonData?.map((item: number, index: number) => (
            <PokemonItem itemData={item} key={index} />
          ))}
      </div>
      <div className="pokedex-bg w-full h-[8vh] rounded-t-lg flex flex-row justify-end items-center gap-x-4 sticky bottom-0 z-[100]">
        <div className='rounded-lg flex items-center me-4 relative'>
          {setListType} {initIsLoading} {loadingError}
          <div className={'rounded-full w-10 h-10 aspect-square bg-white bg-opacity-25 transition ease-in-out absolute ' + (listType === 3 ? 'left-0' : 'right-0')}></div>
          <img className='rounded-full w-10 p-1' onClick={() => setListType(() => 3)} src={gridIcon} />
          <img className='rounded-full w-10 p-1' onClick={() => setListType(() => 1)} src={listIcon} />
        </div>
      </div>
    </div>
  )
}

export default App

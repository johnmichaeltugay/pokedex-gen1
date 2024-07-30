/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import '../styles/App.scss'
import axios, { isCancel } from 'axios'
import useLocalStorage from '../hooks/useLocalStorage';
import PokemonRoster from './PokemonRoster';
import { PokemonRosterContext } from '../contexts/PokemonRosterContext';

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

  const pokeData = [
    {
      'id': 1,
      'name': 'bulbasaur',
      'sprites_other_dreamWorld_frontDefault': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
      'type': ['grass', 'poison'],
      'weight': 69,
      'height': 7,
      'order': 1,
    },
    {
      'id': 2,
      'name': 'ivysaur',
      'sprites_other_dreamWorld_frontDefault': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg',
      'type': ['grass', 'poison'],
      'weight': 130,
      'height': 10,
      'order': 2,
    },
    {
      'id': 3,
      'name': 'venusaur',
      'sprites_other_dreamWorld_frontDefault': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg',
      'type': ['grass', 'poison'],
      'weight': 1000,
      'height': 20,
      'order': 3,
    },
    {
      'id': 4,
      'name': 'charmander',
      'sprites_other_dreamWorld_frontDefault': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg',
      'type': ['fire'],
      'weight': 85,
      'height': 6,
      'order': 5,
    },
    {
      'id': 5,
      'name': 'charmeleon',
      'sprites_other_dreamWorld_frontDefault': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/5.svg',
      'type': ['fire'],
      'weight': 190,
      'height': 11,
      'order': 6,
    },
    {
      'id': 6,
      'name': 'charizard',
      'sprites_other_dreamWorld_frontDefault': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg',
      'type': ['fire', 'flying'],
      'weight': 905,
      'height': 17,
      'order': 7,
    },
    {
      'id': 7,
      'name': 'squirtle',
      'sprites_other_dreamWorld_frontDefault': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg',
      'type': ['water'],
      'weight': 90,
      'height': 5,
      'order': 10,
    },
    {
      'id': 8,
      'name': 'wartortle',
      'sprites_other_dreamWorld_frontDefault': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/8.svg',
      'type': ['water'],
      'weight': 225,
      'height': 10,
      'order': 11,
    },
    {
      'id': 9,
      'name': 'blastoise',
      'sprites_other_dreamWorld_frontDefault': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/9.svg',
      'type': ['water'],
      'weight': 855,
      'height': 16,
      'order': 12,
    },
    {
      'id': 10,
      'name': 'caterpie',
      'sprites_other_dreamWorld_frontDefault': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/10.svg',
      'type': ['bug'],
      'weight': 29,
      'height': 3,
      'order': 14,
    },
    {
      'id': 11,
      'name': 'metapod',
      'sprites_other_dreamWorld_frontDefault': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/11.svg',
      'type': ['bug'],
      'weight': 99,
      'height': 7,
      'order': 15,
    },
    {
      'id': 12,
      'name': 'butterfree',
      'sprites_other_dreamWorld_frontDefault': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/12.svg',
      'type': ['bug', 'flying'],
      'weight': 320,
      'height': 11,
      'order': 16,
    },
    {
      'id': 13,
      'name': 'weedle',
      'sprites_other_dreamWorld_frontDefault': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/13.svg',
      'type': ['bug', 'poison'],
      'weight': 32,
      'height': 3,
      'order': 17,
    },
    {
      'id': 14,
      'name': 'kakuna',
      'sprites_other_dreamWorld_frontDefault': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/14.svg',
      'type': ['bug', 'poison'],
      'weight': 100,
      'height': 6,
      'order': 18,
    },
    {
      'id': 15,
      'name': 'beedrill',
      'sprites_other_dreamWorld_frontDefault': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/15.svg',
      'type': ['bug', 'poison'],
      'weight': 295,
      'height': 10,
      'order': 19,
    },
  ]

  interface pokemonInitialDataForm {
    url: string;
  }

  interface rawPokemonTypeDataForm {
    type: {
      name: string;
    }
  }

  interface pokedexDataForm {
    id: number;
    weight: number;
    height: number;
    order: number;
    name: string;
    image: string;
    types: string[];
    isCaught: boolean;
    catchDate: Date | null;
    nickname: string | null;
  }

  const rawDataSynthesizer = (pokemonRoster: pokemonInitialDataForm[]) => {
    console.log(typeof pokemonRoster, pokemonRoster);
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
      <PokemonRosterContext.Provider value={pokeData}>
        <PokemonRoster />
      </PokemonRosterContext.Provider>
      <div className="w-full flex flex-row justify-center items-baseline gap-x-4 sticky bottom-0 z-[100]">
        <div className='bg-red-500 max-h-content'>{ load }</div>
        <button onClick={ () => loadData() }> hello </button>
        <a>Link sample</a>

      </div>
    </div>
  )
}

export default App

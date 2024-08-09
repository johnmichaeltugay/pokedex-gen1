/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/App.scss'
import useLocalStorage from '../hooks/useLocalStorage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonView from './PokemonView';
import { PokemonRosterContext } from '../contexts/PokemonRosterContext';
import PokemonList from './PokemonList';
import PokemonListViewController from './PokemonListViewController';
import { useState } from 'react';

export const BASE_URL = 'https://pokeapi.co/api/v2/'
export const LOAD_SIZE = 18;

function App() {
  const [listType, setListType] = useState(3);
  const [totalCount, setTotalCount] = useState(0);
  const pokeDataCacheName = 'pokemonData';
  const [pokemonData, setPokemonData] = useLocalStorage(pokeDataCacheName, []);
  
  return (
    <PokemonRosterContext.Provider value={[pokemonData, setPokemonData, totalCount, setTotalCount, listType, setListType]}>
    <div className="w-screen max-w-screen-md h-screen max-h-screen flex flex-col justify-between">
      <div className="pokedex-case pokedex-bg min-h-[12vh] h-[12vh] md:min-h-[15vh] md:h-[15vh] fixed top-0 inset-x-0 z-[100] flex items-center">
        <h1 className='text-2xl noto-sans-800 ps-4'>Pok&#233;dex</h1>
      </div>
      <Router>
        <Routes>
          <Route path="/:name" element={<PokemonView />} />
          <Route path="/" element={<PokemonList />} />
        </Routes>
      </Router>
      z
      <div className="pokedex-bg w-full h-[8vh] rounded-t-lg flex flex-row justify-end items-center gap-x-4 fixed bottom-0 inset-x-0 z-[100]">
        <Router>
          <Routes>
            <Route path="/" element={<PokemonListViewController />} />
          </Routes>
        </Router>
      </div>
    </div>
    </PokemonRosterContext.Provider>
  )
}

export default App

/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/App.scss'
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import PokemonView from './PokemonView';
import PokemonList from './PokemonList';
import PokemonListViewController from './PokemonListViewController';
import { PokemonRosterContext } from '../contexts/PokemonRosterContext';
import PokemonThemeController from './PokemonThemeController';


export const BASE_URL = 'https://pokeapi.co/api/v2/'
export const LOAD_SIZE = 18;
export const LIGHT_MODE = 1;
export const DARK_MODE = 0

// interface pokedexDataForm {
//   id: number;
//   isCaught: boolean;
//   catchDate: Date | null;
//   nickname: string | null;
// }

function App() {
    const [themeCacheName, listCacheName] = ['theme', 'listDisplay'];
    const [theme, setTheme] = useLocalStorage(themeCacheName, DARK_MODE);
    const [listType, setListType] = useLocalStorage(listCacheName, 3);
    const [totalCount, setTotalCount] = useState(0);
    const pokeDataCacheName = 'pokemonData';
    const [pokemonData, setPokemonData] = useLocalStorage(pokeDataCacheName, []);
  
    return (
        <PokemonRosterContext.Provider value={[pokemonData, setPokemonData, totalCount, setTotalCount, themeCacheName, theme, setTheme, listCacheName, listType, setListType]}>
            <Router>
            <div className="w-screen max-w-screen-md h-screen max-h-screen flex flex-col justify-between">
                <PokemonThemeController />
                <Routes>
                    <Route path="/pokedex-gen1" element={<PokemonList />} />
                    <Route path="/pokedex-gen1/:pokemonName" element={<PokemonView />} />
                </Routes>
                <div className="pokedex-bg w-full h-[8vh] rounded-t-lg flex flex-row justify-end items-center gap-x-4 fixed bottom-0 inset-x-0 z-[100]">
                    <Routes>
                        <Route path="/pokedex-gen1" element={<PokemonListViewController />} />
                        <Route path="/pokedex-gen1/:pokemonName" element={<div></div>} />
                    </Routes>
                </div>
            </div>
            </Router>
        </PokemonRosterContext.Provider>
    )
}

export default App

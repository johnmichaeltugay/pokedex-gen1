/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext } from 'react';
import darkIcon from '../assets/dark_mode_icon.svg'
import lightIcon from '../assets/light_mode_icon.svg'
import { PokemonRosterContext } from '../contexts/PokemonRosterContext';
import { DARK_MODE } from './App';

export default function PokemonThemeController() {
    // const [, , , , themeCacheName, theme, setTheme, listCacheName, listType, setListType] = useContext(PokemonRosterContext);
    const [, , , , , theme, setTheme, , , ] = useContext(PokemonRosterContext);
    return (
        <div className="pokedex-case pokedex-bg min-h-[12vh] h-[12vh] md:min-h-[15vh] md:h-[15vh] fixed top-0 inset-x-0 z-[100] grid grid-rows-2 grid-cols-4">
            <div className='grid grid-rows-subgrid row-span-2'>
                <div className="h-full flex items-center row-start-1 row-end-3 ms-8">
                    <h1 className='text-2xl noto-sans-800'>Pok&#233;dex</h1>
                </div>
            </div>
            <div className="col-start-4 w-full">
                <div className='flex justify-end items-center row-start-1 h-full me-2 sm:me-4'>
                    <img className='rounded-full w-10 h-10 p-1 hover:bg-white hover:bg-opacity-15' onClick={() => setTheme((prevTheme:number) => {return Math.abs(prevTheme - 1)})} src={theme === DARK_MODE ? darkIcon : lightIcon} />
                </div>
            </div>
        </div>
    )
}
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext } from 'react'
import { PokemonRosterContext } from '../contexts/PokemonRosterContext'
import gridIcon from '../assets/grid_view_icon.svg';
import listIcon from '../assets/list_view_icon.svg';

function PokemonListViewController() {
    // const [, , , , themeCacheName, theme, setTheme, listCacheName, listType, setListType] = useContext(PokemonRosterContext);
    const [, , , , , , , , listType, setListType] = useContext(PokemonRosterContext);
    return (
        <div className=' rounded-lg flex items-center me-2 sm:me-4 relative transition ease-in-out'>
            <div className={'rounded-full w-10 h-10 aspect-square bg-white bg-opacity-30 transition ease-in-out absolute ' + (listType === 3 ? 'translate-x-0' : 'translate-x-full')}></div>
            <img className={'rounded-full w-10 p-1 transition ease-in-out ' + (listType === 1 ? 'hover:bg-white hover:bg-opacity-15 hover:cursor-pointer' : '')} onClick={() => setListType(() => 3)} src={gridIcon} />
            <img className={'rounded-full w-10 p-1 transition ease-in-out ' + (listType === 3 ? 'hover:bg-white hover:bg-opacity-15 hover:cursor-pointer' : '')} onClick={() => setListType(() => 1)} src={listIcon} />
        </div>
    )
}

export default PokemonListViewController
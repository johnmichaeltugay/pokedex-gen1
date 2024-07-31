import { useContext } from 'react'
import { PokemonRosterContext } from '../contexts/PokemonRosterContext'
import gridIcon from '../assets/grid_view_icon.svg';
import listIcon from '../assets/list_view_icon.svg';

function PokemonListViewController() {
    const [listType, setListType] = useContext(PokemonRosterContext);
    return (
        <div className='rounded-lg flex items-center me-4 relative'>
            <div className={'rounded-full w-10 h-10 aspect-square bg-white bg-opacity-25 transition ease-in-out absolute ' + (listType === 3 ? 'left-0' : 'right-0')}></div>
            <img className='rounded-full w-10 p-1' onClick={() => setListType(() => 3)} src={gridIcon} />
            <img className='rounded-full w-10 p-1' onClick={() => setListType(() => 1)} src={listIcon} />
        </div>
    )
}

export default PokemonListViewController
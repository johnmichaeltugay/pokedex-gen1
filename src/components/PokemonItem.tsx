/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/PokemonItem.scss'
import '../styles/anim/PokemonItemAnim.scss'
import PropTypes from 'prop-types';
import { pokemonTypesData } from '../assets/pokemonTypesData';
import { PokemonRosterContext } from '../contexts/PokemonRosterContext';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMiscPokemonData } from '../hooks/fetchPokemonDataWithNameURL';
import { useNavigate } from 'react-router-dom';

PokemonItem.propTypes = {
    key: PropTypes.string,
    pokemonName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export interface typeDataForm {
    type: string,
    icon: string,
    color: string
}

function PokemonItem(props: { pokemonName: string, url: string}) {
    // const [, , , , themeCacheName, theme, setTheme, listCacheName, listType, setListType] = useContext(PokemonRosterContext);
    const [, , , , , , , , listType, ] = useContext(PokemonRosterContext);
    const navigate = useNavigate();
    const { isPending, isError, data } = useQuery({
        queryKey: [props.pokemonName],
        queryFn: () => fetchMiscPokemonData(props.pokemonName),
    });
    if (isPending) return <div className='pokemonTile select-none hover:scale-105'><div className="pokemonTextbox rounded-lg md:rounded-xl flex flex-col relative">Searching...</div></div>;
    if (isError) return <div className='pokemonTile select-none hover:scale-105'><div className="pokemonTextbox rounded-lg md:rounded-xl flex flex-col relative">Error Loading</div></div>
    
    const pokemonTypes = data.types.map((pokemonType: string) => {
        const typeDataEntry = pokemonTypesData.filter(typeData => typeData.type === pokemonType)[0];
        return (<img key={pokemonType} className={'rounded-full object-contain ' + (listType === 3 ? 'w-4 p-0.5 sm:w-5 md:w-6 md:p-1 mt-1' : 'w-6 p-1 sm:w-8 sm:p-1.5 md:w-10 md:p-2 mt-1')} style={{backgroundColor: typeDataEntry.color}} src={typeDataEntry.icon} />)
    });
    
    return (
        <div className='hover:cursor-pointer' onClick={() => navigate('./' + props.pokemonName)}>
            <div className='pokemonTile group/pokemonMenuItem select-none hover:scale-105'>
                <div className="h-12 md:h-14 relative z-[10]">
                    <img className={'pokemonImage aspect-square object-contain overflow-visible absolute sm:top-0 sm:left-1/2 sm:-translate-x-1/2 group-hover/pokemonMenuItem:scale-110 ' + (listType === 3 ? '-left-1.5 top-3 w-16 sm:w-20 md:w-28' : 'left-1/2 -translate-x-1/2 w-24 sm:w-28 md:w-32') } src={data.image} />
                </div>
                <div className="pokemonTextbox rounded-lg md:rounded-xl flex flex-col relative">
                    <p className={'pt-1 pe-2 noto-sans-200 self-end  ' + (listType === 3 ? 'text-xs sm:text-md md:text-xl' : 'text-md sm:text-lg md:text-xl')}>{data.id}</p>
                    <div className={"pe-1.5 ps-1 md:ps-1.5 md:pt-0.5 flex gap-0.5 md:gap-1 " + (listType === 3 ? 'sm:absolute self-end sm:self-start sm:flex-col' : 'absolute self-start flex-col')}>
                        {pokemonTypes}
                    </div>
                    <p className={'pe-2 md:pe-0 noto-sans-600 md:self-center ' + (listType === 3 ? 'sm:pt-2 md:pt-8 self-end text-sm sm:text-lg md:text-2xl' : 'pt-4 sm:pt-8 text-xl sm:text-2xl md:text-3xl')}>{data.name}</p>
                </div>
            </div>
        </div>
    )
        
}

export default PokemonItem
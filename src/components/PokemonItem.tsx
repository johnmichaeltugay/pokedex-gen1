/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { capitalize, pokemonTypesData } from '../assets/pokemonTypesData';
import { PokemonRosterContext } from '../contexts/PokemonRosterContext';
import { useContext } from 'react';

PokemonItem.propTypes = {
    key: PropTypes.number,
    itemData: PropTypes.object.isRequired,
};

export interface typeDataForm {
    type: string,
    icon: string,
    color: string
}

function PokemonItem(props: { itemData: number, key: number }) {
    console.log(props.itemData);
    const [,,,,,,, listType] = useContext(PokemonRosterContext);
    const fetchAssets = localStorage.getItem(props.itemData.toString())
    const pokemonDisplay = fetchAssets ? JSON.parse(fetchAssets) : {};
    const pokemonName = capitalize(pokemonDisplay.name);
    const pokemonTypes = !(pokemonDisplay.types === undefined) ? pokemonDisplay.types.map((pokemonType: string) => {
        let typeDataEntry = pokemonTypesData.find(typeData => typeData.type === pokemonType);
        if (typeof typeDataEntry === "undefined") typeDataEntry = {type: 'unknown', icon: '', color: '#A7A79A'}
        return (<img key={pokemonDisplay.name} className={'rounded-full object-contain ' + (listType === 3 ? 'w-4 p-0.5 sm:w-5 md:w-6 md:p-1 mt-1' : 'w-6 p-1 sm:w-8 sm:p-1.5 md:w-10 md:p-2 mt-1')} style={{backgroundColor: typeDataEntry.color}} src={typeDataEntry.icon} />)
    }): [];
    return (
        <a href={'/' + props.itemData}>
            <div className='pokemonTile group/pokemonItem select-none hover:scale-105'>
                <div className="h-12 md:h-14 relative z-[10]">
                    <img className={'pokemonImage aspect-square object-contain overflow-visible absolute sm:top-0 sm:left-1/2 sm:-translate-x-1/2 ' + (listType === 3 ? '-left-1.5 top-3 w-16 sm:w-20 md:w-28' : 'left-1/2 -translate-x-1/2 w-24 sm:w-28 md:w-32') } src={pokemonDisplay.image} />
                </div>
                <div className="pokemonTextbox rounded-lg md:rounded-xl flex flex-col relative">
                    <p className={'pt-1 pe-2 noto-sans-200 self-end  ' + (listType === 3 ? 'text-xs sm:text-md md:text-xl' : 'text-md sm:text-lg md:text-xl')}>{props.itemData}</p>
                    <div className={"pe-1.5 ps-1 md:ps-1.5 md:pt-0.5 flex gap-0.5 md:gap-1 " + (listType === 3 ? 'sm:absolute self-end sm:self-start sm:flex-col' : 'absolute self-start flex-col')}>
                        {pokemonTypes}
                    </div>
                    <p className={'pe-2 md:pe-0 noto-sans-600 md:self-center ' + (listType === 3 ? 'sm:pt-2 md:pt-8 self-end text-sm sm:text-lg md:text-2xl' : 'pt-4 sm:pt-8 text-xl sm:text-2xl md:text-3xl')}>{pokemonName}</p>
                </div>
            </div>
        </a>
    )
}

export default PokemonItem
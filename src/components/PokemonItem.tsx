/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { pokemonTypesData } from '../assets/pokemonTypesData';

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
    const fetchAssets = localStorage.getItem(props.itemData.toString())
    const pokemonDisplay = fetchAssets ? JSON.parse(fetchAssets) : {};
    const pokemonName = [pokemonDisplay.name.slice(0, 1).toUpperCase(), pokemonDisplay.name.slice(1,)].join('');

    const pokemonTypes = !(pokemonDisplay.types === undefined) ? pokemonDisplay.types.map((pokemonType: string) => {
        let typeDataEntry = pokemonTypesData.find(typeData => typeData.type === pokemonType);
        if (typeof typeDataEntry === "undefined") typeDataEntry = {type: 'unknown', icon: '', color: '#A7A79A'}
        return (<img key={pokemonDisplay.name} className='w-4 p-0.5 md:w-6 md:p-1 mt-1 rounded-full' style={{backgroundColor: typeDataEntry.color}} src={typeDataEntry.icon} />)
    }): [];
    return (
        <a href={'/' + props.itemData}>
            <div className='pokemonTile select-none'>
                <div className="h-12 md:h-14 relative z-[10]">
                    <img className='pokemonImage aspect-square w-20 md:w-28 object-contain overflow-visible absolute left-1/2 -translate-x-1/2' src={pokemonDisplay.image} />
                </div>
                <div className="pokemonTextbox rounded-xl flex flex-col relative">
                    <div className="absolute ps-1">
                        {pokemonTypes}
                    </div>
                    <p className='text-sm md:text-lg pe-2 noto-sans-400 self-end'>{props.itemData}</p>
                    <p className='text-lg md:text-2xl pt-4 md:pt-8 noto-sans-600'>{pokemonName}</p>
                </div>
            </div>
        </a>
    )
}

export default PokemonItem
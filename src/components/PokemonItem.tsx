import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { PokemonRosterContext } from '../contexts/PokemonRosterContext';
import bugIcon from '../assets/pokemon_type_icons/bug.svg'
import darkIcon from '../assets/pokemon_type_icons/dark.svg'
import dragonIcon from '../assets/pokemon_type_icons/dragon.svg'
import electricIcon from '../assets/pokemon_type_icons/electric.svg'
import fairyIcon from '../assets/pokemon_type_icons/fairy.svg'
import fightingIcon from '../assets/pokemon_type_icons/fighting.svg'
import fireIcon from '../assets/pokemon_type_icons/fire.svg'
import flyingIcon from '../assets/pokemon_type_icons/flying.svg'
import ghostIcon from '../assets/pokemon_type_icons/ghost.svg'
import grassIcon from '../assets/pokemon_type_icons/grass.svg'
import groundIcon from '../assets/pokemon_type_icons/ground.svg'
import iceIcon from '../assets/pokemon_type_icons/ice.svg'
import normalIcon from '../assets/pokemon_type_icons/normal.svg'
import poisonIcon from '../assets/pokemon_type_icons/poison.svg'
import psychicIcon from '../assets/pokemon_type_icons/psychic.svg'
import rockIcon from '../assets/pokemon_type_icons/rock.svg'
import steelIcon from '../assets/pokemon_type_icons/steel.svg'
import waterIcon from '../assets/pokemon_type_icons/water.svg'

PokemonItem.propTypes = {
    key: PropTypes.number,
    itemData: PropTypes.object.isRequired,
};

function PokemonItem(props: { itemData: object, key: number }) {
    
    console.log(typeof props, props);
    const pokemonDisplay = props.itemData;
    const pokemonName = [pokemonDisplay.name.slice(0, 1).toUpperCase(), pokemonDisplay.name.slice(1,)].join('');
    const pokemonTypes = pokemonDisplay.type.map((pokemonType: string) => {
        switch (pokemonType) {
            case 'bug':
                return (<img className='w-6 p-1 mt-1 rounded-full' style={{backgroundColor: '#A6B91A'}} src={bugIcon} />)
            case 'water':
                return (<img className='w-6 p-1 mt-1 rounded-full' style={{backgroundColor: '#6390F0'}} src={waterIcon} />)
            case 'poison':
                return (<img className='w-6 p-1 mt-1 rounded-full' style={{backgroundColor: '#A33EA1'}} src={poisonIcon} />)
            case 'grass':
                return (<img className='w-6 p-1 mt-1 rounded-full' style={{backgroundColor: '#7AC74C'}} src={grassIcon} />)
            case 'fire':
                return (<img className='w-6 p-1 mt-1 rounded-full' style={{backgroundColor: '#EE8130'}} src={fireIcon} />)
        }
    });
    return (
        <div className='pokemonTile select-none'>
            <div className="h-12 md:h-14 relative z-[10]">
                <img className='pokemonImage rounded-full aspect-square w-24 md:w-28 object-contain overflow-visible absolute left-1/2 -translate-x-1/2' src={pokemonDisplay.sprites_other_dreamWorld_frontDefault} />
            </div>
            <div className="pokemonTextbox rounded-xl flex flex-col relative">
                <div className=" text-sm absolute ps-1">
                    {pokemonTypes}
                </div>
                <p className='text-sm md:text-md pe-2 noto-sans-400 self-end'>{pokemonDisplay.id}</p>
                <p className='text-xl md:text-2xl pt-8 md:pt-8 noto-sans-600'>{pokemonName}</p>
            </div>
        </div>
    )
}

export default PokemonItem
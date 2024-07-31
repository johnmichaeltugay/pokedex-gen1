/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
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
import { pokedexDataForm } from '../contexts/PokemonRosterContext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

PokemonItem.propTypes = {
    key: PropTypes.number,
    itemData: PropTypes.object.isRequired,
};

interface typeDataForm {
    type: string,
    icon: string,
    color: string
}



const pokemonTypesData:typeDataForm[] = [
    {type: 'bug', icon: bugIcon, color: '#A6B91A' },
    {type: 'dark', icon: darkIcon, color: '#705746' },
    {type: 'dragon', icon: dragonIcon, color: '#6F35FC' },
    {type: 'electric', icon: electricIcon, color: '#F7D02C' },
    {type: 'fairy', icon: fairyIcon, color: '#D685AD' },
    {type: 'fighting', icon: fightingIcon, color: '#C22E28' },
    {type: 'fire', icon: fireIcon, color: '#EE8130' },
    {type: 'flying', icon: flyingIcon, color: '#A98FFE' },
    {type: 'ghost', icon: ghostIcon, color: '#735797' },
    {type: 'grass', icon: grassIcon, color: '#7AC74C' },
    {type: 'ground', icon: groundIcon, color: '#E2BF65' },
    {type: 'ice', icon: iceIcon, color: '#96D9D6' },
    {type: 'normal', icon: normalIcon, color: '#A8A77A' },
    {type: 'poison', icon: poisonIcon, color: '#A33EA1' },
    {type: 'psychic', icon: psychicIcon, color: '#F95587' },
    {type: 'rock', icon: rockIcon, color: '#B6A136' },
    {type: 'steel', icon: steelIcon, color: '#B7B7CE' },
    {type: 'water', icon: waterIcon, color: '#6390F0' },
]

function PokemonItem(props: { itemData: number, key: number }) {
    const fetchAssets = localStorage.getItem(props.itemData.toString())
    const pokemonDisplay = fetchAssets ? JSON.parse(fetchAssets) : {};
    const pokemonName = [pokemonDisplay.name.slice(0, 1).toUpperCase(), pokemonDisplay.name.slice(1,)].join('');

    const pokemonTypes = !(pokemonDisplay === undefined) ? pokemonDisplay.types.map((pokemonType: string) => {
        let typeDataEntry = pokemonTypesData.find(typeData => typeData.type === pokemonType);
        if (typeof typeDataEntry === "undefined") typeDataEntry = {type: 'unknown', icon: '', color: '#A7A79A'}
        return (<img key={pokemonDisplay.name} className='w-4 p-0.5 md:w-6 md:p-1 mt-1 rounded-full' style={{backgroundColor: typeDataEntry.color}} src={typeDataEntry.icon} />)
    }): [];
    return (
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
    )
}

export default PokemonItem
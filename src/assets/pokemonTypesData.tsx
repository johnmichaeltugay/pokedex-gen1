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

export interface typeDataForm {
    type: string,
    icon: string,
    color: string
}

export const pokemonTypesData:typeDataForm[] = [
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

export const capitalize = (textToCap: string) => [textToCap.slice(0, 1).toUpperCase(), textToCap.slice(1,)].join('');
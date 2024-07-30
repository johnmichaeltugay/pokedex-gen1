import React, { useContext } from 'react'
import { PokemonRosterContext } from '../contexts/PokemonRosterContext';
import PokemonItem from './PokemonItem';

function PokemonRoster() {
    const pokeData = useContext(PokemonRosterContext);
    // console.log("pokemonroster", typeof pokeData, pokeData);
    return (
        <div className="grid grid-cols-3 gap-6 md:gap-8 pt-8">
            {pokeData?.map((item: object, index: number) => (
                <PokemonItem key={item.id} itemData={item}></PokemonItem>
            ))}
        </div>
  )
}


export default PokemonRoster
import { useContext } from 'react'
import { pokedexDataForm, PokemonRosterContext } from '../contexts/PokemonRosterContext';
import PokemonItem from './PokemonItem';

function PokemonRoster() {
    const pokemonData: pokedexDataForm[] = useContext(PokemonRosterContext);
    return (
        <div className="grid grid-cols-3 gap-6 md:gap-8 pt-8">
            {pokemonData?.map((item: pokedexDataForm) => (
                <PokemonItem key={item.id} itemData={item}></PokemonItem>
            ))}
        </div>
  )
}


export default PokemonRoster
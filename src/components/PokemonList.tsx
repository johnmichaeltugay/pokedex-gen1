/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PokemonRosterContext } from '../contexts/PokemonRosterContext'
import axios from 'axios'
import PokemonItem from './PokemonItem';

interface pokemonInitialDataForm {
  name: string;
  url: string;
}

interface rawPokemonTypeDataForm {
  type: {
    name: string;
  }
}

function PokemonList() {
    const [loadSize, load, setLoad, offset, setOffset, pokemonData, setPokemonData, listType] = useContext(PokemonRosterContext)
    const [hasMore, setHasMore] = useState(true);

    // Cache pokemon assets
    const initPokedexData = async (initPokemonData: pokemonInitialDataForm) => {
    const pokemonAssetsCache = localStorage.getItem(initPokemonData.name);
    let pokemonId = 0;
    if (!pokemonAssetsCache) {
      const pokemonAssetsData = await axios.get(initPokemonData.url)
        .then((response) => {
          pokemonId = response.data.id;
          return {
            name: initPokemonData.name,
            image: response.data.sprites.other.dream_world.front_default,
            height: response.data.height,
            weight: response.data.weight,
            types: response.data.types.map((typeData: rawPokemonTypeDataForm) => typeData.type.name),
          }
        })
        .catch(() => {
          pokemonId = 0
          return {
            image: '',
            name: '',
            height: 0,
            weight: 0,
            types: [],
          }
        });
      localStorage.setItem(pokemonId.toString(), JSON.stringify(pokemonAssetsData));
    }
    else pokemonId = JSON.parse(pokemonAssetsCache).id;
    return pokemonId;
    };
    
    const loadData = async() => {
        await axios.get('https://pokeapi.co/api/v2/pokemon/', {
            params: {
                limit: loadSize,
                offset: offset,
            }
        })
            .then((response) => {
                console.log(response);
                response.data.results.forEach(async (item: pokemonInitialDataForm) => {
                    const pokemonId = await initPokedexData(item);
                    if (typeof pokemonId === 'number' && !(pokemonData.includes(pokemonId))) {
                        setPokemonData((prevPokemonData: number[]) => {
                            const newData = [...new Set(prevPokemonData)];
                            newData.push(pokemonId);
                            return [...new Set(newData)].sort((a, b) => a - b);
                        });
                    }
                })
                setHasMore(true);
                setLoad((prevLoad: number) => prevLoad += loadSize);
                setOffset((prevOffset: number) => prevOffset += loadSize);
            })
            .catch((error) => {
                console.log(error);
            });
  }

  // INITIAL LOAD OF FIRST POKEMON
  useEffect(() => {
    loadData();
  }, []);
    
  return (
    <div className='mt-[12vh] md:mt-[15vh]'>
        <InfiniteScroll
            dataLength={load}
            next={loadData}
            hasMore={hasMore}
            scrollThreshold={0.97}
            loader={<div className="w-full h-24 flex justify-center mt-12"><p className='noto-sans-400 text-lg'>Loading...</p></div>}
        >
        <div className={"grid gap-4 md:gap-8 pt-6 px-8 transition ease-in-out " + (listType === 3 ? 'grid-cols-3' : 'grid-cols-1')}>
            
          {pokemonData?.map((item: number, index: number) => (
                <PokemonItem itemData={item} key={index}  />
            ))}
        </div>
        </InfiniteScroll>
    </div>
  )
}

export default PokemonList
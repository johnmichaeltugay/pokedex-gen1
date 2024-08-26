/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PokemonRosterContext } from '../contexts/PokemonRosterContext'
import axios from 'axios'
import PokemonItem from './PokemonItem';
import {  useInfiniteQuery } from '@tanstack/react-query';
import { BASE_URL, LOAD_SIZE } from './App';

export interface pokemonInitialDataForm {
    name: string;
    url: string;
}

function PokemonList() {
    // const [, , , , themeCacheName, theme, setTheme, listCacheName, listType, setListType] = useContext(PokemonRosterContext);
    const [, , , , , , , , listType, ] = useContext(PokemonRosterContext);
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
    })

    const fetchNewRawPokemonData = async ({ pageParam }: {pageParam: number}) => {
        return await axiosInstance.get('pokemon/', {
            params: {
                limit: LOAD_SIZE,
                offset: pageParam,
            }
        })
        .then((response) => response.data.results)
        .catch((error) => {
            console.log("Error:", error);
            return [];
        })
    }

    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
        queryKey: ['pokemonData'],
        queryFn: fetchNewRawPokemonData,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.length === 0) return undefined
            console.log("infiniteQuery", {lastPage, allPages, lastPageParam});
            return lastPageParam + LOAD_SIZE;
        }
    })

    const content = data?.pages.map((pageData: pokemonInitialDataForm[]) => {
        return pageData.map((rawInitialPokemonData: pokemonInitialDataForm) => {
            return <PokemonItem key={rawInitialPokemonData.name} pokemonName={rawInitialPokemonData.name} url={rawInitialPokemonData.url} />;
        })
    })

    if (status === 'pending') return(<div className="w-full h-24 flex justify-center mt-12"><p className='noto-sans-400 text-lg'>Loading...</p></div>);
    else if (status === 'error') return (<div className="w-full h-24 flex justify-center mt-12"><p className='noto-sans-400 text-lg'>Error</p></div>);
    else {
        console.log('data', status, ':', data, isFetching, hasNextPage, isFetchingNextPage);
        return (
            <div className='mt-[12vh] md:mt-[15vh]'>
                <InfiniteScroll
                dataLength={LOAD_SIZE}
                next={() => !isFetching && fetchNextPage}
                hasMore={hasNextPage}
                scrollThreshold={0.97}
                loader={<div className="w-full h-24 flex justify-center mt-12"><p className='noto-sans-400 text-lg'>Loading from PokemonList render...</p></div>}
                >
                <div className={"grid pt-6 transition ease-in-out " + (listType === 3 ? 'ps-4 pe-8 grid-cols-3 gap-4 md:gap-6' : 'ps-10 pe-16 grid-cols-1 gap-2 md:gap-4')}>
                    {content}
                </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default PokemonList
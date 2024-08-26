/* eslint-disable @typescript-eslint/no-unused-vars */
import '../styles/PokemonView.scss'
import '../styles/anim/PokemonViewAnim.scss'
import { useNavigate, useParams } from 'react-router-dom'
import backIcon from '../assets/arrow_back_icon.svg'
import { pokemonTypesData } from '../assets/pokemonTypesData'
import { useQuery } from '@tanstack/react-query';
import { fetchMiscPokemonData, pokemonStats } from '../hooks/fetchPokemonDataWithNameURL';
import { useState } from 'react';
// import { Input } from '@headlessui/react';

function PokemonView() {
    const params = useParams();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const { isPending, isError, data } = useQuery({
        queryKey: [params.pokemonName],
        queryFn: () => fetchMiscPokemonData(params.pokemonName ?? 'undefined'),
    });
    if (isPending) return <div className='my-auto mx-4 sm:mx-20 h-[60vh] z-10'><div className="pokemonDisplay rounded-3xl h-full mt-[3vh] flex justify-end"></div></div>
    if (isError) return <div className='my-auto mx-4 sm:mx-20 h-[60vh] z-10'><div className="pokemonDisplay rounded-3xl h-full mt-[3vh] flex justify-end">Error occurred</div></div>
    
    const accentColor: string[] = []
    const pokemonTypes = data.types.map((pokemonType: string, i:number) => {
        const typeDataEntry = pokemonTypesData.filter(typeData => typeData.type === pokemonType)[0];
        accentColor.push(typeDataEntry.color);
        const animDelay = 'delay-' + (i + 1) * 10;
        return (<img key={pokemonType} className={'slide-left w-8 p-1.5 sm:w-12 sm:p-2 mt-1 object-scale-down object-center rounded-full opacity-0 ' + animDelay} style={{backgroundColor: typeDataEntry.color}} src={typeDataEntry.icon} />)
    });
    const pokemonStats = data.stats.map((stat: pokemonStats, i: number) => {
        let statName = ''
        switch (stat.name) {
            case 'hp':
                statName = 'HP'
                break;
            case 'attack':
                statName = 'ATK'
                break;
            case 'defense':
                statName = 'DEF'
                break;
            case 'special-attack':
                statName = 'Special ATK'
                break;
            case 'special-defense':
                statName = 'Special DEF'
                break;
            case 'speed':
                statName = 'SPD'
                break;
        }
        const animDelay = 'delay-' + (i + 1) * 10;
        return (
            <div key={stat.name} className='w-full flex justify-between'>
                <div className={'rise noto-sans-600 text-sm sm:text-md opacity-0 ' + animDelay}>{statName}</div>
                <div className={'rise noto-sans-400 text-sm sm:text-md opacity-0 ' + animDelay}>{stat.value}</div>
            </div>
        )
    });
    return (
        <div className='my-auto mx-4 sm:mx-20 h-[60vh] z-10'>
            <div className="pokemonDisplay rounded-3xl h-full mt-[3vh] flex justify-end">
                <img className='pokemonBackButton rounded-full p-1 w-8 h-8 sm:w-10 sm:h-10 aspect-square bg-white bg-opacity-25 hover:bg-opacity-1 hover:bg-[#dd0b2d] hover:cursor-pointer absolute top-4 left-4 z-[100]' src={backIcon} onClick={() => navigate(-1)}/>
                <img className='pokemonImage aspect-square w-36 sm:w-56 object-contain overflow-visible absolute -top-12 left-1/2 -translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 sm:left-1/4 sm:inset-y-0 z-30' src={data.image} />
                <div className='statsClipA w-full h-full rounded-r-3xl hidden sm:block absolute z-20' style={{ backgroundColor: accentColor[0] }}></div>
                <div className='statsClipAMobile w-full h-full rounded-3xl block sm:hidden absolute z-20' style={{ backgroundColor: accentColor[0] }}></div>
                {(accentColor.length > 1) && (
                    <>
                        <div className='statsClipB w-full h-full rounded-r-3xl hidden sm:block absolute z-10' style={{ backgroundColor: accentColor[1] }}></div>
                        <div className='statsClipBMobile w-full h-full rounded-3xl block sm:hidden absolute z-10' style={{ backgroundColor: accentColor[1] }}></div>
                    </> 
                )}
                <div className="hidden sm:flex justify-center gap-1 absolute bottom-4 left-4 z-30">
                    {pokemonTypes}
                </div>
                <div className="rounded-r-3xl px-6 py-6 sm:px-0 sm:pe-6 flex flex-col justify-between w-full sm:w-[40%] overflow-visible z-50">
                    <div className="flex flex-col sm:hidden justify-center gap-1 absolute top-14 right-4 z-30">
                        {pokemonTypes}
                    </div>
                    <div className='flex flex-col select-none'>
                        <div className='noto-sans-200 text-2xl sm:text-3xl my-0 self-end'>{data.id}</div>
                        <h1 className="rise noto-sans-800 text-4xl sm:text-5xl mt-12 mb-2 sm:mt-0 sm:mb-4 self-center sm:self-end">{data.name}</h1>
                        <div className='w-3/4 sm:w-full flex flex-col self-center items-center sm:items-end select-none'>
                            <div className='w-full flex flex-col mb-4'>
                                {pokemonStats}
                            </div>
                            {!isEditing && (
                                <>
                                <div className='rise delay-50 opacity-0 overflow-y-scroll pe-2 h-[10vh]'>
                                    <p className='noto-sans-400 text-xs text-justify'>{data.text}</p>
                                </div>
                                </>
                            )}
                        </div>
                    </div>
                    {!isEditing && (
                        <div onClick={() => setIsEditing(false)} className='markButton rise delay-80 opacity-0 w-3/4 py-0.5 justify-self-end self-center sm:w-full rounded-full bg-transparent border-2 border-[#EAEAEA] hover:bg-[#EAEAEA] hover:text-stone-950 hover:cursor-pointer'>Mark as Found</div>
                    )}
                    
                    
                    {/* <p className='text-xl sm:text-2xl noto-sans-400 self-end'>Weight: {assetData.weight}</p> */}
                    {/* <p className='text-xl sm:text-2xl noto-sans-400 self-end'>Height: {assetData.height}</p> */}
                </div>
            </div>
        </div>
    )
}

export default PokemonView
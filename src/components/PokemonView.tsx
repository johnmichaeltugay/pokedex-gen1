import { useParams } from 'react-router-dom'
import backIcon from '../assets/arrow_back_icon.svg'
import { capitalize, pokemonTypesData } from '../assets/pokemonTypesData'

interface pokemonStats {
    name: string;
    value: number;
}

function PokemonView() {
    const params = useParams();
    const fetchAssets = params.id ? localStorage.getItem(params.id.toString()) : undefined;
    const assetData = fetchAssets ? JSON.parse(fetchAssets) : {};
    console.log(assetData, "assetData");
    const pokemonName = capitalize(assetData.name);
    const accentColor: string[] = []
    const pokemonTypes = !(assetData.types === undefined) ? assetData.types.map((pokemonType: string) => {
        let typeDataEntry = pokemonTypesData.find(typeData => typeData.type === pokemonType);
        if (typeof typeDataEntry === "undefined") typeDataEntry = { type: 'unknown', icon: '', color: '#A7A79A' }
        accentColor.push(typeDataEntry.color);
        return (<img key={assetData.name} className='w-8 p-1.5 sm:w-12 sm:p-2 mt-1 object-scale-down object-center rounded-full' style={{backgroundColor: typeDataEntry.color}} src={typeDataEntry.icon} />)
    }) : [];
    const pokemonStats = !(assetData.stats === undefined) ? assetData.stats.map((stat: pokemonStats) => {
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
        return (
            <div className='w-full flex justify-between'>
                <div className='noto-sans-600 text-sm sm:text-md'>{statName}</div>
                <div className='noto-sans-400 text-sm sm:text-md'>{stat.value}</div>
            </div>
        )
    }) : [];
    return (
        <div className='my-auto mx-4 sm:mx-20 h-[60vh] z-10'>
            <div className="pokemonDisplay rounded-3xl h-full mt-[3vh] flex justify-end">
                <a href="../">
                    <img className='pokemonBackButton rounded-full p-1 w-8 h-8 sm:w-10 sm:h-10 aspect-square bg-white bg-opacity-25 hover:bg-opacity-1 hover:bg-[#dd0b2d] absolute top-4 left-4 z-[100]' src={backIcon} />
                </a>
                <img className='pokemonImage aspect-square w-36 sm:w-56 object-contain overflow-visible absolute -top-12 left-1/2 -translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 sm:left-1/4 sm:inset-y-0 z-30' src={assetData.image} />
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
                {fetchAssets && (
                    <div className="rounded-r-3xl px-6 py-6 sm:px-0 sm:pe-6 flex flex-col justify-between w-full sm:w-[40%] overflow-visible z-50">
                        <div className="flex flex-col sm:hidden justify-center gap-1 absolute top-14 right-4 z-30">
                            {pokemonTypes}
                        </div>
                        <div className='flex flex-col select-none'>
                            <div className='noto-sans-200 text-2xl sm:text-3xl my-0 self-end'>{params.id}</div>
                            <h1 className="noto-sans-800 text-4xl sm:text-5xl mt-12 mb-2 sm:mt-0 sm:mb-4 self-center sm:self-end">{pokemonName}</h1>
                            <div className='w-3/4 sm:w-full flex flex-col self-center items-center sm:items-end select-none'>
                                <div className='w-full flex flex-col mb-4'>
                                    {pokemonStats}
                                </div>
                                <div className='overflow-y-scroll pe-2 h-[10vh]'>
                                    <p className='noto-sans-400 text-xs text-justify'>{assetData.text}</p>
                                </div>
                            </div>
                        </div>
                        <div className='markButton w-3/4 py-0.5 justify-self-end self-center sm:w-full rounded-full bg-transparent border-2 border-[#EAEAEA] mix-blend-normal hover:bg-[#EAEAEA] hover:mix-blend-difference'>Mark as Found</div>
                        
                        
                        {/* <p className='text-xl sm:text-2xl noto-sans-400 self-end'>Weight: {assetData.weight}</p> */}
                        {/* <p className='text-xl sm:text-2xl noto-sans-400 self-end'>Height: {assetData.height}</p> */}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PokemonView
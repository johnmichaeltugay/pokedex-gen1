import { useParams } from 'react-router-dom'
import backIcon from '../assets/arrow_back_icon.svg'
import { pokemonTypesData } from '../assets/pokemonTypesData'

function PokemonView() {
    const params = useParams();
    const fetchAssets = params.id ? localStorage.getItem(params.id.toString()) : undefined;
    const assetData = fetchAssets ? JSON.parse(fetchAssets) : {};
    const pokemonName = [assetData.name.slice(0, 1).toUpperCase(), assetData.name.slice(1,)].join('');
    const pokemonTypes = !(assetData.types === undefined) ? assetData.types.map((pokemonType: string) => {
        let typeDataEntry = pokemonTypesData.find(typeData => typeData.type === pokemonType);
        if (typeof typeDataEntry === "undefined") typeDataEntry = {type: 'unknown', icon: '', color: '#A7A79A'}
        return (<img key={assetData.name} className='w-10 p-1.5 md:w-14 md:p-1 mt-1 rounded-full' style={{backgroundColor: typeDataEntry.color}} src={typeDataEntry.icon} />)
    }): [];
    return (
        <div className='pokemonTile my-auto mx-10 h-[50vh] z-10'>
            <div className="pokemonTextbox h-full px-4">
                {fetchAssets && (
                    <>
                        <img className='pokemonImage aspect-square w-32 md:w-36 object-contain overflow-visible absolute -top-12 left-1/2 -translate-x-1/2' src={assetData.image} />
                        <a href="../">
                            <img className='rounded-full w-10 h-10 aspect-square bg-white bg-opacity-25 p-1 mt-4 hover:bg-opacity-1 hover:bg-[#dd0b2d]' src={backIcon} />
                        </a>
                        <p className='text-lg md:text-xl pt-6 noto-sans-200 self-end'>{params.id}</p>
                        <div className="w-full flex justify-center gap-2">
                            {pokemonTypes}
                        </div>
                        <h1 className="noto-sans-800 text-4xl md:text-5xl mb-8 ">{pokemonName}</h1>
                        <p className='text-xl md:text-2xl noto-sans-400 self-end'>Weight: {assetData.weight}</p>
                        <p className='text-xl md:text-2xl noto-sans-400 self-end'>Height: {assetData.height}</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default PokemonView
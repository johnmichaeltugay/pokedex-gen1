import axios from "axios";
import { BASE_URL } from "../components/App";
import { capitalize } from "../assets/pokemonTypesData";

interface rawPokemonTextDataForm {
    flavor_text: string;
    language: {
        name: string;
    };
    version: {
        name: string;
    }
}

interface rawPokemonTypeDataForm {
    type: {
        name: string;
    }
}

interface rawPokemonStatsDataForm {
    base_stat: number;
    stat: {
        name: string;
    }
}

export interface pokemonStats {
    name: string;
    value: number;
}

export interface pokemonMiscData {
    name: string;
    id: number;
    image: string;
    height: number;
    weight: number;
    types: string[];
    stats: pokemonStats[];
    text: string;
}

export const fetchMiscPokemonData = async (baseName: string) => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
    })
    return await axiosInstance.get('pokemon/' + baseName)
        .then(async(response) => {
        console.log("pokemonItem fetchMiscPokemonData", response.data);
        const pokemonId = response.data.id;
        const pokemonFlavorText = await axiosInstance.get('pokemon-species/' + pokemonId)
            .then((response) => {
            const targetVersions = ['yellow', 'alpha-sapphire'];
            return response.data.flavor_text_entries.filter((textEntry: rawPokemonTextDataForm) => (textEntry.language.name == 'en' && targetVersions.includes(textEntry.version.name))).reduce((collector: string, textObject: rawPokemonTextDataForm) => collector + textObject.flavor_text + " ", '').split("\n").join(" ").split("\f").join(" ");
            })
            .catch(() => []);
        return {
            name: capitalize(baseName),
            id: pokemonId,
            image: response.data.sprites.other.dream_world.front_default,
            height: response.data.height,
            weight: response.data.weight,
            types: response.data.types.map((typeData: rawPokemonTypeDataForm) => typeData.type.name),
            stats: response.data.stats.map((statsData: rawPokemonStatsDataForm) => { return { name: statsData.stat.name, value: statsData.base_stat } }),
            text: pokemonFlavorText,
        }
        }
    );
}
import { createContext } from "react";
export interface pokedexDataForm {
        id: number;
        weight: number;
        height: number;
        order: number;
        name: string;
        image: string;
        types: string[];
        isCaught: boolean;
        catchDate: Date | null;
        nickname: string | null;
}

export const PokemonRosterContext = createContext <pokedexDataForm[]>([]);
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
export interface pokedexDataForm {
        id: number;
        isCaught: boolean;
        catchDate: Date | null;
        nickname: string | null;
}

export const PokemonRosterContext = createContext <any[]>([]);
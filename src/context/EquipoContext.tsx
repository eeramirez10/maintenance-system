import { createContext, Dispatch, SetStateAction, useState } from "react";
import { equiposData } from "../application/equiposService";


interface EquipoContextType {

    equipos: Equipment[];

    setEquipos: Dispatch<SetStateAction<Equipment[]>>;

}

const Context = createContext<EquipoContextType>({
    equipos: [],
    setEquipos: () => {}
});




import { ReactNode } from "react";
import { Equipment } from "../types/equipo";

export const EquipoProvider = ({ children }: { children: ReactNode }) => {
    const [equipos, setEquipos] = useState<Equipment[]>(equiposData)

    return <Context.Provider value={{equipos, setEquipos}} >{children}</Context.Provider>
}

export default Context
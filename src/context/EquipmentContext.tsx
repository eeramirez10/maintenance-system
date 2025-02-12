import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

import mockEquipments from "../mocks/equipments";
import { Equipment } from "../interface/equipment.type";


interface EquipoContextType {

  equipments: Equipment[];

  setEquipments: Dispatch<SetStateAction<Equipment[]>>;

}

const Context = createContext<EquipoContextType>({
  equipments: [],
  setEquipments: () => {}
});



export const EquipmentProvider = ({ children }: { children: ReactNode }) => {
  const [equipments, setEquipments] = useState<Equipment[]>(mockEquipments);

  return <Context.Provider value={{equipments, setEquipments}} >{children}</Context.Provider>
}

export default Context
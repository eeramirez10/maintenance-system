import  { useContext } from 'react'

import EquipoContext from '../context/EquipoContext'
import { Equipment } from '../types/equipo'

export const useEquipos = () => {

    const { equipos, setEquipos } = useContext(EquipoContext)



    const addEquipo = (nuevoEquipo: Equipment) => {
        setEquipos(prev => [...prev, nuevoEquipo])
    }

    const editEquipo = (editEquipo:Equipment) => {
        const newEquipos = [...equipos]

        const indexEquipment = newEquipos.findIndex( equipo => equipo.id === editEquipo.id)

        newEquipos[indexEquipment] = editEquipo

       

        setEquipos([...newEquipos])
    }


    return {
        equipos,
        addEquipo,
        editEquipo
    }
}

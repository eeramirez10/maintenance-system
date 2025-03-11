import { useContext } from 'react'
import EquipmentContext from '../context/EquipmentContext'
import { useUser } from './useUser';
import { Equipment, RoutineGroup, Step } from '../interface/equipment.type';
import { message } from 'antd';
import { v4 as uuidv4, v4 } from 'uuid';

interface Props {
  equipments: Equipment[]
  deleteEquipment: (equipmentId: string) => void
  handleAddEquipment: (equipment: Omit<Equipment, 'id'>) => void
  onEditEquipment: (editedEquipment: Equipment) => void
  addRoutine: (equipmentId: string, rountine: RoutineGroup) => void
  getEquipmentById: (id: string) => Equipment[]
  addStep: (step: Step, equipmentId: string, routineId: string) => void

}


export const useEquipments = (): Props => {

  const { equipments, setEquipments, } = useContext(EquipmentContext)
  const { user } = useUser()

  const deleteEquipment = (equipmentId: string) => {
    setEquipments(equipments.filter(equipment => equipment.id !== equipmentId))
  };

  const handleAddEquipment = (equipment: Omit<Equipment, 'id'>) => {

 
    setEquipments([
      ...equipments,
      {
        ...equipment,
        id: v4(),
        isActive: true,
        createdBy: user.id,
        routines: []
      }
    ]);
  };

  const onEditEquipment = (editedEquipment: Equipment) => {
    const equipment = equipments.map((equipment) => equipment.id === editedEquipment.id ? editedEquipment : equipment)

    setEquipments(equipment);

  }

  const addRoutine = (equipmentId: string, rountine: RoutineGroup) => {

    const addRoutineId = {
      ...rountine,
      id: v4()
    }

    const findEquipment = equipments.find(equipment => equipment.id === equipmentId)

    const equipmentsRountines = findEquipment?.routines

    if (!equipmentsRountines) return message.error('No hay rutinas que agregar')

    const routines = [...equipmentsRountines, addRoutineId]

    const addRountine = equipments.map(equipment => {

      if (equipment.id === equipmentId) {
        equipment.routines = routines
      }

      return equipment
    })

    setEquipments(addRountine)
  }

  const addStep = (step: Step, equipmentId: string, routineId: string) => {

    const newStep = {
      ...step,
      id: uuidv4()
    }

    console.log({equipmentId})

    

    const indexEquipment = equipments.findIndex(eq => eq.id === equipmentId)

    const indexRoutine = equipments[indexEquipment].routines.findIndex(r => r.id === routineId)

    const newEquipments = [...equipments]

    const equipment = newEquipments[indexEquipment]

    const routine = equipment.routines[indexRoutine]

    routine.steps = [...routine.steps, newStep]


    setEquipments(newEquipments)


  }

  const getEquipmentById = (id: string) => {
    return equipments.find(eq => eq.id === id)
  }

  return {
    equipments,
    deleteEquipment,
    handleAddEquipment,
    onEditEquipment,
    addRoutine,
    getEquipmentById,
    addStep

  }
}

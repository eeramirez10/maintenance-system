

import { useContext } from 'react'

import EquipmentContext from '../context/EquipmentContext'
import { useUser } from './useUser';
import { Equipment, Routine, Step } from '../interface/equipment.type';
import { message } from 'antd';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  equipments: Equipment[]
  deleteEquipment: (equipmentId: number) => void
  handleAddEquipment: (equipment: Omit<Equipment, 'id'>) => void
  onEditEquipment: (editedEquipment: Equipment) => void
  addRoutine: (equipmentId: number, rountine: Routine) => void
  getEquipmentById: (id: number) => Equipment
  addStep: (step: Step, equipmentId: string, routineId: string) => void

}


export const useEquipments = (): Props => {

  const { equipments, setEquipments } = useContext(EquipmentContext)
  const { user } = useUser()

  const deleteEquipment = (equipmentId: number) => {
    setEquipments(equipments.filter(equipment => equipment.id !== equipmentId))
  };

  const handleAddEquipment = (equipment: Omit<Equipment, 'id'>) => {
    setEquipments([...equipments, { id: Date.now(), ...equipment, isActive: true, createdBy: user.id }]);
  };

  const onEditEquipment = (editedEquipment: Equipment) => {
    const equipment = equipments.map((equipment) => equipment.id === editedEquipment.id ? editedEquipment : equipment)

    setEquipments(equipment);

  }

  const addRoutine = (equipmentId: number, rountine: Routine) => {

    const findEquipment = equipments.find(equipment => equipment.id === equipmentId)

    const equipmentsRountines = findEquipment?.routines

    if (!equipmentsRountines) return message.error('No hay rutinas que agregar')

    const routines = [...equipmentsRountines, rountine]

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

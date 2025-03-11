/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Routine, RoutineCriteria } from '../interface/equipment.type';


const routineMaintenanceState: Routine = {
  description: '',
  routineType: 'preventivo',
  criteria: {
    name: '',
    type: 'date',
    currentValue: '',
    minValue: 0,
    maxValue: 0,
  },
  // Preventivo
  priorityPercentage: 0,
  estimatedTime: 0,
  actualTime: 0,
  plannedDowntime: 0,
  actualDowntime: 0,
  // Correctivo
  failureCategory: '',
  failureDescription: '',
  repairCost: 0,
  repairTime: 0,
  failureStartDate: '',
  failureEndDate: '',
  // Fotos
  photoBefore: '',
  photoAfter: '',
}


interface Props {
  routine: Routine
  handleRoutineChange: (field: string, value: string | number) => void
  onSave: (routine: Routine) => void;
  resetRoutineValues: () => void
}


export const useRoutine = (): Props => {

  const [routine, setRoutine] = useState(routineMaintenanceState)

  const resetRoutineValues = () => {
    setRoutine( {
      description: '',
      routineType: 'preventivo',
      criteria: {
        name: '',
        type: 'date',
        currentValue: '',
        minValue: 0,
        maxValue: 0,
      },
      // Preventivo
      priorityPercentage: 0,
      estimatedTime: 0,
      actualTime: 0,
      plannedDowntime: 0,
      actualDowntime: 0,
      // Correctivo
      failureCategory: '',
      failureDescription: '',
      repairCost: 0,
      repairTime: 0,
      failureStartDate: '',
      failureEndDate: '',
      // Fotos
      photoBefore: '',
      photoAfter: '',
    })
  }


  const handleRoutineChange = (
    field: string,
    value: string | number
  ) => {
    setRoutine((prev) => {
      const updated = { ...prev };
      if (
        field === 'description' ||
        field === 'routineType' ||
        field === 'priorityPercentage' ||
        field === 'estimatedTime' ||
        field === 'actualTime' ||
        field === 'plannedDowntime' ||
        field === 'actualDowntime' ||
        field === 'failureCategory' ||
        field === 'failureDescription' ||
        field === 'repairCost' ||
        field === 'repairTime' ||
        field === 'failureStartDate' ||
        field === 'failureEndDate' ||
        field === 'photoBefore' ||
        field === 'photoAfter'
      ) {
        (updated as any)[field] = value;
      } else {
        // Campo de criteria (name, type, currentValue, minValue, maxValue)
        if (!updated.criteria) {
          updated.criteria = {
            name: '',
            type: 'number',
            currentValue: 0,
          };
        }
        updated.criteria[field] = value;
      }
      return updated;
    });
  };

  const onSave = (routine: Routine) => {
    console.log(routine)
  }


  return {
    routine,
    handleRoutineChange,
    onSave,
    resetRoutineValues
  }
}

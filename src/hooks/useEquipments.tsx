

import  { useState } from 'react'
import { Equipment, ScheduledMaintenance } from '../types';
import mockEquipments from '../mocks/equipments';

const sheduledMaintenanceinitialState: ScheduledMaintenance = {
  description: '',
  criteria: {
    name: '',
    type: 'date',
    currentValue: 0,
    minValue: 0,
    maxValue: 0,
  },
}

interface Props {
  equipments: Equipment[]
  sheduleMaintenance: ScheduledMaintenance,
  scheduledMaintenances : ScheduledMaintenance[],
  handleDeleteScheduled: (index: number) => void,
  handleAddScheduled: () => void,
  handleScheduledChange: (field: keyof ScheduledMaintenance['criteria'] | 'description', value: string | number) => void
  handleResetValues: () => void,
  onAddScheduledMaintenance:  (equipmentId: number, sheduleMaintenance: ScheduledMaintenance) => void;
}


export const useEquipments = (): Props => {

   // Estado para mantener los mantenimientos programados en el formulario
   const [scheduledMaintenances, setScheduledMaintenances] = useState<ScheduledMaintenance[]>([]);

   const [sheduleMaintenance, setSheduleMaintenance] = useState(sheduledMaintenanceinitialState)

   const [equipments, setEquipments] = useState<Equipment[]>(mockEquipments);

  const handleDeleteScheduled = (index: number) => {
    const updatedMaintenances = [...scheduledMaintenances];
    updatedMaintenances.splice(index, 1);
    setScheduledMaintenances(updatedMaintenances);
  };

  const handleAddScheduled = () => {
    setScheduledMaintenances([
      ...scheduledMaintenances,
      {
        description: '',
        criteria: {
          type: 'number',
          name: '',
          currentValue: 0,
          minValue: 0,
          maxValue: 0,
        },
      },
    ]);
  };

  const onAddScheduledMaintenance = (equipmentId: number, sheduleMaintenance: ScheduledMaintenance) => {
    const equipment = equipments.find( (equipment) => equipment.id === equipmentId)
    console.log(sheduleMaintenance)

    const selectedEquipment = { ...equipment}

    selectedEquipment.scheduledMaintenances = [...selectedEquipment.scheduledMaintenances ?? [], sheduleMaintenance]

    setEquipments(prev => prev.map( (equipment) => (equipment.id === equipmentId ? selectedEquipment  : equipment) ))
  }


  const handleScheduledChange = (field: keyof ScheduledMaintenance['criteria'] | 'description', value: string | number) => {
    const updatedScheduled = { ...sheduleMaintenance }
    if (field === 'description') {
      updatedScheduled.description = value as string;
    } else {
      // Asegurarse de que 'criteria' exista
      if (!updatedScheduled.criteria) {
        updatedScheduled.criteria = {
          name: '',
          type: 'number',
          currentValue: 0,
          minValue: 0,
          maxValue: 0,
        };
      }
      if (field === 'name' || field === 'type' || field === 'currentValue' || field === 'minValue' || field === 'maxValue') {
        updatedScheduled.criteria[field] = value;
      }
    }
    setSheduleMaintenance(updatedScheduled);
  }

  const handleResetValues =  () => {
    setSheduleMaintenance(sheduledMaintenanceinitialState)
  }

  return {
    sheduleMaintenance,
    scheduledMaintenances,
    equipments,
    handleDeleteScheduled,
    handleAddScheduled,
    handleScheduledChange,
    handleResetValues,
    onAddScheduledMaintenance
  }
}

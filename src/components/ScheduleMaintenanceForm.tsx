import { Input } from 'antd'
import React, { useState } from 'react'
import { ScheduledMaintenance } from '../types';

export const ScheduleMaintenanceForm: React.FC = () => {

    const [scheduledMaintenances, setScheduledMaintenances] = useState<ScheduledMaintenance>();
  

  const scheduled = {
    description: 'Revisión de válvulas',
    criteria: {
      name: 'Horas de operación',
      type: 'number',
      currentValue: 1500,
      minValue: 2000,
      maxValue: 2500,
    },
  }

   const handleScheduledChange = (
      field: keyof ScheduledMaintenance['criteria'] | 'description',
      value: string | number | undefined
    ) => {
      console.log({field, value})
      // const updatedScheduled = {...scheduledMaintenances};
      // if (field === 'description') {
      //   updatedScheduled.description = value as string;
      // } else if (updatedScheduled.criteria) {
      //   updatedScheduled.criteria = value;
      // }
      // setScheduledMaintenances(updatedScheduled);
    };



  return (
    <>
      <h2 className="text-xl font-bold mt-6">Mantenimientos Programados</h2>

      <Input
        type="text"
        value={scheduled.description}
        placeholder="Descripción"
        onChange={(e) => handleScheduledChange( 'description', e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded"
      />
      <label className="block text-gray-700 mt-2 font-semibold">Tipo de Criterio:</label>
      <select
        value={scheduled.criteria?.type || 'number'}
        onChange={(e) =>
          handleScheduledChange( 'criteria.type', e.target.value as 'number' | 'date')
        }
        className="w-full px-4 py-2 border border-gray-300 rounded"
      >
        <option value="number">Criterio Numérico</option>
        <option value="date">Fecha</option>
      </select>
      {/* Si es fecha */}
      {
        scheduled.criteria?.type === 'date' && (
          <Input
            type="date"
            value={scheduled.criteria?.currentValue as string}
            onChange={(e) => handleScheduledChange(index, 'criteria.currentValue', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded mt-2"
          />
        )
      }
      {/* Si es numérico */}
      {
        scheduled.criteria?.type === 'number' && (
          <div className="flex gap-4 mt-2">
            <Input
              type="number"
              value={scheduled.criteria?.currentValue || ''}
              placeholder="Valor Actual"
              onChange={(e) =>
                handleScheduledChange(index, 'criteria.currentValue', Number(e.target.value))
              }
              className="flex-1 px-4 py-2 border border-gray-300 rounded"
            />
            <Input
              type="number"
              value={scheduled.criteria?.minValue || ''}
              placeholder="Valor Mínimo"
              onChange={(e) => handleScheduledChange(index, 'criteria.minValue', Number(e.target.value))}
              className="flex-1 px-4 py-2 border border-gray-300 rounded"
            />
            <Input
              type="number"
              value={scheduled.criteria?.maxValue || ''}
              placeholder="Valor Máximo"
              onChange={(e) => handleScheduledChange(index, 'criteria.maxValue', Number(e.target.value))}
              className="flex-1 px-4 py-2 border border-gray-300 rounded"
            />
          </div>
        )
      }

    </>
  )
}

// ScheduledMaintenanceItem.tsx
import React  from 'react';
import { ScheduledMaintenance } from '../types';



interface ScheduledMaintenanceItemProps {
  handleScheduledChange: (field: keyof ScheduledMaintenance['criteria'] | 'description', value: string | number) => void
  maintenance: ScheduledMaintenance
}



const ScheduledMaintenanceForm2: React.FC<ScheduledMaintenanceItemProps> = ({ handleScheduledChange, maintenance}) => {

 
  return (
    <li className="py-4 flex flex-col gap-4">
      {/* Descripción */}
      <input
        type="text"
        placeholder="Descripción del Mantenimiento"
        value={maintenance.description}
        onChange={(e) =>
          handleScheduledChange('description', e.target.value)
        }
        className="w-full px-4 py-2 border border-gray-300 rounded"
      />

      {/* Nombre del Criterio */}
      <label className="block text-gray-700 font-semibold">Nombre del Criterio:</label>
      <input
        type="text"
        placeholder="Nombre del Criterio"
        value={maintenance.criteria?.name || ''}
        onChange={(e) =>
          handleScheduledChange('name', e.target.value)
        }
        className="w-full px-4 py-2 border border-gray-300 rounded"
      />

      {/* Tipo de Criterio */}
      <label className="block text-gray-700 font-semibold">Tipo de Criterio:</label>
      <select
        value={maintenance.criteria?.type || 'number'}
        onChange={(e) =>
          handleScheduledChange('type', e.target.value as 'number' | 'date')
        }
        className="w-full px-4 py-2 border border-gray-300 rounded"
      >
        <option value="number">Numérico</option>
        <option value="date">Fecha</option>
      </select>

      {/* Campos Condicionales */}
      {maintenance.criteria?.type === 'date' && (
        <input
          type="date"
          placeholder="Fecha de Inspección"
          value={maintenance.criteria.currentValue}
          onChange={(e) =>
            handleScheduledChange('currentValue', e.target.value)
          }
          className="w-full px-4 py-2 border border-gray-300 rounded mt-2"
        />
      )}
      {maintenance.criteria?.type === 'number' && (
        <div className="flex gap-4 mt-2">
          <input
            type="number"
            placeholder="Valor Actual"
            value={maintenance.criteria?.currentValue || ''}
            onChange={(e) =>
              handleScheduledChange(

                'currentValue',
                Number(e.target.value)
              )
            }
            className="flex-1 px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Valor Mínimo"
            value={maintenance.criteria?.minValue || ''}
            onChange={(e) =>
              handleScheduledChange(

                'minValue',
                Number(e.target.value)
              )
            }
            className="flex-1 px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Valor Máximo"
            value={maintenance.criteria?.maxValue || ''}
            onChange={(e) =>
              handleScheduledChange(

                'maxValue',
                Number(e.target.value)
              )
            }
            className="flex-1 px-4 py-2 border border-gray-300 rounded"
          />
        </div>
      )}

      {/* Botón Eliminar */}
      {/* <button
        onClick={() => handleDelete(index)}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Eliminar
      </button> */}
    </li>
  );
};

export default ScheduledMaintenanceForm2;

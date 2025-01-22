import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Equipment, CustomField, Maintenance, ScheduledMaintenance } from '../types';

interface EditEquipmentProps {
  equipments: Equipment[];
  onUpdate: (updatedEquipment: Equipment) => void;
}

const EditEquipment: React.FC<EditEquipmentProps> = ({ equipments, onUpdate }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const equipment = equipments.find((equip) => equip.id === Number(id));

  if (!equipment) {
    return <div className="p-8 text-center">Equipo no encontrado.</div>;
  }

  const [name, setName] = useState(equipment.name);
  const [type, setType] = useState(equipment.type);
  const [customFields, setCustomFields] = useState<CustomField[]>(equipment.customFields || []);
  const [maintenances, setMaintenances] = useState<Maintenance[]>(equipment.maintenances || []);
  const [scheduledMaintenances, setScheduledMaintenances] = useState<ScheduledMaintenance[]>(
    equipment.scheduledMaintenances || []
  );

  // Funciones para Campos Personalizados
  const handleFieldChange = (index: number, field: keyof CustomField, value: string) => {
    const updatedFields = [...customFields];
    updatedFields[index][field] = value;
    setCustomFields(updatedFields);
  };

  const handleAddField = () => {
    setCustomFields([...customFields, { name: '', value: '' }]);
  };

  const handleDeleteField = (index: number) => {
    const updatedFields = [...customFields];
    updatedFields.splice(index, 1);
    setCustomFields(updatedFields);
  };

  // Funciones para Mantenimientos Realizados
  const handleMaintenanceChange = (
    index: number,
    field: keyof Maintenance['criteria'] | 'description',
    value: string | number | undefined
  ) => {
    const updatedMaintenances = [...maintenances];
    if (field === 'description') {
      updatedMaintenances[index].description = value as string;
    } else if (updatedMaintenances[index].criteria) {
      updatedMaintenances[index].criteria![field] = value;
    }
    setMaintenances(updatedMaintenances);
  };

  const handleAddMaintenance = () => {
    setMaintenances([
      ...maintenances,
      {
        description: '',
        criteria: {
          name: '',
          type: 'number',
          currentValue: 0,
          minValue: undefined,
          maxValue: undefined,
        },
      },
    ]);
  };

  const handleDeleteMaintenance = (index: number) => {
    const updatedMaintenances = [...maintenances];
    updatedMaintenances.splice(index, 1);
    setMaintenances(updatedMaintenances);
  };

  // Funciones para Mantenimientos Programados
  const handleScheduledChange = (
    index: number,
    field: keyof ScheduledMaintenance['criteria'] | 'description',
    value: string | number | undefined
  ) => {
    const updatedScheduled = [...scheduledMaintenances];
    if (field === 'description') {
      updatedScheduled[index].description = value as string;
    } else if (updatedScheduled[index].criteria) {
      updatedScheduled[index].criteria![field] = value;
    }
    setScheduledMaintenances(updatedScheduled);
  };

  const handleAddScheduled = () => {
    setScheduledMaintenances([
      ...scheduledMaintenances,
      {
        description: '',
        criteria: {
          name: '',
          type: 'number',
          currentValue: 0,
          minValue: undefined,
          maxValue: undefined,
        },
      },
    ]);
  };

  const handleDeleteScheduled = (index: number) => {
    const updatedScheduled = [...scheduledMaintenances];
    updatedScheduled.splice(index, 1);
    setScheduledMaintenances(updatedScheduled);
  };

  // Guardar Cambios
  const handleSave = () => {
    const updatedEquipment: Equipment = {
      ...equipment,
      name,
      type,
      customFields,
      maintenances,
      scheduledMaintenances,
    };
    onUpdate(updatedEquipment);
    navigate(`/equipment/${equipment.id}`);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Editar Equipo</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
      />
      <input
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
      />

      {/* Campos Personalizados */}
      <h2 className="text-xl font-bold mt-6">Campos Personalizados</h2>
      <ul className="divide-y divide-gray-200 mt-4">
        {customFields.map((field, index) => (
          <li key={index} className="py-4 flex justify-between items-center">
            <div className="flex-1">
              <input
                type="text"
                value={field.name}
                placeholder="Nombre del Campo"
                onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                value={field.value}
                placeholder="Valor"
                onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded mt-2"
              />
            </div>
            <button
              onClick={() => handleDeleteField(index)}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleAddField}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Agregar Campo
      </button>

      {/* Mantenimientos Realizados */}
      <h2 className="text-xl font-bold mt-6">Mantenimientos Realizados</h2>
      <ul className="divide-y divide-gray-200 mt-4">
        {maintenances.map((maintenance, index) => (
          <li key={index} className="py-4">
            <input
              type="text"
              value={maintenance.description}
              placeholder="Descripción"
              onChange={(e) => handleMaintenanceChange(index, 'description', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <label className="block text-gray-700 mt-2 font-semibold">Tipo de Criterio:</label>
            <select
              value={maintenance.criteria?.type || 'number'}
              onChange={(e) =>
                handleMaintenanceChange(index, 'type', e.target.value as 'number' | 'date')
              }
              className="w-full px-4 py-2 border border-gray-300 rounded"
            >
              <option value="number">Criterio Numérico</option>
              <option value="date">Fecha</option>
            </select>
            {/* Si es fecha */}
            {maintenance.criteria?.type === 'date' && (
              <input
                type="date"
                value={maintenance.criteria?.currentValue as string}
                onChange={(e) => handleMaintenanceChange(index, 'currentValue', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded mt-2"
              />
            )}
            {/* Si es numérico */}
            {maintenance.criteria?.type === 'number' && (
              <div className="flex gap-4 mt-2">
                <input
                  type="number"
                  value={maintenance.criteria?.currentValue || ''}
                  placeholder="Valor Actual"
                  onChange={(e) =>
                    handleMaintenanceChange(index, 'currentValue', Number(e.target.value))
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  value={maintenance.criteria?.minValue || ''}
                  placeholder="Valor Mínimo"
                  onChange={(e) => handleMaintenanceChange(index, 'minValue', Number(e.target.value))}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  value={maintenance.criteria?.maxValue || ''}
                  placeholder="Valor Máximo"
                  onChange={(e) => handleMaintenanceChange(index, 'maxValue', Number(e.target.value))}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded"
                />
              </div>
            )}
            <button
              onClick={() => handleDeleteMaintenance(index)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleAddMaintenance}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Agregar Mantenimiento
      </button>

      {/* Mantenimientos Programados */}
      <h2 className="text-xl font-bold mt-6">Mantenimientos Programados</h2>
      <ul className="divide-y divide-gray-200 mt-4">
        {scheduledMaintenances.map((scheduled, index) => (
          <li key={index} className="py-4">
            <input
              type="text"
              value={scheduled.description}
              placeholder="Descripción"
              onChange={(e) => handleScheduledChange(index, 'description', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <label className="block text-gray-700 mt-2 font-semibold">Tipo de Criterio:</label>
            <select
              value={scheduled.criteria?.type || 'number'}
              onChange={(e) =>
                handleScheduledChange(index, 'type', e.target.value as 'number' | 'date')
              }
              className="w-full px-4 py-2 border border-gray-300 rounded"
            >
              <option value="number">Criterio Numérico</option>
              <option value="date">Fecha</option>
            </select>
            {/* Si es fecha */}
            {scheduled.criteria?.type === 'date' && (
              <input
                type="date"
                value={scheduled.criteria?.currentValue as string}
                onChange={(e) => handleScheduledChange(index, 'currentValue', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded mt-2"
              />
            )}
            {/* Si es numérico */}
            {scheduled.criteria?.type === 'number' && (
              <div className="flex gap-4 mt-2">
                <input
                  type="number"
                  value={scheduled.criteria?.currentValue || ''}
                  placeholder="Valor Actual"
                  onChange={(e) =>
                    handleScheduledChange(index, 'currentValue', Number(e.target.value))
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  value={scheduled.criteria?.minValue || ''}
                  placeholder="Valor Mínimo"
                  onChange={(e) => handleScheduledChange(index, 'minValue', Number(e.target.value))}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  value={scheduled.criteria?.maxValue || ''}
                  placeholder="Valor Máximo"
                  onChange={(e) => handleScheduledChange(index, 'maxValue', Number(e.target.value))}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded"
                />
              </div>
            )}
            <button
              onClick={() => handleDeleteScheduled(index)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleAddScheduled}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Agregar Mantenimiento Programado
      </button>

      <button
        onClick={handleSave}
        className="mt-6 block w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Guardar Cambios
      </button>
    </div>
  );
};

export default EditEquipment;

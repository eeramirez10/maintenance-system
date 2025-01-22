import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Equipment, Maintenance } from '../types';

interface ScheduleMaintenanceProps {
  equipments: Equipment[];
  onUpdate: (updatedEquipment: Equipment) => void;
}

const ScheduleMaintenance: React.FC<ScheduleMaintenanceProps> = ({ equipments, onUpdate }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const equipment = equipments.find((equip) => equip.id === Number(id));

  if (!equipment) {
    return <div className="p-8 text-center">Equipo no encontrado.</div>;
  }

  const [description, setDescription] = useState('');
  const [criteriaName, setCriteriaName] = useState('');
  const [criteriaType, setCriteriaType] = useState<'number' | 'date'>('number');
  const [currentValue, setCurrentValue] = useState<number | string>('');
  const [minValue, setMinValue] = useState<number | undefined>();
  const [maxValue, setMaxValue] = useState<number | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMaintenance: Maintenance = {
      description,
      criteria: {
        name: criteriaName,
        type: criteriaType,
        currentValue,
        minValue: criteriaType === 'number' ? minValue : undefined,
        maxValue: criteriaType === 'number' ? maxValue : undefined,
      },
    };

    const updatedEquipment: Equipment = {
      ...equipment,
      maintenances: [...(equipment.maintenances || []), newMaintenance],
    };

    onUpdate(updatedEquipment);
    navigate(`/equipment/${equipment.id}`);
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Programar Mantenimiento</h1>
      <p className="text-gray-700 mb-4">Equipo: {equipment.name}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Descripción del mantenimiento"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Nombre del criterio (e.g., Kilómetros recorridos)"
          value={criteriaName}
          onChange={(e) => setCriteriaName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div>
          <label className="block text-gray-700 font-semibold">Tipo de criterio:</label>
          <select
            value={criteriaType}
            onChange={(e) => setCriteriaType(e.target.value as 'number' | 'date')}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="number">Número</option>
            <option value="date">Fecha</option>
          </select>
        </div>
        {criteriaType === 'number' ? (
          <>
            <input
              type="number"
              placeholder="Valor actual"
              value={currentValue as number}
              onChange={(e) => setCurrentValue(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Valor mínimo"
              value={minValue}
              onChange={(e) => setMinValue(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Valor máximo"
              value={maxValue}
              onChange={(e) => setMaxValue(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        ) : (
          <input
            type="date"
            value={currentValue as string}
            onChange={(e) => setCurrentValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Guardar Mantenimiento
        </button>
      </form>
    </div>
  );
};

export default ScheduleMaintenance;

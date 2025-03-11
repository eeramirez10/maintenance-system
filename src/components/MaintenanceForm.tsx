import React, { useState } from 'react';
import { Maintenance } from '../types';

interface MaintenanceFormProps {
  onSave: (maintenance: Maintenance) => void;
}

const MaintenanceForm: React.FC<MaintenanceFormProps> = ({ onSave }) => {
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
    onSave(newMaintenance);
    setDescription('');
    setCriteriaName('');
    setCriteriaType('number');
    setCurrentValue('');
    setMinValue(undefined);
    setMaxValue(undefined);
  };

  return (
    <form className="space-y-4 p-4 bg-white shadow rounded" onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold">Programar Mantenimiento</h3>
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
  );
};

export default MaintenanceForm;

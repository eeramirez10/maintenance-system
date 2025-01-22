import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Equipment, CustomField, Maintenance, ScheduledMaintenance } from '../types';

interface AddEquipmentProps {
  onAdd: (newEquipment: Equipment) => void;
}

const AddEquipment: React.FC<AddEquipmentProps> = ({ onAdd }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [scheduledMaintenances, setScheduledMaintenances] = useState<ScheduledMaintenance[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Manejo de Imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validación de formato
    const validFormats = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validFormats.includes(file.type)) {
      setErrorMessage('Solo se permiten imágenes en formato JPEG, JPG o PNG.');
      return;
    }

    // Validación de tamaño (5 MB máximo)
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
      setErrorMessage('El tamaño de la imagen no puede superar los 5 MB.');
      return;
    }

    // Si pasa las validaciones, leer la imagen
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setErrorMessage(null); // Limpiar errores previos
    };
    reader.readAsDataURL(file);
  };

  // Manejo de Campos Personalizados
  const handleAddField = () => {
    setCustomFields([...customFields, { name: '', value: '' }]);
  };

  const handleFieldChange = (index: number, field: keyof CustomField, value: string) => {
    const updatedFields = [...customFields];
    updatedFields[index][field] = value;
    setCustomFields(updatedFields);
  };

  const handleDeleteField = (index: number) => {
    const updatedFields = [...customFields];
    updatedFields.splice(index, 1);
    setCustomFields(updatedFields);
  };

  // Manejo de Mantenimientos Realizados
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

  const handleDeleteMaintenance = (index: number) => {
    const updatedMaintenances = [...maintenances];
    updatedMaintenances.splice(index, 1);
    setMaintenances(updatedMaintenances);
  };

  // Manejo de Mantenimientos Programados
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

  const handleDeleteScheduled = (index: number) => {
    const updatedScheduled = [...scheduledMaintenances];
    updatedScheduled.splice(index, 1);
    setScheduledMaintenances(updatedScheduled);
  };

  // Guardar Equipo
  const handleSave = () => {
    if (!name.trim()) {
      setErrorMessage('El nombre del equipo es obligatorio.');
      return;
    }
    if (!type.trim()) {
      setErrorMessage('El tipo de equipo es obligatorio.');
      return;
    }

    const newEquipment: Equipment = {
      id: Date.now(), // Generar un ID único
      name,
      type,
      image,
      customFields,
      maintenances,
      scheduledMaintenances,
    };
    onAdd(newEquipment);
    navigate('/');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Agregar Equipo</h1>
      {errorMessage && (
        <div className="mb-4 px-4 py-2 bg-red-100 text-red-700 border border-red-400 rounded">
          {errorMessage}
        </div>
      )}
      <input
        type="text"
        placeholder="Nombre del Equipo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
      />
      <input
        type="text"
        placeholder="Tipo de Equipo"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
      />
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Subir Imagen</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        {image && (
          <div className="mt-4">
            <img
              src={image}
              alt="Previsualización"
              className="w-full h-48 object-cover rounded"
            />
          </div>
        )}
      </div>

      {/* Campos Personalizados */}
      <h2 className="text-xl font-bold mt-6">Campos Personalizados</h2>
      <ul className="divide-y divide-gray-200 mt-4">
        {customFields.map((field, index) => (
          <li key={index} className="py-4 flex justify-between items-center">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Nombre del Campo"
                value={field.name}
                onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Valor del Campo"
                value={field.value}
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
              placeholder="Descripción del Mantenimiento"
              value={maintenance.description}
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
            {maintenance.criteria?.type === 'date' && (
              <input
                type="date"
                value={maintenance.criteria?.currentValue as string}
                onChange={(e) => handleMaintenanceChange(index, 'currentValue', e.target.value)}
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
                    handleMaintenanceChange(index, 'currentValue', Number(e.target.value))
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  placeholder="Valor Mínimo"
                  value={maintenance.criteria?.minValue || ''}
                  onChange={(e) =>
                    handleMaintenanceChange(index, 'minValue', Number(e.target.value))
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  placeholder="Valor Máximo"
                  value={maintenance.criteria?.maxValue || ''}
                  onChange={(e) =>
                    handleMaintenanceChange(index, 'maxValue', Number(e.target.value))
                  }
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
              placeholder="Descripción del Mantenimiento Programado"
              value={scheduled.description}
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
            {scheduled.criteria?.type === 'date' && (
              <input
                type="date"
                value={scheduled.criteria?.currentValue as string}
                onChange={(e) => handleScheduledChange(index, 'currentValue', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded mt-2"
              />
            )}
            {scheduled.criteria?.type === 'number' && (
              <div className="flex gap-4 mt-2">
                <input
                  type="number"
                  placeholder="Valor Actual"
                  value={scheduled.criteria?.currentValue || ''}
                  onChange={(e) =>
                    handleScheduledChange(index, 'currentValue', Number(e.target.value))
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  placeholder="Valor Mínimo"
                  value={scheduled.criteria?.minValue || ''}
                  onChange={(e) =>
                    handleScheduledChange(index, 'minValue', Number(e.target.value))
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  placeholder="Valor Máximo"
                  value={scheduled.criteria?.maxValue || ''}
                  onChange={(e) =>
                    handleScheduledChange(index, 'maxValue', Number(e.target.value))
                  }
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
        Guardar Equipo
      </button>
    </div>
  );
};

export default AddEquipment;

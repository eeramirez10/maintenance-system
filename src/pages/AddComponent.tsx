import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Component, CustomField, Maintenance, ScheduledMaintenance } from '../types';

interface AddComponentProps {
  onAdd: (newComponent: Component) => void;
}

const AddComponent: React.FC<AddComponentProps> = ({ onAdd }) => {
  const navigate = useNavigate();
  const { equipmentId } = useParams<{ equipmentId: string }>(); // Relación con equipo
  const relatedEquipmentId = equipmentId ? Number(equipmentId) : null;

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

    const validFormats = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validFormats.includes(file.type)) {
      setErrorMessage('Solo se permiten imágenes en formato JPEG, JPG o PNG.');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
      setErrorMessage('El tamaño de la imagen no puede superar los 5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setErrorMessage(null);
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

  // Guardar Componente
  const handleSave = () => {
    if (!name.trim()) {
      setErrorMessage('El nombre del componente es obligatorio.');
      return;
    }
    if (!type.trim()) {
      setErrorMessage('El tipo de componente es obligatorio.');
      return;
    }
    if (relatedEquipmentId === null) {
      setErrorMessage('Debe estar relacionado con un equipo.');
      return;
    }

    const newComponent: Component = {
      id: Date.now(),
      name,
      type,
      image,
      customFields,
      maintenances,
      scheduledMaintenances,
      relatedEquipmentId,
    };

    onAdd(newComponent);
    navigate(`/equipment/${relatedEquipmentId}`); // Redirige al detalle del equipo
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Agregar Componente</h1>
      {errorMessage && (
        <div className="mb-4 px-4 py-2 bg-red-100 text-red-700 border border-red-400 rounded">
          {errorMessage}
        </div>
      )}
      <input
        type="text"
        placeholder="Nombre del Componente"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
      />
      <input
        type="text"
        placeholder="Tipo de Componente"
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

      {/* Mantenimientos Realizados y Programados */}
      <button
        onClick={handleSave}
        className="mt-6 block w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Guardar Componente
      </button>
    </div>
  );
};

export default AddComponent;

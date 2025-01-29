// EditComponent.tsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Component, CustomField, Maintenance, ScheduledMaintenance } from '../types';
import ScheduledMaintenanceItem from '../components/ScheduledMaintenanceForm';


interface EditComponentProps {
  components: Component[];
  onUpdate: (updatedComponent: Component) => void;
}

const EditComponent: React.FC<EditComponentProps> = ({ components, onUpdate }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const component = components.find((comp) => comp.id === Number(id));
  if (!component) {
    return <div className="p-8 text-center">Componente no encontrado.</div>;
  }

  const [name, setName] = useState(component.name);
  const [type, setType] = useState(component.type);
  const [image, setImage] = useState<string | null>(component.image || null);
  const [customFields, setCustomFields] = useState<CustomField[]>(component.customFields || []);
  const [maintenances, setMaintenances] = useState<Maintenance[]>(component.maintenances || []);
  const [scheduledMaintenances, setScheduledMaintenances] = useState<ScheduledMaintenance[]>(
    component.scheduledMaintenances || []
  );
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

  // Manejo de Mantenimientos Programados
  const handleScheduledChange = (
    index: number,
    field: keyof ScheduledMaintenance['criteria'] | 'description',
    value: string | number | undefined
  ) => {
    const updatedScheduled = [...scheduledMaintenances];
    if (field === 'description') {
      updatedScheduled[index].description = value as string;
    } else {
      // Asegurarse de que 'criteria' exista
      if (!updatedScheduled[index].criteria) {
        updatedScheduled[index].criteria = {
          name: '',
          type: 'number',
          currentValue: 0,
        };
      }
      if (
        field === 'name' ||
        field === 'type' ||
        field === 'currentValue' ||
        field === 'minValue' ||
        field === 'maxValue'
      ) {
        (updatedScheduled[index].criteria as any)[field] = value;
      }
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
          type: 'number', // Valor inicial predeterminado
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
    // Validaciones básicas
    if (!name.trim()) {
      setErrorMessage('El nombre del componente es obligatorio.');
      return;
    }
    if (!type.trim()) {
      setErrorMessage('El tipo de componente es obligatorio.');
      return;
    }

    // Validaciones para Mantenimientos Programados
    for (let i = 0; i < scheduledMaintenances.length; i++) {
      const maintenance = scheduledMaintenances[i];
      if (!maintenance.description.trim()) {
        setErrorMessage(`La descripción del mantenimiento #${i + 1} es obligatoria.`);
        return;
      }
      if (!maintenance.criteria?.name.trim()) {
        setErrorMessage(`El nombre del criterio del mantenimiento #${i + 1} es obligatorio.`);
        return;
      }
      if (!maintenance.criteria?.type) {
        setErrorMessage(`El tipo de criterio del mantenimiento #${i + 1} es obligatorio.`);
        return;
      }
      if (maintenance.criteria.type === 'date') {
        if (!maintenance.criteria.currentValue) {
          setErrorMessage(`La fecha de inspección del mantenimiento #${i + 1} es obligatoria.`);
          return;
        }
      }
      if (maintenance.criteria.type === 'number') {
        if (
          maintenance.criteria.currentValue === undefined ||
          maintenance.criteria.minValue === undefined ||
          maintenance.criteria.maxValue === undefined
        ) {
          setErrorMessage(`Todos los valores numéricos del mantenimiento #${i + 1} son obligatorios.`);
          return;
        }
        if (maintenance.criteria.maxValue <= maintenance.criteria.currentValue) {
          setErrorMessage(`El valor máximo debe ser mayor que el valor actual en el mantenimiento #${i + 1}.`);
          return;
        }
      }
    }

    const updatedComponent: Component = {
      ...component,
      name,
      type,
      image,
      customFields,
      maintenances,
      scheduledMaintenances,
    };

    onUpdate(updatedComponent);
    navigate(`/component/${component.id}`); // Redirige al detalle del componente
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Editar Componente</h1>
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

      {/* Mantenimientos Programados */}
      <h2 className="text-xl font-bold mt-6">Mantenimientos Programados</h2>
      <ul className="divide-y divide-gray-200 mt-4">
        {scheduledMaintenances.map((maintenance, index) => (
          <ScheduledMaintenanceItem
            key={index}
            maintenance={maintenance}
            index={index}
            handleChange={handleScheduledChange}
            handleDelete={handleDeleteScheduled}
          />
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

export default EditComponent;

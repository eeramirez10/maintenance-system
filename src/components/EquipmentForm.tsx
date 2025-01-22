import React, { useState } from 'react';
import { CustomField, Equipment, Maintenance } from '../types';

interface EquipmentFormProps {
  onSave: (equipment: Omit<Equipment, 'id'>) => void;
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({ onSave }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [hasMaintenance, setHasMaintenance] = useState(false);
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);

  const addCustomField = () => setCustomFields([...customFields, { name: '', value: '' }]);

  const handleFieldChange = (index: number, field: keyof CustomField, value: string) => {
    const fields = [...customFields];
    fields[index][field] = value;
    setCustomFields(fields);
  };

  const addMaintenance = () => setMaintenances([...maintenances, { date: '', description: '' }]);

  const handleMaintenanceChange = (index: number, field: keyof Maintenance, value: string) => {
    const updatedMaintenances = [...maintenances];
    updatedMaintenances[index][field] = value;
    setMaintenances(updatedMaintenances);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, type, customFields, image, maintenances });
    setName('');
    setType('');
    setCustomFields([]);
    setImage(null);
    setHasMaintenance(false);
    setMaintenances([]);
  };

  return (
    <form className="p-6 bg-white shadow rounded space-y-4" onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold">Crear Equipo</h3>
      <input
        type="text"
        placeholder="Nombre del Equipo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Tipo de Equipo"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result as string);
            reader.readAsDataURL(e.target.files[0]);
          }
        }}
        className="w-full text-sm text-gray-500"
      />
      {image && <img src={image} alt="Preview" className="w-full h-32 object-cover rounded mt-4" />}
      <button
        type="button"
        onClick={addCustomField}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Agregar Campo Personalizado
      </button>
      {customFields.map((field, index) => (
        <div key={index} className="flex space-x-2">
          <input
            type="text"
            placeholder="Nombre del Campo"
            value={field.name}
            onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Valor"
            value={field.value}
            onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium text-gray-700">¿Tiene mantenimientos?</label>
        <div className="flex items-center space-x-4 mt-2">
          <label>
            <input
              type="radio"
              name="hasMaintenance"
              value="yes"
              checked={hasMaintenance}
              onChange={() => setHasMaintenance(true)}
            />
            <span className="ml-2">Sí</span>
          </label>
          <label>
            <input
              type="radio"
              name="hasMaintenance"
              value="no"
              checked={!hasMaintenance}
              onChange={() => setHasMaintenance(false)}
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>
      {hasMaintenance && (
        <div>
          <h4 className="text-lg font-bold mt-4">Detalles de Mantenimiento</h4>
          <button
            type="button"
            onClick={addMaintenance}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
          >
            Agregar Mantenimiento
          </button>
          {maintenances.map((maintenance, index) => (
            <div key={index} className="space-y-2 mt-2">
              <input
                type="date"
                value={maintenance.date}
                onChange={(e) => handleMaintenanceChange(index, 'date', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Descripción"
                value={maintenance.description}
                onChange={(e) => handleMaintenanceChange(index, 'description', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      )}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Guardar
      </button>
    </form>
  );
};

export default EquipmentForm;

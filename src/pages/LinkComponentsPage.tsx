import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Equipment, Component } from '../types';

interface LinkComponentsPageProps {
  equipments: Equipment[];
  components: Component[];
  onLinkComponent: (equipmentId: number, componentId: number) => void;
}

const LinkComponentsPage: React.FC<LinkComponentsPageProps> = ({
  equipments,
  components,
  onLinkComponent,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const equipment = equipments.find((equip) => equip.id === Number(id));
  if (!equipment) {
    return <div className="p-8 text-center">Equipo no encontrado.</div>;
  }

  // Filtrar componentes que aún no están relacionados con este equipo
  const availableComponents = components.filter(
    (component) => component.relatedEquipmentId !== equipment.id
  );

  const [selectedComponentId, setSelectedComponentId] = useState<number | null>(null);

  const handleLink = () => {
    if (selectedComponentId !== null) {
      onLinkComponent(equipment.id, selectedComponentId);
      navigate(`/equipment/${equipment.id}`);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-4">Ligar Componentes a {equipment.name}</h1>
      <p className="text-gray-700 mb-6">Seleccione un componente para relacionarlo con este equipo:</p>
      <select
        className="w-full px-4 py-2 border border-gray-300 rounded mb-6"
        value={selectedComponentId || ''}
        onChange={(e) => setSelectedComponentId(Number(e.target.value))}
      >
        <option value="" disabled>
          Seleccione un componente
        </option>
        {availableComponents.map((component) => (
          <option key={component.id} value={component.id}>
            {component.name} ({component.type})
          </option>
        ))}
      </select>
      <button
        onClick={handleLink}
        disabled={selectedComponentId === null}
        className={`w-full px-4 py-2 rounded ${
          selectedComponentId === null
            ? 'bg-gray-300 text-gray-500'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Ligar Componente
      </button>
    </div>
  );
};

export default LinkComponentsPage;

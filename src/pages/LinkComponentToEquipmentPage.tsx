import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Component, Equipment } from '../types';

interface LinkComponentToEquipmentPageProps {
  components: Component[];
  equipments: Equipment[];
  onLinkComponentToEquipment: (componentId: number, equipmentId: number) => void;
}

const LinkComponentToEquipmentPage: React.FC<LinkComponentToEquipmentPageProps> = ({
  components,
  equipments,
  onLinkComponentToEquipment,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Encontrar el componente actual
  const component = components.find((comp) => comp.id === Number(id));
  if (!component) {
    return <div className="p-8 text-center">Componente no encontrado.</div>;
  }

  // Estado para equipo seleccionado
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<number | null>(null);

  const handleLink = () => {
    if (selectedEquipmentId !== null) {
      onLinkComponentToEquipment(component.id, selectedEquipmentId);
      navigate(`/component/${component.id}`);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-4">Ligar {component.name} a un Equipo</h1>
      <p className="text-gray-700 mb-6">
        Seleccione el equipo al que desea ligar este componente.
      </p>

      {/* Tabla de equipos */}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Tipo</th>
            <th className="border border-gray-300 px-4 py-2">Seleccionar</th>
          </tr>
        </thead>
        <tbody>
          {equipments.map((equipment, index) => (
            <tr key={equipment.id} className="text-gray-700 hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{equipment.name}</td>
              <td className="border border-gray-300 px-4 py-2">{equipment.type}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <input
                  type="radio"
                  name="equipment"
                  value={equipment.id}
                  onChange={() => setSelectedEquipmentId(equipment.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para confirmar */}
      <button
        onClick={handleLink}
        disabled={selectedEquipmentId === null}
        className={`mt-6 w-full px-4 py-2 rounded ${
          selectedEquipmentId === null
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-green-500 text-white hover:bg-green-600'
        }`}
      >
        Ligar Componente
      </button>

      {/* Botón para cancelar */}
      <button
        onClick={() => navigate(-1)}
        className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Cancelar
      </button>
    </div>
  );
};

export default LinkComponentToEquipmentPage;

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Equipment, Component } from '../types';

interface EquipmentDetailsProps {
  equipments: Equipment[];
  components: Component[];
  onLinkComponent: (equipmentId: number, componentId: number) => void;
}

const EquipmentDetails: React.FC<EquipmentDetailsProps> = ({
  equipments,
  components,
  onLinkComponent,
}) => {
  const { id } = useParams<{ id: string }>();
  const equipment = equipments.find((equip) => equip.id === Number(id));

  if (!equipment) {
    return <div className="p-8 text-center">Equipo no encontrado.</div>;
  }

  // Filtrar los componentes relacionados con el equipo actual
  const relatedComponents = components.filter(
    (component) => component.relatedEquipmentId === equipment.id
  );

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-4">{equipment.name}</h1>
      <p className="text-gray-700 text-lg mb-4">Tipo: {equipment.type}</p>
      {equipment.image && (
        <img
          src={equipment.image}
          alt={equipment.name}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      {/* Campos Personalizados */}
      <h2 className="text-2xl font-bold mt-6">Campos Personalizados</h2>
      <ul className="list-disc ml-6 text-gray-700 mb-6">
        {equipment.customFields.map((field, index) => (
          <li key={index}>
            <span className="font-semibold">{field.name}:</span> {field.value}
          </li>
        ))}
      </ul>

      {/* Componentes Relacionados */}
      <h2 className="text-2xl font-bold mt-6">Componentes Relacionados</h2>
      {relatedComponents.length ? (
        <table className="w-full table-auto border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Nombre</th>
              <th className="border border-gray-300 px-4 py-2">Tipo</th>
              <th className="border border-gray-300 px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {relatedComponents.map((component, index) => (
              <tr key={component.id} className="text-gray-700 hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{component.name}</td>
                <td className="border border-gray-300 px-4 py-2">{component.type}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <Link
                    to={`/component/${component.id}`}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Ver Detalle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 mt-4">
          No hay componentes relacionados con este equipo.
        </p>
      )}

      {/* Botón para Ligar Componentes */}
      <Link
        to={`/link-components/${equipment.id}`}
        className="mt-6 block px-4 py-2 bg-blue-500 text-white text-center rounded hover:bg-blue-600"
      >
        Ligar Componentes
      </Link>
    </div>
  );
};

export default EquipmentDetails;

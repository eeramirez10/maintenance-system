import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Component } from '../types';
import { calculateRemaining } from '../utils/calculateRemaining';

interface ComponentDetailsProps {
  components: Component[];
}

const ComponentDetails: React.FC<ComponentDetailsProps> = ({ components }) => {
  const { id } = useParams<{ id: string }>();
  const component = components.find((comp) => comp.id === Number(id));

  if (!component) {
    return <div className="p-8 text-center">Componente no encontrado.</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-4">{component.name}</h1>
      <p className="text-gray-700 text-lg mb-4">Tipo: {component.type}</p>
      {component.image && (
        <img
          src={component.image}
          alt={component.name}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      {/* Campos Personalizados */}
      <h2 className="text-2xl font-bold mt-6">Campos Personalizados</h2>
      <ul className="list-disc ml-6 text-gray-700 mb-6">
        {component.customFields.map((field, index) => (
          <li key={index}>
            <span className="font-semibold">{field.name}:</span> {field.value}
          </li>
        ))}
      </ul>

      {/* Mantenimientos Realizados */}
      <h2 className="text-2xl font-bold mt-6">Mantenimientos Realizados</h2>
      {component.maintenances?.length ? (
        <table className="w-full table-auto border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Descripción</th>
              <th className="border border-gray-300 px-4 py-2">Criterio</th>
              <th className="border border-gray-300 px-4 py-2">Valor Actual</th>
              <th className="border border-gray-300 px-4 py-2">Rango</th>
            </tr>
          </thead>
          <tbody>
            {component.maintenances.map((maintenance, index) => (
              <tr key={index} className="text-gray-700 hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{maintenance.description}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {maintenance.criteria?.name || 'No definido'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {maintenance.criteria?.type === 'date'
                    ? maintenance.criteria.currentValue || 'No definido'
                    : maintenance.criteria?.currentValue || 'No definido'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {maintenance.criteria?.type === 'number'
                    ? `Min: ${maintenance.criteria?.minValue || 'N/A'}, Max: ${
                        maintenance.criteria?.maxValue || 'N/A'
                      }`
                    : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 mt-4">No hay mantenimientos registrados para este componente.</p>
      )}

      {/* Mantenimientos Programados */}
      <h2 className="text-2xl font-bold mt-6">Mantenimientos Programados</h2>
      {component.scheduledMaintenances?.length ? (
        <table className="w-full table-auto border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Descripción</th>
              <th className="border border-gray-300 px-4 py-2">Criterio</th>
              <th className="border border-gray-300 px-4 py-2">Valor Actual</th>
              <th className="border border-gray-300 px-4 py-2">Rango</th>
              <th className="border border-gray-300 px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {component.scheduledMaintenances.map((maintenance, index) => (
              <tr key={index} className="text-gray-700 hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{maintenance.description}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {maintenance.criteria?.name || 'No definido'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {maintenance.criteria?.type === 'date'
                    ? maintenance.criteria.currentValue || 'No definido'
                    : maintenance.criteria?.currentValue || 'No definido'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {maintenance.criteria?.type === 'number'
                    ? `Min: ${maintenance.criteria?.minValue || 'N/A'}, Max: ${
                        maintenance.criteria?.maxValue || 'N/A'
                      }`
                    : '-'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {calculateRemaining(maintenance.criteria)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 mt-4">No hay mantenimientos programados para este componente.</p>
      )}

      <Link
        to={`/edit-component/${component.id}`}
        className="mt-6 block px-4 py-2 bg-blue-500 text-white text-center rounded hover:bg-blue-600"
      >
        Editar Componente
      </Link>
    </div>
  );
};

export default ComponentDetails;

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Equipment } from '../types';
import { calculateRemaining } from '../utils/calculateRemaining'; // Utilidad para calcular cuánto falta

interface EquipmentDetailsProps {
  equipments: Equipment[];
}

const EquipmentDetails: React.FC<EquipmentDetailsProps> = ({ equipments }) => {
  const { id } = useParams<{ id: string }>();
  const equipment = equipments.find((equip) => equip.id === Number(id));

  if (!equipment) {
    return <div className="p-8 text-center">Equipo no encontrado.</div>;
  }

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

      {/* Mantenimientos Realizados */}
      <h2 className="text-2xl font-bold mt-6">Mantenimientos Realizados</h2>
      {equipment.maintenances?.length ? (
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
            {equipment.maintenances.map((maintenance, index) => (
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
        <p className="text-gray-500 mt-4">No hay mantenimientos registrados para este equipo.</p>
      )}

      {/* Mantenimientos Programados */}
      <h2 className="text-2xl font-bold mt-6">Mantenimientos Programados</h2>
      {equipment.scheduledMaintenances?.length ? (
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
            {equipment.scheduledMaintenances.map((maintenance, index) => (
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
        <p className="text-gray-500 mt-4">No hay mantenimientos programados para este equipo.</p>
      )}

      <Link
        to={`/edit-equipment/${equipment.id}`}
        className="mt-6 block px-4 py-2 bg-blue-500 text-white text-center rounded hover:bg-blue-600"
      >
        Editar Equipo
      </Link>
    </div>
  );
};

export default EquipmentDetails;

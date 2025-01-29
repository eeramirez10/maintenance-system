import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Equipment, Component } from '../types';
import { calculateRemaining } from '../utils/calculateRemaining';
import { useEquipments } from '../hooks/useEquipments';

interface EquipmentDetailsProps {
  components: Component[];
  onDeleteEquipment: (id: number) => void; // Agregada la prop onDeleteEquipment
}

const EquipmentDetails: React.FC<EquipmentDetailsProps> = ({  components, onDeleteEquipment }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { equipments} = useEquipments()
  const equipment = equipments.find((eq) => eq.id === Number(id));

  if (!equipment) {
    return <div className="p-8 text-center">Equipo no encontrado.</div>;
  }

  // Filtrar componentes relacionados con este equipo
  const relatedComponents = components.filter(
    (component) => component.relatedEquipmentId === equipment.id
  );

  // Manejar la eliminación del equipo con confirmación
  const handleDeleteEquipment = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este equipo?')) {
      onDeleteEquipment(equipment.id);
      navigate('/equipments'); // Redirige a la página principal después de eliminar
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white shadow rounded">
      {/* Encabezado con Nombre del Equipo y Botones de Acción */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{equipment.name}</h1>
          <p className="text-gray-700 text-lg">Tipo: {equipment.type}</p>
        </div>
        <div className="flex space-x-2">
          <Link to={`/edit-equipment/${equipment.id}`}>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
              Editar Equipo
            </button>
          </Link>
          <button
            onClick={handleDeleteEquipment}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Eliminar Equipo
          </button>
        </div>
      </div>

      {equipment.image && (
        <img
          src={equipment.image}
          alt={equipment.name}
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}

      {/* Campos Personalizados */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Campos Personalizados</h2>
        {equipment.customFields.length > 0 ? (
          <ul className="list-disc ml-6 text-gray-700 mb-6">
            {equipment.customFields.map((field, index) => (
              <li key={index}>
                <span className="font-semibold">{field.name}:</span> {field.value}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mb-6">No hay campos personalizados registrados.</p>
        )}
      </section>

      {/* Componentes Relacionados */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Componentes Relacionados</h2>
        {relatedComponents.length > 0 ? (
          <table className="w-full table-auto border-collapse border border-gray-300 mb-4">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2">Nombre</th>
                <th className="border border-gray-300 px-4 py-2">Tipo</th>
                <th className="border border-gray-300 px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {relatedComponents.map((component) => (
                <tr key={component.id} className="text-gray-700 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{component.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{component.type}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <Link to={`/component/${component.id}`}>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Ver Componente
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 mb-4">No hay componentes relacionados.</p>
        )}
      </section>

      {/* Mantenimientos Realizados */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Mantenimientos Realizados</h2>
        {equipment.maintenances?.length > 0 ? (
          <table className="w-full table-auto border-collapse border border-gray-300 mb-6">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2">Descripción</th>
                <th className="border border-gray-300 px-4 py-2">Criterio</th>
                <th className="border border-gray-300 px-4 py-2">Valor Actual</th>
              </tr>
            </thead>
            <tbody>
              {equipment.maintenances.map((maintenance, index) => (
                <tr key={index} className="text-gray-700 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{maintenance.description}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {maintenance.criteria?.name || 'No definido'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {maintenance.criteria?.type === 'date'
                      ? maintenance.criteria.currentValue
                      : maintenance.criteria?.currentValue || 'No definido'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 mb-6">No hay mantenimientos registrados.</p>
        )}
      </section>

      {/* Mantenimientos Programados */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Mantenimientos Programados</h2>
        {equipment.scheduledMaintenances?.length > 0 ? (
          <table className="w-full table-auto border-collapse border border-gray-300 mb-6">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
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
                  <td className="border border-gray-300 px-4 py-2">{maintenance.description}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {maintenance.criteria?.name || 'No definido'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {maintenance.criteria?.type === 'date'
                      ? maintenance.criteria.currentValue
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
          <p className="text-gray-500 mb-6">No hay mantenimientos programados registrados.</p>
        )}
      </section>
    </div>
  );
};

export default EquipmentDetails;

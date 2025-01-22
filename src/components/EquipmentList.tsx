import React, { useState } from 'react';
import { Equipment } from '../types';
import { Link } from 'react-router-dom';

interface EquipmentListProps {
  equipments: Equipment[];
  onDelete: (id: number) => void;
}

const EquipmentList: React.FC<EquipmentListProps> = ({ equipments, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Cambia esto para ajustar el número de equipos por página

  // Calcular datos para la paginación
  const totalPages = Math.ceil(equipments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEquipments = equipments.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Lista de Equipos</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Tipo</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentEquipments.map((equipment, index) => (
            <tr key={equipment.id} className="text-gray-700 hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-center">
                {startIndex + index + 1}
              </td>
              <td className="border border-gray-300 px-4 py-2">{equipment.name}</td>
              <td className="border border-gray-300 px-4 py-2">{equipment.type}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex justify-center space-x-2">
                  <Link
                    to={`/equipment/${equipment.id}`}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Detalle
                  </Link>
                  <Link
                    to={`/edit-equipment/${equipment.id}`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => onDelete(equipment.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Controles de Paginación */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? 'bg-gray-300 text-gray-500'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Anterior
        </button>
        <span className="text-gray-700">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? 'bg-gray-300 text-gray-500'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default EquipmentList;

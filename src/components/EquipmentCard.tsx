import React from 'react';
import { Link } from 'react-router-dom';
import { Equipment } from '../types';

interface EquipmentCardProps {
  equipment: Equipment;
  onDelete: (id: number) => void;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment, onDelete }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
    {equipment.image ? (
      <img
        src={equipment.image}
        alt={equipment.name}
        className="w-full h-40 object-cover"
      />
    ) : (
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
        Sin Imagen
      </div>
    )}
    <div className="p-4 flex flex-col flex-grow">
      <h2 className="text-lg font-bold text-gray-800">{equipment.name}</h2>
      <p className="text-sm text-gray-500 mb-4">Tipo: {equipment.type}</p>
      <div className="mt-auto flex flex-col space-y-2">
        <Link
          to={`/equipment/${equipment.id}`}
          className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 text-center"
        >
          Ver Detalles
        </Link>
        <Link
          to={`/schedule-maintenance/${equipment.id}`}
          className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 text-center"
        >
          Programar Mantenimiento
        </Link>
        <button
          onClick={() => onDelete(equipment.id)}
          className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 text-center"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
);

export default EquipmentCard;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEquipos } from '../../../hooks/useEquipos';

const ScheduleMaintenance: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { equipos, editEquipo: updateEquipo } = useEquipos();
  const [description, setDescription] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');

  const handleScheduleMaintenance = () => {
    if (!description || !scheduledDate) {
      alert('La descripción y la fecha son obligatorias.');
      return;
    }

    const equipo = equipos.find((e) => e.id === Number(id));
    if (!equipo) {
      alert('Equipo no encontrado.');
      return;
    }

    const newMaintenance = {
      maintenanceId: Date.now(),
      description,
      scheduledDate,
    };

    const updatedEquipo = {
      ...equipo,
      scheduledMaintenances: [...equipo.scheduledMaintenances, newMaintenance],
    };

    updateEquipo(updatedEquipo);
    alert('Mantenimiento programado exitosamente.');
    navigate('/equipment');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Programar Mantenimiento
        </h2>
        <div className="space-y-4">
          <textarea
            placeholder="Descripción del mantenimiento"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows={4}
          />
          <input
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={handleScheduleMaintenance}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Programar
          </button>
          <button
            onClick={() => navigate('/equipment')}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleMaintenance;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEquipos } from '../../../hooks/useEquipos';

export const RegisterFailure: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { equipos, editEquipo:updateEquipo } = useEquipos();

    const equipment = equipos.find((equipo) => equipo.id === Number(id));

    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');

    if (!equipment) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <h2 className="text-xl font-bold text-red-500">Equipo no encontrado</h2>
            </div>
        );
    }

    const handleRegisterFailure = () => {
        if (!description) {
            alert('La descripción de la falla es obligatoria.');
            return;
        }

        const newFailure = {
            failureId: Date.now(),
            description,
            reportedDate: new Date().toISOString().split('T')[0],
            status,
        };

        const updatedEquipment = {
            ...equipment,
            activeFailures: [...equipment.activeFailures, newFailure],
        };

        updateEquipo(updatedEquipment);
        alert('Falla registrada exitosamente.');
        navigate(`/equipment`);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
            <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Registrar Falla</h2>
                <p className="text-gray-600 mb-4">Equipo: <span className="font-semibold">{equipment.name}</span></p>
                <div className="space-y-4">
                    <textarea
                        placeholder="Descripción de la falla"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border rounded-md resize-none h-32"
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-3 border rounded-md"
                    >
                        <option value="Pending">Pendiente</option>
                        <option value="Resolved">Resuelta</option>
                    </select>
                    <button
                        onClick={handleRegisterFailure}
                        className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition"
                    >
                        Registrar Falla
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterFailure;

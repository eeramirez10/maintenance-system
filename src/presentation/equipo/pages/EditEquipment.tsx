// src/presentation/EditEquipmentPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Equipment } from '../../../types/equipo';
import { useEquipos } from '../../../hooks/useEquipos';

const EditEquipmentPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { equipos:equipmentList, editEquipo:updateEquipment } = useEquipos();
    const [equipment, setEquipment] = useState<Equipment | null>(null);
    const [name, setName] = useState('');
    const [components, setComponents] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const foundEquipment = equipmentList.find((eq) => eq.id === Number(id));
        if (foundEquipment) {
            setEquipment(foundEquipment);
            setName(foundEquipment.name);
            setComponents(foundEquipment.components.join(', '));
            setLocation(foundEquipment.location);
            setStatus(foundEquipment.status);
        } else {
            alert('Equipment not found');
            navigate('/equipment'); // Redirect if equipment not found
        }
    }, [id, equipmentList, navigate]);

    const handleUpdate = () => {
        if (!equipment) return;

        const updatedEquipment: Equipment = {
            ...equipment,
            name,
            components: components.split(',').map((comp) => comp.trim()),
            location,
            status,
        };
       

        updateEquipment(updatedEquipment);
        navigate('/equipment'); // Redirect after update
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
            {equipment && (
                <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Editar equipo</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Nombre del equipo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Componentes (separados por comas)"
                            value={components}
                            onChange={(e) => setComponents(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Ubicacion"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                            <option value="En Mantenimiento">En Mantenimiento</option>
                        </select>
                        <button
                            onClick={handleUpdate}
                            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
                        >
                            Actualizar equipo
                        </button>
                        <button
                            onClick={() => navigate('/equipment')}
                            className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditEquipmentPage;

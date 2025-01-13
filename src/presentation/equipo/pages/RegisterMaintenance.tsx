import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEquipos } from '../../../hooks/useEquipos';


const RegisterMaintenance: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { equipos: equipmentList, editEquipo: updateEquipment } = useEquipos();

    const equipment = equipmentList.find((eq) => eq.id === Number(id));
    const [description, setDescription] = useState('');
    const [technician, setTechnician] = useState('');

    if (!equipment) {
        alert('Equipment not found');
        navigate('/equipment');
        return null;
    }

    const handleRegister = () => {
        if (!description || !technician) {
            alert('Description and technician are required!');
            return;
        }

        const newMaintenance = {
            date: new Date().toISOString().split('T')[0],
            description,
            technician,
        };

        const updatedEquipment = {
            ...equipment,
            history: [...equipment.history, newMaintenance],
            lastMaintenance: newMaintenance.date,
        };

        updateEquipment(updatedEquipment);
        alert('Maintenance registered successfully!');
        navigate(`/equipment`); // Redirect to equipment details
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Registro de mantenimiento para {equipment.name}</h2>
                <div className="space-y-4">
                    <textarea
                        placeholder="Descripcion del mantenimiento"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded-md h-24"
                    ></textarea>
                    <input
                        type="text"
                        placeholder="Nombre del Tecnico"
                        value={technician}
                        onChange={(e) => setTechnician(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                    <button
                        onClick={handleRegister}
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
                    >
                       Registrar Mantenimiento
                    </button>
                    <button
                        onClick={() => navigate(`/equipment/${id}`)}
                        className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterMaintenance;
import React, { useState } from 'react';
import { Equipment, Failure, ScheduledMaintenance } from '../../../types/equipo';
import { useEquipos } from '../../../hooks/useEquipos';

export const AddEquipment: React.FC = () => {
    const { equipos: equipmentList, addEquipo: setEquipmentList } = useEquipos();
    const [name, setName] = useState('');
    const [components, setComponents] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('Activo');
    const [maintenancePercentage, setMaintenancePercentage] = useState(100);

    const handleAddEquipment = () => {
        if (!name || !location) {
            alert('El nombre y la ubicación son obligatorios.');
            return;
        }

        const newEquipment: Equipment = {
            id: Date.now(),
            name,
            components: components.split(',').map((comp) => comp.trim()),
            lastMaintenance: new Date().toISOString().split('T')[0],
            location,
            status,
            maintenancePercentage,
            activeFailures: [], // Inicialmente vacío
            scheduledMaintenances: [], // Inicialmente vacío
            history: [], // Inicialmente vacío
        };

        setEquipmentList(newEquipment);
        setName('');
        setComponents('');
        setLocation('');
        setStatus('Activo');
        setMaintenancePercentage(100);
        alert('Equipo agregado exitosamente.');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Agregar Nuevo Equipo</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nombre del Equipo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Componentes (separados por coma)"
                        value={components}
                        onChange={(e) => setComponents(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Ubicación"
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
                    <input
                        type="number"
                        placeholder="Porcentaje de Mantenimiento"
                        value={maintenancePercentage}
                        onChange={(e) => setMaintenancePercentage(Number(e.target.value))}
                        className="w-full p-2 border rounded-md"
                    />
                    <button
                        onClick={handleAddEquipment}
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
                    >
                        Agregar Equipo
                    </button>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-700 mb-4">Lista de Equipos</h3>
                <ul className="space-y-4">
                    {equipmentList.map((equipment) => (
                        <li
                            key={equipment.id}
                            className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-2"
                        >
                            <p className="text-gray-800 font-semibold">Nombre: {equipment.name}</p>
                            <p className="text-gray-600">Ubicación: {equipment.location}</p>
                            <p className="text-gray-600">Estatus: {equipment.status}</p>
                            <p className="text-gray-600">
                                Componentes: {equipment.components.join(', ') || 'Ninguno'}
                            </p>
                            <p className="text-gray-600">
                                Porcentaje de Mantenimiento: {equipment.maintenancePercentage}%
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

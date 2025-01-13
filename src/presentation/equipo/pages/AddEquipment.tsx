import React, { useState } from 'react';
import { Equipment } from '../../../types/equipo';
import { useEquipos } from '../../../hooks/useEquipos';


export const AddEquipment: React.FC = () => {
   
    const { equipos: equipmentList, addEquipo: setEquipmentList} = useEquipos()
    const [name, setName] = useState('');
    const [components, setComponents] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('Active');

    const handleAddEquipment = () => {
        if (!name || !location) {
            alert('Name and location are required!');
            return;
        }

        const newEquipment: Equipment = {
            id: Date.now(),
            name,
            components: components.split(',').map((comp) => comp.trim()),
            lastMaintenance: new Date().toISOString().split('T')[0],
            location,
            status,
            history: [],
        };

        setEquipmentList(newEquipment);
        setName('');
        setComponents('');
        setLocation('');
        setStatus('Active');
        alert('Equipment added successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Add New Equipment</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Equipment Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Components (comma separated)"
                        value={components}
                        onChange={(e) => setComponents(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Under Maintenance">Under Maintenance</option>
                    </select>
                    <button
                        onClick={handleAddEquipment}
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
                    >
                        Add Equipment
                    </button>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-700 mb-4">Equipment List</h3>
                <ul className="space-y-4">
                    {equipmentList.map((equipment) => (
                        <li
                            key={equipment.id}
                            className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-2"
                        >
                            <p className="text-gray-800 font-semibold">Name: {equipment.name}</p>
                            <p className="text-gray-600">Location: {equipment.location}</p>
                            <p className="text-gray-600">Status: {equipment.status}</p>
                            <p className="text-gray-600">
                                Components: {equipment.components.join(', ') || 'None'}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

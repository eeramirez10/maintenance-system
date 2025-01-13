// import { useState } from "react";
// import { useEquipos } from "../../../hooks/useEquipos";
// import { Equipment } from "../../../types/equipo";
// import { useNavigate } from "react-router-dom";

// export const EquipmentList = () => {
//     const navigate = useNavigate()
//     const { equipos: equipment } = useEquipos();
//     const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);


//     const handleShowHistory = (equipment: Equipment) => {
//         setSelectedEquipment(equipment);
//     };

//     return (
//         <div className="  p-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {equipment.map((item) => (
//                 <div
//                     key={item.id}
//                     className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition flex flex-col items-center"
//                 >
//                     <img
//                         src={`https://placehold.co/600x400?text=${encodeURIComponent(item.name)}`}
//                         alt={item.name}
//                         onError={(e) => {
//                             (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
//                         }}
//                         className="w-screen object-cover mb-4"
//                     />
//                     <h3 className="text-xl font-bold text-indigo-700 mb-2">{item.name}</h3>
//                     <p className="text-gray-600 mb-4">
//                         Ultimo Mtto: {new Date(item.lastMaintenance).toLocaleDateString()}
//                     </p>
//                     <p className="text-gray-600 mb-4">
//                         Ubicacion: {item.location || 'Not specified'}
//                     </p>
//                     <p className="text-gray-600 mb-4">
//                         Estatus: {item.status || 'Unknown'}
//                     </p>
//                     <div className=" flex gap-2 ">
//                         <button
//                             onClick={() => handleShowHistory(item)}
//                             className="bg-indigo-500 text-white px-2 py-2 rounded-md hover:bg-indigo-600"
//                         >
//                             Historial
//                         </button>
//                         <button
//                             onClick={() => navigate(`/edit-equipment/${item.id}`) }
//                             className="bg-purple-500 text-white px-2 py-2 rounded-md hover:bg-purple-600"
//                         >
//                             Editar
//                         </button>
//                         <button
//                             onClick={() => navigate(`/register-maintenance/${item.id}`) }
//                             className="bg-pink-500 text-white px-2 py-2 rounded-md hover:bg-pink-600"
//                         >
//                             Registrar Mtto
//                         </button>
//                     </div>

//                 </div>
//             ))}

//             {selectedEquipment && (
//                 <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
//                     <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//                         <h2 className="text-xl font-bold text-indigo-700 mb-4">
//                             Maintenance History for {selectedEquipment.name}
//                         </h2>
//                         <ul className="space-y-2">
//                             {selectedEquipment.history && selectedEquipment.history.length > 0 ? (
//                                 selectedEquipment.history.map((entry, index) => (
//                                     <li
//                                         key={index}
//                                         className="bg-gray-100 p-3 rounded-md shadow-md"
//                                     >
//                                         <p className="text-sm text-gray-800 font-semibold">
//                                             Date: {new Date(entry.date).toLocaleDateString()}
//                                         </p>
//                                         <p className="text-sm text-gray-600">
//                                             Description: {entry.description}
//                                         </p>
//                                         <p className="text-sm text-gray-600">
//                                             Performed by: {entry.technician}
//                                         </p>
//                                     </li>
//                                 ))
//                             ) : (
//                                 <p className="text-gray-600">No history available.</p>
//                             )}
//                         </ul>
//                         <button
//                             onClick={() => setSelectedEquipment(null)}
//                             className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }


import { useState } from "react";
import { useEquipos } from "../../../hooks/useEquipos";
import { Equipment } from "../../../types/equipo";
import { useNavigate } from "react-router-dom";

export const EquipmentList = () => {
    const navigate = useNavigate();
    const { equipos: equipment } = useEquipos();
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

    const handleShowHistory = (equipment: Equipment) => {
        setSelectedEquipment(equipment);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {/* Barra superior */}
                {/* <div className="col-span-1 md:col-span-3 flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
                        Select Equipment
                    </button>
                    <button
                        onClick={() => navigate('/add-equipment')}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        Add New Equipment
                    </button>
                </div> */}

                {equipment.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition flex flex-col items-center"
                    >
                        <img
                            src={`https://placehold.co/600x400?text=${encodeURIComponent(item.name)}`}
                            alt={item.name}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                            }}
                            className="w-screen object-cover mb-4"
                        />
                        <h3 className="text-xl font-bold text-indigo-700 mb-2">{item.name}</h3>
                        <p className="text-gray-600 mb-4">
                            Último Mantenimiento: {new Date(item.lastMaintenance).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600 mb-4">
                            Ubicación: {item.location || 'No especificada'}
                        </p>
                        <p className="text-gray-600 mb-4">
                            Estado: {item.status || 'Desconocido'}
                        </p>
                        <p className="text-gray-600 mb-4">
                            Porcentaje de Mantenimiento: {item.maintenancePercentage || 0}%
                        </p>
                        <div className="text-gray-600 mb-4">
                            <h4 className="font-bold mb-2">Fallas Activas:</h4>
                            {item.activeFailures && item.activeFailures.length > 0 ? (
                                <ul className="list-disc ml-4">
                                    {item.activeFailures.map((failure) => (
                                        <li key={failure.failureId}>
                                            {failure.description} (Estado: {failure.status})
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No hay fallas activas.</p>
                            )}
                        </div>
                        <div className="text-gray-600 mb-4">
                            <h4 className="font-bold mb-2">Mantenimientos Programados:</h4>
                            {item.scheduledMaintenances && item.scheduledMaintenances.length > 0 ? (
                                <ul className="list-disc ml-4">
                                    {item.scheduledMaintenances.map((maintenance) => (
                                        <li key={maintenance.maintenanceId}>
                                            {maintenance.description} (Fecha: {new Date(maintenance.scheduledDate).toLocaleDateString()})
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No hay mantenimientos programados.</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <button
                                onClick={() => handleShowHistory(item)}
                                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 w-full"
                            >
                                Ver Historial
                            </button>
                            <button
                                onClick={() => navigate(`/edit-equipment/${item.id}`)}
                                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 w-full"
                            >
                                Editar Equipo
                            </button>
                            <button
                                onClick={() => navigate(`/register-maintenance/${item.id}`)}
                                className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 w-full"
                            >
                                Registrar Mantenimiento
                            </button>
                            <button
                                onClick={() => navigate(`/register-failure/${item.id}`)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full"
                            >
                                Registrar Falla
                            </button>
                            {/* <button
                                onClick={() => navigate(`/view-active-failures/${item.id}`)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 w-full"
                            >
                                Ver Fallas Activas
                            </button> */}
                            <button
                                onClick={() => navigate(`/schedule-maintenance/${item.id}`)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                            >
                                Programar Mantenimiento
                            </button>
                            {/* <button
                                onClick={() => navigate(`/equipment-status/${item.id}`)}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
                            >
                                Estado Actual
                            </button> */}
                        </div>
                    </div>
                ))}

                {selectedEquipment && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-bold text-indigo-700 mb-4">
                                Historial de Mantenimiento para {selectedEquipment.name}
                            </h2>
                            <ul className="space-y-2">
                                {selectedEquipment.history && selectedEquipment.history.length > 0 ? (
                                    selectedEquipment.history.map((entry, index) => (
                                        <li
                                            key={index}
                                            className="bg-gray-100 p-3 rounded-md shadow-md"
                                        >
                                            <p className="text-sm text-gray-800 font-semibold">
                                                Fecha: {new Date(entry.date).toLocaleDateString()}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Descripción: {entry.description}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Técnico: {entry.technician}
                                            </p>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-gray-600">No hay historial disponible.</p>
                                )}
                            </ul>
                            <button
                                onClick={() => setSelectedEquipment(null)}
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

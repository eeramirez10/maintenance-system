// import React from 'react'
// import { Equipment } from '../../../types/equipo';

// interface Props {
//   equipment: Equipment
// }

// export const EquipmentItem: React.FC<Props> = ({ equipment }) => {
//   return (
//     <div
//       key={equipment.id}
//       className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition flex flex-col items-center"
//     >
//       <img
//         src={`https://placehold.co/600x400?text=${encodeURIComponent(equipment.name)}`}
//         alt={equipment.name}
//         onError={(e) => {
//           (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
//         }}
//         className="w-screen object-cover mb-4"
//       />
//       <h3 className="text-xl font-bold text-indigo-700 mb-2">{equipment.name}</h3>
//       <p className="text-gray-600 mb-4">
//         Last Maintenance: {new Date(equipment.lastMaintenance).toLocaleDateString()}
//       </p>
//       <p className="text-gray-600 mb-4">
//         Location: {equipment.location || 'Not specified'}
//       </p>
//       <p className="text-gray-600 mb-4">
//         Status: {equipment.status || 'Unknown'}
//       </p>
//       <div className=" flex gap-2 ">
//         <button
//           onClick={() => handleShowHistory(item)}
//           className="bg-indigo-500 text-white px-2 py-2 rounded-md hover:bg-indigo-600"
//         >
//           Historial
//         </button>
//         <button
//           onClick={() => navigate(`/edit-equipment/${item.id}`)}
//           className="bg-purple-500 text-white px-2 py-2 rounded-md hover:bg-purple-600"
//         >
//           Editar
//         </button>
//         <button
//           onClick={() => navigate(`/register-maintenance/${item.id}`)}
//           className="bg-pink-500 text-white px-2 py-2 rounded-md hover:bg-pink-600"
//         >
//           Registrar Mtto
//         </button>
//       </div>

//     </div>
//   )
// }

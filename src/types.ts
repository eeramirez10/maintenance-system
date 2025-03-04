// // Campo personalizado asociado a un equipo
// export interface CustomField {
//   name: string; // Nombre del campo (e.g., "Número de serie")
//   value: string; // Valor del campo (e.g., "12345ABC")
// }


// export interface Maintenance {
//   description: string; // Descripción del mantenimiento
//   criteria: {
//     name: string; // Nombre del criterio (e.g., "Kilómetros recorridos")
//     type: 'number' | 'date'; // Tipo de criterio
//     currentValue: number | string; // Valor actual (puede ser número o fecha)
//     minValue?: number; // Valor mínimo (para números)
//     maxValue?: number; // Valor máximo (para números)
//   };
// }

// export interface ScheduledMaintenance extends Maintenance {
//   nextValue?: number | string; // Valor objetivo (fecha o número) para el próximo mantenimiento
// }

// export interface Equipment {
//   id: number; // Identificador único
//   name: string; // Nombre del equipo
//   type: string; // Tipo de equipo (e.g., "Industrial")
//   image?: string; // Imagen opcional
//   customFields: CustomField[]; // Campos personalizados
//   maintenances?: Maintenance[]; // Mantenimientos realizados
//   scheduledMaintenances?: ScheduledMaintenance[]; // Mantenimientos programados
//   isActive: boolean
//   createdBy: number, // Usuario que creó el equipo
//   updatedBy: number, // Última persona que lo editó
// }


// export interface Component {
//   id: number;
//   name: string;
//   type: string;
//   image?: string;
//   customFields: CustomField[];
//   maintenances?: Maintenance[];
//   scheduledMaintenances?: ScheduledMaintenance[];
//   relatedEquipmentId: number; // Relación con el equipo al que pertenece
//   isActive: boolean
//   createdBy: number, // Usuario que creó el equipo
//   updatedBy: number, // Última persona que lo editó
// }


// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   password: string; // Hashed password for authentication
//   role: "admin" | "usuario" | "operador"; // Roles disponibles
//   createdAt: string; // Fecha de creación
//   updatedAt: string; // Última actualización
//   lastLogin: string; // Último acceso al sistema
//   isActive: boolean; // Estado de la cuenta
//   phoneNumber?: string; // Teléfono del usuario (opcional)
//   profilePicture?: string; // URL de la foto de perfil (opcional)
// }




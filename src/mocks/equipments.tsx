// mockEquipments.ts
import { Equipment } from '../types';

const mockEquipments: Equipment[] = [
  {
    id: 1,
    name: 'Compresor Industrial',
    type: 'Industrial',
    image: 'https://america.sullair.com/sites/default/files/2021-04/ZE1_1461_1349x900x75.jpg',
    customFields: [
      { name: 'Número de Serie', value: 'C-12345' },
      { name: 'Ubicación', value: 'Planta 1' },
    ],
    maintenances: [
      {
        description: 'Cambio de filtro de aire',
        criteria: {
          name: 'Horas de operación',
          type: 'number',
          currentValue: 1500,
          minValue: 1000,
          maxValue: 2000,
        },
      },
    ],
    scheduledMaintenances: [
      {
        description: 'Revisión de válvulas',
        criteria: {
          name: 'Horas de operación',
          type: 'number',
          currentValue: 1500,
          minValue: 2000,
          maxValue: 2500,
        },
      },
      {
        description: 'Inspección general',
        criteria: {
          name: 'Fecha de inspección',
          type: 'date',
          currentValue: '2025-02-15',
        },
      },
    ],
    isActive: true, // Equipo activo
  },
  {
    id: 2,
    name: 'Caldera de Vapor',
    type: 'Industrial',
    image: 'https://vaprest.com/wp-content/uploads/2023/07/calderas-industriales-vapor.jpg',
    customFields: [
      { name: 'Capacidad', value: '2000L' },
      { name: 'Presión Máxima', value: '15 bar' },
    ],
    maintenances: [
      {
        description: 'Cambio de juntas',
        criteria: {
          name: 'Ciclos de operación',
          type: 'number',
          currentValue: 3000,
          minValue: 2500,
          maxValue: 5000,
        },
      },
    ],
    scheduledMaintenances: [
      {
        description: 'Revisión de seguridad',
        criteria: {
          name: 'Fecha de revisión',
          type: 'date',
          currentValue: '2025-03-01',
        },
      },
    ],
    isActive: false, // Equipo inactivo
  },
  {
    id: 3,
    name: 'Motor Eléctrico',
    type: 'Eléctrico',
    image: 'https://hvhindustrial.com/images/frontend_images/blogs/1592499808Electric-Motor.jpg',
    customFields: [
      { name: 'Potencia', value: '50 HP' },
      { name: 'RPM', value: '1500' },
    ],
    maintenances: [
      {
        description: 'Cambio de aceite',
        criteria: {
          name: 'Kilómetros recorridos',
          type: 'number',
          currentValue: 12000,
          minValue: 10000,
          maxValue: 15000,
        },
      },
    ],
    scheduledMaintenances: [
      {
        description: 'Ajuste de rotor',
        criteria: {
          name: 'Horas de uso',
          type: 'number',
          currentValue: 12000,
          minValue: 15000,
          maxValue: 20000,
        },
      },
    ],
    isActive: true, // Equipo activo
  },
  {
    id: 4,
    name: 'Vehículo de Empresa',
    type: 'Automóvil',
    image: 'https://es-commerce.com/imagenes/Furgoneta-como-veh%C3%ADculo-de-empresa.jpg',
    customFields: [
      { name: 'Placas', value: 'ABC-123' },
      { name: 'Marca', value: 'Toyota' },
    ],
    maintenances: [
      {
        description: 'Cambio de llantas',
        criteria: {
          name: 'Kilómetros recorridos',
          type: 'number',
          currentValue: 25000,
          minValue: 20000,
          maxValue: 30000,
        },
      },
    ],
    scheduledMaintenances: [
      {
        description: 'Servicio general',
        criteria: {
          name: 'Kilómetros recorridos',
          type: 'number',
          currentValue: 25000,
          minValue: 30000,
          maxValue: 40000,
        },
      },
      {
        description: 'Revisión técnica',
        criteria: {
          name: 'Fecha de revisión',
          type: 'date',
          currentValue: '2025-04-01',
        },
      },
    ],
    isActive: true, // Equipo activo
  },
];

export default mockEquipments;

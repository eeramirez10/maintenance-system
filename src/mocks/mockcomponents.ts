import { Component } from '../types';

const mockComponents: Component[] = [
  {
    id: 1,
    name: 'Filtro de Aire',
    type: 'Consumible',
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_618131-MLM71586738313_092023-F.webp',
    customFields: [
      { name: 'Marca', value: 'ACME' },
      { name: 'Vida útil (horas)', value: '500' },
    ],
    maintenances: [
      {
        description: 'Cambio del filtro',
        criteria: {
          name: 'Horas de uso',
          type: 'number',
          currentValue: 250,
          minValue: 0,
          maxValue: 500,
        },
      },
    ],
    scheduledMaintenances: [
      {
        description: 'Revisión de integridad del filtro',
        criteria: {
          name: 'Fecha',
          type: 'date',
          currentValue: '2025-02-15',
        },
      },
    ],
    relatedEquipmentId: 1, // Relacionado con el equipo de ID 1
  },
  {
    id: 2,
    name: 'Turbina',
    type: 'Mecánico',
    image: 'https://esve.mx/cdn/shop/files/extractor-de-aire-turbina-2-electrico-aerosystem-1024.png?v=1699043661&width=600',
    customFields: [
      { name: 'Modelo', value: 'TURB123' },
      { name: 'Potencia', value: '1500 HP' },
    ],
    maintenances: [
      {
        description: 'Cambio de aceite',
        criteria: {
          name: 'Horas de operación',
          type: 'number',
          currentValue: 700,
          minValue: 0,
          maxValue: 1000,
        },
      },
    ],
    scheduledMaintenances: [
      {
        description: 'Prueba de vibración',
        criteria: {
          name: 'Fecha',
          type: 'date',
          currentValue: '2025-03-01',
        },
      },
    ],
    relatedEquipmentId: 1, // Relacionado con el equipo de ID 1
  },
  {
    id: 3,
    name: 'Sensor de Temperatura',
    type: 'Eléctrico',
    image: 'https://http2.mlstatic.com/D_NQ_NP_769885-MLM51329702912_082022-O.webp',
    customFields: [
      { name: 'Rango de operación', value: '-50°C a 150°C' },
      { name: 'Precisión', value: '±0.5°C' },
    ],
    maintenances: [
      {
        description: 'Calibración',
        criteria: {
          name: 'Tiempo',
          type: 'number',
          currentValue: 12,
          minValue: 0,
          maxValue: 12,
        },
      },
    ],
    scheduledMaintenances: [
      {
        description: 'Verificación anual',
        criteria: {
          name: 'Fecha',
          type: 'date',
          currentValue: '2025-01-30',
        },
      },
    ],
    relatedEquipmentId: 2, // Relacionado con el equipo de ID 2
  },
];

export default mockComponents;

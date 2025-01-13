import { Equipment } from "../types/equipo";

export const equiposData: Equipment[] = [
  {
      id: 1,
      name: 'Equipo A',
      components: ['Component 1', 'Component 2'],
      lastMaintenance: '2023-12-01',
      location: 'Warehouse A',
      status: 'Activo',
      maintenancePercentage: 75, // Estado actual del mantenimiento
      activeFailures: [
          {
              failureId: 1,
              description: 'Oil leakage in pump',
              reportedDate: '2023-11-25',
              status: 'Pending',
          },
      ],
      scheduledMaintenances: [
          {
              maintenanceId: 1,
              description: 'Filter replacement',
              scheduledDate: '2024-01-15',
          },
      ],
      history: [
          {
              date: '2023-11-01',
              description: 'Replaced filter and cleaned interior',
              technician: 'John Doe',
          },
      ],
  },
  {
      id: 2,
      name: 'Equipo B',
      components: ['Component A', 'Component B'],
      lastMaintenance: '2023-11-15',
      location: 'Plant B',
      status: 'En Mantenimiento',
      maintenancePercentage: 50,
      activeFailures: [],
      scheduledMaintenances: [
          {
              maintenanceId: 2,
              description: 'Bearing lubrication',
              scheduledDate: '2024-02-10',
          },
      ],
      history: [
          {
              date: '2023-09-15',
              description: 'Replaced bearings',
              technician: 'Alice Brown',
          },
      ],
  },
  {
      id: 3,
      name: 'Equipo C',
      components: ['Component X', 'Component Y', 'Component Z'],
      lastMaintenance: '2023-10-10',
      location: 'Plant C',
      status: 'Inactivo',
      maintenancePercentage: 30,
      activeFailures: [
          {
              failureId: 2,
              description: 'Electrical short circuit',
              reportedDate: '2023-12-01',
              status: 'Resolved',
          },
      ],
      scheduledMaintenances: [],
      history: [
          {
              date: '2023-08-05',
              description: 'Lubricated joints and replaced seals',
              technician: 'Bob Smith',
          },
          {
              date: '2023-06-12',
              description: 'Checked electrical connections',
              technician: 'Sarah Connor',
          },
      ],
  },
  // {
  //     id: 4,
  //     name: 'Equipo D',
  //     components: ['Component X', 'Component Y', 'Component Z'],
  //     lastMaintenance: '2023-10-10',
  //     location: 'Plant C',
  //     status: 'Inactivo',
  //     maintenancePercentage: 20,
  //     activeFailures: [],
  //     scheduledMaintenances: [
  //         {
  //             maintenanceId: 3,
  //             description: 'Replace seals',
  //             scheduledDate: '2024-03-01',
  //         },
  //     ],
  //     history: [
  //         {
  //             date: '2023-08-05',
  //             description: 'Lubricated joints and replaced seals',
  //             technician: 'Bob Smith',
  //         },
  //         {
  //             date: '2023-06-12',
  //             description: 'Checked electrical connections',
  //             technician: 'Sarah Connor',
  //         },
  //     ],
  // },
  // {
  //     id: 5,
  //     name: 'Equipo E',
  //     components: ['Component X', 'Component Y', 'Component Z'],
  //     lastMaintenance: '2023-10-10',
  //     location: 'Plant C',
  //     status: 'Inactivo',
  //     maintenancePercentage: 90,
  //     activeFailures: [
  //         {
  //             failureId: 3,
  //             description: 'Overheating detected',
  //             reportedDate: '2023-12-15',
  //             status: 'Pending',
  //         },
  //     ],
  //     scheduledMaintenances: [],
  //     history: [
  //         {
  //             date: '2023-08-05',
  //             description: 'Lubricated joints and replaced seals',
  //             technician: 'Bob Smith',
  //         },
  //         {
  //             date: '2023-06-12',
  //             description: 'Checked electrical connections',
  //             technician: 'Sarah Connor',
  //         },
  //     ],
  // },
];


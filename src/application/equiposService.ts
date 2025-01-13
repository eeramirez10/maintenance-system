import { Equipment } from "../types/equipo";

export const equiposData: Equipment[] = [
    {
        id: 1,
        name: 'Equipment A',
        components: ['Component 1', 'Component 2'],
        lastMaintenance: '2023-12-01',
        location: 'Warehouse A',
        status: 'Active',
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
        name: 'Equipment B',
        components: ['Component A', 'Component B'],
        lastMaintenance: '2023-11-15',
        location: 'Plant B',
        status: 'Under Maintenance',
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
        name: 'Equipment C',
        components: ['Component X', 'Component Y', 'Component Z'],
        lastMaintenance: '2023-10-10',
        location: 'Plant C',
        status: 'Inactive',
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
    {
        id: 4,
        name: 'Equipment D',
        components: ['Component X', 'Component Y', 'Component Z'],
        lastMaintenance: '2023-10-10',
        location: 'Plant C',
        status: 'Inactive',
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
    {
        id: 5,
        name: 'Equipment E',
        components: ['Component X', 'Component Y', 'Component Z'],
        lastMaintenance: '2023-10-10',
        location: 'Plant C',
        status: 'Inactive',
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
];



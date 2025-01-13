
export interface MaintenanceHistory {
    date: string;
    description: string;
    technician: string;
}

export interface Equipment {
    id: number;
    name: string;
    components: string[];
    lastMaintenance: string;
    location: string;
    status: string;
    history: MaintenanceHistory[];
}
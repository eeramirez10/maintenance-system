export interface Failure {
  failureId: number;
  description: string;
  reportedDate: string;
  status: string; // Ejemplo: 'Pending', 'Resolved'
}

export interface ScheduledMaintenance {
  maintenanceId: number;
  description: string;
  scheduledDate: string;
}

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
  maintenancePercentage: number; // Porcentaje de mantenimiento actual
  activeFailures: Failure[]; // Lista de fallas activas
  scheduledMaintenances: ScheduledMaintenance[]; // Lista de mantenimientos programados
  history: MaintenanceHistory[]; // Historial de mantenimientos
}
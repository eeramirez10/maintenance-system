

export type CriteriaType = 'number' | 'date';

/** Estructura para los criterios de mantenimiento */
export interface RoutineCriteria {
  name: string;
  type: CriteriaType;
  currentValue: number | string;
  minValue?: number;
  maxValue?: number;
}

/**
 * Interfaz para las Rutinas (antes "ScheduledMaintenance")
 * Puede ser PREVENTIVO o CORRECTIVO.
 */
export interface Routine {
  description: string;
  routineType?: 'preventivo' | 'correctivo';

  /** Criterios (fechas, valores numéricos, etc.) */
  criteria?: RoutineCriteria;

  // ----- PREVENTIVO -----
  priorityPercentage?: number;
  estimatedTime?: number;    // tiempo estimado (min)
  actualTime?: number;       // tiempo real (min)
  plannedDowntime?: number;  // Paro planeado (min)
  actualDowntime?: number;   // Paro real (min) - preventivo

  // ----- CORRECTIVO -----
  failureCategory?: string;
  failureDescription?: string;
  repairCost?: number;
  repairTime?: number;       // tiempo de reparación (min)

  /**
   * Fechas para saber el tiempo fuera de operación en el correctivo
   * (para calcular la diferencia entre inicio y fin de la falla).
   */
  failureStartDate?: string; // Fecha de inicio de la falla (yyyy-mm-dd)
  failureEndDate?: string;   // Fecha de reparación (yyyy-mm-dd)

  // ----- Fotos -----
  photoBefore?: string;
  photoAfter?: string;
}

/** Campos personalizados de un equipo */
export interface CustomField {
  name: string;
  value: string;
}

/** 
 * Interfaz para los equipos
 *  - Se elimina la propiedad "maintenances"
 *  - Solo se conserva "routines"
 */
export interface Equipment {
  id: number;
  name: string;
  type: string;
  image: string;
  customFields: CustomField[];

  routines: Routine[];  // Listado de rutinas (preventivas o correctivas)

  /** Estado del equipo (operación o falla) */
  status: 'operacion' | 'falla';
  isActive: boolean;
  createdBy: number;
  updatedBy: number;
}

// reportHelpers.ts
import { Equipment, Routine } from '../interface/equipment.type';
import * as XLSX from 'xlsx';

// (Opcional) puedes usar date-fns, dayjs o tu propia lógica:
function calculateFailureDowntime(routine: Routine): number {
  // Si no hay fechas, no hay paro
  if (!routine.failureStartDate || !routine.failureEndDate) return 0;
  const start = new Date(routine.failureStartDate).getTime();
  const end = new Date(routine.failureEndDate).getTime();
  if (end <= start) return 0;

  // Retorna la diferencia en minutos
  return (end - start) / (1000 * 60);
}

/**
 * Genera todos los datos requeridos para:
 * 1) Reporte por tipo de rutina
 * 2) Reporte por equipo
 * 3) Reporte de fallas (por categoría)
 * 4) Suma de paros correctivos (global)
 * 5) Reporte de preventivos (programado vs real), por equipo
 */
export function generateAllReports(equipments: Equipment[]) {
  // Para el reporte 1 (cuántas rutinas preventivas vs. correctivas):
  let totalPreventiveCount = 0;
  let totalCorrectiveCount = 0;

  // Para el reporte por equipo (2) y (4) y parte de (5)
  // Usaremos un objeto indexado por "id" para ir acumulando
  const reportByEquipment: Record<
    number,
    {
      equipmentName: string;
      totalPreventive: number;
      totalCorrective: number;
      totalFailures: number; // # de rutinas correctivas
      totalCorrectiveDowntime: number; // suma de paros correctivos (min)
      totalPreventivePlanned: number;  // planeado
      totalPreventiveActual: number;   // real
    }
  > = {};

  // Para el reporte de fallas (3), agruparemos por categoría
  // { [category]: { count: number, totalDowntime: number } }
  const failuresByCategory: Record<
    string,
    {
      count: number;
      totalDowntime: number;
    }
  > = {};

  // Recorremos equipos
  equipments.forEach((equipment) => {
    // Inicializamos info para "reportByEquipment"
    reportByEquipment[equipment.id] = {
      equipmentName: equipment.name,
      totalPreventive: 0,
      totalCorrective: 0,
      totalFailures: 0,
      totalCorrectiveDowntime: 0,
      totalPreventivePlanned: 0,
      totalPreventiveActual: 0,
    };

    // Recorremos rutinas del equipo
    equipment.routines.forEach((routine) => {
      // 1) Contar preventivos/correctivos (Reporte Global)
      if (routine.routineType === 'preventivo') {
        totalPreventiveCount++;
        reportByEquipment[equipment.id].totalPreventive++;

        // (5) Suma de tiempos programado vs. real
        if (routine.plannedDowntime) {
          reportByEquipment[equipment.id].totalPreventivePlanned += routine.plannedDowntime;
        }
        if (routine.actualDowntime) {
          reportByEquipment[equipment.id].totalPreventiveActual += routine.actualDowntime;
        }
      } else if (routine.routineType === 'correctivo') {
        totalCorrectiveCount++;
        reportByEquipment[equipment.id].totalCorrective++;
        reportByEquipment[equipment.id].totalFailures++;

        // (4) Calcular la suma de paros correctivos
        const downtime = calculateFailureDowntime(routine);
        reportByEquipment[equipment.id].totalCorrectiveDowntime += downtime;

        // (3) Agrupar por categoría de falla
        const cat = routine.failureCategory || 'SinCategoría';
        if (!failuresByCategory[cat]) {
          failuresByCategory[cat] = { count: 0, totalDowntime: 0 };
        }
        failuresByCategory[cat].count++;
        failuresByCategory[cat].totalDowntime += downtime;
      }
    });
  });

  // 1) "Reporte por tipo de rutina" en formato array para la tabla
  const routineTypeData = [
    {
      key: 'preventivo',
      routineType: 'Preventivo',
      count: totalPreventiveCount,
    },
    {
      key: 'correctivo',
      routineType: 'Correctivo',
      count: totalCorrectiveCount,
    },
  ];

  // 2) "Reporte por equipo": convertimos reportByEquipment en array
  const byEquipmentData = Object.values(reportByEquipment).map((item, idx) => ({
    key: idx,
    ...item,
  }));

  // 3) "Reporte de fallas" (por categoría)
  // Convertimos failuresByCategory a array
  const failuresByCategoryData = Object.entries(failuresByCategory).map(
    ([category, info], idx) => ({
      key: idx,
      category,
      count: info.count,
      totalDowntime: info.totalDowntime,
    })
  );

  // 4) "Suma de paros correctivos (global)"
  // Podríamos sumar de nuevo, o derivarlo de byEquipmentData
  let totalCorrectiveDowntimeSum = 0;
  byEquipmentData.forEach((eq) => {
    totalCorrectiveDowntimeSum += eq.totalCorrectiveDowntime;
  });

  // 5) "Reporte de preventivos (programado vs real)"
  // Lo podemos mostrar a nivel de equipo
  // byEquipmentData ya tiene totalPreventivePlanned y totalPreventiveActual
  // Creamos un array para la tabla
  const preventiveDowntimeData = byEquipmentData.map((eq, idx) => ({
    key: idx,
    equipmentName: eq.equipmentName,
    totalPlanned: eq.totalPreventivePlanned,
    totalActual: eq.totalPreventiveActual,
    difference: eq.totalPreventiveActual - eq.totalPreventivePlanned,
  }));

  return {
    // 1. Por tipo de rutina (global)
    routineTypeData,
    // 2. Por equipo
    byEquipmentData,
    // 3. Por fallas (categoría)
    failuresByCategoryData,
    // 4. Suma total de paros correctivos (global)
    totalCorrectiveDowntimeSum,
    // 5. Preventivos (programado vs real) por equipo
    preventiveDowntimeData,
  };
}

/**
 * Función genérica para exportar un array de objetos a Excel.
 */
export function exportToExcel(data: any[], filename: string) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
  XLSX.writeFile(workbook, filename);
}

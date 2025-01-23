import { Maintenance } from "../types";

// export const calculateRemaining = (criteria: Maintenance['criteria']) => {
//   if (!criteria) return 'No definido';

//   if (criteria.type === 'date') {
//     const today = new Date();
//     const targetDate = new Date(criteria.currentValue as string);
//     const difference = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
//     return difference > 0
//       ? `Faltan ${difference} días`
//       : `Vencido hace ${Math.abs(difference)} días`;
//   } else if (criteria.type === 'number') {
//     if (!criteria.maxValue || typeof criteria.currentValue !== 'number') return 'Rango no definido';
//     const remaining = criteria.maxValue - criteria.currentValue;
//     return remaining > 0 ? `Faltan ${remaining}` : `Excedido por ${Math.abs(remaining)}`;
//   }

//   return 'No calculable';
// };

// export const calculateRemaining = (criteria: {
//   type: 'date' | 'number';
//   currentValue?: number | string;
//   minValue?: number;
//   maxValue?: number;
// }): number | null => {
//   if (!criteria || !criteria.currentValue) return null;

//   if (criteria.type === 'date') {
//     const currentDate = new Date();
//     const targetDate = new Date(criteria.currentValue as string);
//     const diffInMs = targetDate.getTime() - currentDate.getTime();
//     return Math.ceil(diffInMs / (1000 * 60 * 60 * 24)); // Días restantes
//   }

//   if (criteria.type === 'number' && criteria.maxValue !== undefined) {
//     return criteria.maxValue - (criteria.currentValue as number);
//   }

//   return null;
// };


export const calculateRemaining = (criteria: {
  type: 'date' | 'number';
  currentValue?: number | string;
  maxValue?: number;
}): number | null => {
  if (!criteria || !criteria.currentValue) return null;

  if (criteria.type === 'date') {
    const currentDate = new Date();
    const targetDate = new Date(criteria.currentValue as string);
    const diffInMs = targetDate.getTime() - currentDate.getTime();
    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24)); // Días restantes
  }

  if (criteria.type === 'number' && criteria.maxValue !== undefined) {
    const currentValue = criteria.currentValue as number;
    const maxValue = criteria.maxValue;
    return (currentValue / maxValue) * 100; // Porcentaje de uso
  }

  return null;
};
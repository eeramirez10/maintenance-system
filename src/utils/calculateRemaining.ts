import { Maintenance } from "../types";

export const calculateRemaining = (criteria: Maintenance['criteria']) => {
  if (!criteria) return 'No definido';

  if (criteria.type === 'date') {
    const today = new Date();
    const targetDate = new Date(criteria.currentValue as string);
    const difference = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return difference > 0
      ? `Faltan ${difference} días`
      : `Vencido hace ${Math.abs(difference)} días`;
  } else if (criteria.type === 'number') {
    if (!criteria.maxValue || typeof criteria.currentValue !== 'number') return 'Rango no definido';
    const remaining = criteria.maxValue - criteria.currentValue;
    return remaining > 0 ? `Faltan ${remaining}` : `Excedido por ${Math.abs(remaining)}`;
  }

  return 'No calculable';
};

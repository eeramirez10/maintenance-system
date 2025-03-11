// useRoutineGroup.ts
import { useState } from 'react';
import { RoutineGroup, Step, RoutineCriteria } from '../interface/equipment.type';

// Ejemplo de un hook que maneja un RoutineGroup con múltiples Steps.
export function useRoutineGroup() {
  const [routineGroup, setRoutineGroup] = useState<RoutineGroup>({
    name: '',
    description: '',
    creationDate: '',
    steps: [],
  });

  /**
   * Actualiza un campo a nivel de RoutineGroup 
   * (por ejemplo name, description, creationDate).
   */
  function handleGroupChange(field: keyof RoutineGroup, value: string) {
    setRoutineGroup((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleChange(field: keyof RoutineGroup, value: string) {
    setRoutineGroup((prev) => ({ ...prev, [field]: value }));
  }

  function resetGroup() {
    setRoutineGroup({
      name: '',
      description: '',
      creationDate: '',
      steps: [],
    });
  }



  /**
   * Añade un nuevo Step al array steps.
   * Ejemplo de Step inicial
   */
  function addStep() {
    const newStep: Step = {
      stepDescription: '',
      routineType: 'preventivo',
      criteria: {
        name: '',
        type: 'number',
        currentValue: 0,
      },
    };
    setRoutineGroup((prev) => ({
      ...prev,
      steps: [...prev.steps, newStep],
    }));
  }

  /**
   * Elimina un Step por índice
   */
  function removeStep(index: number) {
    setRoutineGroup((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  }

  /**
   * Maneja un cambio en un campo del Step (ej: routineType, stepDescription, etc.) 
   * Recibe el índice del step y el nombre del campo.
   */
  function handleStepChange(index: number, field: keyof Step, value: any) {
    setRoutineGroup((prev) => {
      const updatedSteps = [...prev.steps];
      updatedSteps[index] = {
        ...updatedSteps[index],
        [field]: value,
      };
      return { ...prev, steps: updatedSteps };
    });
  }

  /**
   * Maneja un cambio en el campo 'criteria' de un Step
   * (por ejemplo, minValue, maxValue, currentValue, etc.).
   */
  function handleCriteriaChange(index: number, criteriaField: keyof RoutineCriteria, value: any) {
    setRoutineGroup((prev) => {
      const updatedSteps = [...prev.steps];
      const currentStep = { ...updatedSteps[index] };

      if (!currentStep.criteria) {
        currentStep.criteria = {
          name: '',
          type: 'number',
          currentValue: 0,
        };
      }
      currentStep.criteria[criteriaField] = value;
      updatedSteps[index] = currentStep;
      return { ...prev, steps: updatedSteps };
    });
  }

  /**
   * Restaura todo a su estado inicial
   */
  function resetRoutineGroupValues() {
    setRoutineGroup({
      name: '',
      description: '',
      creationDate: '',
      steps: [
        {
          stepDescription: '',
          routineType: 'preventivo',
          criteria: {
            name: '',
            type: 'number',
            currentValue: 0,
          },
        },
      ],
    });
  }

  return {
    routineGroup,
    handleGroupChange,
    handleStepChange,
    handleCriteriaChange,
    addStep,
    removeStep,
    resetRoutineGroupValues,
    handleChange,
    resetGroup
  };
}

// AddStepForm.tsx
import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
  Button,
  message,
} from 'antd';
import { Step } from '../interface/equipment.type';

import { useStep } from '../hooks/useStep';

const { Option } = Select;

interface AddStepFormProps {
  onSave: (step: Step) => void;
  onCancel: () => void;
}

const AddStepForm: React.FC<AddStepFormProps> = ({ onSave, onCancel }) => {
  const { handleStepChange, step, resetStepValues } = useStep();

  const isPreventive = step.routineType === 'preventivo';
  const isCorrective = step.routineType === 'correctivo';

  function validateRoutine(step: Step): boolean {
    if (!step.stepDescription?.trim()) {
      message.error('La descripción es obligatoria');
      return false;
    }
    if (!step.routineType) {
      message.error('El tipo de rutina es obligatorio');
      return false;
    }
    if (!step.criteria?.name?.trim()) {
      message.error('El nombre del criterio es obligatorio');
      return false;
    }
    if (step.routineType === 'correctivo') {
      if (!step.failureStartDate) {
        message.error('La fecha de inicio de la falla es obligatoria');
        return false;
      }
      if (!step.failureEndDate) {
        message.error('La fecha de reparación es obligatoria');
        return false;
      }
    }
    if (step.routineType === 'preventivo') {
      if (!step.estimatedTime || step.estimatedTime <= 0) {
        message.error('El tiempo estimado (min) es obligatorio en preventivos');
        return false;
      }
    }
    return true;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRoutine(step)) return;
    onSave(step);
    message.success('Guardado correctamente');
    resetStepValues();
  };

  return (
    <form
      onSubmit={handleSubmit}
      // Usamos grid con 2 columnas y un espacio horizontal/vertical (gap)
      className="grid grid-cols-2 gap-4"
    >
      {/* Descripción */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Descripción</label>
        <input
          type="text"
          placeholder="Descripción de la rutina"
          value={step.stepDescription}
          onChange={(e) => handleStepChange('stepDescription', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      {/* Tipo de Rutina */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Tipo de Rutina</label>
        <Select
          value={step.routineType || 'preventivo'}
          onChange={(value) => handleStepChange('routineType', value)}
          style={{ width: '100%' }}
        >
          <Option value="preventivo">Preventivo</Option>
          <Option value="correctivo">Correctivo</Option>
        </Select>
      </div>

      {/* Nombre del Criterio */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Nombre del Criterio</label>
        <input
          type="text"
          placeholder="Nombre del Criterio"
          value={step.criteria?.name || ''}
          onChange={(e) => handleStepChange('name', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      {/* Tipo de Criterio */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Tipo de Criterio</label>
        <select
          value={step.criteria?.type || 'number'}
          onChange={(e) =>
            handleStepChange('type', e.target.value as 'number' | 'date')
          }
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="number">Numérico</option>
          <option value="date">Fecha</option>
        </select>
      </div>

      {/* Fecha de Inspección (si es date) */}
      {step.criteria?.type === 'date' && (
        // col-span-2: ocupa las 2 columnas y se ve ancho
        <div className="col-span-2 flex flex-col">
          <label className="text-gray-700 font-semibold">Fecha de Inspección</label>
          <input
            type="date"
            value={step.criteria.currentValue as string}
            onChange={(e) => handleStepChange('currentValue', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded mt-2"
          />
        </div>
      )}

      {/* Campos numéricos (si es number) */}
      {step.criteria?.type === 'number' && (
        <div className="col-span-2 grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Valor Actual</label>
            <input
              type="number"
              placeholder="Valor Actual"
              value={step.criteria?.currentValue || ''}
              onChange={(e) =>
                handleStepChange('currentValue', Number(e.target.value))
              }
              className="px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Valor Mínimo</label>
            <input
              type="number"
              placeholder="Valor Mínimo"
              value={step.criteria?.minValue || ''}
              onChange={(e) =>
                handleStepChange('minValue', Number(e.target.value))
              }
              className="px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Valor Máximo</label>
            <input
              type="number"
              placeholder="Valor Máximo"
              value={step.criteria?.maxValue || ''}
              onChange={(e) =>
                handleStepChange('maxValue', Number(e.target.value))
              }
              className="px-4 py-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      )}

      {/* PREVENTIVO */}
      {isPreventive && (
        <>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">
              Porcentaje de Prioridad (%)
            </label>
            <input
              type="number"
              value={step.priorityPercentage || ''}
              onChange={(e) =>
                handleStepChange('priorityPercentage', Number(e.target.value))
              }
              className="px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">
              Tiempo Estimado (min)
            </label>
            <input
              type="number"
              value={step.estimatedTime || ''}
              onChange={(e) =>
                handleStepChange('estimatedTime', Number(e.target.value))
              }
              className="px-4 py-2 border border-gray-300 rounded"
            />
          </div>
        </>
      )}

      {/* CORRECTIVO */}
      {isCorrective && (
        <>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">
              Categoría de Falla
            </label>
            <input
              type="text"
              placeholder="Mecánica, eléctrica, etc."
              value={step.failureCategory || ''}
              onChange={(e) =>
                handleStepChange('failureCategory', e.target.value)
              }
              className="px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">
              Descripción de la Falla
            </label>
            <textarea
              placeholder="Descripción detallada de la falla"
              value={step.failureDescription || ''}
              onChange={(e) =>
                handleStepChange('failureDescription', e.target.value)
              }
              className="px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">
              Fecha de Inicio de la Falla
            </label>
            <input
              type="date"
              value={step.failureStartDate || ''}
              onChange={(e) =>
                handleStepChange('failureStartDate', e.target.value)
              }
              className="px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">
              Fecha de Reparación
            </label>
            <input
              type="date"
              value={step.failureEndDate || ''}
              onChange={(e) =>
                handleStepChange('failureEndDate', e.target.value)
              }
              className="px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">
              Tiempo de Reparación (min)
            </label>
            <input
              type="number"
              placeholder="Tiempo de reparación (min)"
              value={step.repairTime || ''}
              onChange={(e) =>
                handleStepChange('repairTime', Number(e.target.value))
              }
              className="px-4 py-2 border border-gray-300 rounded"
            />
          </div>
        </>
      )}

      {/* FOTOS */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">
          Foto Antes del Mantenimiento
        </label>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleStepChange('photoBefore', e.target.files[0].name);
            }
          }}
          className="px-4 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">
          Foto Después del Mantenimiento
        </label>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleStepChange('photoAfter', e.target.files[0].name);
            }
          }}
          className="px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      {/* Botón guardar en la parte inferior de la grilla (col-span-2) */}
      <div className="col-span-2 flex justify-end gap-4 mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default AddStepForm;

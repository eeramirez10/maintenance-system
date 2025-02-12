import React from 'react';
import { message, Select } from 'antd';
import { Routine } from '../interface/equipment.type';
import { useRoutine } from '../hooks/useRoutine';

const { Option } = Select;

interface RoutineFormProps {
  onSave: (routine: Routine) => void;
}

const RoutineForm: React.FC<RoutineFormProps> = ({ onSave }) => {
  const { handleRoutineChange, routine, resetRoutineValues } = useRoutine();

  const isPreventive = routine.routineType === 'preventivo';
  const isCorrective = routine.routineType === 'correctivo';

  function validateRoutine(routine: Routine): boolean {
    if (!routine.description?.trim()) {
      message.error('La descripción es obligatoria');
      return false;
    }
    if (!routine.routineType) {
      message.error('El tipo de rutina es obligatorio');
      return false;
    }
    if (!routine.criteria?.name?.trim()) {
      message.error('El nombre del criterio es obligatorio');
      return false;
    }
    if (routine.routineType === 'correctivo') {
      if (!routine.failureStartDate) {
        message.error('La fecha de inicio de la falla es obligatoria');
        return false;
      }
      if (!routine.failureEndDate) {
        message.error('La fecha de reparación es obligatoria');
        return false;
      }
    }
    if (routine.routineType === 'preventivo') {
      if (!routine.estimatedTime || routine.estimatedTime <= 0) {
        message.error('El tiempo estimado (min) es obligatorio en preventivos');
        return false;
      }
    }
    return true;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRoutine(routine)) return;
    onSave(routine);
    message.success('Guardado correctamente');
    resetRoutineValues();
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
          value={routine.description}
          onChange={(e) => handleRoutineChange('description', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      {/* Tipo de Rutina */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Tipo de Rutina</label>
        <Select
          value={routine.routineType || 'preventivo'}
          onChange={(value) => handleRoutineChange('routineType', value)}
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
          value={routine.criteria?.name || ''}
          onChange={(e) => handleRoutineChange('name', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      {/* Tipo de Criterio */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Tipo de Criterio</label>
        <select
          value={routine.criteria?.type || 'number'}
          onChange={(e) =>
            handleRoutineChange('type', e.target.value as 'number' | 'date')
          }
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="number">Numérico</option>
          <option value="date">Fecha</option>
        </select>
      </div>

      {/* Fecha de Inspección (si es date) */}
      {routine.criteria?.type === 'date' && (
        // col-span-2: ocupa las 2 columnas y se ve ancho
        <div className="col-span-2 flex flex-col">
          <label className="text-gray-700 font-semibold">Fecha de Inspección</label>
          <input
            type="date"
            value={routine.criteria.currentValue as string}
            onChange={(e) => handleRoutineChange('currentValue', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded mt-2"
          />
        </div>
      )}

      {/* Campos numéricos (si es number) */}
      {routine.criteria?.type === 'number' && (
        <div className="col-span-2 grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Valor Actual</label>
            <input
              type="number"
              placeholder="Valor Actual"
              value={routine.criteria?.currentValue || ''}
              onChange={(e) =>
                handleRoutineChange('currentValue', Number(e.target.value))
              }
              className="px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Valor Mínimo</label>
            <input
              type="number"
              placeholder="Valor Mínimo"
              value={routine.criteria?.minValue || ''}
              onChange={(e) =>
                handleRoutineChange('minValue', Number(e.target.value))
              }
              className="px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Valor Máximo</label>
            <input
              type="number"
              placeholder="Valor Máximo"
              value={routine.criteria?.maxValue || ''}
              onChange={(e) =>
                handleRoutineChange('maxValue', Number(e.target.value))
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
              value={routine.priorityPercentage || ''}
              onChange={(e) =>
                handleRoutineChange('priorityPercentage', Number(e.target.value))
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
              value={routine.estimatedTime || ''}
              onChange={(e) =>
                handleRoutineChange('estimatedTime', Number(e.target.value))
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
              value={routine.failureCategory || ''}
              onChange={(e) =>
                handleRoutineChange('failureCategory', e.target.value)
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
              value={routine.failureDescription || ''}
              onChange={(e) =>
                handleRoutineChange('failureDescription', e.target.value)
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
              value={routine.failureStartDate || ''}
              onChange={(e) =>
                handleRoutineChange('failureStartDate', e.target.value)
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
              value={routine.failureEndDate || ''}
              onChange={(e) =>
                handleRoutineChange('failureEndDate', e.target.value)
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
              value={routine.repairTime || ''}
              onChange={(e) =>
                handleRoutineChange('repairTime', Number(e.target.value))
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
              handleRoutineChange('photoBefore', e.target.files[0].name);
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
              handleRoutineChange('photoAfter', e.target.files[0].name);
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

export default RoutineForm;

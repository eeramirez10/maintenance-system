// CreateRoutineForm.tsx
import React from 'react';
import { Form, Input, DatePicker, Button, message } from 'antd';
import { useRoutineGroup } from '../hooks/useRoutineGroup';
import { RoutineGroup } from '../interface/equipment.type';
import moment from 'moment';

interface CreateRoutineFormProps {
  onSave: (routine: RoutineGroup) => void;
}

const CreateRoutineForm: React.FC<CreateRoutineFormProps> = ({ onSave }) => {
  const { routineGroup, handleChange, resetGroup } = useRoutineGroup();
  const [form] = Form.useForm();

  /**
   * Cuando el usuario hace submit, validamos con Ant Design
   * y luego llamamos a onSave(routineGroup).
   */
  const handleFinish = (values: any) => {
    // Asignamos los campos al hook
    handleChange('name', values.name || '');
    handleChange('description', values.description || '');
    // Convertimos la fecha a string (YYYY-MM-DD)
    const dateString = values.creationDate
      ? values.creationDate.format('YYYY-MM-DD')
      : '';
    handleChange('creationDate', dateString);

    // Verificamos que no falte nada
    if (!routineGroup.name.trim()) {
      message.error('El nombre de la rutina es obligatorio');
      return;
    }
    if (!routineGroup.description.trim()) {
      message.error('La descripción es obligatoria');
      return;
    }
    if (!routineGroup.creationDate) {
      message.error('La fecha de creación es obligatoria');
      return;
    }

    // Llamamos a onSave y reseteamos
    onSave({
      ...routineGroup,
      // En caso de que quieras forzar
      name: values.name,
      description: values.description,
      creationDate: dateString,
    });
    // resetGroup();
    form.resetFields()
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      onFinish={handleFinish}
      style={{ maxWidth: 500 }}
    >
      <Form.Item
        label="Nombre de la Rutina"
        name="name"
        rules={[{ required: true, message: 'Ingrese el nombre de la rutina' }]}
        initialValue={routineGroup.name}
      >
        <Input
          placeholder="Ej. Mantenimiento anual"
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Descripción de la Rutina"
        name="description"
        rules={[{ required: true, message: 'Ingrese la descripción' }]}
        initialValue={routineGroup.description}
      >
        <Input.TextArea
          rows={3}
          placeholder="Ej. Actividades generales de mantenimiento..."
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Fecha de Creación"
        name="creationDate"
        rules={[{ required: true, message: 'Seleccione la fecha de creación' }]}
        // Convierte la fecha del hook a Moment si existe
        initialValue={
          routineGroup.creationDate
            ? moment(routineGroup.creationDate, 'YYYY-MM-DD')
            : null
        }
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Crear Rutina
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateRoutineForm;

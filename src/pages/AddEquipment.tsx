// src/components/AddEquipment.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Space,
  Card,
  InputNumber,
  Select,
  Divider,
} from 'antd';
import {
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Equipment, CustomField, Maintenance, ScheduledMaintenance } from '../types';
import { useEquipments } from '../hooks/useEquipments';

const { Option } = Select;

const AddEquipment: React.FC = () => {
  const navigate = useNavigate();
  const { handleAddEquipment } = useEquipments();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [scheduledMaintenances, setScheduledMaintenances] = useState<ScheduledMaintenance[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Manejo de Imagen
  const handleImageChange = (info: any) => {
    const file = info.file;

    console.log(file)

    if (!file) return;

    // Validación de formato
    const validFormats = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validFormats.includes(file.type)) {
      message.error('Solo se permiten imágenes en formato JPEG, JPG o PNG.');
      return;
    }

    // Validación de tamaño (5 MB máximo)
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
      message.error('El tamaño de la imagen no puede superar los 5 MB.');
      return;
    }

    // Si pasa las validaciones, leer la imagen
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setErrorMessage(null); // Limpiar errores previos
    };
    reader.readAsDataURL(file);
  };

  // Manejo de Campos Personalizados
  const handleAddField = () => {
    setCustomFields([...customFields, { name: '', value: '' }]);
  };

  const handleFieldChange = (index: number, field: keyof CustomField, value: string) => {
    const updatedFields = [...customFields];
    updatedFields[index][field] = value;
    setCustomFields(updatedFields);
  };

  const handleDeleteField = (index: number) => {
    const updatedFields = [...customFields];
    updatedFields.splice(index, 1);
    setCustomFields(updatedFields);
  };

  // Manejo de Mantenimientos Realizados
  const handleAddMaintenance = () => {
    setMaintenances([
      ...maintenances,
      {
        description: '',
        criteria: {
          name: '',
          type: 'number',
          currentValue: 0,
          minValue: undefined,
          maxValue: undefined,
        },
      },
    ]);
  };

  const handleMaintenanceChange = (
    index: number,
    field: keyof Maintenance['criteria'] | 'description',
    value: string | number | undefined
  ) => {
    const updatedMaintenances = [...maintenances];
    if (field === 'description') {
      updatedMaintenances[index].description = value as string;
    } else if (updatedMaintenances[index].criteria) {
      updatedMaintenances[index].criteria![field] = value;
    }
    setMaintenances(updatedMaintenances);
  };

  const handleDeleteMaintenance = (index: number) => {
    const updatedMaintenances = [...maintenances];
    updatedMaintenances.splice(index, 1);
    setMaintenances(updatedMaintenances);
  };

  // Manejo de Mantenimientos Programados
  const handleAddScheduled = () => {
    setScheduledMaintenances([
      ...scheduledMaintenances,
      {
        description: '',
        criteria: {
          name: '',
          type: 'number',
          currentValue: 0,
          minValue: undefined,
          maxValue: undefined,
        },
      },
    ]);
  };

  const handleScheduledChange = (
    index: number,
    field: keyof ScheduledMaintenance['criteria'] | 'description',
    value: string | number | undefined
  ) => {
    const updatedScheduled = [...scheduledMaintenances];
    if (field === 'description') {
      updatedScheduled[index].description = value as string;
    } else if (updatedScheduled[index].criteria) {
      updatedScheduled[index].criteria![field] = value;
    }
    setScheduledMaintenances(updatedScheduled);
  };

  const handleDeleteScheduled = (index: number) => {
    const updatedScheduled = [...scheduledMaintenances];
    updatedScheduled.splice(index, 1);
    setScheduledMaintenances(updatedScheduled);
  };

  // Guardar Equipo
  const handleSave = () => {
    if (!name.trim()) {
      setErrorMessage('El nombre del equipo es obligatorio.');
      return;
    }
    if (!type.trim()) {
      setErrorMessage('El tipo de equipo es obligatorio.');
      return;
    }
    if (!image) {
      setErrorMessage('La imagen del equipo es obligatoria.');
      return;
    }

    const newEquipment: Equipment = {
      id: Date.now(), // Generar un ID único
      name,
      type,
      image,
      customFields,
      maintenances,
      scheduledMaintenances,
    };
    handleAddEquipment(newEquipment);
    message.success('Equipo agregado exitosamente.');
    navigate('/');
  };

  return (
    <Card title="Agregar Equipo" bordered={false} style={{ maxWidth: 800, margin: 'auto' }}>
      {errorMessage && (
        <div style={{ marginBottom: 16, padding: '12px', backgroundColor: '#fff1f0', color: '#cf1322', border: '1px solid #ffa39e', borderRadius: '4px' }}>
          {errorMessage}
        </div>
      )}
      <Form layout="vertical">
        <Form.Item label="Nombre del Equipo" required>
          <Input
            placeholder="Nombre del Equipo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Tipo de Equipo" required>
          <Input
            placeholder="Tipo de Equipo"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Subir Imagen" >
          <Upload
            name="image"
            listType="picture"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleImageChange}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Click para subir</Button>
          </Upload>
          {image && (
            <img
              src={image}
              alt="Previsualización"
              style={{ width: '100%', maxHeight: 300, objectFit: 'cover', marginTop: 16 }}
            />
          )}
        </Form.Item>

        <Divider orientation="left">Campos Personalizados</Divider>
        {customFields.map((field, index) => (
          <Space key={index} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
            <Form.Item
              label={`Nombre del Campo ${index + 1}`}
              required
              style={{ margin: 0 }}
            >
              <Input
                placeholder="Nombre del Campo"
                value={field.name}
                onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label={`Valor del Campo ${index + 1}`}
              required
              style={{ margin: 0 }}
            >
              <Input
                placeholder="Valor del Campo"
                value={field.value}
                onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
              />
            </Form.Item>
            <Button
              type="danger"
              icon={<MinusCircleOutlined />}
              onClick={() => handleDeleteField(index)}
            />
          </Space>
        ))}
        <Form.Item>
          <Button type="dashed" onClick={handleAddField} block icon={<PlusOutlined />}>
            Agregar Campo
          </Button>
        </Form.Item>

        {/* <Divider orientation="left">Mantenimientos Realizados</Divider>
        {maintenances.map((maintenance, index) => (
          <Card key={index} type="inner" title={`Mantenimiento ${index + 1}`} style={{ marginBottom: 16 }}>
            <Form.Item label="Descripción del Mantenimiento" required>
              <Input
                placeholder="Descripción del Mantenimiento"
                value={maintenance.description}
                onChange={(e) => handleMaintenanceChange(index, 'description', e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Tipo de Criterio" required>
              <Select
                value={maintenance.criteria.type}
                onChange={(value) => handleMaintenanceChange(index, 'type', value)}
                placeholder="Selecciona el tipo de criterio"
              >
                <Option value="number">Criterio Numérico</Option>
                <Option value="date">Fecha</Option>
              </Select>
            </Form.Item>
            {maintenance.criteria.type === 'date' ? (
              <Form.Item label="Fecha de Inspección" required>
                <Input
                  type="date"
                  value={maintenance.criteria.currentValue as string}
                  onChange={(e) => handleMaintenanceChange(index, 'currentValue', e.target.value)}
                />
              </Form.Item>
            ) : (
              <>
                <Form.Item label="Valor Actual" required>
                  <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    value={maintenance.criteria.currentValue as number}
                    onChange={(value) => handleMaintenanceChange(index, 'currentValue', value)}
                  />
                </Form.Item>
                <Form.Item label="Valor Mínimo" required>
                  <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    value={maintenance.criteria.minValue}
                    onChange={(value) => handleMaintenanceChange(index, 'minValue', value)}
                  />
                </Form.Item>
                <Form.Item label="Valor Máximo" required>
                  <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    value={maintenance.criteria.maxValue}
                    onChange={(value) => handleMaintenanceChange(index, 'maxValue', value)}
                  />
                </Form.Item>
              </>
            )}
            <Button
              type="danger"
              icon={<MinusCircleOutlined />}
              onClick={() => handleDeleteMaintenance(index)}
              style={{ marginTop: 16 }}
            >
              Eliminar Mantenimiento
            </Button>
          </Card>
        ))}
        <Form.Item>
          <Button type="dashed" onClick={handleAddMaintenance} block icon={<PlusOutlined />}>
            Agregar Mantenimiento
          </Button>
        </Form.Item>

        <Divider orientation="left">Mantenimientos Programados</Divider>
        {scheduledMaintenances.map((scheduled, index) => (
          <Card key={index} type="inner" title={`Mantenimiento Programado ${index + 1}`} style={{ marginBottom: 16 }}>
            <Form.Item label="Descripción del Mantenimiento Programado" required>
              <Input
                placeholder="Descripción del Mantenimiento Programado"
                value={scheduled.description}
                onChange={(e) => handleScheduledChange(index, 'description', e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Tipo de Criterio" required>
              <Select
                value={scheduled.criteria.type}
                onChange={(value) => handleScheduledChange(index, 'type', value)}
                placeholder="Selecciona el tipo de criterio"
              >
                <Option value="number">Criterio Numérico</Option>
                <Option value="date">Fecha</Option>
              </Select>
            </Form.Item>
            {scheduled.criteria.type === 'date' ? (
              <Form.Item label="Fecha de Inspección" required>
                <Input
                  type="date"
                  value={scheduled.criteria.currentValue as string}
                  onChange={(e) => handleScheduledChange(index, 'currentValue', e.target.value)}
                />
              </Form.Item>
            ) : (
              <>
                <Form.Item label="Valor Actual" required>
                  <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    value={scheduled.criteria.currentValue as number}
                    onChange={(value) => handleScheduledChange(index, 'currentValue', value)}
                  />
                </Form.Item>
                <Form.Item label="Valor Mínimo" required>
                  <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    value={scheduled.criteria.minValue}
                    onChange={(value) => handleScheduledChange(index, 'minValue', value)}
                  />
                </Form.Item>
                <Form.Item label="Valor Máximo" required>
                  <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    value={scheduled.criteria.maxValue}
                    onChange={(value) => handleScheduledChange(index, 'maxValue', value)}
                  />
                </Form.Item>
              </>
            )}
            <Button
              type="danger"
              icon={<MinusCircleOutlined />}
              onClick={() => handleDeleteScheduled(index)}
              style={{ marginTop: 16 }}
            >
              Eliminar Mantenimiento Programado
            </Button>
          </Card>
        ))}
        <Form.Item>
          <Button type="dashed" onClick={handleAddScheduled} block icon={<PlusOutlined />}>
            Agregar Mantenimiento Programado
          </Button>
        </Form.Item> */}

        <Form.Item>
          <Button type="primary" onClick={handleSave} block>
            Guardar Equipo
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddEquipment;

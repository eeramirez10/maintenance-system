// src/components/EquipmentDetails.tsx
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Table, Button, Modal, Badge, message, Space } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Equipment, Component } from '../types';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import { calculateRemaining } from '../utils/calculateRemaining';
import { useEquipments } from '../hooks/useEquipments';
import { useUser } from '../hooks/useUser';
import mockUsers from '../mocks/users';

const { confirm } = Modal;

interface EquipmentDetailsProps {
  components: Component[];
  onDeleteEquipment: (id: number) => void;
}

const EquipmentDetails: React.FC<EquipmentDetailsProps> = ({ components, onDeleteEquipment }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { equipments } = useEquipments();
  const { user } = useUser(); // Obtener el usuario autenticado
  const equipment = equipments.find((eq) => eq.id === Number(id));

  if (!equipment) {
    return (
      <Card>
        <p>Equipo no encontrado.</p>
      </Card>
    );
  }

  // Función para obtener el nombre del usuario por ID
  const getUserName = (userId: number) => {
    const foundUser = mockUsers.find((u) => u.id === userId);
    return foundUser ? foundUser.name : 'Desconocido';
  };

  // Filtrar componentes relacionados con este equipo
  const relatedComponents = components.filter(
    (component) => component.relatedEquipmentId === equipment.id
  );

  // Manejar la eliminación del equipo con confirmación
  const handleDeleteEquipment = () => {
    confirm({
      title: '¿Estás seguro de que deseas eliminar este equipo?',
      icon: <ExclamationCircleOutlined />,
      content: 'Esta acción no se puede deshacer.',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        onDeleteEquipment(equipment.id);
        message.success('Equipo eliminado exitosamente.');
        navigate('/equipments'); // Redirige a la página principal después de eliminar
      },
      onCancel() {
        // Acción en caso de cancelar
      },
    });
  };

  // Configuración de columnas para la tabla de componentes relacionados
  const componentColumns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: Component) => (
        <Space size="middle">
          <Link to={`/component/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />} size="small">
              Ver Componente
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  // Configuración de columnas para mantenimientos realizados
  const maintenanceColumns = [
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Criterio',
      dataIndex: ['criteria', 'name'],
      key: 'criteria',
      render: (text: any) => text || 'No definido',
    },
    {
      title: 'Valor Actual',
      dataIndex: ['criteria', 'currentValue'],
      key: 'currentValue',
      render: (value: any, record: any) =>
        record.criteria?.type === 'date' ? value : record.criteria?.currentValue || 'No definido',
    },
  ];

  // Configuración de columnas para mantenimientos programados
  const scheduledMaintenanceColumns = [
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Criterio',
      dataIndex: ['criteria', 'name'],
      key: 'criteria',
      render: (text: any) => text || 'No definido',
    },
    {
      title: 'Valor Actual',
      dataIndex: ['criteria', 'currentValue'],
      key: 'currentValue',
      render: (value: any, record: any) =>
        record.criteria?.type === 'date' ? value : record.criteria?.currentValue || 'No definido',
    },
    {
      title: 'Rango',
      dataIndex: ['criteria', 'minValue'],
      key: 'range',
      render: (_: any, record: any) =>
        record.criteria?.type === 'number'
          ? `Min: ${record.criteria.minValue || 'N/A'}, Max: ${record.criteria.maxValue || 'N/A'}`
          : '-',
    },
    {
      title: 'Estado',
      dataIndex: 'criteria',
      key: 'status',
      render: (criteria: any) => calculateRemaining(criteria),
    },
  ];

  return (
    <Card
      title={equipment.name}
      cover={
        equipment.image ? (
          <img
            alt={equipment.name}
            src={equipment.image}
            style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
          />
        ) : null
      }
      extra={
        <Space>
          {(user?.role === 'admin' || user?.role === 'operador') && (
            <Link to={`/edit-equipment/${equipment.id}`}>
              <Button type="primary" icon={<EditOutlined />}>
                Editar
              </Button>
            </Link>
          )}
          {user?.role === 'admin' && (
            <Button type="primary" danger icon={<DeleteOutlined />} onClick={handleDeleteEquipment}>
              Eliminar
            </Button>
          )}
        </Space>
      }
      style={{ marginBottom: '20px' }}
    >
      {/* Información General del Equipo */}
      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item label="Tipo">{equipment.type}</Descriptions.Item>
        <Descriptions.Item label="Estado">
          <Badge
            status={equipment.isActive ? 'success' : 'error'}
            text={equipment.isActive ? 'Activo' : 'Inactivo'}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Creado Por">{getUserName(equipment.createdBy)}</Descriptions.Item>
        <Descriptions.Item label="Última Edición Por">{getUserName(equipment.updatedBy)}</Descriptions.Item>
        {/* Agrega más campos según sea necesario */}
      </Descriptions>

      {/* Campos Personalizados */}
      <Card title="Campos Personalizados" style={{ marginTop: '20px' }}>
        {equipment.customFields.length > 0 ? (
          <Descriptions bordered column={1} size="small">
            {equipment.customFields.map((field, index) => (
              <Descriptions.Item label={field.name} key={index}>
                {field.value}
              </Descriptions.Item>
            ))}
          </Descriptions>
        ) : (
          <p>No hay campos personalizados registrados.</p>
        )}
      </Card>

      {/* Componentes Relacionados */}
      <Card title="Componentes Relacionados" style={{ marginTop: '20px' }}>
        {relatedComponents.length > 0 ? (
          <Table
            columns={componentColumns}
            dataSource={relatedComponents}
            rowKey="id"
            pagination={false}
            bordered
          />
        ) : (
          <p>No hay componentes relacionados.</p>
        )}
      </Card>

      {/* Mantenimientos Realizados */}
      <Card title="Mantenimientos Realizados" style={{ marginTop: '20px' }}>
        {equipment.maintenances?.length > 0 ? (
          <Table
            columns={maintenanceColumns}
            dataSource={equipment.maintenances}
            rowKey={(record) => record.id || record.description} // Ajusta según la estructura de tus mantenimientos
            pagination={false}
            bordered
          />
        ) : (
          <p>No hay mantenimientos registrados.</p>
        )}
      </Card>

      {/* Mantenimientos Programados */}
      <Card title="Mantenimientos Programados" style={{ marginTop: '20px' }}>
        {equipment.scheduledMaintenances?.length > 0 ? (
          <Table
            columns={scheduledMaintenanceColumns}
            dataSource={equipment.scheduledMaintenances}
            rowKey={(record) => record.id || record.description} // Ajusta según la estructura de tus mantenimientos programados
            pagination={false}
            bordered
          />
        ) : (
          <p>No hay mantenimientos programados registrados.</p>
        )}
      </Card>
    </Card>
  );
};

export default EquipmentDetails;

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Button,
  Modal,
  Badge,
  message,
  Space,
  Table,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useEquipments } from '../hooks/useEquipments';
import { useUser } from '../hooks/useUser';
import mockUsers from '../mocks/users';

import type { RoutineGroup, Step } from '../interface/equipment.type';

const { confirm } = Modal;

const EquipmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { equipments, deleteEquipment } = useEquipments();
  const { user } = useUser();

  const equipment = equipments.find((eq) => eq.id === id);

  if (!equipment) {
    return (
      <Card>
        <p>Equipo no encontrado.</p>
      </Card>
    );
  }

  // Obtener el nombre del usuario por ID
  const getUserName = (userId: number) => {
    const foundUser = mockUsers.find((u) => u.id === userId);
    return foundUser ? foundUser.name : 'Desconocido';
  };

  // Confirmación de eliminar equipo
  const handleDeleteEquipment = () => {
    confirm({
      title: '¿Estás seguro de que deseas eliminar este equipo?',
      icon: <ExclamationCircleOutlined />,
      content: 'Esta acción no se puede deshacer.',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        deleteEquipment(equipment.id);
        message.success('Equipo eliminado exitosamente.');
        navigate('/equipments');
      },
    });
  };

  // Columnas para Steps
  const stepColumns = [
    {
      title: 'Descripción del Paso',
      dataIndex: 'stepDescription',
      key: 'stepDescription',
    },
    {
      title: 'Tipo',
      dataIndex: 'routineType',
      key: 'routineType',
      render: (type: string) => type.charAt(0).toUpperCase() + type.slice(1),
    },
    {
      title: 'Nombre del Criterio',
      key: 'criteriaName',
      render: (_: any, step: Step) => step.criteria?.name || '—',
    },
    {
      title: 'Valor Actual',
      key: 'criteriaValue',
      render: (_: any, step: Step) => step.criteria?.currentValue ?? '—',
    },
    // Agrega más columnas si deseas (priorityPercentage, etc.)
  ];

  // Renderizado expandible de Steps en cada rutina
  const expandedStepRender = (routine: RoutineGroup) => (
    <Table
      columns={stepColumns}
      dataSource={routine.steps}
      rowKey={(step) => step.id}
      pagination={false}
      bordered
    />
  );

  // Columnas para Rutinas
  const routineColumns = [
    {
      title: 'Nombre de la Rutina',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Fecha de Creación',
      dataIndex: 'creationDate',
      key: 'creationDate',
    },
    {
      title: 'Cantidad de Pasos',
      key: 'stepsCount',
      render: (routine: RoutineGroup) => routine.steps?.length || 0,
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
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={handleDeleteEquipment}
            >
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
        <Descriptions.Item label="Status">
          {equipment.status === 'operacion' ? 'En Operación' : 'En Falla'}
        </Descriptions.Item>
        <Descriptions.Item label="Creado Por">
          {getUserName(equipment.createdBy)}
        </Descriptions.Item>
        <Descriptions.Item label="Última Edición Por">
          {getUserName(equipment.updatedBy)}
        </Descriptions.Item>
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

      {/* Rutinas */}
      <Card title="Rutinas" style={{ marginTop: '20px' }}>
        {equipment.routines && equipment.routines.length > 0 ? (
          <Table
            columns={routineColumns}
            dataSource={equipment.routines}
            rowKey={(routine) => routine.id}
            pagination={false}
            bordered
            expandable={{
              expandedRowRender: expandedStepRender,
              rowExpandable: (routine) => routine.steps && routine.steps.length > 0,
            }}
          />
        ) : (
          <p>No hay rutinas registradas.</p>
        )}
      </Card>
    </Card>
  );
};

export default EquipmentDetails;

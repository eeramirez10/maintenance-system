// src/components/ComponentList.tsx
import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Table,
  Button,
  Space,
  Modal,
  Badge,
  message,
  Menu,
  Dropdown,
  Input,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Component, ScheduledMaintenance } from '../types';
import { QRCodeSVG as QRCode } from 'qrcode.react';
// Importa los usuarios para mapear IDs a nombres
import ScheduledMaintenanceForm2 from './ScheduledMaintenanceForm2'; // Asegúrate de tener este componente
import { useUser } from '../hooks/useUser';
import mockUsers from '../mocks/users';

const { confirm } = Modal;

interface ComponentListProps {
  components: Component[];
  onDelete: (id: number) => void;
  onAddScheduledMaintenance: (componentId: number, maintenance: ScheduledMaintenance) => void; // Nueva prop
}

const ComponentList: React.FC<ComponentListProps> = ({ components, onDelete, onAddScheduledMaintenance }) => {
  const navigate = useNavigate();
  const { user } = useUser(); // Obtener el usuario autenticado
  const userRole = user?.role;

  // Definir permisos basados en roles
  const permissions = useMemo(() => {
    const perms = {
      canView: true, // Todos los roles pueden ver
      canAddComponent: false,
      canEditComponent: false,
      canDeleteComponent: false,
      canGenerateQR: false,
      canAddMaintenance: false,
      canEditMaintenance: false,
      canDeleteMaintenance: false,
      canAddRepair: false,
    };

    if (userRole === 'admin') {
      perms.canAddComponent = true;
      perms.canEditComponent = true;
      perms.canDeleteComponent = true;
      perms.canGenerateQR = true;
      perms.canAddMaintenance = true;
      perms.canEditMaintenance = true;
      perms.canDeleteMaintenance = true;
      perms.canAddRepair = true;
    } else if (userRole === 'operador') {
      perms.canAddComponent = true;
      perms.canEditComponent = true;
      perms.canGenerateQR = true;
      perms.canAddMaintenance = true;
      perms.canEditMaintenance = true;
      // Operadores no pueden eliminar componentes ni agregar reparaciones
    } else if (userRole === 'usuario') {
      perms.canAddComponent = true;
      perms.canDeleteComponent = true;
      perms.canAddMaintenance = true; // Mantenimientos diarios
      perms.canAddRepair = true; // Reparaciones
      // Usuarios no pueden editar componentes ni generar QR
    }

    return perms;
  }, [userRole]);

  // Estado para manejar el modal del QR
  const [isQRModalVisible, setIsQRModalVisible] = useState(false);
  const [selectedComponentIdForQR, setSelectedComponentIdForQR] = useState<number | null>(null);

  // Estado para manejar el modal de Agregar Mantenimiento Programado
  const [isAddMaintenanceModalVisible, setIsAddMaintenanceModalVisible] = useState(false);
  const [selectedComponentIdForMaintenance, setSelectedComponentIdForMaintenance] = useState<number | null>(null);
  const [scheduledMaintenance, setScheduledMaintenance] = useState<ScheduledMaintenance>({
    id: Date.now(),
    description: '',
    criteria: {
      name: '',
      type: 'date',
      currentValue: '',
    },
  });

  // Funciones para manejar el modal del QR
  const showQRModal = (id: number) => {
    setSelectedComponentIdForQR(id);
    setIsQRModalVisible(true);
  };

  const handleQROk = () => {
    setIsQRModalVisible(false);
    setSelectedComponentIdForQR(null);
  };

  const handleQRCancel = () => {
    setIsQRModalVisible(false);
    setSelectedComponentIdForQR(null);
  };

  // Funciones para manejar el modal de Agregar Mantenimiento Programado
  const showAddMaintenanceModal = (id: number) => {
    setSelectedComponentIdForMaintenance(id);
    setIsAddMaintenanceModalVisible(true);
    handleResetValues(); // Resetear mantenimientos al abrir el modal
  };

  const handleAddMaintenanceOk = () => {
    const maintenance = scheduledMaintenance;
    if (!maintenance.description) {
      message.error(`Por favor ingresa una descripción para el mantenimiento.`);
      return;
    }
    if (!maintenance.criteria?.type) {
      message.error(`Por favor selecciona el tipo de criterio para el mantenimiento.`);
      return;
    }
    if (maintenance.criteria.type === 'date') {
      if (!maintenance.criteria.currentValue) {
        message.error(`Por favor ingresa la fecha de inspección para el mantenimiento.`);
        return;
      }
    }
    if (maintenance.criteria.type === 'number') {
      if (
        maintenance.criteria.currentValue === undefined ||
        maintenance.criteria.minValue === undefined ||
        maintenance.criteria.maxValue === undefined
      ) {
        message.error(`Por favor ingresa todos los valores numéricos para el mantenimiento.`);
        return;
      }
      if (maintenance.criteria.maxValue <= maintenance.criteria.currentValue) {
        message.error(`El valor máximo debe ser mayor que el valor actual para el mantenimiento.`);
        return;
      }
    }

    if (selectedComponentIdForMaintenance !== null) {
      onAddScheduledMaintenance(selectedComponentIdForMaintenance, maintenance);
      message.success('Mantenimiento programado agregado exitosamente.');
    }
    setIsAddMaintenanceModalVisible(false);
    setSelectedComponentIdForMaintenance(null);
    handleResetValues(); // Resetear mantenimientos después de agregar
  };

  const handleAddMaintenanceCancel = () => {
    setIsAddMaintenanceModalVisible(false);
    setSelectedComponentIdForMaintenance(null);
    handleResetValues();
  };

  const handleResetValues = () => {
    setScheduledMaintenance({
      id: Date.now(),
      description: '',
      criteria: {
        name: '',
        type: 'date',
        currentValue: '',
      },
    });
  };

  const handleScheduledChange = (field: string, value: any) => {
    setScheduledMaintenance((prev) => ({
      ...prev,
      [field]: value,
      criteria: {
        ...prev.criteria,
        [field]: value,
      },
    }));
  };

  // Función para manejar la eliminación del componente con confirmación y permisos
  const handleDeleteComponent = (id: number) => {
    if (!permissions.canDeleteComponent) {
      message.error('No tienes permisos para eliminar este componente.');
      return;
    }

    confirm({
      title: '¿Estás seguro de que deseas eliminar este componente?',
      icon: <ExclamationCircleOutlined />,
      content: 'Esta acción no se puede deshacer.',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        onDelete(id);
        message.success('Componente eliminado exitosamente.');
      },
      onCancel() {
        // Acción en caso de cancelar
      },
    });
  };

  // Función para obtener el nombre del usuario por ID
  const getUserName = (userId: number) => {
    const foundUser = mockUsers.find((u) => u.id === userId);
    return foundUser ? foundUser.name : 'Desconocido';
  };

  // Filtrar componentes basados en el texto de búsqueda
  const [searchText, setSearchText] = useState<string>('');
  const filteredComponents = useMemo(() => {
    return components.filter((component) =>
      component.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [components, searchText]);

  // Menú dinámico basado en permisos
  const menu = (record: Component) => (
    <Menu>
      <Menu.Item key="detail">
        <Link to={`/component/${record.id}`}>
          <Button type="default" block>
            Detalle
          </Button>
        </Link>
      </Menu.Item>

      {(userRole === 'admin' || userRole === 'operador') && (
        <Menu.Item key="edit">
          <Link to={`/edit-component/${record.id}`}>
            <Button type="default" icon={<EditOutlined />} block>
              Editar
            </Button>
          </Link>
        </Menu.Item>
      )}

      {permissions.canDeleteComponent && (
        <Menu.Item key="delete">
          <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDeleteComponent(record.id)} block>
            Eliminar
          </Button>
        </Menu.Item>
      )}

      {permissions.canGenerateQR && (
        <Menu.Item key="qr">
          <Button type="default" onClick={() => showQRModal(record.id)} block>
            Generar QR
          </Button>
        </Menu.Item>
      )}

      {permissions.canAddMaintenance && (
        <Menu.Item key="addMaintenance">
          <Button type="default" onClick={() => showAddMaintenanceModal(record.id)} block>
            Agregar Mantenimiento Programado
          </Button>
        </Menu.Item>
      )}
    </Menu>
  );

  // Definición de las columnas para la tabla de Ant Design
  const columns = [
    {
      title: '#',
      key: 'index',
      render: (_: any, __: any, index: number) => index + 1,
      width: '5%',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Component, b: Component) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
      width: '25%',
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      sorter: (a: Component, b: Component) => a.type.localeCompare(b.type),
      sortDirections: ['ascend', 'descend'],
      width: '20%',
    },
    {
      title: 'Estado',
      key: 'isActive',
      width: '10%',
      render: (_: any, record: Component) => (
        <Badge
          status={record.isActive ? 'success' : 'error'}
          text={record.isActive ? 'Activo' : 'Inactivo'}
        />
      ),
      filters: [
        { text: 'Activo', value: true },
        { text: 'Inactivo', value: false },
      ],
      onFilter: (value: boolean, record: Component) => record.isActive === value,
    },
    {
      title: 'Creado Por',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (id: number) => getUserName(id),
      width: '15%',
    },
    {
      title: 'Última Edición Por',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
      render: (id: number) => getUserName(id),
      width: '15%',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: Component) => (
        <Dropdown overlay={menu(record)} trigger={['click']}>
          <Button type="primary">
            Opciones <DownOutlined />
          </Button>
        </Dropdown>
      ),
      width: '20%',
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white shadow rounded">
      <Space style={{ marginBottom: 16 }} direction="vertical" size="middle" className="w-full">
        <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1 className="text-2xl font-bold">Lista de Componentes</h1>
          {permissions.canAddComponent && (
            <Link to="/add-component">
              <Button type="primary" icon={<PlusOutlined />}>
                + Nuevo Componente
              </Button>
            </Link>
          )}
        </Space>
        {/* Campo de búsqueda */}
        <Input
          placeholder="Buscar Componentes"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{ width: 300 }}
        />
      </Space>

      {/* Tabla de Ant Design con paginación integrada */}
      <Table
        columns={columns}
        dataSource={filteredComponents}
        rowKey="id"
        pagination={{ pageSize: 5, showSizeChanger: false }}
        bordered
        locale={{
          emptyText: searchText
            ? 'No se encontraron componentes que coincidan con la búsqueda.'
            : 'No hay componentes disponibles.',
        }}
      />

      {/* Modal para mostrar el QR */}
      <Modal
        title="Código QR del Componente"
        visible={isQRModalVisible}
        onOk={handleQROk}
        onCancel={handleQRCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleQROk}>
            OK
          </Button>,
        ]}
      >
        {selectedComponentIdForQR !== null ? (
          <div style={{ textAlign: 'center' }}>
            <QRCode value={selectedComponentIdForQR.toString()} size={256} />
          </div>
        ) : (
          <p>No se pudo generar el código QR.</p>
        )}
      </Modal>

      {/* Modal para Agregar Mantenimiento Programado */}
      <Modal
        title="Agregar Mantenimiento Programado"
        visible={isAddMaintenanceModalVisible}
        onOk={handleAddMaintenanceOk}
        onCancel={handleAddMaintenanceCancel}
        okText="Agregar"
        cancelText="Cancelar"
        width={800}
      >
        <h2 className="text-xl font-bold mt-6">Mantenimientos Programados</h2>
        <ScheduledMaintenanceForm2
          maintenance={scheduledMaintenance}
          handleScheduledChange={handleScheduledChange}
        />
      </Modal>
    </div>
  );
};

export default ComponentList;

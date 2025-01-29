// EquipmentList.tsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  Button,
  Space,
  Modal,
  Badge,
  Input,
  message,
  Menu,
  Dropdown,
} from 'antd';
import { SearchOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import { Equipment, Component } from '../types';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import ScheduledMaintenanceForm2 from './ScheduledMaintenanceForm2';
import { useEquipments } from '../hooks/useEquipments';



interface EquipmentListProps {
  components: Component[];
}

const EquipmentList: React.FC<EquipmentListProps> = ({
  components,
}) => {
  // Estado para manejar el modal del QR
  const [isQRModalVisible, setIsQRModalVisible] = useState(false);
  const [selectedEquipmentIdForQR, setSelectedEquipmentIdForQR] = useState<number | null>(null);

  // Estado para manejar el modal de Agregar Mantenimiento Programado
  const [isAddMaintenanceModalVisible, setIsAddMaintenanceModalVisible] = useState(false);
  const [selectedEquipmentIdForMaintenance, setSelectedEquipmentIdForMaintenance] = useState<number | null>(null);

  // Estado para el buscador
  const [searchText, setSearchText] = useState<string>('');


  const {
    sheduleMaintenance,
    scheduledMaintenances,
    equipments,
    handleDeleteScheduled,
    handleAddScheduled,
    handleScheduledChange,
    handleResetValues, onAddScheduledMaintenance, deleteEquipment } = useEquipments()


  // Funciones para manejar el modal del QR
  const showQRModal = (id: number) => {
    setSelectedEquipmentIdForQR(id);
    setIsQRModalVisible(true);
  };

  const handleQROk = () => {
    setIsQRModalVisible(false);
    setSelectedEquipmentIdForQR(null);
  };

  const handleQRCancel = () => {
    setIsQRModalVisible(false);
    setSelectedEquipmentIdForQR(null);
  };

  // Funciones para manejar el modal de Agregar Mantenimiento Programado
  const showAddMaintenanceModal = (id: number) => {
    setSelectedEquipmentIdForMaintenance(id);
    setIsAddMaintenanceModalVisible(true);
    handleResetValues() // Resetear mantenimientos al abrir el modal
  };

  const handleAddMaintenanceOk = () => {

    const maintenance = sheduleMaintenance
    if (!maintenance.description) {
      message.error(`Por favor ingresa una descripción para el mantenimiento `);
      return;
    }
    if (!maintenance.criteria?.type) {
      message.error(`Por favor selecciona el tipo de criterio para el mantenimiento `);
      return;
    }
    if (maintenance.criteria.type === 'date') {
      if (!maintenance.criteria.currentValue) {
        message.error(`Por favor ingresa la fecha de inspección para el mantenimiento `);
        return;
      }
    }
    if (maintenance.criteria.type === 'number') {
      if (
        maintenance.criteria.currentValue === undefined ||
        maintenance.criteria.minValue === undefined ||
        maintenance.criteria.maxValue === undefined
      ) {
        message.error(`Por favor ingresa todos los valores numéricos para el mantenimiento `);
        return;
      }
      if (maintenance.criteria.maxValue <= maintenance.criteria.currentValue) {
        message.error(`El valor máximo debe ser mayor que el valor actual para el mantenimiento `);
        return;
      }
    }


    if (selectedEquipmentIdForMaintenance !== null) {
      onAddScheduledMaintenance(selectedEquipmentIdForMaintenance, sheduleMaintenance);
      message.success('Mantenimientos programados agregados exitosamente');
    }
    setIsAddMaintenanceModalVisible(false);
    setSelectedEquipmentIdForMaintenance(null);
    handleResetValues(); // Resetear mantenimientos después de agregar
  };

  const handleAddMaintenanceCancel = () => {
    setIsAddMaintenanceModalVisible(false);
    setSelectedEquipmentIdForMaintenance(null);
    handleResetValues();
  };

  const handleDeleteEquipment = (equipmentId: number) => {

    deleteEquipment(equipmentId)
  }





  // Filtrar equipos basados en el texto de búsqueda
  const filteredEquipments = useMemo(() => {
    return equipments.filter((equipment) =>
      equipment.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [equipments, searchText]);


  const menu = (record: Equipment) => (
    <Menu>
      <Menu.Item key="detail">
        <Link to={`/equipment/${record.id}`}>
        <Button type="default" >
            Detalle
          </Button>
        </Link>
     
      </Menu.Item>
      <Menu.Item key="edit">
        <Link to={`/edit-equipment/${record.id}`}>
          <Button type="default" style={{ background: '#ffc107', color: '#fff' }}>
            Editar
          </Button>
        </Link>
      </Menu.Item>
      <Menu.Item key="delete">
        <Button type="primary" danger onClick={() => handleDeleteEquipment(record.id)}>
          Eliminar
        </Button>
      </Menu.Item>
      <Menu.Item key="qr">
        <Button type="default" onClick={() => showQRModal(record.id)}>
          Generar QR
        </Button>
      </Menu.Item>
      <Menu.Item key="maintenance">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showAddMaintenanceModal(record.id)}>
          Agregar Mtto Prog
        </Button>
      </Menu.Item>
    </Menu>
  );

  // Configuración de columnas para la tabla de Ant Design
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (_: any, __: any, index: number) => index + 1, // Número de índice dinámico
    
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
   
      sorter: (a: Equipment, b: Equipment) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
     
      sorter: (a: Equipment, b: Equipment) => a.type.localeCompare(b.type),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Status',
      key: 'isActive',
     
      render: (_: any, record: Equipment) => (
        <Badge
          status={record.isActive ? 'success' : 'error'}
          text={record.isActive ? 'Activo' : 'Inactivo'}
        />
      ),
      filters: [
        { text: 'Activo', value: true },
        { text: 'Inactivo', value: false },
      ],
      onFilter: (value: boolean, record: Equipment) => record.isActive === value,
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: Equipment) => (
        <Dropdown overlay={menu(record)} trigger={['click']}>
        <Button type="primary">
          Opciones <DownOutlined />
        </Button>
      </Dropdown>
      ),
     
    },
  ];

  // Función para expandir filas y mostrar componentes relacionados
  const expandedRowRender = (record: Equipment) => {
    // Filtrar componentes relacionados con el equipo actual
    const relatedComponents = components.filter(
      (component) => component.relatedEquipmentId === record.id
    );

    return (
      <Table
        columns={[
          {
            title: 'Nombre del Componente',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
          },
          {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
            width: '30%',
          },
          {
            title: 'Acciones',
            key: 'actions',
            render: (_: any, component: Component) => (
              <Space size="middle">
                <Link to={`/component/${component.id}`}>
                  <Button type="default">Ver Componente</Button>
                </Link>
              </Space>
            ),
            width: '30%',
          },
        ]}
        dataSource={relatedComponents}
        rowKey="id"
        pagination={false} // Sin paginación para la tabla interna
      />
    );
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white shadow rounded">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Lista de Equipos</h1>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <Input
            placeholder="Buscar Equipos"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            className="w-full md:w-64"
          />
          <Link to="/add-equipment">
            <Button type="primary" icon={<PlusOutlined />}>
              + Nuevo Equipo
            </Button>
          </Link>
        </div>
      </div>
      {/* Tabla principal con filas expandibles */}
      <Table
        columns={columns}
        dataSource={filteredEquipments}
        rowKey="id"
        expandable={{
          expandedRowRender, // Filas expandibles
          rowExpandable: (record) =>
            components.some((component) => component.relatedEquipmentId === record.id), // Expandible solo si tiene componentes relacionados
        }}
        pagination={{ pageSize: 5 }} // Paginación de la tabla principal
        bordered
        locale={{
          emptyText: searchText
            ? 'No se encontraron equipos que coincidan con la búsqueda.'
            : 'No hay equipos disponibles.',
        }}
      />

      {/* Modal para mostrar el QR */}
      <Modal
        title="Código QR del Equipo"
        visible={isQRModalVisible}
        onOk={handleQROk}
        onCancel={handleQRCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleQROk}>
            OK
          </Button>,
        ]}
      >
        {selectedEquipmentIdForQR !== null ? (
          <div className="flex justify-center">
            <QRCode value={selectedEquipmentIdForQR.toString()} size={256} />
          </div>
        ) : (
          <p>No se pudo generar el código QR.</p>
        )}
      </Modal>

      {/* Modal para Agregar Mantenimiento Programado */}
      <Modal
        title="Agregar Mantenimiento Programado"
        open={isAddMaintenanceModalVisible}
        onOk={handleAddMaintenanceOk}
        onCancel={handleAddMaintenanceCancel}
        okText="Agregar"
        cancelText="Cancelar"
        width={800}
      >
        <h2 className="text-xl font-bold mt-6">Mantenimientos Programados</h2>

        <ScheduledMaintenanceForm2 handleScheduledChange={handleScheduledChange} maintenance={sheduleMaintenance} />
      </Modal>
    </div>
  );
};

export default EquipmentList;

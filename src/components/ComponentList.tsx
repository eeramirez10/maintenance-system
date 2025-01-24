import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Space, Modal, Badge } from 'antd';
import { Equipment, Component } from '../types';
// Importa QRCode de Ant Design si está disponible
// Si no, usa qrcode.react
// import { QRCode } from 'antd'; // Descomenta si Ant Design tiene QRCode
import { QRCodeSVG as QRCode } from 'qrcode.react';
// Usa qrcode.react si QRCode no está disponible en Ant Design

interface ComponentListProps {
  components: Component[];
  onDelete: (id: number) => void;
}

const ComponentList: React.FC<ComponentListProps> = ({ components, onDelete }) => {
  // Estado para manejar el modal del QR
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedComponentId, setSelectedComponentId] = useState<number | null>(null);

  // Funciones para manejar el modal
  const showModal = (id: number) => {
    setSelectedComponentId(id);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedComponentId(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedComponentId(null);
  };

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
      width: '30%',
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      width: '25%',
    },
    {
      title: 'Status',
      key: 'isActive',
      width: '20%',
      render: (_: any, record: Equipment) => <Badge status={record.isActive ? 'success' : 'error'} text={record.isActive ? 'Activo' : 'Inactivo'} />,

    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: Component) => (
        <Space size="middle">
          <Link to={`/component/${record.id}`}>
            <Button type="primary">Detalle</Button>
          </Link>
          {/* <Link to={`/edit-component/${record.id}`}>
            <Button type="default" style={{ background: '#ffc107', color: '#fff' }}>
              Editar
            </Button>
          </Link>
          <Button
            type="primary"
            danger
            onClick={() => onDelete(record.id)}
          >
            Eliminar
          </Button> */}
          <Button
            type="default"
            onClick={() => showModal(record.id)}
          >
            Generar QR
          </Button>
        </Space>
      ),
      width: '40%',
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Componentes</h1>
        <Link to="/add-component">
          <Button type="primary">+ Nuevo Componente</Button>
        </Link>
      </div>

      {/* Tabla de Ant Design con paginación integrada */}
      <Table
        columns={columns}
        dataSource={components}
        rowKey="id"
        pagination={{ pageSize: 5, showSizeChanger: false }}
        bordered
      />

      {/* Modal para mostrar el QR */}
      <Modal
        title="Código QR del Componente"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        {selectedComponentId !== null ? (
          <div className="flex justify-center">
            {/* Usa el componente QRCode de Ant Design si está disponible */}
            {/* <QRCode value={selectedComponentId.toString()} size={256} /> */}
            {/* Alternativamente, usa qrcode.react */}
            <QRCode value={selectedComponentId.toString()} size={256} />
          </div>
        ) : (
          <p>No se pudo generar el código QR.</p>
        )}
      </Modal>
    </div>
  );
};

export default ComponentList;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Space, Modal, Badge } from 'antd';
import { Equipment, Component } from '../types';

import {QRCodeSVG as QRCode } from 'qrcode.react';

interface EquipmentListProps {
  equipments: Equipment[];
  components: Component[];
  onDelete: (id: number) => void;
}

const EquipmentList: React.FC<EquipmentListProps> = ({ equipments, components, onDelete }) => {
  // Estado para manejar el modal del QR
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<number | null>(null);
 
  // Funciones para manejar el modal
  const showModal = (id: number) => {
    setSelectedEquipmentId(id);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedEquipmentId(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedEquipmentId(null);
  };

  // Configuración de columnas para la tabla de Ant Design
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (_: any, __: any, index: number) => index + 1, // Número de índice dinámico
      width: '5%',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      width: '20%',
    },
    {
      title: 'Status',
      key: 'isActive',
      width: '20%',

      render: (_:any, record: Equipment) => <Badge status={ record.isActive ? 'success' : 'error'} text={ record.isActive ? 'Activo' : 'Inactivo'} />,
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: Equipment) => (
        <Space size="middle">
          <Link to={`/equipment/${record.id}`}>
            <Button type="primary">Detalle</Button>
          </Link>
          {/* <Link to={`/edit-equipment/${record.id}`}>
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
      width: '50%',
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Equipos</h1>
        <Link to="/add-equipment">
          <Button type="primary">+ Nuevo Equipo</Button>
        </Link>
      </div>
      {/* Tabla principal con filas expandibles */}
      <Table
        columns={columns}
        dataSource={equipments}
        rowKey="id"
        expandable={{
          expandedRowRender, // Filas expandibles
          rowExpandable: (record) =>
            components.some((component) => component.relatedEquipmentId === record.id), // Expandible solo si tiene componentes relacionados
        }}
        pagination={{ pageSize: 5 }} // Paginación de la tabla principal
      />

      {/* Modal para mostrar el QR */}
      <Modal
        title="Código QR del Equipo"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        {selectedEquipmentId !== null ? (
          <div className="flex justify-center">
            <QRCode value={selectedEquipmentId.toString()} size={256} />
          </div>
        ) : (
          <p>No se pudo generar el código QR.</p>
        )}
      </Modal>
    </div>
  );
};

export default EquipmentList;

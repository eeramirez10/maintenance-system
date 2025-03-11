// StoragePage.tsx
import React, { useState } from 'react';
import { Button, Card, Form, message, Modal, Select, Table } from 'antd';
import mockStorage from '../mocks/mockStorage';
import { StorageItem } from '../interface/StorageItem';
import AddStorageItem from '../components/AddStorageItem';

import { useEquipments } from '../hooks/useEquipments';
import { Option } from 'antd/es/mentions';


const StoragePage: React.FC = () => {

    const [visible, setVisible] = useState(false);
    const [storageItems, setStorageItems] = useState<StorageItem[]>(mockStorage);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<StorageItem | null>(null);
    const [selectedEquipmentId, setSelectedEquipmentId] = useState<number | null>(null);

    const { equipments, getEquipmentById } = useEquipments()


    const openAssignModal = (item: StorageItem) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const handleAssign = () => {
        if (!selectedItem || selectedEquipmentId === null) {
            message.error('Seleccione un equipo para asignar');
            return;
        }
        const updatedItems = storageItems.map((item) =>
            item.id === selectedItem.id ? { ...item, equipmentId: selectedEquipmentId } : item
        );
        setStorageItems(updatedItems);
        message.success('Ítem asignado correctamente');
        setModalVisible(false);
        setSelectedItem(null);
        setSelectedEquipmentId(null);
    };


    const handleAdd = (item: StorageItem) => {
        // Generamos un id nuevo (ejemplo: length + 1)
        const newItem = { ...item, id: storageItems.length + 1 };
        setStorageItems([...storageItems, newItem]);
        setVisible(false);
    };

    
    const columns = [
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
            ellipsis: true,
            width: 100,
            fixed: 'left', // Fija esta columna a la izquierda
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
            width: 150,
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
            width: 200,
        },
        {
            title: 'Categoría',
            dataIndex: 'category',
            key: 'category',
            ellipsis: true,
            width: 120,
        },
        {
            title: 'Cantidad',
            dataIndex: 'quantity',
            key: 'quantity',
            ellipsis: true,
            width: 100,
        },
        {
            title: 'Unidad',
            dataIndex: 'unit',
            key: 'unit',
            ellipsis: true,
            width: 100,
        },
        {
            title: 'Fecha de Entrada',
            dataIndex: 'entryDate',
            key: 'entryDate',
            ellipsis: true,
            width: 120,
        },
        {
            title: 'Fecha de Vencimiento',
            dataIndex: 'expiryDate',
            key: 'expiryDate',
            ellipsis: true,
            width: 120,
        },
        {
            title: 'Proveedor',
            dataIndex: 'supplier',
            key: 'supplier',
            ellipsis: true,
            width: 150,
        },
        {
            title: 'Precio de Compra',
            dataIndex: 'purchasePrice',
            key: 'purchasePrice',
            render: (value: number) => `$${value.toFixed(2)}`,
            ellipsis: true,
            width: 120,
        },
        {
            title: 'Precio de Venta',
            dataIndex: 'salePrice',
            key: 'salePrice',
            render: (value: number) => `$${value.toFixed(2)}`,
            ellipsis: true,
            width: 120,
        },
        {
            title: 'Ubicación',
            dataIndex: 'location',
            key: 'location',
            ellipsis: true,
            width: 150,
        },
        // {
        //   title: 'Nivel de Reorden',
        //   dataIndex: 'reorderLevel',
        //   key: 'reorderLevel',
        //   ellipsis: true,
        //   width: 120,
        // },
        // {
        //   title: 'Estado',
        //   dataIndex: 'status',
        //   key: 'status',
        //   ellipsis: true,
        //   width: 120,
        // },
        {
            title: 'Notas',
            dataIndex: 'notes',
            key: 'notes',
            ellipsis: true,
            width: 200,
        },
        {
            title: 'Equipo Vinculado',
            dataIndex: 'equipmentId',
            key: 'equipmentId',
            render: (value: number | null) => (value === null ? 'No asignado' : getEquipmentById(value).name),
            ellipsis: true,
            width: 150,
            fixed: 'right', // Fija esta columna a la derecha
        },
        {
            title: 'Acciones',
            key: 'acciones',
            fixed: 'right',
            width: 150,
            render: (text: any, record: StorageItem) => (
                <Button type="primary" size="small" onClick={() => openAssignModal(record)}>
                    Ligar a Equipo
                </Button>
            ),
        },
    ];

    return (
        <Card title="Almacén" style={{ margin: '20px' }}>
            <Button type="primary" onClick={() => setVisible(true)} style={{ marginBottom: 16 }}>
                Agregar Nuevo Ítem
            </Button>
            <Modal
                open={visible}
                title="Agregar Nuevo Ítem"
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <AddStorageItem onSave={handleAdd} />
            </Modal>

            <Modal
                title="Asignar Ítem a Equipo"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onOk={handleAssign}
            >
                <p>
                    Asignar ítem: <strong>{selectedItem?.name}</strong>
                </p>
                <Form layout="vertical">
                    <Form.Item label="Seleccione un Equipo">
                        <Select
                            placeholder="Seleccione un equipo"
                            onChange={(value) => setSelectedEquipmentId(value)}
                        >
                            {equipments.map((eq) => (
                                <Option key={eq.id} value={eq.id}>
                                    {eq.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            <Table<StorageItem>
                dataSource={storageItems}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                bordered

                // Configura scroll horizontal para que se activen las columnas fijas
                scroll={{ x: 1500 }}
            />
        </Card>
    );
};

export default StoragePage;

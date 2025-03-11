// AddStorageItemPage.tsx
import React, { useState } from 'react';
import { Card, Modal, Button, Table } from 'antd';

import mockStorage from '../mocks/mockStorage';
import AddStorageItem from '../components/AddStorageItem';
import { StorageItem } from '../interface/StorageItem';

const AddStorageItemPage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [storageItems, setStorageItems] = useState<StorageItem[]>(mockStorage);

  const handleAdd = (item: StorageItem) => {
    // Generamos un id nuevo (ejemplo: length + 1)
    const newItem = { ...item, id: storageItems.length + 1 };
    setStorageItems([...storageItems, newItem]);
    setVisible(false);
  };

  const columns = [
    { title: 'SKU', dataIndex: 'sku', key: 'sku' },
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Categoría', dataIndex: 'category', key: 'category' },
    { title: 'Cantidad', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Proveedor', dataIndex: 'supplier', key: 'supplier' },
    { title: 'Estado', dataIndex: 'status', key: 'status' },
  ];

  return (
    <Card title="Almacén - Agregar Ítem" style={{ margin: '20px' }}>
      <Button type="primary" onClick={() => setVisible(true)} style={{ marginBottom: 16 }}>
        Agregar Nuevo Ítem
      </Button>
      <Modal
        visible={visible}
        title="Agregar Nuevo Ítem"
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <AddStorageItem onSave={handleAdd} />
      </Modal>

      <Table<StorageItem>
        dataSource={storageItems}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
      />
    </Card>
  );
};

export default AddStorageItemPage;

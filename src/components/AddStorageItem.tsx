// AddStorageItem.tsx
import React from 'react';
import { Form, Input, InputNumber, Button, DatePicker, Select, message } from 'antd';
import moment from 'moment';
import { StorageItem } from '../interface/StorageItem';


const { Option } = Select;

interface AddStorageItemProps {
  onSave: (item: StorageItem) => void;
}

const AddStorageItem: React.FC<AddStorageItemProps> = ({ onSave }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    const newItem: StorageItem = {
      sku: values.sku,
      name: values.name,
      description: values.description,
      category: values.category,
      quantity: values.quantity,
      unit: values.unit,
      entryDate: values.entryDate ? values.entryDate.format('YYYY-MM-DD') : '',
      expiryDate: values.expiryDate ? values.expiryDate.format('YYYY-MM-DD') : '',
      supplier: values.supplier,
      purchasePrice: values.purchasePrice,
      salePrice: values.salePrice,
      location: values.location,
      reorderLevel: values.reorderLevel,
      status: values.status,
      notes: values.notes,
      equipmentId: null, // Siempre null
    };

    onSave(newItem);
    message.success('Ítem agregado exitosamente');
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="SKU"
        name="sku"
        rules={[{ required: true, message: 'Por favor ingrese el SKU' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Nombre"
        name="name"
        rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Descripción"
        name="description"
        rules={[{ required: true, message: 'Por favor ingrese la descripción' }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item
        label="Categoría"
        name="category"
        rules={[{ required: true, message: 'Por favor ingrese la categoría' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Cantidad" name="quantity" rules={[{ required: true, message: 'Ingrese la cantidad' }]}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label="Unidad"
        name="unit"
        rules={[{ required: true, message: 'Por favor ingrese la unidad' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Fecha de Entrada"
        name="entryDate"
        rules={[{ required: true, message: 'Por favor ingrese la fecha de entrada' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Fecha de Vencimiento" name="expiryDate">
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Proveedor" name="supplier">
        <Input />
      </Form.Item>
      <Form.Item
        label="Precio de Compra"
        name="purchasePrice"
        rules={[{ required: true, message: 'Por favor ingrese el precio de compra' }]}
      >
        <InputNumber style={{ width: '100%' }} formatter={value => `$ ${value}`} />
      </Form.Item>
      <Form.Item
        label="Precio de Venta"
        name="salePrice"
        rules={[{ required: true, message: 'Por favor ingrese el precio de venta' }]}
      >
        <InputNumber style={{ width: '100%' }} formatter={value => `$ ${value}`} />
      </Form.Item>
      <Form.Item label="Ubicación" name="location">
        <Input />
      </Form.Item>
      <Form.Item label="Nivel de Reorden" name="reorderLevel">
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Estado" name="status">
        <Select>
          <Option value="activo">Activo</Option>
          <Option value="inactivo">Inactivo</Option>
          <Option value="en revisión">En Revisión</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Notas" name="notes">
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Agregar Ítem
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddStorageItem;

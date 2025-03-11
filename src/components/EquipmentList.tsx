// src/components/EquipmentList.tsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  Button,
  Modal,
  Badge,
  Input,
  message,
  Menu,
  Dropdown,
} from 'antd';
import { SearchOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import { useEquipments } from '../hooks/useEquipments';
import { useUser } from '../hooks/useUser';
import { usePermission } from '../hooks/usePermission';
import { Equipment, RoutineGroup, Step } from '../interface/equipment.type';
import CreateRoutineForm from './CreateRoutineForm';
import AddStepForm from './AddStepForm';





const EquipmentList = () => {
  const { user } = useUser();
  const { equipments, deleteEquipment, addRoutine, addStep } = useEquipments();


  console.log({ equipments })

  const [selectedRoutine, setSelectedRoutine] = useState<string | null>()

  const userRole = user?.role;

  const permissions = usePermission({ userRole })

  const [isQRModalVisible, setIsQRModalVisible] = useState(false);
  const [selectedEquipmentIdForQR, setSelectedEquipmentIdForQR] = useState<string | null>(null);

  const [openModalSteps, setOpenModalSteps] = useState(false)

  const [isAddMaintenanceModalVisible, setIsAddMaintenanceModalVisible] = useState(false);
  const [selectedEquipmentIdForMaintenance, setSelectedEquipmentIdForMaintenance] = useState<string | null>(null);


  // const handleStepModalCancel = () => {
  //   setOpenModalSteps(!openModalSteps)
  // }


  const showQRModal = (id: string) => {
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



  const showAddMaintenanceModal = (id: string) => {
    setSelectedEquipmentIdForMaintenance(id);
    setIsAddMaintenanceModalVisible(true);
    // Resetear mantenimientos al abrir el modal
  };

  const showAddStepModal = () => {
   
    setOpenModalSteps(true)
  }

  const handleAddStepCancel = () => {
    setSelectedRoutine(null)
    setOpenModalSteps(false)
  }


  const handleAddMaintenanceCancel = () => {
    setIsAddMaintenanceModalVisible(false);
    setSelectedEquipmentIdForMaintenance(null);
    
  };

  const handleDeleteEquipmentFunc = (equipmentId: string) => {
    const equipment = equipments.find((eq) => eq.id === equipmentId);
    if (!equipment) {
      message.error('Equipo no encontrado.');
      return;
    }

    if (!permissions.canDeleteEquipment) {
      message.error('No tienes permisos para eliminar este equipo.');
      return;
    }

    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este equipo?');
    if (confirmed) {
      deleteEquipment(equipmentId);
      message.success('Equipo eliminado exitosamente.');
    }
  };

  const handleOnSaveRoutine = (rountine: RoutineGroup) => {


    if (!selectedEquipmentIdForMaintenance) return message.error('No hay un equipo seleccionado')

    addRoutine(selectedEquipmentIdForMaintenance, rountine)

  }

  const handleOnSaveStep = (step: Step) => {

    if(!selectedEquipmentIdForMaintenance) return message.error('No hay un equipo seleccionado')
    if(!selectedRoutine) return message.error('No hay una rutina seleccionasa')
    addStep(step, selectedEquipmentIdForMaintenance, selectedRoutine)
  }

  const [searchText, setSearchText] = useState<string>('');

  const filteredEquipments = useMemo(() => {
    return equipments.filter((equipment) =>
      equipment.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [equipments, searchText]);

  // Menú dinámico basado en permisos
  const menu = (record: Equipment) => (
    <Menu>
      <Menu.Item key="detail">
        <Link to={`/equipment/${record.id}`}>
          <Button type="default" block>
            Detalle
          </Button>
        </Link>
      </Menu.Item>

      {(userRole === 'admin' || userRole === 'operador') && (
        <Menu.Item key="edit">
          <Link to={`/edit-equipment/${record.id}`}>
            <Button type="default" style={{ background: '#ffc107', color: '#fff' }} block>
              Editar
            </Button>
          </Link>
        </Menu.Item>
      )}

      {userRole === 'admin' && (
        <Menu.Item key="delete">
          <Button type="primary" danger onClick={() => handleDeleteEquipmentFunc(record.id)} block>
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
        <Menu.Item key="maintenance">
          <Button type="primary" icon={<PlusOutlined />} onClick={() => showAddMaintenanceModal(record.id)} block>
            Agregar Rutina
          </Button>
        </Menu.Item>
      )}
    </Menu>
  );

  // Configuración de columnas para la tabla de Ant Design
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (_: unknown, __: unknown, index: number) => index + 1, // Número de índice dinámico
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
      render: (_: unknown, record: Equipment) => (
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
      render: (_: unknown, record: Equipment) => (
        <Dropdown overlay={menu(record)} trigger={['click']}>
          <Button type="primary">
            Opciones <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];



  const expandedRowRenderSteps = (record: RoutineGroup) => {

    const steps = record.steps || []

    const stepColumns = [
      {
        title: 'Descripcion',
        dataIndex: 'stepDescription',
        key: 'stepDescription',
      },
      {
        title: 'Tipo',
        dataIndex: 'routineType',
        key: 'routineType',
      },
      {
        title: 'Criterio',
        dataIndex: 'criteria.name',
        key: 'criteria.name',
        render: (_: unknown, record: Step) => record.criteria?.name
      },
      {
        title: 'Valor Actual',
        dataIndex: 'criteria.currentValue',
        key: 'criteria.currentValue',
        render: (_: unknown, record: Step) => record.criteria?.currentValue

      },
      {
        title: 'Prioridad',
        dataIndex: 'priorityPercentage',
        key: 'priorityPercentage',
      },

    ]

    return (
      <Table
        columns={stepColumns}
        dataSource={steps}
        rowKey={(record) => record.stepDescription} // o un ID único si lo tienes
        pagination={false}
        bordered

      />

    )
  }

  const expandedRowRender = (record: Equipment) => {
    // Extraemos las rutinas
    const routineGroups = record.routines || [];

    

    // Definimos las columnas para la tabla de rutinas (RoutineGroup)
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
      // Ejemplo: mostrar cuántos pasos tiene la rutina
      {
        title: 'Número de Pasos',
        key: 'stepsCount',
        render: (routine: RoutineGroup) => routine.steps?.length || 0,
      },
      {
        title: 'Agregar paso',

        render: (routine: RoutineGroup) => (
          <Button
            onClick={() => {
              showAddStepModal()
              setSelectedRoutine(routine?.id)
              setSelectedEquipmentIdForMaintenance(record.id)
            }}
          > Agregar paso</Button>
        ),
      },
    ];


    return (
      <Table
        columns={routineColumns}
        dataSource={routineGroups}
        rowKey={(routine) => routine.name} // o un ID único si lo tienes
        pagination={false}
        expandable={{
          expandedRowRender: expandedRowRenderSteps,
          rowExpandable: (record) => record.steps.length > 0
        }}
        style={{ backgroundColor: '#fcfcfc' }}
        bordered
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
          {permissions.canAddEquipment && (
            <Link to="/add-equipment">
              <Button type="primary" icon={<PlusOutlined />}>
                Nuevo Equipo
              </Button>
            </Link>
          )}
        </div>
      </div>
      {/* Tabla principal con filas expandibles */}
      <Table
        columns={columns}
        dataSource={filteredEquipments}
        rowKey="id"
        expandable={{
          expandedRowRender, // Filas expandibles
          rowExpandable: (record) => record.routines.length > 0,
          // onExpand: (expanded, record) => {
          //   const equipmentId = expanded ? record.id : null

          //   setSelectedEquipmentIdForMaintenance(equipmentId)
          // }
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
        open={isQRModalVisible}
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
        title="Agregar Rutina"
        footer={[]}
        open={isAddMaintenanceModalVisible}
        onCancel={handleAddMaintenanceCancel}
        width={800}
      >
        <h2 className="text-xl font-bold mt-6">Rutinas</h2>

        <CreateRoutineForm onSave={handleOnSaveRoutine} onClose={handleAddMaintenanceCancel}/>

      </Modal>


      <Modal
        title="Agregar pasos a rutina"
        footer={[]}
        open={openModalSteps}
        onCancel={handleAddStepCancel}
        cancelText="Cancelar"
        width={800}
      >
        <h2 className="text-xl font-bold mt-6">Rutinas</h2>
        {/* <RoutineGroupForm onSave={handleOnSaveRoutine} /> */}

        <AddStepForm onSave={handleOnSaveStep} onCancel={handleAddStepCancel} />

      </Modal>
    </div>
  );


};

export default EquipmentList;

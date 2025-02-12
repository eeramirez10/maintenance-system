// AllReportsView.tsx
import React from 'react';
import { Card, Table, Button } from 'antd';
import { Equipment } from '../interface/equipment.type';
import {
  generateAllReports,
  exportToExcel,
} from '../utils/reportHelpers';
import { useEquipments } from '../hooks/useEquipments';



const AllReportsView: React.FC = () => {

  const { equipments } = useEquipments()
  // 1. Generamos todos los reportes
  const {
    routineTypeData,
    byEquipmentData,
    failuresByCategoryData,
    totalCorrectiveDowntimeSum,
    preventiveDowntimeData,
  } = generateAllReports(equipments);

  // Columnas para Reporte 1: Por Tipo de Rutina
  const routineTypeColumns = [
    { title: 'Tipo de Rutina', dataIndex: 'routineType' },
    { title: 'Cantidad', dataIndex: 'count' },
  ];

  // Columnas para Reporte 2: Por Equipo
  const byEquipmentColumns = [
    { title: 'Equipo', dataIndex: 'equipmentName' },
    { title: 'Rutinas Preventivas', dataIndex: 'totalPreventive' },
    { title: 'Rutinas Correctivas', dataIndex: 'totalCorrective' },
    { title: 'Fallas (Correctivas)', dataIndex: 'totalFailures' },
    {
      title: 'Downtime Correctivo (min)',
      dataIndex: 'totalCorrectiveDowntime',
      render: (val: number) => val.toFixed(2),
    },
    {
      title: 'Paro Preventivo Planeado (min)',
      dataIndex: 'totalPreventivePlanned',
    },
    {
      title: 'Paro Preventivo Real (min)',
      dataIndex: 'totalPreventiveActual',
    },
  ];

  // Columnas para Reporte 3: Fallas por Categoría
  const failuresColumns = [
    { title: 'Categoría', dataIndex: 'category' },
    { title: 'Cantidad de Fallas', dataIndex: 'count' },
    {
      title: 'Downtime Total (min)',
      dataIndex: 'totalDowntime',
      render: (val: number) => val.toFixed(2),
    },
  ];

  // Columnas para Reporte 4: Suma total de paros correctivos
  // (podrías mostrarlo en una tabla con 1 fila, o un Card con texto)
  const correctiveSumColumns = [
    { title: 'Suma Total de Paros Correctivos (min)', dataIndex: 'sum' },
  ];
  const correctiveSumData = [
    {
      key: 1,
      sum: totalCorrectiveDowntimeSum.toFixed(2),
    },
  ];

  // Columnas para Reporte 5: Preventivos (programado vs real)
  const preventiveDowntimeColumns = [
    { title: 'Equipo', dataIndex: 'equipmentName' },
    { title: 'Paro Planeado (min)', dataIndex: 'totalPlanned' },
    { title: 'Paro Real (min)', dataIndex: 'totalActual' },
    {
      title: 'Diferencia (real - planeado)',
      dataIndex: 'difference',
      render: (val: number) => val.toFixed(2),
    },
  ];

  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4' style={{ padding: 16 }}>
      {/* Reporte 1: Por Tipo de Rutina */}
      <Card title="Reporte por Tipo de Rutina" style={{ marginBottom: 24 }}>
        <Table
          columns={routineTypeColumns}
          dataSource={routineTypeData}
          rowKey="key"
          pagination={false}
          bordered
        />
        <Button
          type="primary"
          style={{ marginTop: 8 }}
          onClick={() =>
            exportToExcel(routineTypeData, 'Reporte_Por_Tipo_Rutina.xlsx')
          }
        >
          Exportar a Excel
        </Button>
      </Card>

      {/* Reporte 2: Por Equipo */}
      <Card title="Reporte por Equipo" style={{ marginBottom: 24 }}>
        <Table
          columns={byEquipmentColumns}
          dataSource={byEquipmentData}
          rowKey="key"
          pagination={false}
          bordered
        />
        <Button
          type="primary"
          style={{ marginTop: 8 }}
          onClick={() =>
            exportToExcel(byEquipmentData, 'Reporte_Por_Equipo.xlsx')
          }
        >
          Exportar a Excel
        </Button>
      </Card>

      {/* Reporte 3: Fallas por Categoría */}
      <Card title="Reporte de Fallas (por Categoría)" style={{ marginBottom: 24 }}>
        <Table
          columns={failuresColumns}
          dataSource={failuresByCategoryData}
          rowKey="key"
          pagination={false}
          bordered
        />
        <Button
          type="primary"
          style={{ marginTop: 8 }}
          onClick={() =>
            exportToExcel(failuresByCategoryData, 'Reporte_Fallas_Categoria.xlsx')
          }
        >
          Exportar a Excel
        </Button>
      </Card>

      {/* Reporte 4: Suma total de paros correctivos */}
      <Card title="Suma de Paros Correctivos (Global)" style={{ marginBottom: 24 }}>
        <Table
          columns={correctiveSumColumns}
          dataSource={correctiveSumData}
          rowKey="key"
          pagination={false}
          bordered
        />
        <Button
          type="primary"
          style={{ marginTop: 8 }}
          onClick={() =>
            exportToExcel(correctiveSumData, 'Reporte_Paros_Correctivos.xlsx')
          }
        >
          Exportar a Excel
        </Button>
      </Card>

      {/* Reporte 5: Preventivos (programado vs real) */}
      <Card title="Reporte de Preventivos (programado vs real)">
        <Table
          columns={preventiveDowntimeColumns}
          dataSource={preventiveDowntimeData}
          rowKey="key"
          pagination={false}
          bordered
        />
        <Button
          type="primary"
          style={{ marginTop: 8 }}
          onClick={() =>
            exportToExcel(preventiveDowntimeData, 'Reporte_Preventivos.xlsx')
          }
        >
          Exportar a Excel
        </Button>
      </Card>
    </div>
  );
};

export default AllReportsView;

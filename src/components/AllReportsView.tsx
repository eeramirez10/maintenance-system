// AllReportsView.tsx
import React from 'react';
import { Card, Table, Button, TableProps } from 'antd';
import { useEquipments } from '../hooks/useEquipments';
import { Equipment } from '../interface/equipment.type';

const AllReportsView: React.FC = () => {
  const { equipments } = useEquipments();


  const totalByRoutineType = (equipment:Equipment, routineType: string) => {
    
    return equipment.routines.reduce((acc, routine)=> {

      const stepsRoutineType = routine.steps.filter((step) => step.routineType === routineType)

      return acc + stepsRoutineType.length
    },0)
  }

  // Ajustado: generateAllReports ya no devuelve routineTypeData
  // const {
  //   byEquipmentData,
  //   failuresByCategoryData,
  //   totalCorrectiveDowntimeSum,
  //   preventiveDowntimeData,
  // } = generateAllReports(equipments);

  // console.log({equipments})

  // 1. Columnas “Reporte por Equipo”
  //   - Ejemplo de columnas que miden “rutinas totales”, “fallas”
  //   - “Downtime Correctivo” se basa en la suma de “repairTime” (o “actualTime”
  //     en pasos con “failureCategory”), etc.
  const byEquipmentColumns:TableProps<Equipment>['columns'] = [
    { title: 'Equipo', dataIndex: 'name' },
    { title: 'Rutinas Totales', dataIndex: 'routines', render: (_: unknown, record) =>  record.routines.length},
    { 
      title: 'Correctivos (Fallas)', 
      dataIndex: 'routines', 
      render: (_: unknown, record) => totalByRoutineType(record, 'correctivo')
    },
    { 
      title: 'Preventivos', 
      dataIndex: 'routines', 
      render: (_: unknown, record) => totalByRoutineType(record, 'preventivo')
    },
    
    // {
    //   title: 'Downtime Correctivo (min)',
    //   dataIndex: 'totalCorrectiveDowntime',
    //   render: (val: number) => val.toFixed(2),
    // },
    // {
    //   title: 'Paro Planeado (min)',
    //   dataIndex: 'totalPlanned',
    // },
    // {
    //   title: 'Paro Real (min)',
    //   dataIndex: 'totalActual',
    // },
  ];

  // 2. Columnas “Fallas por Categoría”
  //   - Se asume `failuresByCategoryData` agrupa las “failureCategory”
  //     y calcula su count y downtime total (suma de “repairTime”).
  // const failuresColumns = [
  //   { title: 'Categoría', dataIndex: 'category' },
  //   { title: 'Cantidad de Fallas', dataIndex: 'count' },
  //   {
  //     title: 'Downtime Total (min)',
  //     dataIndex: 'totalDowntime',
  //     render: (val: number) => val.toFixed(2),
  //   },
  // ];

  // 3. Reporte “Suma de Paros Correctivos (Global)”
  // const correctiveSumColumns = [
  //   { title: 'Suma Total de Paros Correctivos (min)', dataIndex: 'sum' },
  // ];
  // const correctiveSumData = [
  //   {
  //     key: 1,
  //     sum: totalCorrectiveDowntimeSum.toFixed(2),
  //   },
  // ];

  // 4. Reporte “Preventivos (programado vs real)”
  //    - Se asume “preventiveDowntimeData” viene de steps sin “failureCategory”
  //      sumando plannedDowntime/actualDowntime
  // const preventiveDowntimeColumns = [
  //   { title: 'Equipo', dataIndex: 'equipmentName' },
  //   { title: 'Paro Planeado (min)', dataIndex: 'totalPlanned' },
  //   { title: 'Paro Real (min)', dataIndex: 'totalActual' },
  //   {
  //     title: 'Diferencia (real - planeado)',
  //     dataIndex: 'difference',
  //     render: (val: number) => val.toFixed(2),
  //   },
  // ];

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4" style={{ padding: 16 }}>
      {/* Reporte por Equipo */}
      <Card title="Reporte por Equipo" style={{ marginBottom: 24 }}>
        <Table
          columns={byEquipmentColumns}
          dataSource={equipments}
          rowKey="key"
          pagination={false}
          bordered
        />
        {/* <Button
          type="primary"
          style={{ marginTop: 8 }}
          onClick={() => exportToExcel(byEquipmentData, 'Reporte_Por_Equipo.xlsx')}
        >
          Exportar a Excel
        </Button> */}
      </Card>

      {/* Reporte de Fallas (por Categoría) */}
      {/* <Card title="Reporte de Fallas (por Categoría)" style={{ marginBottom: 24 }}>
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
      </Card> */}

      {/* Suma total de paros correctivos */}
      {/* <Card title="Suma de Paros Correctivos (Global)" style={{ marginBottom: 24 }}>
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
      </Card> */}

      {/* Reporte de Preventivos (programado vs real) */}
      {/* <Card title="Reporte de Preventivos (programado vs real)">
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
      </Card> */}
    </div>
  );
};

export default AllReportsView;

// Dashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  Button,
  Space,
  Statistic,
  Card,
  Row,
  Col,
} from 'antd';
import {
  Bar,
  Pie,
} from '@ant-design/charts';
import {
  DatabaseOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PercentageOutlined,
} from '@ant-design/icons';
import { Equipment } from '../types';
import { calculateRemaining } from '../utils/calculateRemaining';

interface DashboardProps {
  equipments: Equipment[];
}

const Dashboard: React.FC<DashboardProps> = ({ equipments }) => {
  // Obtener los últimos mantenimientos realizados
  const getLastMaintenances = () => {
    return equipments
      .filter((equipment) => equipment.maintenances?.length > 0)
      .map((equipment) => {
        const lastMaintenance = equipment.maintenances[equipment.maintenances.length - 1];
        return { equipment, lastMaintenance };
      });
  };

  // Obtener los mantenimientos programados a vencer
  const getScheduledMaintenancesToExpire = () => {
    return equipments
      .filter((equipment) => equipment.scheduledMaintenances?.length > 0)
      .flatMap((equipment) =>
        equipment.scheduledMaintenances
          .map((scheduled) => {
            const criteria = scheduled.criteria;

            if (!criteria) return null;

            if (criteria.type === 'date') {
              const remainingDays = calculateRemaining(criteria);
              return remainingDays !== null && remainingDays <= 30
                ? { equipment, scheduled, remaining: `${remainingDays} días` }
                : null;
            }

            if (criteria.type === 'number') {
              const currentValue = criteria.currentValue as number;
              const maxValue = criteria.maxValue as number;
              const difference = maxValue - currentValue;

              return difference <= 0.4 * maxValue
                ? { equipment, scheduled, remaining: `${Math.round(currentValue)} / ${maxValue}` }
                : null;
            }

            return null;
          })
          .filter(Boolean) as { equipment: Equipment; scheduled: any; remaining: string }[]
      );
  };

  const lastMaintenances = getLastMaintenances();
  const scheduledMaintenancesToExpire = getScheduledMaintenancesToExpire();

  // Datos para gráficos
  const maintenanceByEquipment = equipments.map((equipment) => ({
    name: equipment.name,
    count: equipment.scheduledMaintenances?.length || 0,
  }));

  const maintenanceByType = equipments
    .flatMap((equipment) => equipment.scheduledMaintenances || [])
    .reduce(
      (acc, scheduled) => {
        if (scheduled.criteria.type === 'date') acc.date += 1;
        if (scheduled.criteria.type === 'number') acc.number += 1;
        return acc;
      },
      { date: 0, number: 0 }
    );

  // Configuración para Gráfica de Barras
  const barChartConfig = {
    data: maintenanceByEquipment,
    xField: 'count',
    yField: 'name',
    seriesField: 'name',
    tooltip: {
      showMarkers: false,
    },
    legend: {
      position: 'top-left',
    },
    height: 400,
    label: {
     
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
  };

  // Configuración para Gráfica de Pie
  const pieChartConfig = {
    data: [
      { type: 'Por Fecha', value: maintenanceByType.date },
      { type: 'Por Criterio Numérico', value: maintenanceByType.number },
    ],
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    legend: {
      position: 'right',
    },
    height: 400,
  };

  // Gauge Chart: Cumplimiento de Mantenimientos Programados
  const totalScheduled = equipments.reduce((acc, equipment) => acc + (equipment.scheduledMaintenances?.length || 0), 0);
  const today = new Date();
  const compliantScheduled = equipments.reduce((acc, equipment) => acc + (equipment.scheduledMaintenances?.filter((m) => {
    if (m.criteria.type === 'date') {
      return new Date(m.criteria.currentValue as string) >= today;
    }
    return false;
  }).length || 0), 0);
  const compliancePercentage = totalScheduled === 0 ? 0 : (compliantScheduled / totalScheduled) * 100;

  const gaugeConfig = {
    percent: compliancePercentage / 100,
    color: ['#30BF78', '#F5F5F5'],
    range: {
      ticks: [0, 1],
    },
    statistic: {
      title: {
        formatter: () => 'Cumplimiento',
      },
      content: {
        formatter: () => `${compliancePercentage.toFixed(2)}%`,
      },
    },
    height: 400,
  };

  // Indicadores: Estado de Equipos
  const totalEquipments = equipments.length;
  const activeEquipments = equipments.filter(e => e.isActive).length;
  const inactiveEquipments = totalEquipments - activeEquipments;

  // Definición de las columnas para la tabla de Ant Design
  const lastMaintenancesColumns = [
    {
      title: '#',
      key: 'index',
      render: (_: any, __: any, index: number) => index + 1,
      width: '5%',
    },
    {
      title: 'Equipo',
      dataIndex: ['equipment', 'name'],
      key: 'equipment',
      width: '20%',
    },
    {
      title: 'Mantenimiento',
      dataIndex: ['lastMaintenance', 'description'],
      key: 'maintenance',
      width: '20%',
    },
    {
      title: 'Criterio',
      dataIndex: ['lastMaintenance', 'criteria', 'name'],
      key: 'criteriaName',
      width: '20%',
    },
    {
      title: 'Valor Actual',
      dataIndex: ['lastMaintenance', 'criteria', 'currentValue'],
      key: 'currentValue',
      render: (_: any, record: any) =>
        record.lastMaintenance.criteria.type === 'date'
          ? record.lastMaintenance.criteria.currentValue
          : record.lastMaintenance.criteria.currentValue || 'No definido',
      width: '15%',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link to={`/equipment/${record.equipment.id}`}>
            <Button type="primary">Detalle</Button>
          </Link>
        </Space>
      ),
      width: '15%',
    },
  ];

  const scheduledMaintenancesColumns = [
    {
      title: '#',
      key: 'index',
      render: (_: any, __: any, index: number) => index + 1,
      width: '5%',
    },
    {
      title: 'Equipo',
      dataIndex: ['equipment', 'name'],
      key: 'equipment',
      width: '20%',
    },
    {
      title: 'Mantenimiento',
      dataIndex: ['scheduled', 'description'],
      key: 'maintenance',
      width: '20%',
    },
    {
      title: 'Criterio',
      dataIndex: ['scheduled', 'criteria', 'name'],
      key: 'criteriaName',
      width: '20%',
    },
    {
      title: 'Restante',
      dataIndex: 'remaining',
      key: 'remaining',
      width: '15%',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link to={`/equipment/${record.equipment.id}`}>
            <Button type="primary">Detalle</Button>
          </Link>
        </Space>
      ),
      width: '20%',
    },
  ];

  return (
    <div className="w-full h-auto p-4 bg-gray-100 overflow-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

      {/* Indicadores de Estado de Equipos */}
      <Row gutter={[16, 16]} className="mb-6">
        {/* Total de Equipos */}
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            style={{ backgroundColor: '#e6f7ff', }}
            className="shadow-lg flex "
          >
            <Space align="center">
              <DatabaseOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <Statistic title="Total de Equipos" value={totalEquipments} />
            </Space>
          </Card>
        </Col>

        {/* Equipos Activos */}
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            style={{ backgroundColor: '#f6ffed' }}
            className="shadow-lg"
          >
            <Space align="center">
              <CheckCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
              <Statistic title="Equipos Activos" value={activeEquipments} />
            </Space>
          </Card>
        </Col>

        {/* Equipos Inactivos */}
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            style={{ backgroundColor: '#fff1f0' }}
            className="shadow-lg"
          >
            <Space align="center">
              <CloseCircleOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />
              <Statistic title="Equipos Inactivos" value={inactiveEquipments} />
            </Space>
          </Card>
        </Col>

        {/* Cumplimiento de Mantenimientos */}
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            style={{ backgroundColor: '#fffbe6' }}
            className="shadow-lg"
          >
            <Space align="center">
              <PercentageOutlined style={{ fontSize: '24px', color: '#faad14' }} />
              <Statistic
                title="Cumplimiento de Mantenimientos"
                value={compliancePercentage}
                precision={2}
                suffix="%"
              />
            </Space>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Últimos Mantenimientos */}
        <Col span={24} lg={12}>
          <section className="bg-white shadow rounded p-4">
            <h2 className="text-2xl font-bold mb-4">Últimos Mantenimientos</h2>
            <Table
              columns={lastMaintenancesColumns}
              dataSource={lastMaintenances}
              rowKey={(record) => record.equipment.id + record.lastMaintenance.description}
              pagination={{ pageSize: 5 }}
              bordered
            />
          </section>
        </Col>

        {/* Mantenimientos Programados a Vencer */}
        <Col span={24} lg={12}>
          <section className="bg-white shadow rounded p-4">
            <h2 className="text-2xl font-bold mb-4">Mantenimientos Programados a Vencer</h2>
            <Table
              columns={scheduledMaintenancesColumns}
              dataSource={scheduledMaintenancesToExpire}
              rowKey={(record) => record.equipment.id + record.scheduled.description}
              pagination={{ pageSize: 5 }}
              bordered
            />
          </section>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-6">
        {/* Gráfica de Barras */}
        <Col span={24} lg={12}>
          <section className="bg-white shadow rounded p-4">
            <h2 className="text-2xl font-bold mb-4">Mantenimientos por Equipo</h2>
            <Bar {...barChartConfig} />
          </section>
        </Col>

        {/* Gráfica de Pie */}
        <Col span={24} lg={12}>
          <section className="bg-white shadow rounded p-4">
            <h2 className="text-2xl font-bold mb-4">Distribución de Mantenimientos</h2>
            <Pie {...pieChartConfig} />
          </section>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

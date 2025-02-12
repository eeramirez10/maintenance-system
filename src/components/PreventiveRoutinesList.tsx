

import Table, { ColumnsType } from 'antd/es/table';
import React from 'react'
import { Routine } from '../interface/equipment.type';
import { calculateRemaining } from '../utils/calculateRemaining';

interface Props {
  preventiveRoutines: Routine[]
}


export const PreventiveRoutinesList: React.FC<Props> = ({preventiveRoutines}) => {

  const PreventiveColumns: ColumnsType<Routine> = [
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Criterio',
      dataIndex: ['criteria', 'name'],
      key: 'criteria',
      render: (text) => text || 'No definido',
    },
    {
      title: 'Valor Actual',
      dataIndex: ['criteria', 'currentValue'],
      key: 'currentValue',
      render: (value, record) =>
        record.criteria?.type === 'date'
          ? value || 'No definido'
          : record.criteria?.currentValue ?? 'No definido',
    },
    {
      title: 'Rango',
      dataIndex: 'criteria',
      key: 'range',
      render: (_, record) => {
        if (record.criteria?.type === 'number') {
          const min = record.criteria.minValue ?? 'N/A';
          const max = record.criteria.maxValue ?? 'N/A';
          return `Min: ${min}, Max: ${max}`;
        }
        return '-';
      },
    },
    {
      title: 'Prioridad (%)',
      dataIndex: 'priorityPercentage',
      key: 'priorityPercentage',
      render: (value) => value ?? '-',
    },
    {
      title: 'Tiempo Estimado (min)',
      dataIndex: 'estimatedTime',
      key: 'estimatedTime',
      render: (value) => value ?? '-',
    },
    {
      title: 'Tiempo Real (min)',
      dataIndex: 'actualTime',
      key: 'actualTime',
      render: (value) => value ?? '-',
    },
    {
      title: 'Paro Planeado (min)',
      dataIndex: 'plannedDowntime',
      key: 'plannedDowntime',
      render: (value) => value ?? '-',
    },
    {
      title: 'Paro Real (min)',
      dataIndex: 'actualDowntime',
      key: 'actualDowntime',
      render: (value) => value ?? '-',
    },
    {
      title: 'Foto Antes',
      dataIndex: 'photoBefore',
      key: 'photoBefore',
      render: (value) => (value ? value : '-'),
    },
    {
      title: 'Foto Después',
      dataIndex: 'photoAfter',
      key: 'photoAfter',
      render: (value) => (value ? value : '-'),
    },
    {
      title: 'Estado',
      dataIndex: 'criteria',
      key: 'status',
      render: (criteria) => calculateRemaining(criteria),
    },
  ];


  return (
    <Table
    columns={PreventiveColumns}
    dataSource={preventiveRoutines}
    rowKey={(record) => record.description} // o record.id si lo tienes
    pagination={false}
    bordered
  />
  )
}

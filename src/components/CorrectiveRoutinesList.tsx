

import Table, { ColumnsType } from 'antd/es/table';
import React from 'react'
import { Routine } from '../interface/equipment.type';
import { calculateRemaining } from '../utils/calculateRemaining';

interface Props {
  correctiveRoutines: Routine[]
}


export const CorrectiveRoutinesList: React.FC<Props> = ({correctiveRoutines}) => {

 const CorrectiveColumns: ColumnsType<Routine> = [
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
      title: 'Categoría de Falla',
      dataIndex: 'failureCategory',
      key: 'failureCategory',
      render: (value) => value || '-',
    },
    {
      title: 'Descripción de Falla',
      dataIndex: 'failureDescription',
      key: 'failureDescription',
      render: (value) => value || '-',
    },
    {
      title: 'Fecha Inicio Falla',
      dataIndex: 'failureStartDate',
      key: 'failureStartDate',
      render: (value) => value || '-',
    },
    {
      title: 'Fecha Reparación',
      dataIndex: 'failureEndDate',
      key: 'failureEndDate',
      render: (value) => value || '-',
    },
    // {
    //   title: 'Costo de Reparación',
    //   dataIndex: 'repairCost',
    //   key: 'repairCost',
    //   render: (value) => value ?? '-',
    // },
    {
      title: 'Tiempo de Reparación (min)',
      dataIndex: 'repairTime',
      key: 'repairTime',
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
  ];


  return (
    <Table
    columns={CorrectiveColumns}
    dataSource={correctiveRoutines}
    rowKey={(record) => record.description} // o record.id si lo tienes
    pagination={false}
    bordered
  />
  )
}

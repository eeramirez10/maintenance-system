import React from 'react';
import { Link } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Equipment } from '../types';
import { calculateRemaining } from '../utils/calculateRemaining';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

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
          .filter(Boolean)
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

  const barChartData = {
    labels: maintenanceByEquipment.map((item) => item.name),
    datasets: [
      {
        label: 'Mantenimientos Programados',
        data: maintenanceByEquipment.map((item) => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const pieChartData = {
    labels: ['Por Fecha', 'Por Criterio Numérico'],
    datasets: [
      {
        data: [maintenanceByType.date, maintenanceByType.number],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
      },
    ],
  };

  return (
    <div className="w-full h-screen p-4 bg-gray-100 overflow-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Últimos Mantenimientos */}
        <section className="bg-white shadow rounded p-4 h-[500px] overflow-auto">
          <h2 className="text-2xl font-bold mb-4">Últimos Mantenimientos</h2>
          {lastMaintenances.length > 0 ? (
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border border-gray-300 px-4 py-2">Equipo</th>
                  <th className="border border-gray-300 px-4 py-2">Mantenimiento</th>
                  <th className="border border-gray-300 px-4 py-2">Criterio</th>
                  <th className="border border-gray-300 px-4 py-2">Valor Actual</th>
                  <th className="border border-gray-300 px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {lastMaintenances.map(({ equipment, lastMaintenance }, index) => (
                  <tr key={index} className="text-gray-700 hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{equipment.name}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {lastMaintenance.description}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {lastMaintenance.criteria?.name || 'No definido'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {lastMaintenance.criteria?.type === 'date'
                        ? lastMaintenance.criteria.currentValue
                        : lastMaintenance.criteria?.currentValue || 'No definido'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <Link
                        to={`/equipment/${equipment.id}`}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Ver Equipo
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No hay mantenimientos recientes registrados.</p>
          )}
        </section>

        {/* Mantenimientos Programados a Vencer */}
        <section className="bg-white shadow rounded p-4 h-[500px] overflow-auto">
          <h2 className="text-2xl font-bold mb-4">Mantenimientos Programados a Vencer</h2>
          {scheduledMaintenancesToExpire.length > 0 ? (
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border border-gray-300 px-4 py-2">Equipo</th>
                  <th className="border border-gray-300 px-4 py-2">Mantenimiento</th>
                  <th className="border border-gray-300 px-4 py-2">Criterio</th>
                  <th className="border border-gray-300 px-4 py-2">Restante</th>
                  <th className="border border-gray-300 px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {scheduledMaintenancesToExpire.map(({ equipment, scheduled, remaining }, index) => (
                  <tr key={index} className="text-gray-700 hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{equipment.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{scheduled.description}</td>
                    <td className="border border-gray-300 px-4 py-2">{scheduled.criteria.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{remaining}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <Link
                        to={`/equipment/${equipment.id}`}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Ver Equipo
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No hay mantenimientos programados a vencer registrados.</p>
          )}
        </section>

        {/* Gráfico de Barras */}
        <section className="bg-white shadow rounded p-4">
          <h2 className="text-2xl font-bold mb-4">Mantenimientos por Equipo</h2>
          <Bar data={barChartData} />
        </section>

        {/* Gráfico de Pie */}
        <section className="bg-white shadow rounded p-4">
          <h2 className="text-2xl font-bold mb-4">Distribución de Mantenimientos</h2>
          <Pie data={pieChartData} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

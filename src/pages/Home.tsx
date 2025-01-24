import React from 'react';
import EquipmentList from '../components/EquipmentList';
import { Component, Equipment } from '../types';

interface HomeProps {
  equipments: Equipment[];
  components: Component[]
  onDelete: (id: number) => void;
}

const Home: React.FC<HomeProps> = ({ equipments,components, onDelete }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Lista de Equipos</h1>
      {equipments.length > 0 ? (
        <EquipmentList equipments={equipments} components={components} onDelete={onDelete} />
      ) : (
        <p className="text-center text-gray-500">No hay equipos registrados.</p>
      )}
    </div>
  );
};

export default Home;
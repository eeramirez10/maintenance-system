import React, { useState } from 'react';
import ComponentList from '../components/ComponentList';
import { Component } from '../types';

interface ComponentListPageProps {
  components: Component[];
  onDelete: (id: number) => void;
}

const ComponentListPage: React.FC<ComponentListPageProps> = ({ components, onDelete }) => {
  return (
    <div className="p-8 max-w-6xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Todos los Componentes</h1>
      <ComponentList components={components} onDelete={onDelete} />
    </div>
  );
};

export default ComponentListPage;

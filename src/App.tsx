import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddEquipment from './pages/AddEquipment';
import EditEquipment from './pages/EditEquipment';
import { Component, Equipment } from './types';
import Navbar from './components/Navbar';
import mockEquipments from './mocks/equipments';
import EquipmentDetails from './pages/EquipmentDetails';
import ScheduleMaintenance from './pages/ScheduleMaintenance';
import ComponentListPage from './pages/ComponentListPage';
import ComponentDetails from './pages/ComponentDetails';
import mockComponents from './mocks/mockcomponents';
import EditComponent from './pages/EditComponent';
import LinkComponentsPage from './pages/LinkComponentsPage';
import AddComponent from './pages/AddComponent';
import LinkComponentToEquipmentPage from './pages/LinkComponentToEquipmentPage';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>(mockEquipments);
  const [components, setComponents] = useState(mockComponents);


  const handleLinkComponent = (equipmentId: number, componentId: number) => {
    setComponents((prevComponents) =>
      prevComponents.map((component) =>
        component.id === componentId ? { ...component, relatedEquipmentId: equipmentId } : component
      )
    );
  };


  const handleAddEquipment = (equipment: Omit<Equipment, 'id'>) => {
    setEquipments([...equipments, { id: Date.now(), ...equipment }]);
  };

  const handleUpdate = (updatedEquipment: Equipment) => {
    setEquipments(
      equipments.map((equip) =>
        equip.id === updatedEquipment.id ? updatedEquipment : equip
      )
    );
  };

  const handleDelete = (id: number) => {
    setEquipments(equipments.filter((equip) => equip.id !== id));
  };


  const handleDeleteComponent = (id: number) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este componente?');
    if (confirmed) {
      setComponents(components.filter((component) => component.id !== id));
    }
  };

  const handleUpdateComponent = (updatedComponent: Component) => {
    setComponents((prevComponents) =>
      prevComponents.map((comp) =>
        comp.id === updatedComponent.id ? updatedComponent : comp
      )
    );
  };

  const handleAddComponent = (newComponent: Component) => {
    setComponents((prevComponents) => [...prevComponents, newComponent]);
  };

  const handleLinkComponentToEquipment = (componentId: number, equipmentId: number) => {
    setComponents((prevComponents) =>
      prevComponents.map((component) =>
        component.id === componentId ? { ...component, relatedEquipmentId: equipmentId } : component
      )
    );
  };

  const handleDeleteEquipment = (id: number) => {
    // Lógica para eliminar el equipo
    setEquipments(equipments.filter(equipment => equipment.id !== id));
    
    // Opcional: también eliminar componentes relacionados
    setComponents(components.filter(component => component.relatedEquipmentId !== id));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/equipments"
          element={<Home equipments={equipments} components={components}  />}
        />
        <Route
          path="/add-equipment"
          element={<AddEquipment  />}
        />
        <Route
          path="/equipment/:id"
          element={<EquipmentDetails components={components} onDeleteEquipment={handleDeleteEquipment }  />}
        />
        <Route
          path="/edit-equipment/:id"
          element={<EditEquipment equipments={equipments} onUpdate={handleUpdate} />}
        />

        <Route
          path="/schedule-maintenance/:id"
          element={<ScheduleMaintenance equipments={equipments} onUpdate={handleUpdate} />}
        />

        <Route
          path="/add-component"
          element={<AddComponent onAdd={handleAddComponent} equipments={equipments} />}
        />

        <Route
          path="/link-components/:id"
          element={
            <LinkComponentsPage
              equipments={equipments}
              components={components}
              onLinkComponent={handleLinkComponent}
            />
          }
        />
        <Route
          path="/link-component/:id"
          element={
            <LinkComponentToEquipmentPage
              components={components}
              equipments={equipments}
              onLinkComponentToEquipment={handleLinkComponentToEquipment}
            />
          }
        />

        <Route path="/" element={<Dashboard equipments={equipments} />} />


        <Route path="/components" element={<ComponentListPage components={components} onDelete={handleDeleteComponent} />} />
        <Route path="/component/:id" element={<ComponentDetails components={components} equipments={equipments} />} />
        <Route path="/edit-component/:id" element={<EditComponent components={components} onUpdate={handleUpdateComponent} />} />


      </Routes>
    </Router>
  );
};

export default App;

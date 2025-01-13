import './App.css'
import { EquipoProvider } from './context/EquipoContext'
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import { Sidebar } from './presentation/sidebar/Sidebar'
import Home from './presentation/Home/pages/Home'
import { EquipmentList } from './presentation/equipo/pages/EquipoList'
import History from './presentation/History/pages/History'
import Settings from './presentation/Settings/pages/Settings'
import { AddEquipment } from './presentation/equipo/pages/AddEquipment'
import EditEquipmentPage from './presentation/equipo/pages/EditEquipment'
import RegisterMaintenance from './presentation/equipo/pages/RegisterMaintenance'
import Login from './presentation/auth/Login'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './ProtectedRoute'
import RegisterFailure from './presentation/equipo/pages/RegisterFailure'
import ScheduleMaintenance from './presentation/equipo/pages/ScheduleMaintenance'

function App() {

  return (
    <AuthProvider>
      <EquipoProvider>
        <Router>
          <Routes>
            {/* Ruta Pública */}
            <Route path="/" element={<Login />} />

            {/* Rutas Protegidas */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <ProtectedLayout />
                </ProtectedRoute>
              }
            >
              <Route path='home' element={<Home />} />
              <Route path="equipment" element={<EquipmentList />} />
              <Route path="add-equipment" element={<AddEquipment />} />
              <Route path="edit-equipment/:id" element={<EditEquipmentPage />} />
              <Route path="register-maintenance/:id" element={<RegisterMaintenance />} />
              <Route path="register-failure/:id" element={<RegisterFailure />} />
              <Route path="schedule-maintenance/:id" element={<ScheduleMaintenance />} />


              
              <Route path="history" element={<History />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </EquipoProvider>
    </AuthProvider>
  )
}

export default App


const ProtectedLayout: React.FC = () => {
  return (
    <div className="  flex bg-gray-100">
      <Sidebar />
      <div className="l flex-1 p-6">
        <Outlet /> {/* Renderiza las rutas anidadas aquí */}
      </div>
    </div>
  );
};
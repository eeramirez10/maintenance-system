import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { EquipmentProvider } from './context/EquipmentContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { UserProvider } from './context/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <EquipmentProvider >
          <App />
        </EquipmentProvider>
      </UserProvider>

    </AuthProvider>
  </StrictMode>,
)

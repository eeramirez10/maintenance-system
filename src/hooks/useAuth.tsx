import  { useContext } from 'react'
import AuthContext from '../context/AuthContext';
import { message } from 'antd';
import mockUsers from '../mocks/users';

interface Props {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuth = ():Props => {

  const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }

    const { isAuthenticated, setIsAuthenticated } = context

    const login = (email: string, password: string): boolean => {
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      setIsAuthenticated(true);
      message.success("Inicio de sesión exitoso");
      return true;
    } else {
      message.error("Credenciales incorrectas");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    message.success("Sesión cerrada");
  };

  return {
    isAuthenticated,
    login,
    logout
  }
}

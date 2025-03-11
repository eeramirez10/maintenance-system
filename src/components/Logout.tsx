// src/components/Logout.tsx
import React from "react";
import { Button } from "antd";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";

const Logout: React.FC = () => {
  const { logout } = useAuth();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/login"); // Redirige al Login después de cerrar sesión
  };

  return (
    <Button type="link" onClick={handleLogout} style={{ color: "#fff" }}>
      Cerrar Sesión
    </Button>
  );
};

export default Logout;

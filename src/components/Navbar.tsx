// src/components/Navbar.tsx
import React from "react";
import { Menu, Layout, Avatar } from "antd";
import { Link } from "react-router-dom";

import Logout from "./Logout";
import { useUser } from "../hooks/useUser";


const { Header } = Layout;

const Navbar: React.FC = () => {
  const { user } = useUser();

  return (
    <Layout>
      <Header>
        <div style={{ float: "left", color: "#fff", fontSize: "20px", marginRight: "20px" }}>
          Dashboard
        </div>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link to="/">Inicio</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/equipments">Equipos</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/components">Componentes</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/reports">Reportes</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/warehouse">Almacen</Link>
          </Menu.Item>
          {/* Agrega más enlaces según sea necesario */}
          <Menu.Item key="user" style={{ marginLeft: "auto" }}>
            {user && (
              <>
                <Avatar src={user.profilePicture} style={{ marginRight: 8 }} />
                {user.name}
            
              </>
            )}
          </Menu.Item>
          <Menu.Item>
            <Logout />
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;

// src/pages/Login.tsx
import React from "react";
import { Form, Input, Button, Card, Typography, Row, Col, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";

const { Title, Text } = Typography;

// Estilos personalizados utilizando styled-components
const Background = styled.div`
  background: url('https://img.freepik.com/vector-gratis/fondo-geometrico-abstracto-estructura-metalica_52683-59421.jpg?t=st=1738215725~exp=1738219325~hmac=f812e1aac383c6f8bb0a4e4c622737a607b7e7bb4525be3b5e6197d8c40ac788&w=996') no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  background: rgba(255, 255, 255, 0.85);
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
`;

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const onFinish = (values: { email: string; password: string }) => {
    const success = login(values.email, values.password);
    if (success) {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      setUser(storedUser);
      navigate("/"); // Redirige al Dashboard
    }
  };

  return (
    <Background>
      <LoginContainer>
        <Row justify="center" align="middle">
          <Col>
            <Card>
              <Row justify="center" style={{ marginBottom: 20 }}>
                {/* Logo o Imagen */}
                <img
                  src="https://media.istockphoto.com/id/1488761029/es/vector/abstracto-amanecer-sol-ma%C3%B1ana-amanecer-estallido-rayo-brillo-brillo-simple-dise%C3%B1o-vectorial.jpg?s=612x612&w=0&k=20&c=l-1QizH5A2aNW1OVAmq47MvnpZ3LL-wzY6GQN6qeuEU=" // Reemplaza con tu URL de logo
                  alt="Logo"
                  style={{ width: 100, marginBottom: 20 }}
                />
              </Row>
              <Title level={3} style={{ textAlign: "center" }}>
                Iniciar Sesión
              </Title>
              <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
              >
                <Form.Item
                  name="email"
                  label="Correo Electrónico"
                  rules={[
                    { required: true, message: "Por favor, ingresa tu correo electrónico" },
                    { type: "email", message: "Por favor, ingresa un correo válido" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Correo electrónico"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Contraseña"
                  rules={[{ required: true, message: "Por favor, ingresa tu contraseña" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Contraseña"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Ingresar
                  </Button>
                </Form.Item>
                <Divider />
                <Row justify="center">
                  <Text type="secondary">© 2025 Tu Empresa. Todos los derechos reservados.</Text>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </LoginContainer>
    </Background>
  );
};

export default LoginPage;

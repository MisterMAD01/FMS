// src/Common/LoginPage.js

import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate(); // Hook สำหรับเปลี่ยนหน้า

  // ถ้าล็อกอินอยู่แล้ว ให้ redirect ไปหน้าหลักเลย
  if (isLoggedIn) {
    navigate("/");
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (login(username, password)) {
      // ถ้า login สำเร็จ ให้ไปยังหน้าหลัก
      navigate("/");
    }
  };

  return (
    <Container
      style={{ minHeight: "60vh", paddingTop: "50px", paddingBottom: "50px" }}
    >
      <div className="d-flex justify-content-center">
        <Card
          style={{ width: "100%", maxWidth: "450px" }}
          className="shadow-lg border-danger border-2"
        >
          <Card.Header className="bg-danger text-white text-center fw-bold fs-5">
            <i className="fas fa-sign-in-alt me-2"></i> เข้าสู่ระบบ RedMart
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>ชื่อผู้ใช้ (Username)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="กรอกชื่อผู้ใช้ (ทดสอบ: admin)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>รหัสผ่าน (Password)</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="กรอกรหัสผ่าน (ทดสอบ: 1234)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="d-grid gap-2 mt-4">
                <Button variant="danger" type="submit" size="lg">
                  ล็อกอิน
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default LoginPage;

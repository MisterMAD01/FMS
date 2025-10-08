// src/Common/Navbars.js

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import { useAuth } from "./AuthContext";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import NavDropdown from "react-bootstrap/NavDropdown";

const Navbars = () => {
  const { cartTotalQuantity } = useContext(CartContext);
  // ดึง user object มาใช้ในการตรวจสอบ role
  const { isLoggedIn, user, logout } = useAuth();

  // 🌟 ตรวจสอบว่าผู้ใช้ปัจจุบันเป็น Admin หรือไม่
  const isAdmin = isLoggedIn && user && user.role === "admin";

  return (
    <Navbar bg="danger" expand="lg" variant="dark" className="shadow-sm">
      <div className="container">
        <Navbar.Brand as={Link} to="/">
          <span className="fw-bold fs-5">🔴 RedMart E-Commerce</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              หน้าหลัก
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              สินค้าทั้งหมด
            </Nav.Link>

            {/* 🔒 แสดงลิงก์เพิ่มสินค้า เฉพาะบทบาท 'admin' */}
            {isAdmin && (
              <Nav.Link
                as={Link}
                to="/add-product"
                className="text-warning fw-bold"
              >
                <i className="fas fa-plus-square me-1"></i> เพิ่มสินค้า
              </Nav.Link>
            )}

            {/* 🔒 แสดงลิงก์จัดการสินค้า เฉพาะบทบาท 'admin' */}
            {isAdmin && (
              <Nav.Link
                as={Link}
                to="/manage-products"
                className="text-warning fw-bold"
              >
                <i className="fas fa-tasks me-1"></i> จัดการสินค้า
              </Nav.Link>
            )}

            <NavDropdown title="หมวดหมู่สินค้า" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/products">
                ดูทั้งหมด
              </NavDropdown.Item>
              <NavDropdown.Item href="#bedding">ชุดเครื่องนอน</NavDropdown.Item>
              <NavDropdown.Item href="#electronics">
                เครื่องใช้ไฟฟ้า
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#stationery">
                เครื่องเขียน
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form className="d-flex me-3">
            <FormControl
              type="text"
              placeholder="ค้นหาสินค้า..."
              className="me-2"
            />
            <Button variant="outline-light">ค้นหา</Button>
          </Form>

          {/* ส่วน Login และ Cart */}
          <Nav className="align-items-center">
            {/* แสดงชื่อผู้ใช้และบทบาท */}
            {isLoggedIn && (
              <Navbar.Text className="me-3 text-warning fw-bold">
                <i className="fas fa-user-circle me-1"></i>
                {user.role === "admin"
                  ? `แม่ค้า: ${user.username}`
                  : `ลูกค้า: ${user.username}`}
              </Navbar.Text>
            )}

            {/* ปุ่ม Cart */}
            <Nav.Link as={Link} to="/cart" className="p-0 me-3">
              <Button variant="light" className="position-relative">
                <i className="fas fa-shopping-cart me-1 text-danger"></i>
                ตะกร้า
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                  {cartTotalQuantity}
                  <span className="visually-hidden">สินค้าในตะกร้า</span>
                </span>
              </Button>
            </Nav.Link>

            {/* ปุ่ม Login / Logout */}
            {isLoggedIn ? (
              <Button variant="light" onClick={logout}>
                <i className="fas fa-sign-out-alt me-1 text-danger"></i>{" "}
                ออกจากระบบ
              </Button>
            ) : (
              <Nav.Link as={Link} to="/login" className="p-0">
                <Button variant="light">
                  <i className="fas fa-sign-in-alt me-1 text-danger"></i>{" "}
                  ล็อกอิน
                </Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Navbars;

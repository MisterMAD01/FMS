// src/Common/Navbars.js

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import NavDropdown from "react-bootstrap/NavDropdown";

const Navbars = () => {
  const { cartTotalQuantity } = useContext(CartContext);

  return (
    <Navbar bg="danger" expand="lg" variant="dark" className="shadow-sm">
      <div className="container">
        <Navbar.Brand as={Link} to="/">
          <span className="fw-bold fs-5">🔴 RedMart E-Commerce</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* เมนูหลักภาษาไทย */}
            <Nav.Link as={Link} to="/">
              หน้าหลัก
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              สินค้าทั้งหมด
            </Nav.Link>

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

          {/* ปุ่มตะกร้าสินค้า */}
          <Nav>
            <Nav.Link as={Link} to="/cart">
              <Button variant="light" className="position-relative">
                <i className="fas fa-shopping-cart me-1 text-danger"></i>
                ตะกร้า
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                  {cartTotalQuantity}
                  <span className="visually-hidden">สินค้าในตะกร้า</span>
                </span>
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Navbars;

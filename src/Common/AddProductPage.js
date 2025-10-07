// src/Common/AddProductPage.js

import React, { useState } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { useProduct } from "./ProductContext";
import { useNavigate } from "react-router-dom";

const categories = [
  "ชุดเครื่องนอน",
  "เครื่องใช้ไฟฟ้า",
  "เครื่องเขียน",
  "อื่นๆ",
];

const AddProductPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const { addProduct } = useProduct();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && price && category) {
      const newProduct = {
        name: name,
        // ลบเครื่องหมายจุลภาคออก และแปลงเป็น string เพื่อให้เข้ากับรูปแบบข้อมูลเดิม
        price: price.replace(/,/g, ""),
        category: category,
      };

      addProduct(newProduct);

      alert(`เพิ่มสินค้า "${name}" สำเร็จแล้ว!`);
      navigate("/products"); // เมื่อเพิ่มเสร็จ ให้ไปที่หน้าสินค้าทั้งหมด
    }
  };

  return (
    <Container
      style={{ minHeight: "60vh", paddingTop: "50px", paddingBottom: "50px" }}
    >
      <div className="d-flex justify-content-center">
        <Card
          style={{ width: "100%", maxWidth: "700px" }}
          className="shadow-lg border-danger border-2"
        >
          <Card.Header className="bg-danger text-white text-center fw-bold fs-5">
            <i className="fas fa-plus-circle me-2"></i> เพิ่มสินค้าใหม่
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={8}>
                  <Form.Group className="mb-3" controlId="productName">
                    <Form.Label>ชื่อสินค้า</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ผ้านวม, ทีวี, ปากกา..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="productPrice">
                    <Form.Label>ราคา (บาท)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="1,500"
                      value={price}
                      onChange={(e) =>
                        setPrice(e.target.value.replace(/[^0-9,]/g, ""))
                      }
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="productCategory">
                <Form.Label>หมวดหมู่สินค้า</Form.Label>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="productImage">
                <Form.Label>รูปภาพสินค้า (ใช้ภาพ Placeholder)</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue="%PUBLIC_URL%/logo512.png"
                  disabled
                />
              </Form.Group>

              <div className="d-grid gap-2 mt-4">
                <Button variant="danger" type="submit" size="lg">
                  <i className="fas fa-save me-2"></i> บันทึกสินค้า
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default AddProductPage;

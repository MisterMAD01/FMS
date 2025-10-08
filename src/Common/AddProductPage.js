// src/Common/AddProductPage.js (ฉบับแก้ไขเพื่อรองรับ URL รูปภาพภายนอก)

import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Card,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
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
  const [image, setImage] = useState("");
  const [urlWarning, setUrlWarning] = useState("");

  const { addProduct } = useProduct();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const newUrl = e.target.value;
    setImage(newUrl);

    if (
      newUrl.includes("google.com/url?") ||
      newUrl.includes("google.com/imgres?")
    ) {
      setUrlWarning(
        "⚠️ URL นี้ดูเหมือนเป็นลิงก์ Google Search กรุณาใช้ URL รูปภาพโดยตรง (Direct Image Link) เท่านั้น"
      );
    } else {
      setUrlWarning("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (urlWarning) {
      alert("ไม่สามารถบันทึกได้: กรุณาแก้ไข URL รูปภาพให้เป็นลิงก์ตรง");
      return;
    }

    if (name && price && category) {
      const newProduct = {
        name: name,
        price: price.replace(/,/g, ""),
        category: category,
        image: image,
      };

      addProduct(newProduct);

      alert(`เพิ่มสินค้า "${name}" สำเร็จแล้ว!`);
      navigate("/products");
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
                <Form.Label>URL รูปภาพสินค้า (ภายนอก)</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://example.com/new-product.jpg (เว้นว่างเพื่อใช้รูปเริ่มต้น)"
                  value={image}
                  onChange={handleImageChange}
                />

                {urlWarning && (
                  <Alert variant="danger" className="mt-2 small p-2">
                    {urlWarning}
                  </Alert>
                )}

                {image && !urlWarning && (
                  <div className="mt-2">
                    <img
                      src={image}
                      alt="Preview"
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        border: "1px solid #ccc",
                      }}
                      className="rounded"
                    />
                    <p className="text-muted small mt-1">ตัวอย่างรูปภาพ</p>
                  </div>
                )}
              </Form.Group>

              <div className="d-grid gap-2 mt-4">
                <Button
                  variant="danger"
                  type="submit"
                  size="lg"
                  disabled={!!urlWarning}
                >
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

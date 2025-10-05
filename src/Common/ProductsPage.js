// src/Common/ProductsPage.js

import React, { useState } from "react";
import ProductsItem from "./ProductsItem";
import { Container, Row, Col, ListGroup, Card, Form } from "react-bootstrap";

// ✅ กำหนด Path รูปภาพใหม่: ใช้ logo512.png
const productImagePath = "logo512.png";

// ข้อมูลสินค้าทั้งหมด (เปลี่ยน image ให้ใช้ productImagePath)
const allProductsData = [
  // ชุดเครื่องนอน
  {
    name: "ผ้านวม",
    price: "1,800",
    image: productImagePath,
    category: "ชุดเครื่องนอน",
  },
  {
    name: "หมอนข้าง",
    price: "900",
    image: productImagePath,
    category: "ชุดเครื่องนอน",
  },
  {
    name: "ผ้าปูที่นอน",
    price: "2,500",
    image: productImagePath,
    category: "ชุดเครื่องนอน",
  },
  {
    name: "หมอน",
    price: "1,500",
    image: productImagePath,
    category: "ชุดเครื่องนอน",
  },

  // เครื่องใช้ไฟฟ้า
  {
    name: "ทีวี",
    price: "4,500",
    image: productImagePath,
    category: "เครื่องใช้ไฟฟ้า",
  },
  {
    name: "วีดีโอ",
    price: "6,500",
    image: productImagePath,
    category: "เครื่องใช้ไฟฟ้า",
  },
  {
    name: "ตู้เย็น",
    price: "7,500",
    image: productImagePath,
    category: "เครื่องใช้ไฟฟ้า",
  },
  {
    name: "เครื่องซักผ้า",
    price: "8,900",
    image: productImagePath,
    category: "เครื่องใช้ไฟฟ้า",
  },

  // เครื่องเขียน
  {
    name: "สมุด",
    price: "25",
    image: productImagePath,
    category: "เครื่องเขียน",
  },
  {
    name: "ปากกา",
    price: "15",
    image: productImagePath,
    category: "เครื่องเขียน",
  },
  {
    name: "ยางลบ",
    price: "20",
    image: productImagePath,
    category: "เครื่องเขียน",
  },
  {
    name: "ไม้บรรทัด",
    price: "30",
    image: productImagePath,
    category: "เครื่องเขียน",
  },
];

const categories = [...new Set(allProductsData.map((item) => item.category))];

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  let filteredProducts =
    selectedCategory === "All"
      ? allProductsData
      : allProductsData.filter(
          (product) => product.category === selectedCategory
        );

  // Logic การจัดเรียง
  if (sortBy === "price_asc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) =>
        parseFloat(a.price.replace(/,/g, "")) -
        parseFloat(b.price.replace(/,/g, ""))
    );
  } else if (sortBy === "price_desc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) =>
        parseFloat(b.price.replace(/,/g, "")) -
        parseFloat(a.price.replace(/,/g, ""))
    );
  }

  return (
    <Container className="mt-4 mb-5" style={{ minHeight: "70vh" }}>
      <h2 className="text-center text-danger mb-5">สินค้าทั้งหมดใน RedMart</h2>

      <Row>
        <Col lg={3}>
          <Card className="shadow-sm border-danger border-2 mb-4">
            <Card.Header className="bg-danger text-white fw-bold">
              <i className="fas fa-filter me-2"></i> กรองตามหมวดหมู่
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item
                action
                onClick={() => setSelectedCategory("All")}
                active={selectedCategory === "All"}
              >
                <i className="fas fa-tag me-2"></i> สินค้าทั้งหมด (
                {allProductsData.length})
              </ListGroup.Item>

              {categories.map((category) => (
                <ListGroup.Item
                  key={category}
                  action
                  onClick={() => setSelectedCategory(category)}
                  active={selectedCategory === category}
                >
                  {category}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>

          <Card className="shadow-sm border-danger border-2">
            <Card.Header className="bg-danger text-white fw-bold">
              <i className="fas fa-sort me-2"></i> จัดเรียงสินค้า
            </Card.Header>
            <Card.Body>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">เลือกวิธีการจัดเรียง</option>
                <option value="price_asc">ราคา: น้อยไปมาก</option>
                <option value="price_desc">ราคา: มากไปน้อย</option>
              </Form.Select>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={9}>
          <h4 className="mb-4 text-danger border-bottom pb-2">
            {selectedCategory === "All" ? "สินค้าทั้งหมด" : selectedCategory} (
            {filteredProducts.length} รายการ)
          </h4>
          <Row className="text-center">
            {filteredProducts.map((product, index) => (
              <ProductsItem {...product} key={product.name + index} />
            ))}
          </Row>
          {filteredProducts.length === 0 && (
            <div className="alert alert-warning mt-4 text-center">
              ไม่พบสินค้าในหมวดหมู่นี้
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage;

// src/Common/ProductsPage.js

import React, { useState } from "react";
import ProductsItem from "./ProductsItem";
import { Container, Row, Col, ListGroup, Card, Form } from "react-bootstrap";
import { useProduct } from "./ProductContext"; // ✅ ดึง Context สินค้า

const ProductsPage = () => {
  // ✅ ดึงสินค้าทั้งหมดจาก ProductContext
  const { products: allProductsData } = useProduct();
  const categories = [...new Set(allProductsData.map((item) => item.category))];

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
        // แปลงราคาจาก string ที่มีจุลภาค ให้เป็น float
        parseFloat(String(a.price).replace(/,/g, "")) -
        parseFloat(String(b.price).replace(/,/g, ""))
    );
  } else if (sortBy === "price_desc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) =>
        parseFloat(String(b.price).replace(/,/g, "")) -
        parseFloat(String(a.price).replace(/,/g, ""))
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
            {filteredProducts.map((product) => (
              <ProductsItem
                {...product}
                key={product.id} // ใช้ id ที่กำหนดใน Context
              />
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

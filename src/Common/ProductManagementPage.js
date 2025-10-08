// src/Common/ProductManagementPage.js

import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form, Alert } from "react-bootstrap";
import { useProduct } from "./ProductContext";

// กำหนดหมวดหมู่สินค้าสำหรับการแก้ไข
const categories = [
  "ชุดเครื่องนอน",
  "เครื่องใช้ไฟฟ้า",
  "เครื่องเขียน",
  "อื่นๆ",
];

// -------------------------------------------
// Sub-Component: EditProductModal
// Modal สำหรับแสดงฟอร์มแก้ไขสินค้า
// -------------------------------------------
const EditProductModal = ({ show, handleClose, product, handleSave }) => {
  // State สำหรับฟอร์ม
  const [name, setName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(
    product ? product.price.replace(/,/g, "") : ""
  );
  const [category, setCategory] = useState(
    product ? product.category : categories[0]
  );
  const [image, setImage] = useState(product ? product.image : "");

  // State สำหรับข้อความเตือน URL
  const [urlWarning, setUrlWarning] = useState("");

  // อัปเดต State เมื่อ product ที่ส่งมาเปลี่ยน
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.replace(/,/g, ""));
      setCategory(product.category);
      setImage(product.image);
      setUrlWarning(""); // รีเซ็ตคำเตือนเมื่อเปิด Modal
    }
  }, [product]);

  // ฟังก์ชันจัดการการเปลี่ยนแปลง URL รูปภาพ พร้อมตรวจสอบลิงก์ Google Search
  const handleImageChange = (e) => {
    const newUrl = e.target.value;
    setImage(newUrl);

    // ตรวจสอบว่าเป็นลิงก์ Google Search หรือไม่
    if (
      newUrl.includes("google.com/url?") ||
      newUrl.includes("google.com/imgres?")
    ) {
      setUrlWarning(
        "⚠️ URL นี้ดูเหมือนเป็นลิงก์ Google Search กรุณาใช้ URL รูปภาพโดยตรง (Direct Image Link) เท่านั้น (คลิกขวาที่รูป > คัดลอกที่อยู่รูปภาพ)"
      );
    } else {
      setUrlWarning("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // บังคับไม่ให้บันทึกถ้า URL ยังมีข้อผิดพลาด
    if (urlWarning) {
      alert("ไม่สามารถบันทึกได้: กรุณาแก้ไข URL รูปภาพให้เป็นลิงก์ตรง");
      return;
    }

    const updatedProduct = {
      ...product,
      name,
      price: price.replace(/,/g, ""),
      category,
      image, // ส่ง URL รูปภาพใหม่กลับไปด้วย
    };
    handleSave(updatedProduct);
    handleClose();
  };

  if (!product) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title>แก้ไขสินค้า: {product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* ช่องฟอร์มสำหรับ URL รูปภาพ */}
          <Form.Group className="mb-3">
            <Form.Label>URL รูปภาพ</Form.Label>
            <Form.Control
              type="url"
              value={image}
              onChange={handleImageChange}
              placeholder="ใส่ URL รูปภาพสินค้าที่นี่"
            />

            {/* แสดงคำเตือนถ้า URL ไม่ถูกต้อง */}
            {urlWarning && (
              <Alert variant="danger" className="mt-2 small p-2">
                {urlWarning}
              </Alert>
            )}

            {/* แสดง Preview รูปภาพ เมื่อไม่มีคำเตือน */}
            {image && !urlWarning && (
              <div className="mt-2 text-center">
                <img
                  src={image}
                  alt="Preview"
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    border: "1px solid #ccc",
                  }}
                />
                <p className="text-muted small mt-1">ตัวอย่างรูปภาพ</p>
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>ชื่อสินค้า</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>ราคา (บาท)</Form.Label>
            <Form.Control
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ""))}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>หมวดหมู่</Form.Label>
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
          <div className="d-grid gap-2 mt-4">
            <Button variant="danger" type="submit">
              บันทึกการแก้ไข
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

// -------------------------------------------
// Main Component: ProductManagementPage
// -------------------------------------------
const ProductManagementPage = () => {
  const { products, editProduct, deleteProduct } = useProduct();

  // State สำหรับจัดการ Modal
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleSave = (updatedProduct) => {
    editProduct(updatedProduct);
  };

  return (
    <Container className="mt-5 mb-5" style={{ minHeight: "60vh" }}>
      <h2 className="text-center text-danger mb-4">
        <i className="fas fa-tasks me-2"></i> หน้าจัดการสินค้า (Admin)
      </h2>
      <p className="text-muted text-center">
        จำนวนสินค้าทั้งหมด: {products.length} รายการ
      </p>

      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-danger">
          <tr>
            <th>ID</th>
            <th>รูปภาพ</th>
            <th>ชื่อสินค้า</th>
            <th>หมวดหมู่</th>
            <th className="text-end">ราคา</th>
            <th className="text-center" style={{ width: "150px" }}>
              จัดการ
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                  className="rounded"
                />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td className="text-end fw-bold text-danger">
                ฿
                {parseFloat(
                  String(product.price).replace(/,/g, "")
                ).toLocaleString()}
              </td>
              <td className="text-center">
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(product)}
                >
                  <i className="fas fa-edit"></i>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteProduct(product.id)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal สำหรับแก้ไข */}
      {currentProduct && (
        <EditProductModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          product={currentProduct}
          handleSave={handleSave}
        />
      )}
    </Container>
  );
};

export default ProductManagementPage;

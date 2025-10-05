// src/Common/ProductDetail.js

import React, { useContext } from "react";
import { Modal, Button, Image } from "react-bootstrap";
import { CartContext } from "./CartContext";

const ProductDetail = ({ show, onHide, product }) => {
  const { addToCart } = useContext(CartContext);
  const { name, price, image, description } = product || {};

  const handleAddToCart = () => {
    if (name && price) {
      // Note: ต้องส่ง image ไปด้วยเพื่อให้ CartContext.js เก็บข้อมูลครบ
      addToCart({ name, price, image });
      alert(`เพิ่ม "${name}" ลงในตะกร้าแล้ว!`);
      // onHide();
    }
  };

  if (!product) {
    return null;
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col-md-6 text-center">
            <Image
              src={image}
              alt={name}
              fluid
              style={{ maxHeight: "350px", width: "auto" }}
            />
          </div>
          <div className="col-md-6">
            <h3>{name}</h3>
            <h4 className="price text-danger fw-bolder">฿{price}</h4>
            <p>{description}</p>
            <hr />
            <Button variant="danger" onClick={handleAddToCart}>
              <i className="fas fa-plus-circle me-1"></i> เพิ่มลงตะกร้า
            </Button>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          ปิด
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetail;

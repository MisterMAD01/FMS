// src/Common/ProductsItem.js (ฉบับแก้ไขกลับ)

import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { CartContext } from "./CartContext";
// ❌ ลบการ import { useAuth } ออก
// ❌ ลบการดึง isLoggedIn ออก

const ProductsItem = (props) => {
  const { addItemToCart } = useContext(CartContext);
  // ❌ ลบ const { isLoggedIn } = useAuth(); ออก

  const handleAddToCart = () => {
    // ✅ ลบการตรวจสอบ if (!isLoggedIn) { ... } ออก

    addItemToCart(props);
    alert(`เพิ่มสินค้า ${props.name} เรียบร้อยแล้ว!`);
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <Card className="shadow-sm h-100">
        <div style={{ height: "200px", overflow: "hidden" }}>
          <Card.Img
            variant="top"
            src={props.image}
            alt={props.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-danger fw-bold">{props.name}</Card.Title>
          <Card.Text className="text-muted small mb-1">
            หมวดหมู่: {props.category}
          </Card.Text>
          <Card.Text className="fs-5 fw-bolder text-dark mt-auto mb-2">
            ฿{props.price}
          </Card.Text>

          {/* ✅ ปุ่มเพิ่มในตะกร้าทำงานได้เสมอ */}
          <Button variant="danger" onClick={handleAddToCart}>
            <i className="fas fa-cart-plus me-2"></i> เพิ่มในตะกร้า
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductsItem;

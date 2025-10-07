// src/Common/Cart.js (ฉบับแก้ไข)

import React, { useContext } from "react";
import { Container, Row, Col, Table, Button, Alert } from "react-bootstrap";
import { CartContext } from "./CartContext";
import { Link, useNavigate } from "react-router-dom"; // นำเข้า useNavigate
import { useAuth } from "./AuthContext"; // 👈 1. นำเข้า useAuth

const Cart = () => {
  const { cartItems, totalItems, totalPrice, removeItemFromCart, clearCart } =
    useContext(CartContext);

  // 👈 2. ดึงสถานะการล็อกอิน
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // ฟังก์ชันจำลองการชำระเงิน
  const handleCheckout = () => {
    // 👈 3. ตรวจสอบสถานะการล็อกอิน
    if (!isLoggedIn) {
      alert("กรุณาล็อกอินเพื่อดำเนินการชำระเงิน");
      // นำทางไปยังหน้า Login
      navigate("/login");
      return;
    }

    // 4. ถ้าล็อกอินแล้ว อนุญาตให้ชำระเงิน (จำลอง)
    if (cartItems.length > 0) {
      alert(
        `ชำระเงินสำเร็จ! ยอดรวม: ฿${totalPrice}\nขอบคุณที่ใช้บริการ RedMart`
      );
      clearCart();
    } else {
      alert("ตะกร้าว่างเปล่า ไม่สามารถดำเนินการชำระเงินได้");
    }
  };

  return (
    <Container className="my-5" style={{ minHeight: "70vh" }}>
      <h2 className="text-center text-danger mb-4">
        <i className="fas fa-shopping-cart me-2"></i> ตะกร้าสินค้าของคุณ
      </h2>

      {cartItems.length === 0 ? (
        <Alert variant="info" className="text-center">
          <i className="fas fa-info-circle me-2"></i>
          ตะกร้าสินค้าว่างเปล่า. <Link to="/products">เลือกซื้อสินค้าเลย</Link>!
        </Alert>
      ) : (
        <>
          {/* ตารางสินค้า */}
          <Row>
            <Col lg={12}>
              <Table striped bordered hover responsive className="shadow-sm">
                {/* ... (Table Header เหมือนเดิม) ... */}
                <thead className="table-danger text-white">
                  <tr>
                    <th>สินค้า</th>
                    <th className="text-center">ราคา/หน่วย</th>
                    <th className="text-center">จำนวน</th>
                    <th className="text-center">ราคารวม</th>
                    <th className="text-center">ลบ</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "10px",
                            objectFit: "cover",
                          }}
                        />
                        {item.name}
                      </td>
                      <td className="text-center">
                        ฿
                        {parseFloat(
                          item.price.replace(/,/g, "")
                        ).toLocaleString()}
                      </td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-center fw-bold text-danger">
                        ฿
                        {parseFloat(
                          item.total.replace(/,/g, "")
                        ).toLocaleString()}
                      </td>
                      <td className="text-center">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeItemFromCart(item.id)}
                        >
                          <i className="fas fa-times"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>

          {/* สรุปยอดและปุ่ม */}
          <Row className="mt-4">
            <Col lg={12} className="text-end">
              <h4 className="fw-bold text-danger">
                ยอดรวมสินค้าทั้งหมด: {totalItems} รายการ
              </h4>
              <h3 className="fw-bolder text-danger mb-4">
                ราคาทั้งหมด: ฿{totalPrice}
              </h3>

              <Button
                variant="outline-secondary"
                className="me-3"
                onClick={clearCart}
              >
                <i className="fas fa-trash-alt me-2"></i> ล้างตะกร้า
              </Button>

              {/* 👈 5. ปุ่มดำเนินการชำระเงินที่เรียกใช้ handleCheckout */}
              <Button variant="success" size="lg" onClick={handleCheckout}>
                <i className="fas fa-money-check-alt me-2"></i>
                {isLoggedIn ? "ดำเนินการชำระเงิน" : "ล็อกอินเพื่อชำระเงิน"}
              </Button>

              {/* 👈 6. แสดงข้อความแจ้งเตือนถ้ายังไม่ได้ล็อกอิน */}
              {!isLoggedIn && (
                <div className="mt-3">
                  <Alert variant="warning" className="d-inline-block p-2">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    <Link to="/login">กรุณาล็อกอิน</Link> เพื่อดำเนินการชำระเงิน
                  </Alert>
                </div>
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Cart;

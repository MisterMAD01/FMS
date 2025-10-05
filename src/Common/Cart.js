// src/Common/Cart.js (ฉบับสมบูรณ์)

import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { Button, Table } from "react-bootstrap";

const Cart = () => {
  const { cartItems, removeItem, clearCart, updateQuantity } =
    useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) =>
      sum + parseFloat(item.price.replace(/,/g, "")) * item.quantity,
    0
  );

  return (
    <div className="container mt-5 mb-5" style={{ minHeight: "50vh" }}>
      <h2 className="mb-4 text-center text-danger">🛒 ตะกร้าสินค้า</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          <i className="fas fa-box-open me-2"></i> ตะกร้าสินค้าว่างเปล่า
          กลับไปเลือกซื้อสินค้ากันเถอะ!
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead>
              <tr className="table-danger">
                <th>สินค้า</th>
                <th className="text-center" style={{ width: "150px" }}>
                  ราคา/ชิ้น
                </th>
                <th className="text-center" style={{ width: "200px" }}>
                  จำนวน
                </th>
                <th className="text-center" style={{ width: "150px" }}>
                  ราคารวม
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.name}>
                  <td>
                    <div className="d-flex align-items-center">
                      {/* แสดงรูปภาพจาก item.image (%PUBLIC_URL%/logo512.png) */}
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                        className="me-3 rounded"
                      />
                      <strong>{item.name}</strong>
                    </div>
                  </td>
                  <td className="text-end fw-bold text-danger">
                    ฿{item.price}
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center align-items-center">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => updateQuantity(item.name, -1)}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => updateQuantity(item.name, 1)}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td className="text-end fw-bold text-danger">
                    ฿
                    {(
                      parseFloat(item.price.replace(/,/g, "")) * item.quantity
                    ).toLocaleString()}
                  </td>
                  <td className="text-center">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeItem(item.name)}
                      title="ลบสินค้าออก"
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-end mt-4">
            <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
              <h4 className="mb-3">
                รวมยอดชำระ:{" "}
                <span className="text-danger fw-bolder fs-3">
                  ฿{total.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                </span>
              </h4>
              <Button variant="success" size="lg">
                <i className="fas fa-credit-card me-2"></i> ดำเนินการชำระเงิน
              </Button>
              <Button
                variant="outline-danger"
                className="mt-2"
                onClick={clearCart}
              >
                ล้างตะกร้าทั้งหมด
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

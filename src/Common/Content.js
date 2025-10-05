// src/Common/Content.js

import React from "react";
import Products from "./Products";
import Welcome from "./Welcome";
import Image from "react-bootstrap/Image";

const Content = () => {
  // ✅ กำหนด Path รูปภาพใหม่: ใช้ logo512.png
  const productImagePath = "logo512.png";

  // ข้อมูลสินค้าทั้งหมดใช้ Path เดียวกัน
  const product1 = [
    { name: "ผ้านวม", price: "1,800", image: productImagePath },
    { name: "หมอนข้าง", price: "900", image: productImagePath },
    { name: "ผ้าปูที่นอน", price: "2,500", image: productImagePath },
    { name: "หมอน", price: "1,500", image: productImagePath },
  ];
  const product2 = [
    { name: "ทีวี", price: "4,500", image: productImagePath },
    { name: "วีดีโอ", price: "6,500", image: productImagePath },
    { name: "ตู้เย็น", price: "7,500", image: productImagePath },
    { name: "เครื่องซักผ้า", price: "8,900", image: productImagePath },
  ];
  const product3 = [
    { name: "สมุด", price: "25", image: productImagePath },
    { name: "ปากกา", price: "15", image: productImagePath },
    { name: "ยางลบ", price: "20", image: productImagePath },
    { name: "ไม้บรรทัด", price: "30", image: productImagePath },
  ];

  const images = [
    // เปลี่ยน Banner เป็นโทนสีแดง
    "https://via.placeholder.com/100x75/ff0000/ffffff?text=SALE",
    "https://via.placeholder.com/100x75/ff0000/ffffff?text=HOT",
    "https://via.placeholder.com/100x75/ff0000/ffffff?text=NEW",
    "https://via.placeholder.com/100x75/ff0000/ffffff?text=FREE",
    "https://via.placeholder.com/100x75/ff0000/ffffff?text=PRO",
  ];

  return (
    <div className="container">
      <Welcome />

      <hr />

      <Products title="ชุดเครื่องนอน" products={product1} />
      <Products title="สินค้าขายดี" products={product2} />
      <Products title="สินค้ามาใหม่" products={product3} />

      <hr />
    </div>
  );
};

export default Content;

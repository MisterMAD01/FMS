// src/Common/Content.js

import React from "react";
import Products from "./Products";
import Welcome from "./Welcome";
import Image from "react-bootstrap/Image";
import { useProduct } from "./ProductContext"; // ✅ ดึง Context สินค้า

const Content = () => {
  // ✅ ดึงสินค้าที่จัดกลุ่มแล้วจาก ProductContext
  const { getGroupedProducts } = useProduct();
  const groupedProducts = getGroupedProducts();

  const images = [
    // Banner Images
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

      {/* 🔄 แสดงสินค้าตามกลุ่มที่ได้จาก Context */}
      {groupedProducts.map((group, index) => (
        <Products key={index} title={group.title} products={group.products} />
      ))}

      {groupedProducts.length === 0 && (
        <div className="alert alert-warning text-center">
          ยังไม่มีสินค้าในระบบ กรุณาลองล็อกอินและเพิ่มสินค้าใหม่
        </div>
      )}

      <hr />
    </div>
  );
};

export default Content;

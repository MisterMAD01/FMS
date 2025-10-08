// src/Common/ProductContext.js

import React, { createContext, useState, useContext } from "react";

export const ProductContext = createContext();

// กำหนด Path รูปภาพสินค้า Placeholder
// ใช้ URL รูปภาพจริงหรือ Placeholder ที่ชัดเจนกว่าเดิม
const productImagePath =
  "https://via.placeholder.com/150/ff0000/ffffff?text=RedMart+Product";

// ข้อมูลสินค้าเริ่มต้น (เพิ่ม URL รูปภาพที่แตกต่างกัน)
const initialProducts = [
  // ชุดเครื่องนอน
  {
    id: 1,
    name: "ผ้านวม",
    price: "1,800",
    image:
      "https://assets.omazz.com/media/images/104bae20-0731-4d3e-b15f-30e1ec7e9517/omazz-accessory-siberian-white-goose-down-duvet-o-4.jpg",
    category: "ชุดเครื่องนอน",
  },
  {
    id: 2,
    name: "หมอนข้าง",
    price: "900",
    image:
      "https://junyworlds.com/wp-content/uploads/2024/05/%E0%B8%AB%E0%B8%A1%E0%B8%AD%E0%B8%99%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%87.jpg",
    category: "ชุดเครื่องนอน",
  },
  {
    id: 3,
    name: "ผ้าปูที่นอน",
    price: "2,500",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbtC1LXU6phzHwxN1qoDl73HjAVlR2jRfMSQ&s",
    category: "ชุดเครื่องนอน",
  },

  // เครื่องใช้ไฟฟ้า
  {
    id: 4,
    name: "ทีวี",
    price: "4,500",
    image:
      "https://www.futureav.co.th/wp-content/uploads/2021/06/50P615-03.jpg",
    category: "เครื่องใช้ไฟฟ้า",
  },
  {
    id: 5,
    name: "ตู้เย็น",
    price: "7,500",
    image:
      "https://images.samsung.com/is/image/samsung/th-top-mount-freezer-rt25fgradsa-rt25fgradsa-st-Silver-n-127977305?$720_576_JPG$",
    category: "เครื่องใช้ไฟฟ้า",
  },

  // เครื่องเขียน
  {
    id: 6,
    name: "สมุด",
    price: "25",
    image: "https://officework.co.th/upload/product/0120-0080-02.JPG",
    category: "เครื่องเขียน",
  },
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);

  const addProduct = (newProduct) => {
    const newId = Math.max(...products.map((p) => p.id)) + 1;
    const productToAdd = {
      ...newProduct,
      id: newId,
      // 🌟 ใช้ URL รูปภาพใหม่ หรือใช้ default URL ถ้าไม่มีการระบุ
      image: newProduct.image || productImagePath,
    };
    setProducts((prevProducts) => [...prevProducts, productToAdd]);
    return productToAdd;
  };

  // 🌟 ฟังก์ชัน: แก้ไขสินค้า (รองรับการอัปเดต URL รูปภาพ)
  const editProduct = (updatedProduct) => {
    // ตรวจสอบว่ามี image URL ใหม่หรือไม่ ถ้าไม่มีให้ใช้ของเดิม
    const finalProduct = {
      ...updatedProduct,
      image: updatedProduct.image || productImagePath, // ป้องกัน image เป็น null/undefined
    };

    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === finalProduct.id ? finalProduct : p))
    );
  };

  const deleteProduct = (id) => {
    if (window.confirm("คุณแน่ใจหรือไม่ที่จะลบสินค้านี้?")) {
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
      alert("ลบสินค้าเรียบร้อย");
    }
  };

  const getGroupedProducts = () => {
    // ... (โค้ด getGroupedProducts เดิม) ...
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    const grouped = [];

    if (uniqueCategories.length >= 1) {
      grouped.push({
        title: uniqueCategories[0],
        products: products.filter((p) => p.category === uniqueCategories[0]),
      });
    }
    if (uniqueCategories.length >= 2) {
      grouped.push({
        title: uniqueCategories[1],
        products: products.filter((p) => p.category === uniqueCategories[1]),
      });
    }

    if (products.length > 0) {
      grouped.push({
        title: "สินค้ามาใหม่ (3 รายการล่าสุด)",
        products: products.slice(-3).reverse(),
      });
    }

    return grouped;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        editProduct,
        deleteProduct,
        getGroupedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);

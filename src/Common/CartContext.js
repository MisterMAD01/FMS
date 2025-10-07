// src/Common/CartContext.js

import React, { createContext, useState, useContext } from "react";

export const CartContext = createContext();

// ฟังก์ชันเสริม: จัดรูปแบบตัวเลขเป็น string ที่มีจุลภาค
const formatPrice = (number) => {
  return parseFloat(number).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 🌟🌟🌟 ฟังก์ชัน addItemToCart 🌟🌟🌟
  const addItemToCart = (productToAdd) => {
    const itemIndex = cartItems.findIndex(
      (item) => item.id === productToAdd.id
    );

    let newCartItems;

    if (itemIndex > -1) {
      // สินค้ามีอยู่แล้ว: เพิ่มจำนวน
      newCartItems = cartItems.map((item, index) =>
        index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // สินค้าใหม่: เพิ่มเข้าตะกร้า
      const newItem = {
        ...productToAdd,
        quantity: 1,
      };
      newCartItems = [...cartItems, newItem];
    }

    // อัปเดตราคารวมของแต่ละรายการและตะกร้ารวม
    const updatedCart = newCartItems.map((item) => {
      const unitPrice = parseFloat(String(item.price).replace(/,/g, ""));
      const total = unitPrice * item.quantity;
      return {
        ...item,
        total: formatPrice(total), // จัดรูปแบบราคารวม
      };
    });

    setCartItems(updatedCart);
  };

  const removeItemFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // คำนวณยอดรวมทั้งหมด
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const rawTotalPrice = cartItems.reduce(
    (sum, item) =>
      sum + parseFloat(String(item.price).replace(/,/g, "")) * item.quantity,
    0
  );
  const totalPrice = formatPrice(rawTotalPrice);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        totalPrice,
        addItemToCart, // 👈 ต้องแน่ใจว่าชื่อฟังก์ชันถูกส่งออกตรงนี้!
        removeItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

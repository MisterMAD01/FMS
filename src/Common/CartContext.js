// src/Common/CartContext.js

import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 1. เพิ่มสินค้า: จัดการ Quantity แทนการเพิ่มรายการใหม่
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.name === product.name
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // 2. ลบสินค้าออกตามชื่อ
  const removeItem = (productName) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.name !== productName)
    );
  };

  // 3. อัปเดตจำนวนสินค้า (+/-)
  const updateQuantity = (productName, change) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.name === productName) {
            const newQuantity = item.quantity + change;
            return newQuantity >= 1 ? { ...item, quantity: newQuantity } : item;
          }
          return item;
        })
        .filter((item) => item.quantity >= 1);
    });
  };

  // 4. ล้างตะกร้าทั้งหมด
  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeItem,
        clearCart,
        updateQuantity,
        cartTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

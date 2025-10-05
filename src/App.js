// src/App.js (ฉบับแก้ไขล่าสุด)

import React from "react";
import "./App.css";
// นำเข้า CSS ที่จำเป็น
import "bootstrap/dist/css/bootstrap.min.css";

// นำเข้า Routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

// นำเข้า Context และ Component
import { CartProvider } from "./Common/CartContext";
import Navbars from "./Common/Navbars";
import Content from "./Common/Content";
import Footer from "./Common/Footer";
import Cart from "./Common/Cart";
import ProductsPage from "./Common/ProductsPage";

// 404 Component
const NotFound = () => (
  <div className="container text-center mt-5 p-5" style={{ minHeight: "60vh" }}>
    <h1 className="display-1 text-danger">404</h1>
    <h3 className="mb-4">ไม่พบหน้านี้</h3>
    <p>ขออภัย, ที่อยู่ที่คุณค้นหาไม่ถูกต้อง</p>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="App">
          <Navbars />

          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
